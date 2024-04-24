const port=4001;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const path=require("path");
// const asyncHandler=require("express-async-handler");
//const jwt=require("jsonwebtoken");

app.use(express.json());
app.use(cors());

// database connection with mongodb

mongoose.connect("mongodb+srv://bharath21903:02061999@cluster0.hkawlfi.mongodb.net/e-commerce");

// api creation

app.get("/",(req,res)=>{
    res.send("App is Running")
})

// create product schema

const Product=mongoose.model("Product",{
    id:{
        type:Number,
    },
    name:{
        type:String,
    },
    image_url:{
        type:String,
    },
    description:{
        type:String,
    },
    qyantity:{
        type:Number,
    },
    price:{
        type:Number
    },
    available:{
        type:String,
    },
    brand:{
        type:String,
    },
    rating:{
        type:Number
    },
    reviews:{
        type:Number,
    },
    category:{
        type:String
    },

})



// get all product
app.get("/products",async(req,res)=>{
    const product= await Product.find({});
    console.log(product);
    res.send(product);
})

// add products
app.post("/addproducts",async(req,res)=>{
    let products=await Product.find({});
    let id;
    if (products.length>0){
        let lastProductArray=products.slice(-1);
        let lastProduct=lastProductArray[0];
        id=lastProduct.id+1
    }else{
        id=1
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image_url:req.body.image_url,
        quantity:req.body.quantity,
        price:req.body.price,
        available:req.body.available,
        brand:req.body.brand,
        rating:req.body.rating,
        reviews:req.body.reviews,
        category:req.body.category,
        description:req.body.description
    })
    console.log(product);
    await product.save();
    res.send("Product added to cart")
})

//get product

app.get("/product/:id",async(req,res)=>{
    const product=await Product.findOne({id:req.params.id})
    if(product){
    console.log(product)
    res.json({product})
    }else{
      res.json({error:"product not found"})
    }
}
)

// delete product

app.post("/remove",async(req,res)=>{
      await Product.findOneAndDelete({id:req.body.id})
     
        res.send("product removed")
      
})

// filter product

app.get("/filter",async(req,res)=>{
    console.log(req.query)
    const product=await Product.find({category:req.query.category,rating:req.query.rating});
    if (product){
        res.json({product})
    }else{
        res.json({error:"try another filter"})
    }
})

app.get("/namefilter",async(req,res)=>{
    console.log(req.query)
    const product=await Product.find({name:req.query.name});
    if (product){
        res.json({product})
    }else{
        res.json({error:"try another filter"})
    }
})


app.listen(port,(error)=>{
   if(!error){
    console.log("Server running on port "+port)
   }else{
    console.log("Error: "+port)
   }
})