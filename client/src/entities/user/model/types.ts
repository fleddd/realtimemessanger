export type UserDto = {
	_id: string
	email: string
	fullName: string
	profilePic: string
	lastSeenTime: string
	lastTimeUpdatedUsername: string
	username: string
}

export type RegisterRequest = {
	email: string
	password: string
	fullName: string
}

export type LoginRequest = {
	email: string
	password: string
}
