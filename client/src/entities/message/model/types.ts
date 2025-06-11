import { UserDto } from '../../user/model/types'

export type Chat = {
	_id: string
	email: string
	fullName: string
	profilePic: string
	createdAt: string
	updatedAt: string
	__v: number
	lastMessage: string
	lastMessageTime: string
}
export type Message = {
	text: string
	media: {
		url: string
		type: string
	}[]
	mediaType: 'text' | 'media' | 'gif'
	senderId: string
	receiverId: string
	createdAt: string
	senderFullName?: string
	_id: string
	isEdited: boolean
	isSeen: boolean
}
export type RequestSendMessage = {
	text?: string
	media?: string[]
	receiverId: string
	mediaType: 'media' | 'gif' | 'text'
}

export type ConversationInfo = {
	user: {
		email: string
		fullName: string
		profilePic: string
	}
}

export type ConversationType = {
	messages: Message[]
	userInfo: UserDto
}

export type ResponseChatsType = {
	users: Chat[] & UserDto[]
	totalCount: number
}

export type RequestDeleteMessages = {
	messagesId: string[]
	receiverId: string
}
export type RequestEditMessages = {
	messageId: string
	receiverId: string
	newText: string
}
