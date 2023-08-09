import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import  toast  from 'react-hot-toast';
import axios from 'axios';
import {Select} from "antd";
import { useNavigate, useParams } from 'react-router-dom';
const {Option} = Select

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

   // get single product 
   const getSingleProduct = async () => {
    try{
      const {data} = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    }catch(error){
        // console.log(error);
    }
   };
   useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
   }, []);

  // get all category
  const getAllCategory = async() => {
    try{
      const {data} = await axios.get(`/api/v1/category/all-category`);
      if(data?.success){
        setCategories(data?.category);
      }
    }catch(error){
      // console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // handle create Product

  const handleUpdate = async(e) => {
    e.preventDefault();
    try{
      const productData = new FormData()
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const {data} = axios.put(`/api/v1/product/update-product/${id}`, productData);
      if(data?.success){
        toast.error(data?.message);
        // console.log(data?.message);
      }else{
        toast.success('Product Updated Successfully');
        navigate('/dashboard/admin/products');
      }

    }catch(error){
      // console.log(error);
      toast.error('something went wrong');
    }
  };

  // delete a product
  const handleDelete = async() => {
    try{
      let answer = window.prompt("Are you Sure you want to delete this Product ?");
      if(!answer) return;
      const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success('Product Deleted Successfully');
      navigate('/dashboard/admin/products');
    }catch(error){
      // console.log(error);
      toast.error("Somrthing went wrong")
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard- Update product"}>
        <div className='container-fluid m-3 p-3'></div>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu />
            </div>
            <div className='col-md-9'>
                <h1>Update product</h1>
                <div className='m-1'>
                  <Select 
                    bordered= {false}
                    placeholder= "Select a category"
                    size='large'
                    showSearch
                    className='form-select mb-3'
                    onChange={(value) => setCategory(value)}
                    value={category}
                  >
                    {categories?.map(c => (
                      <Option key={c._id} value={c._id}>{c.name}</Option>
                    ))}
                  </Select>
                  <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12'>
                      {photo ? photo.name : "Upload Photo"}
                      <input 
                        type='file'
                        name='photo'
                        accept='image/*'
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className='mb-3'>
                    {photo ? (
                      <div className='text-center'>
                        <img 
                          src={URL.createObjectURL(photo)}
                          alt='product'
                          height={'200px'}
                          className='img img-responsive'
                        />
                      </div>
                    ) : (
                      <div className='text-center'>
                      <img 
                        src={`/api/v1/product/product-photo/${id}`}
                        alt='product'
                        height={'200px'}
                        className='img img-responsive'
                      />
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <input 
                      type='text'
                      value={name}
                      placeholder='write a name'
                      className='form-control'
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <textarea 
                      rows="4"
                      cols="25"
                      value={description}
                      placeholder='write a description'
                      className='form-control'
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className='mb-3'>
                    <input 
                      type='number'
                      value={price}
                      placeholder='write a Price'
                      className='form-control'
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <input 
                      type='number'
                      min="0"
                      max="100"
                      value={quantity}
                      placeholder='write a quantity'
                      className='form-control'
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <select 
                      bordered={false}
                      className='form-control mb-3'
                      placeholder='Select Shipping'
                      size="large"
                      showSearch
                      onChange={(value) => setShipping(value)}
                      value={shipping ? "yes" : "No"}
                    >
                      <option value="">Select Shipping</option>
                      <option value="yes">Yes</option>
                      <option value="No">No</option>
                    </ select>
                  </div>
                    <div className='mb-3'>
                      <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
                    </div>
                    <div className='mb-3'>
                      <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default UpdateProduct