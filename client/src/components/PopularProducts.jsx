import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectProductStatus,
} from "../redux/productSlice";

import Title from "./Title";
import Item from "./Item";

const PopularProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductStatus);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (products && products.length > 0) {
      const data = products.filter((item) => item?.popular);
      setPopularProducts(data.slice(0, 5));
    }
  }, [products]);

  if (status === "loading") {
    return <div>Loading Popular Products...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load popular products.</div>;
  }

  return (
    <section className="max-padd-container py-16 bg-primary">
      <Title
        title1={"Popular"}
        title2={"Products"}
        titleStyles={"pb-10"}
        paraStyles={"!block"}
      />
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {popularProducts.map((product) => (
          <div key={product._id}>
            <Item product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
