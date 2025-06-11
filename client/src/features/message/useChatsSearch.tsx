import { getChats } from '@/entities/message/api'
import { useQuery } from '@tanstack/react-query'
import { UserDto } from '../../entities/user/model/types'

const useChatsSearch = (search: string = '', page: number = 1) => {
	return useQuery<UserDto[]>({
		queryKey: ['search'],
		queryFn: () => getChats(search, page),
	})
}

export default useChatsSearch
