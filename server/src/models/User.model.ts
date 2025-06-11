import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		profilePic: {
			type: String,
			default: '',
		},
		lastSeenTime: {
			type: Date,
			default: '',
		},
		lastTimeUpdatedUsername: {
			type: Date,
			default: '',
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
