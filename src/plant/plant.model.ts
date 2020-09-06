import mongoose, { Document, Schema } from 'mongoose';
import Plant from './plant.interface';

const plantSchema = new Schema({
	name: {
		required: true,
		type: String,
		trim: true
	},
	category: {
		required: true,
		type: String,
		trim: true
	},
	price: {
		required: true,
		type: Number,
	},
	description: {
		type: String,
		trim: true
	},
	avatar: {
		required: true,
		type: String,
		trim: true
	},
	userId: {
		required: true,
		type: Schema.Types.ObjectId
	},
	date: { 
		type: Date,
		default: Date.now
	}
});

const plantModel = mongoose.model<Plant & Document> ('Plant', plantSchema);

export default plantModel;