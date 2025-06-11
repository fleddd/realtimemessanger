import { getCurrentChatMessages } from '@/entities/message/api'
import { Message } from '@/entities/message/model'
import { UserDto } from '@/entities/user/model'
import { useQuery } from '@tanstack/react-query'

type ResType = {
	messages: Message[]
	userInfo: UserDto
}

const useCurrentChatMessages = (id: string) => {
	return useQuery<ResType>({
		queryKey: ['currentChatMessages', id],
		queryFn: () => getCurrentChatMessages(id),
		meta: {
			errorMessage: "Couldn't fetch chats for this user.",
		},
	})
}

export default useCurrentChatMessages
