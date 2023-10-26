import React, { useState } from 'react'
import axios from 'axios';
import "./AddStd.css"

function AddStd() {
  const [imgURL, setImgURL] = useState('');
  const [name, setName] = useState("");
  
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const addstud = async ()=>{

    if(!imgURL||!name||!price||!brand||!description){
      alert('please enter fields')
      return
    }

    const ptd ={
      imgURL,
      name,
      price,
      brand,
      description
    }

    const response = await axios.post('/product', ptd);

    alert(response?.data?.message)

    setImgURL("");
    setName('');
    setPrice("");
    setBrand("");
    setDescription("")
  }


  return (
    <div>
      <h1 className='text-center'>ADD PRODUCT</h1>
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

        <button type='button' className='add-btn' onClick={addstud}>Add Product</button>

        </div>
      </form>
    </div>
  )
}

export default AddStd
