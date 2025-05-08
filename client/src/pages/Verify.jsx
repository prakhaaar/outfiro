import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setCartItems } from "../redux/cartSlice"; // Import cart action
import { selectToken } from "../redux/authSlice"; // Import token selector

const Verify = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // Get token from Redux
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Assuming backend URL is set in .env

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${backendUrl}/api/order/verifystripe`,
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        // Reset the cart
        dispatch(setCartItems({}));
        window.location.href = "/orders"; // Replaces `navigate("/orders")`
      } else {
        window.location.href = "/"; // Navigate to home if payment verification fails
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>Verifying Payment...</div>;
};

export default Verify;
