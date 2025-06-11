import {
	ConversationType,
	Message,
	ResponseChatsType,
} from '@/entities/message/model/types'
import { QueryClient } from '@tanstack/react-query'
import { io, Socket } from 'socket.io-client'
import { create } from 'zustand'

type Store = {
	lastSeenTime: string
	search: string
	page: number
	onlineUsers: string[]
	mySocket: Socket | null
	setSearch: (search: string) => void
	setPage: (page: number) => void
	setMySocket: (socket: Socket) => void
	connectUser: (userId: string, queryClient: QueryClient) => void
	disconnectUser: () => void
	subscribeToNewMessages: (queryClient: QueryClient) => void
	subscribeToDeleteMessage: (queryClient: QueryClient) => void
	unSubscribeToDeleteMessage: () => void
	subscribeToChatsNotification: (queryClient: QueryClient) => void
	unSubscribeToNewMessages: () => void
	unSubscribeToChatsNotification: () => void
}

export const useUserStore = create<Store>()((set, get) => ({
	lastSeenTime: '',
	search: '',
	page: 1,
	onlineUsers: [],
	mySocket: null,
	setSearch: (search: string) => set(() => ({ search: search })),
	setPage: (page: number) => set(() => ({ page: page })),
	setMySocket: (socket: Socket) => set(() => ({ mySocket: socket })),
	connectUser: (userId: string, queryClient: QueryClient) => {
		const socket = io(import.meta.env.VITE_SOCKET_URL, {
			query: {
				userId: userId,
			},
			autoConnect: false,
		})
		socket.connect()

		set({ mySocket: socket })

		socket.on('usersCount', (userIds, lastSeenTime, leftUserId) => {
			//updating lastSeenTime when user disconnects
			if (leftUserId) {
				queryClient.setQueryData(
					['currentChatMessages', leftUserId],
					(oldData: ConversationType) => {
						return {
							...oldData,
							userInfo: { ...oldData.userInfo, lastSeenTime: lastSeenTime },
						}
					}
				)
			}
			set({ onlineUsers: userIds })
		})
	},
	disconnectUser: () => {
		get().mySocket?.disconnect()
	},

	subscribeToNewMessages: (queryClient: QueryClient) => {
		const socket = get().mySocket

		socket?.on('newMessage', (newMessage: Message) => {
			queryClient.setQueryData(
				['currentChatMessages', newMessage.senderId],
				(oldData?: ConversationType) => {
					if (!oldData) {
						return {
							messages: [newMessage],
						}
					}

					return {
						...oldData,
						messages: [newMessage, ...oldData.messages],
					}
				}
			)
		})
	},
	subscribeToChatsNotification: (queryClient: QueryClient) => {
		const socket = get().mySocket

		socket?.on('newMessage', (newMessage: Message) => {
			const { search, page } = get()

			queryClient.setQueryData(
				['chats', search, page],
				(oldData: ResponseChatsType) => {
					const chatExists = oldData.users.some(
						chat => chat._id === newMessage.senderId
					)

					if (!chatExists) {
						return {
							totalCount: oldData.totalCount,
							users: [
								{
									_id: newMessage.senderId,
									fullName: newMessage.senderFullName,
									lastMessage: newMessage.text,
									lastMessageTime: newMessage.createdAt,
								},
								...oldData.users,
							],
						}
					}

					const updatedChats = oldData.users
						.map(chat => {
							if (chat._id === newMessage.senderId) {
								return {
									...chat,
									fullName: newMessage.senderFullName,
									lastMessage: newMessage.text,
									lastMessageTime: newMessage.createdAt,
								}
							}
							return chat
						})
						.sort(a => (a._id === newMessage.senderId ? -1 : 0))

					return { totalCount: oldData.totalCount, users: updatedChats }
				}
			)
		})
	},
	subscribeToDeleteMessage: (queryClient: QueryClient) => {
		const socket = get().mySocket
		socket?.on('deleteMessage', (receiverId: string, messagesId: string[]) => {
			queryClient.setQueryData(
				['currentChatMessages', receiverId],
				(oldData: ConversationType) => {
					const filteredMessages = oldData.messages.filter(
						message => !messagesId.includes(message._id)
					)

					return {
						...oldData,
						messages: filteredMessages.length > 0 ? [...filteredMessages] : [],
					}
				}
			)
			queryClient.invalidateQueries({ queryKey: ['chats'] })
		})
	},
	unSubscribeToDeleteMessage: () => {
		const socket = get().mySocket
		socket?.off('deleteMessage')
	},
	unSubscribeToChatsNotification: () => {
		const socket = get().mySocket
		socket?.off('newMessage')
	},
	unSubscribeToNewMessages: () => {
		const socket = get().mySocket
		socket?.off('newMessage')
	},
}))
