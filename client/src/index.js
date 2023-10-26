import React from 'react';
import ReactDOM from 'react-dom/client';
import AddStd from './views/AddStd/AddStd';
import './index.css';
import Home from './views/Home/Home';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import UpdateProduct from "./views/UpdateProduct/UpdateProduct.js"

const router = createBrowserRouter([
  {
  
  path:'/',
  element:<Home/>
},
{
  path:'/addstd',
  element:<AddStd/>
},
{
  path:'/updateproduct/:_id',
  element:<UpdateProduct/>
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
 <RouterProvider router={router}/>
);


