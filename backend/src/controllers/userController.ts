import { Request, Response } from "express";
import User from "../models/User";

export const checkUser = async (req: Request, res: Response) => {
    const { phone } = req.body;

    try {
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ isActivated: user.isActivated });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while checking the user" });
    }
};

export const getUserData = async (req: Request, res: Response) => {
    const  { id } = req.body;

    try {
        const user = await User.findOne({ id: id });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ data: user });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while checking the user" });
    }
};