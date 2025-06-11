import mongoose from 'mongoose'

const MediaSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ['image', 'video', 'gif'],
		required: true,
	},
})

const messageSchema = new mongoose.Schema(
	{
		senderFullName: {
			type: String,
		},
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		text: {
			type: String,
		},
		media: {
			type: [MediaSchema],
		},
		mediaType: {
			type: String,
			enum: ['text', 'media', 'gif'],
			required: true,
		},
		isEdited: {
			type: Boolean,
		},
		isSeen: {
			type: Boolean,
		},
	},
	{ timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

export default Message
