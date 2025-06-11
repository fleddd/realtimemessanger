import {
	RequestDeleteMessages,
	RequestEditMessages,
	RequestSendMessage,
} from '../model/types'

export const getChats = async (search: string = '', page: number = 1) => {
	const endpoint = search ? `chats?search=${search}&page=${page}` : 'chats'
	const res = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
		method: 'GET',
		credentials: 'include',
	})

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage)
	}

	return await res.json()
}

export const deleteChat = async (chatsId: string[]) => {
	const res = await fetch(import.meta.env.VITE_BASE_URL + 'chats', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ chatsId: chatsId }),
	})

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage)
	}

	return await res.json()
}

export const getCurrentChatMessages = async (id: string) => {
	const res = await fetch(import.meta.env.VITE_BASE_URL + 'messages/' + id, {
		method: 'GET',
		credentials: 'include',
	})
	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage)
	}

	return await res.json()
}

export const sendMessage = async ({
	text,
	media,
	receiverId,
	mediaType,
}: RequestSendMessage) => {
	const res = await fetch(
		import.meta.env.VITE_BASE_URL + 'messages/send/' + receiverId,
		{
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: text, media: media, mediaType: mediaType }),
		}
	)
	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage)
	}

	return await res.json()
}

export const deleteMessages = async ({
	messagesId,
	receiverId,
}: RequestDeleteMessages) => {
	const res = await fetch(import.meta.env.VITE_BASE_URL + 'messages', {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ messagesId, receiverId }),
	})
	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage)
	}

	return await res.json()
}

export const editMessage = async ({
	messageId,
	newText,
	receiverId,
}: RequestEditMessages) => {
	const res = await fetch(import.meta.env.VITE_BASE_URL + 'messages', {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			messageId,
			receiverId,
			newText,
		}),
	})
	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage)
	}

	return await res.json()
}

export const markMessageAsSeen = async (messageId: string) => {
	const res = await fetch(import.meta.env.VITE_BASE_URL + 'messages/mark', {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			messageId,
		}),
	})
	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage)
	}

	return await res.json()
}
