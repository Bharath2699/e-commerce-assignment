import React, { useState } from 'react'
import "./AddProduct.css"

const AddProduct = () => {
    const [productDetails,setProductDetails]=useState({
        name:"",
        image_url:"",
        quantity:"",
        price:"",
        category:"electronic",
        available:"",
        rating:"",
        reviews:"",
        brand:"",
        description:""

    })

    const changeField=(e)=>{
       setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const add_product=async()=>{
          console.log(productDetails)
          let product=productDetails;
          await fetch("http://localhost:4001/addproducts",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(product)
          }).then(
            (res)=>res.json()
          ).then(
            (data)=>{
                data.success?alert("Product Added"):alert("Failed")
            }
          )
          setProductDetails({ name:"",
          image_url:"",
          quantity:"",
          price:"",
          category:"electronic",
          available:"",
          rating:"",
          reviews:"",
          brand:"",
          description:""})
    }

  return (
    <div className='add-product'>

        <div className="addproduct-item">
            <p>Product Title</p>
            <input type="text" value={productDetails.name} onChange={changeField} name="name" placeholder='Type here'/>

        </div>
        <div className="addproduct-price">
            <div className="addproduct-item">
                <p>Price</p>
                <input type="text" value={productDetails.price} onChange={changeField} name="price" placeholder='Type here'/>
            </div>
        </div>
        <div className="addproduct-item">
            <p>Product Category</p>
            <select name="category" value={productDetails.category} onChange={changeField} className='addproduct-selector'>
                 <option value="clothing">Clothing</option>
                 <option value="electronic">Electronic</option>
                 <option value="appliances">Appliances</option>
                 <option value="grocery">Grocery</option>
                 <option value="toys">Toys</option>
            </select>
        </div>
        <div className="addproduct-item">
            <p>Image Url</p>
            <input type="text" value={productDetails.image_url} onChange={changeField} name="image_url" placeholder='Type here'/>
        </div>
        <div className="addproduct-item">
            <p>Quantity</p>
            <input type="text" value={productDetails.quantity} onChange={changeField} name="quantity" placeholder='Type here'/>
        </div>
        <div className="addproduct-item">
            <p>Brand</p>
            <input type="text" value={productDetails.brand} onChange={changeField} name="brand" placeholder='Type here'/>
        </div>
        <div className="addproduct-item">
            <p>Ratings</p>
            <input type="text" value={productDetails.rating} onChange={changeField} name="rating" placeholder='Type here'/>
        </div>
        <div className="addproduct-item">
            <p>Reviews</p>
            <input type="text" value={productDetails.reviews} onChange={changeField} name="reviews" placeholder='Type here'/>
        </div>
        <div className="addproduct-item">
            <p>Description</p>
            <input type="text" value={productDetails.description} onChange={changeField}  name="description" placeholder='Type here'/>
        </div>
        <div className="addproduct-item">
        <p>Availability</p>
            <select name="available" value={productDetails.available} onChange={changeField} className='addproduct-selector'>
                 <option value="in-stock" selected>In Stock</option>
                 <option value="not-available">Not Avilable</option>
            </select>
        </div>
        <button onClick={()=>{add_product()}} className='addproduct-btn'>Add</button>
    </div>
  )
}

export default AddProduct