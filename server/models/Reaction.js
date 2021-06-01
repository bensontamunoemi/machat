const mongoose = require('mongoose');

const { ObjectId } = mongoose;

const reactionSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		messageId: {
			type: ObjectId,
			ref: 'Message',
			required: true,
		},
		userId: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Reaction', reactionSchema);
