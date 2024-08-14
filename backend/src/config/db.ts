import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoUri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/application';

const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(mongoUri);
		console.log("[MongoDB] : connected successfully.");
	} catch (error: any) {
		console.error("[MongoDB] : connection failed:", error.message);
		process.exit(1);
	}
};

export default connectDB;