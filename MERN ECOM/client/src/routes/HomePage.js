import React, { useState, useEffect } from 'react'
import Layout from '../components/Layouts/Layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import {useCart} from '../context/cart.js';
import { toast } from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);



  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      // console.log(error);

    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [])

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  };

    // getTotal Count
    const getTotal = async () => {
      try{
        const {data} = await axios.get(`/api/v1/product/product-count`);
        setTotal(data?.total);
      }catch(error){
        // console.log(error);
      }
    };
  
    useEffect(() => {
      if(page ===1) return; 
      loadmore();
    }, [page]);
    
  // load more
  const loadmore = async() => {
    try{
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    }catch(error){
      // console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  };

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, { checked, radio })
      setProducts(data?.products);
      // console.log(data?.products)
    } catch (error) {
      // console.log(error)
    }
  };

  useEffect(() => {

    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);



  return (

    <Layout title={"All Products - Best offers"}>

      <div className='container-fluid row mt-3'>
        <div className='col-md-2'>
          <h6 className='text-center'>Filter By Category</h6>
          <div className='d-flex flex-column'>
            {categories?.map(c => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h6 className='text-center mt-4'>Filter By Price</h6>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-column'>
            <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
          </div>
        </div>
        <div className='col-md-9'>
          {/* {JSON.stringify(checked, null, 4)} */}
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (

              <div className="card m-2" style={{ width: '18rem' }} >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text"> ₹ {p.price}</p>
                  <button 
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p])
                      localStorage.setItem("cart", JSON.stringify([...cart, p]))
                      toast.success("Item added to cart")
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
              {products && products.length < total && (
                <button className='btn btn-warning' onClick={(e) => {
                  e.preventDefault();
                  setPage(page +1);
                }}>
                  {loading ? "Loading..." : "Loadmore"}
                </button>
              )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage