import mongoose from "mongoose";

export const connectDb = async ()=>{
    try{

       const mongodb_url = "mongodb+srv://mahadiinfo888_db_user:xvwLD7Jk5BUgg9n6@chatappdb.gml5rak.mongodb.net/";
        const responsedb = await mongoose.connect(mongodb_url)
        console.log(`database connected: ${responsedb.connection.host}`)
     } catch(error1) {
        console.log(error1)
     };
     
}
