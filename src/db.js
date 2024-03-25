import mongoose, { mongo } from 'mongoose'

export const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost/backcrm")
        console.log("db is connected");
    } catch (error) {
        console.log(error);
    }
}