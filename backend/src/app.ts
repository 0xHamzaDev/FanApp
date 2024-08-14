import express, { Application, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from 'dotenv';
import passport from "passport";
import passportConfig from "./middleware/passport";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const App: Application = express();

connectDB();

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'];

App.use(cors({
	origin: function (origin: any, callback: any) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}
}));
App.use(helmet());
App.use(morgan("dev"));
App.use(express.json());

App.use(passport.initialize());
passportConfig(passport);

App.use("/api/authentication", authRoutes);
App.use("/api/user", userRoutes);

App.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "API :)" });
});

export default App;