import express from 'express';
import { registerUser, loginUser, verifyOtp } from '../controllers/authController';
import { validateRegistration, validateLogin, validateOtpVerfication } from '../middleware/validationMiddleware';

const Router = express.Router();

Router.post('/register', validateRegistration, registerUser);
Router.post('/login', validateLogin, loginUser);
Router.post('/verify', validateOtpVerfication, verifyOtp);

export default Router;