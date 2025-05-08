import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectProductStatus,
} from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading New Arrivals...</div>;
  }

  if (status === "failed" || !products) {
    return <div>Failed to load products.</div>;
  }

  const newArrivals = products.slice(0, 4); // Adjust as needed

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {newArrivals.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default NewArrivals;
