import { PassportStatic } from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User, { IUser } from "../models/User";
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret: string = process.env.JWT_SECRET as string;

if (!jwtSecret) {
    console.error("[JWT] : Secret is not defined. Set JWT_SECRET in environment variables.");
    process.exit(1);
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};

export default (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(options, async (payload: any, done: any) => {
            try {
                const user: IUser | null = await User.findById(payload.userId);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                return done(error, false);
            }
        })
    );
};
