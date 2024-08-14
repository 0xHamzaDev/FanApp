import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { errorHandler } from "../utils/errorHandler";
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const jwtSecret: string = process.env.JWT_SECRET as string;
const twilioSID: string = process.env.TWILIO_ACCOUNT_SID as string;
const twilioAuthToken: string = process.env.TWILIO_AUTH_TOKEN as string;
const twilioServiceSID: string = process.env.TWILIO_SERVICE_SID as string;

if (!jwtSecret || !twilioSID || !twilioAuthToken || !twilioServiceSID) {
    console.error("[Config] : Environment variables for JWT or Twilio are not properly set.");
    process.exit(1);
}

const twilioClient = twilio(twilioSID, twilioAuthToken);

const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, password, phone } = req.body;
    try {
        const existingUser: IUser | null = await User.findOne({ phone });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser: IUser = new User({ name, password: hashedPassword, phone });
        const savedUser: IUser = await newUser.save();
        const a = generateToken(savedUser._id.toString(), phone);

        res.status(201).json({ 
            id: savedUser._id.toString(),
            status: 'success'
        });
    } catch (error) {
        console.error("Error during registration:", error);
        errorHandler(res, error);
    }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { phone } = req.body;

    try {
        const existingUser: IUser | null = await User.findOne({ phone });
        if (!existingUser){
            res.status(404).json({ error: "User not found" });
            return;
        }

        const otpResponse = await sendOtp(phone);
        res.status(200).json({ message: "OTP sent successfully", otpResponse });
    } catch (error) {
        console.error("Error during OTP generation:", error);
        errorHandler(res, error);
    }
};

const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    const { phone, otp } = req.body;

    try {
        const verificationCheck = await checkOtp(phone, otp);
        if (verificationCheck?.status !== 'approved') {
            res.status(400).json({ error: "Invalid OTP" });
            return;
        }

        const existingUser: IUser | null = await User.findOne({ phone });
        if (!existingUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const token = generateToken(existingUser._id.toString(), phone);
        res.status(200).json({ 
            message: "Verification successful", 
            token: token,
            user: {
                id: existingUser._id.toString(),
                name: existingUser.name,
                phone: existingUser.phone
            }
        });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        errorHandler(res, error);
    }
};

function generateToken(userId: string, phone: string): string {
    return jwt.sign({ userId, phone }, jwtSecret, { expiresIn: "1h" });
}

async function sendOtp(phone: string) {
    return twilioClient.verify.v2.services(twilioServiceSID).verifications.create({
        to: phone,
        channel: 'sms',
    });
}

async function checkOtp(phone: string, code: string) {
    return twilioClient.verify.v2.services(twilioServiceSID).verificationChecks.create({
        to: phone,
        code: code,
    });
}

export { registerUser, loginUser, verifyOtp };