import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from 'joi';

const registrationSchema: ObjectSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().required().pattern(/^\+?[0-9]+$/).messages({
        'string.pattern.base': 'Phone number is invalid',
    }),
});

const loginSchema: ObjectSchema = Joi.object({
    phone: Joi.string().required().pattern(/^\+?[0-9]+$/).messages({
        'string.pattern.base': 'Phone number is invalid',
    }),
});

const verifyOtpSchema: ObjectSchema = Joi.object({
    phone: Joi.string().required().pattern(/^\+?[0-9]+$/).messages({
        'string.pattern.base': 'Phone number is invalid',
    }),
    otp: Joi.string().required().length(6).required(),
});

function validateRegistration(req: Request, res: Response, next: NextFunction) {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

function validateLogin(req: Request, res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

function validateOtpVerfication(req: Request, res: Response, next: NextFunction) {
    const { error } = verifyOtpSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

export { validateRegistration, validateLogin, validateOtpVerfication };