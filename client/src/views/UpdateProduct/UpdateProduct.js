import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./UpdateProduct.css"
import { useParams } from 'react-router-dom';

function UpdateProduct() {
  const [imgURL, setImgURL] = useState('');
  const [name, setName] = useState("");
  
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const {_id} = useParams();

  const loadStudent = async ()=>{
      const response= await axios.get(`/product/${_id}`)
      console.log(response);

      const {name,imgURL,price,brand,description} = response?.data?.data
      setImgURL(imgURL)
      setName(name)
      setPrice(price)
      setBrand(brand)
      setDescription(description)
  }

  useEffect(()=>{
    loadStudent();
  },[])

  const updateProduct = async()=>{
    const upadated_details = {name,imgURL,price,brand,description} 
     
    const response = await axios.put(`/product/${_id}`,upadated_details)
    alert(response?.data?.message)
   
  }

 
  return (
    <div>
      <h1 className='text-center'>Update PRODUCT</h1>
      <form className='input-card'>
        <div>
        <input
          type='text'
          value={imgURL}
       
          className='input-type'
          placeholder='Enter img'
          onChange={(e) => {
            setImgURL(e.target.value)
          }}
        />

        <input
          type='text'
          value={name}
          className='input-type'
          placeholder='Enter name'

          onChange={(e) => {
            setName(e.target.value)
          }}
        />

        <input
          type='text'
          value={price}
          className='input-type'
          placeholder='Enter price'
          onChange={(e) => {
            setPrice(e.target.value)
          }}
        />

        <input
          type='text'
          value={brand}
          className='input-type'
          placeholder='Enter brand'
          onChange={(e) => {
            setBrand(e.target.value)
          }}
        />

        <input
          type='text'
          value={description}
          className='input-type'
          placeholder='Enter description'
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />

        <button type='button' className='add-btn' onClick={updateProduct}>update Product</button>

        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
