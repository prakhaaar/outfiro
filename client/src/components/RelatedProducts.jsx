import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectProductStatus,
} from "../redux/productSlice";

import Title from "./Title";
import Item from "./Item";

const RelatedProducts = ({ category, subCategory }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductStatus);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products
        .filter((item) => item.category === category)
        .filter((item) => item.subCategory === subCategory);

      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <section className="py-16">
      <Title title1={"Related"} title2={"Products"} titleStyles={"pb-4"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {related.map((product) => (
          <Item key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
