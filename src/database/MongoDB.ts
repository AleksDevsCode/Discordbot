import mongoose from 'mongoose';
import * as process from "process";

const uri = `${process.env.MONGO_URI}`; // Change this URI to your MongoDB server URI and database name

export async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, {
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
