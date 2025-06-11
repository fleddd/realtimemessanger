import mongoose from 'mongoose'

export type MessageDto = {
	isSeen: Boolean
	senderId: mongoose.Types.ObjectId
	receiverId: mongoose.Types.ObjectId
	_id: mongoose.Types.ObjectId
	createdAt: Date
	text?: string | null
	media?:
		| {
				url: string
				type: string
		  }[]
		| null
	mediaType: 'text' | 'media' | 'gif'
	isEdited: boolean
}
