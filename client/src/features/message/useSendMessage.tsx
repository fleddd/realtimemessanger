import { sendMessage } from '@/entities/message/api'
import { useUserStore } from '@/entities/user/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Message, ResponseChatsType } from '../../entities/message/model/types'
import { UserDto } from '../../entities/user/model/types'
type ResType = {
	messages: Message[]
	userInfo: UserDto
}
const useSendMessage = () => {
	const queryClient = useQueryClient()
	const { page, search } = useUserStore()
	return useMutation({
		mutationKey: ['currentChatMessages'],
		mutationFn: sendMessage,
		onSuccess: newMessage => {
			queryClient.setQueryData(
				['currentChatMessages', newMessage.receiverId],
				(oldData: ResType) => ({
					...oldData,
					messages: [newMessage, ...oldData.messages],
				})
			)
			queryClient.setQueryData(
				['chats', search, page],
				(oldData: ResponseChatsType) => {
					if (!oldData) return

					const chatExists = oldData.users.some(
						chat => chat._id === newMessage.receiverId
					)

					if (!chatExists) {
						return {
							totalCount: oldData.totalCount + 1,
							users: [
								{
									_id: newMessage.receiverId,
									fullName: newMessage.receiverFullName,
									lastMessage: newMessage.text,
									lastMessageTime: newMessage.createdAt,
								},
								...oldData.users,
							],
						}
					}

					const updatedChats = [
						{
							...oldData.users.find(chat => chat._id === newMessage.receiverId),
							lastMessage: newMessage.text,
							lastMessageTime: newMessage.createdAt,
						},
						...oldData.users.filter(chat => chat._id !== newMessage.receiverId),
					]

					return { totalCount: oldData.totalCount, users: updatedChats }
				}
			)
		},
	})
}

export default useSendMessage
