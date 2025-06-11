import { getChats } from '@/entities/message/api'
import { ResponseChatsType } from '@/entities/message/model'
import { useQuery } from '@tanstack/react-query'

const useChats = (search: string = '', page: number = 1) => {
	return useQuery<ResponseChatsType>({
		queryKey: ['chats', search, page],
		queryFn: () => getChats(search, page),
		meta: {
			errorMessage: "Couldn't fetch chats for this user.",
		},
	})
}

export default useChats
