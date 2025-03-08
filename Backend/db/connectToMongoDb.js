import mongoose from "mongoose";

const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Mongodb Connected");
    } catch (error) {
        console.log("Error Connecting to database", error.message);
    }
}

export default connectToDB;