import mongoose, { Document, Schema, Types } from "mongoose";

interface INotification extends Document {
    title: string;
    message: string;
    createdAt: Date;
    sentAt: Date;
    _id: Types.ObjectId;
}

const notificationSchema: Schema<INotification> = new mongoose.Schema({
    title: { type: String, required: true, },
    message: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now, },
    sentAt: { type: Date, default: Date.now, }
}, {
    timestamps: true,
});

const Notification = mongoose.model<INotification>("Notification", notificationSchema);

export default Notification;
export type { INotification };
