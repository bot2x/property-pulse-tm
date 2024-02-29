import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    //if db already connected. Don't connect again.
    if (connected) {
        console.log("Mongodb already connected.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        connected = true;
        console.log("Mongodb connected...");

    } catch (error) {
        console.log(error);
    }
};

export default connectDB;