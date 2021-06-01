const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const MessageSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		from: {
			type: String,
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
		reaction: {
			type: ObjectId,
			ref: 'Reaction',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
