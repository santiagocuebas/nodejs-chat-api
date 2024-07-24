import { Schema, model } from 'mongoose';
import { IUser } from '../global.js';

const userSchema = new Schema<IUser>({
	email: { type: String, allowNull: false, unique: true },
	username: String,
	password: String
}, {
	timestamps: { createdAt: true, updatedAt: false },
	toObject: { virtuals: true }
});

export const User = model<IUser>('User', userSchema);
