import React, {useState, useEffect} from 'react';
import Layout from './../components/Layouts/Layout.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  // initial product detail
  useEffect(() => {
    if(params?.slug) getProduct();
  }, [params?.slug])
  // getProduct
  const getProduct = async() => {
    try{
      const {data} = await axios.get(
          `/api/v1/product/single-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
    }catch(error){
      // console.log(error);
    }
  };

  // get similar/related product
  const getSimilarProduct = async(pid, cid) => {
    try{
      const {data} = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    }catch(error){
      // console.log(error);
    }
  };

  return (
    <Layout>
        <div className='row container mt-3'>
          <div className='col-md-6'>
          <img 
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="400"
            width="350px"
          />
          </div>
          <div className='col-md-6'>
            <h1 className='text-center'>Product details</h1>
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: {product.price}</h6>
            {/* <h6>Category: {product.category.name}</h6> */}
            {/* <h6>Shipping: {product.shipping}</h6> */}
            <button class="btn btn-secondary ">Add to cart</button>
          </div>
        </div>
        <hr />
        <div className='row'>
          <h1>Similar products</h1>
          {relatedProduct.length < 1 && <p className='text-center'>No Similar Products found</p>}
          {/* {JSON.stringify(relatedProduct, null, 4)} */}
          <div className='d-flex flex-wrap'>
            {relatedProduct?.map((p) => (

              <div className="card m-2" style={{ width: '18rem' }} >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text"> ₹ {p.price}</p>
                  <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default ProductDetails