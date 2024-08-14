import express from "express";
import { checkUser } from "../controllers/userController";

const Router = express.Router();

Router.post("/check-user", checkUser);

export default Router;