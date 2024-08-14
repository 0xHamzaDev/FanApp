import mongoose, { Document, Schema, Types } from "mongoose";

interface IUser extends Document {
    name: string;
    phone: string;
    password: string;
    isActivated: boolean;
    _id: Types.ObjectId;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    isActivated: { type: Boolean, default: false },
}, {
    timestamps: true,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
export type { IUser };
