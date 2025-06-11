import { editMessage } from '@/entities/message/api'
import { useConversationStore } from '@/entities/message/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Message } from '../../entities/message/model/types'
import { UserDto } from '../../entities/user/model/types'
type ResType = {
	messages: Message[]
	userInfo: UserDto
}
const useEditMessage = () => {
	const queryClient = useQueryClient()
	const { editMessage: editedMessage } = useConversationStore()
	return useMutation({
		mutationKey: ['currentChatMessages'],
		mutationFn: editMessage,
		onSuccess: (newMessage: Message) => {
			queryClient.setQueryData(
				['currentChatMessages', newMessage.receiverId],
				(oldData: ResType) => {
					const updatedMessages = oldData.messages.map(message => {
						if (message._id === editedMessage.id) {
							return newMessage
						} else return message
					})
					return {
						...oldData,
						messages: updatedMessages,
					}
				}
			)
		},
	})
}

export default useEditMessage
