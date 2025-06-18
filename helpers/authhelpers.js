import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const salt=process.env.BCRYPTSALT
console.log(salt)
export const hashedpass=async(password)=>{
    try {
        const hashed= await bcrypt.hash(password,salt)
        return hashed
    } catch (error) {
        console.log(error)
        
       

    }
}
export const comparepassword=async(pass,userpass)=>{
    try {
         const same= bcrypt.compare(pass,userpass)
        return same
    } catch (error) {
        console.log(error)
    }
}