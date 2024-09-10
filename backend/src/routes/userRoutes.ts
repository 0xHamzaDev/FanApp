import express from "express";
import passport from 'passport';
import { checkUser, getUserData } from "../controllers/userController";
import authenticateToken from "../middleware/authMiddleware";

const Router = express.Router();

Router.post("/check-user", checkUser);
Router.post("/get-user-data", getUserData)

export default Router;