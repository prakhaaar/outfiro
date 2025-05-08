import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mt-1">₹{product.price}</p>
      <button className="mt-3 bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition">
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
