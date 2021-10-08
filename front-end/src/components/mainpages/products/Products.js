import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setProducts } from "../../../redux/actions/productAction";
import ProductItem from "../utils/product_item/ProductItem";

function Products() {
  const products = useSelector((state) => state.allProducts.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("/api/products");
      // .catch((err) => console.log("%cError: ", err));
      dispatch(setProducts(res.data));
      console.log("res data", res.data);
    };
    getProducts();
  }, []);
  console.log("get products", products);

  const productsList = products.map((product) => {
    return <ProductItem key={product._id} product={product} />;
  });

  return <div className='products'>{productsList}</div>;
}

export default Products;
