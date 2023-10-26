import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./Home.css"

const Home = () => {

    const [product, setProduct] = useState([])

    const deleteProduct = async (_id) => {

        const response = await axios.delete(`/product/${_id}`);
        if (response?.data?.success) {
            loadStudent();
        }


    }

    const loadStudent = async () => {
        const response = await axios.get('/products');
        console.log(response?.data?.data)
        setProduct(response?.data?.data)
    }

    useEffect(() => {

        loadStudent();
    }, [])

    return (
        <div>
            <h1 className='text-center'>Products</h1>
            <div className=' main-div'>
                {
                    product?.map((products, index) => {

                        const { _id, imgURL, name, price, description, brand } = products;
                        return (
                            <>
                                <div className=' product-card'>
                                    <p>imgURL</p>
                                    <h2>{name}</h2>


                                    <h3>{price} brand:{brand}</h3>

                                    <p>{description}</p>

                                    <button 
                                    className='delete-btn'
                                        onClick={() => {
                                            deleteProduct(_id)
                                        }
                                        }
                                    >Delete</button>

                                    <a href={`/updateproduct/${_id}`} target='_blank'     className='delete-btn update-btn'>Edit</a>
                                </div>

                            </>

                        )

                    })
                }
            </div>
        </div>
    )
}

export default Home
