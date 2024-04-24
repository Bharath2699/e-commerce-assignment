import React, { useEffect, useState } from 'react'
import cross_icon from "../../assets/cross_icon.png"
import "./ProductList.css"

const ProductList = () => {

 const [productInfo,setProduct]=useState([]);

const getProducts=async()=>{
    const res=await fetch("http://localhost:4001/products");
    const data=await res.json();
     setProduct(data)
   
 }

 
  useEffect(() =>{getProducts()}, [])
 
  const remove_product=async (id)=>{
    const res=await fetch("http://localhost:4001/remove",{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify({id:id})
    })
    await getProducts();
  }
 
console.log(productInfo)
  return (
    <div className='product-list'>
        <p>Product List</p>
        <div className='list-headings'>
            <p>Product Name</p>
            <p>Price</p>
            <p>Category</p>
            <p>Available</p>
            <p>Brand</p>
           <p>Remove</p>
        </div>
        <ul className='list-card'>
             {
                productInfo.map((product,index)=>
                    <li  key={index} id={product.id}>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <p>{product.category}</p>
                        <p>{product.available}</p>
                        <p>{product.brand}</p>
                        <img src={cross_icon} onClick={()=>{remove_product(product.id)}} alt="" className='remove-img'/>
                    </li>
                )
             }
        </ul>
    </div>
  )
}

export default ProductList