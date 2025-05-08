import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";
import { TfiPackage } from "react-icons/tfi";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (data.success) setOrders(data.orders.reverse());
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateStatus = async (e, orderId) => {
    try {
      await axios.post(
        `${backend_url}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      fetchOrders();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-white p-4 rounded-lg flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <TfiPackage className="text-secondary text-xl" />
              <div className="font-medium">
                {o.address.firstName} {o.address.lastName}
              </div>
              <div className="text-sm ml-auto">
                {currency}
                {o.amount}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {o.items
                .map((i) => `${i.name} x${i.quantity} (${i.size})`)
                .join(", ")}
            </div>
            <div className="text-sm">
              Payment: {o.payment ? "Done" : "Pending"}
            </div>
            <select
              value={o.status}
              onChange={(e) => updateStatus(e, o._id)}
              className="w-fit p-1 mt-2 bg-primary rounded"
            >
              <option>Order Placed</option>
              <option>Packing</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
np;
