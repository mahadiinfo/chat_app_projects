import mongoose from "mongoose";

export const connectDb = async ()=>{
    try{

       const mongodb_url = process.env.MONGODB_API;
        const responsedb = await mongoose.connect(mongodb_url)
        console.log(`database connected: ${responsedb.connection.host}`)
     } catch(error1) {
        console.log(error1)
     };
     
}