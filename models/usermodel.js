import mongoose from "mongoose"
const usersch=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
       
    },
    password:{
        type:String,
        required:true,
    
    },
    address:{
        type:String,
        required:true
     
    },
    phone:{
        type:String,
        required:true
        
    },
    role:{
        type:Number,
        default:0
        
    },
    answer:{
        type:String,
        required:true,
        trim:true
      
    }
},{timestamps:true})

export default mongoose.model("users", usersch)