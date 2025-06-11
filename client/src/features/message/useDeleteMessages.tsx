import { deleteMessages } from '@/entities/message/api'
import {
	ConversationType,
	useConversationStore,
} from '@/entities/message/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteMessages = (receiverId: string) => {
	const queryClient = useQueryClient()
	const { selectedMessages } = useConversationStore()

	return useMutation({
		mutationKey: ['deleteMessages'],
		mutationFn: deleteMessages,
		onSuccess: () => {
			queryClient.setQueryData(
				['currentChatMessages', receiverId],
				(oldData: ConversationType) => {
					const filteredMessages = oldData.messages.filter(
						message => !selectedMessages.includes(message._id)
					)

					return {
						...oldData,
						messages: filteredMessages.length > 0 ? [...filteredMessages] : [],
					}
				}
			)
		},
	})
}

export default useDeleteMessages
