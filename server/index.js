import express from "express";
import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();



const app = express();

app.use(express.json());

const PORT = 5000;



const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    if (conn) {
        console.log('MongoDB connect successfully')
    }
}


const productSchema = new Schema({
    name:String,
    price:String,
    imgURL:String,
    description:String,
    brand:String

});

const  Product = model ('product', productSchema)


app.get('/samosa', (req, res) => {
    res.send('samosa is spicy')
});

app.get('/products', async (req, res) => {
    
    const product = await Product.find()
    res.json({
        success: true,
        data: product,
        message: "successfully fetch all student"

    })
});

app.post('/product', async (req, res) => {

    const { name, price, imgURL, description, brand } = req.body;



    if (!name) {
        return res.json({
            success: false,
            message: "name is required"
        })
    }
    if (!brand) {
        return res.json({
            success: false,
            message: "brand is required"
        })
    }
    if (!description) {
        return res.json({
            success: false,
            message: "description is required"
        })
    }
    if (!imgURL) {
        return res.json({
            success: false,
            message: "imgURL is required"
        })
    }
    if (!price) {
        return res.json({
            success: false,
            message: "price is required"
        })
    }
    
    const prod  = new Product({
        name,
        price,
        imgURL,
        description,
        brand
    });

    const saveproduct = await prod.save();

    res.json({
        success: true,
        data:saveproduct,
        message: "student aaded succesfully"
    })
});

app.get('/product/:_id', async (req, res) => {
    const {_id} = req.params;
    const product = await Product.findOne({_id:_id})

    res.json({
        success: true,
        data: product,
        message: "succesfully fetch product"
    })
});

app.delete('/product/:_id', async (req,res)=>{
    const {_id} = req.params;
    await Product.deleteOne({_id:_id})
 
    
    res.json({
     success:true,
     data:{},
     message:`succesfully deleted product ${_id}`
    })
 });

 app.put('/product/:_id',async (req, res) => {
    
    const {_id} = req.params;
    const { name, price, imgURL, description, brand } = req.body;


    const updateProduct =  await Product.updateOne(
        {_id:_id},
         {$set:{
        name,
         price, 
         imgURL,
          description,
           brand 
    }})

    const upadated_product = await Product.findOne({_id:_id})

    res.json({
        success:true,
        data:upadated_product,
        message:"student upadated successfully"
    })
 });

 app.patch('/product/:_id', async (req, res)=>{
         const {_id}= req.params;
         const { name, price, imgURL, description, brand } = req.body;

         const product = await Product.findById(_id)

         if(name){
            product.name=name;
         }
         if(price){
            product.price=price;
         }
         if(imgURL){
            product.imgURL=imgURL;
         }
         if(description){
            product.description=description;
         }
         if(brand){
            product.brand=brand;
         }

         const saveproduct = product.save();

         res.json({
            success:true,
            data:saveproduct,
            message:"student upadted succesfully"
         })
 })





app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectMongoDB();
})