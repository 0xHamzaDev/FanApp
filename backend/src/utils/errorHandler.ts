import { Response } from "express";

const errorHandler = (res: Response, error: any, statusCode: number = 500, message: string = "Something went wrong") => {
	console.error("[Error Handler] :", error);
	res.status(statusCode).json({ message, error: error.message });
};

export { errorHandler };