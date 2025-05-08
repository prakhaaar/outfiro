import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrency,
  selectDeliveryCharges,
  selectCartAmount,
} from "../redux/cartSlice";
import Title from "./Title";

const CartTotal = () => {
  const currency = useSelector(selectCurrency);
  const delivery_charges = useSelector(selectDeliveryCharges);
  const subtotal = useSelector(selectCartAmount);

  const shipping = subtotal === 0 ? 0 : delivery_charges;
  const total = subtotal + shipping;

  return (
    <section className="w-full max-w-lg mx-auto py-6">
      <Title title1="Cart" title2="Total" title1Styles="h3" />
      <div className="space-y-3 mt-4">
        <div className="flexBetween">
          <h5 className="h5">Subtotal:</h5>
          <p className="h5">
            {currency}
            {subtotal}.00
          </p>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="flexBetween">
          <h5 className="h5">Shipping Fee:</h5>
          <p className="h5">
            {currency}
            {shipping}.00
          </p>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="flexBetween font-semibold">
          <h5 className="h5">Total:</h5>
          <p className="h5">
            {currency}
            {total}.00
          </p>
        </div>
        <hr className="border-t border-gray-200" />
      </div>
    </section>
  );
};

export default CartTotal;
