import mongoose, { Schema, Document } from 'mongoose';
import User from './user.interface';

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		lowercase: true,
		minlength: 4,
		maxlength: 10,
	},
	email: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['admin', 'client'],
		required: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now
	}
});


const userModel = mongoose.model< User & Document>('User', userSchema);

export default userModel;

