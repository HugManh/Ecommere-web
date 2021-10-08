import axios from "axios";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from "../../../redux/actions/productAction";

import ProductItem from "../utils/product_item/ProductItem";

function DetailProduct() {
  const params = useParams();
  const detailProduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetail = async () => {
      const res = await axios.get(`/api/product/${params.id}`);
      dispatch(selectedProduct(res.data));
    };
    if (params.id && params.id !== "") {
      fetchProductDetail();
    }
  }, [dispatch, params.id]);

  console.table(`Detail Product - ${detailProduct._id}`, detailProduct);
  console.log(`Params`, params);

  if (detailProduct.length === 0) return null;

  return (
    <>
      <div className='detail'>
        <img src={detailProduct.images.url} alt='' />
        <div className='detail-box'>
          <div className='row1'>
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link to='/cart' className='cart'>
            Buy Now
          </Link>
        </div>
      </div>
      <div>
        <h2>Related product</h2>
        <div className='products'>
          {detailProduct.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
