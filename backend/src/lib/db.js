import mongoose from "mongoose";

export const connect=async()=>{
    try{

       const conn= await mongoose.connect(process.env.MONGODB_URL);
       console.log(`Mongodb Connected successfully`);

    }
    catch(err)
    {
        console.log(`Mongoose Error:${err}`);
    }
}