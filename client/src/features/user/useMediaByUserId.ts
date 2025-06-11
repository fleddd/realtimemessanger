import { Message } from '@/entities/message/model'
import { getMediaById } from '@/entities/user/api'
import { useQuery } from '@tanstack/react-query'

type Response = {
	messagesWithMedia: Message[]
}

const useMediaByUserId = (id: string, mediaType: string) => {
	return useQuery<Response>({
		queryKey: ['mediaById', id, mediaType],
		queryFn: () => getMediaById(id, mediaType),
		meta: {
			errorMessage: "Couldn't fetch media for this user.",
		},
	})
}

export default useMediaByUserId
