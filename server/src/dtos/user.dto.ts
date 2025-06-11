import mongoose from 'mongoose'

export type UserDto = {
	email: string
	fullName: string
	profilePic: string
	username: string
	lastTimeUpdatedUsername: string
	lastSeenTime: string
	_id: mongoose.Types.ObjectId
}
