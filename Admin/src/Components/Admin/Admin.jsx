import React from 'react'
import {Routes,Route} from "react-router-dom"
import Sidebar from '../Sidebar/Sidebar'
import "./Admin.css"
import AddProduct from '../AddProduct/AddProduct'
import ProductList from '../ProductList/ProductList'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path="/addProducts" element={<AddProduct/>}/>
        <Route path="/products" element={<ProductList/>}/>
      </Routes>
    </div>
  )
}

export default Admin