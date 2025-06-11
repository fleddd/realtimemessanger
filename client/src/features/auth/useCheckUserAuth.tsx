import { checkAuth } from '@/entities/user/api'
import { useQuery } from '@tanstack/react-query'

const useCheckUserAuth = () => {
	return useQuery({
		queryKey: ['auth'],
		queryFn: checkAuth,
		meta: {
			errorMessage: 'Unauthorized. No authorization provided.',
		},
		staleTime: 60 * 1000,
		refetchInterval: 2 * 60 * 1000,
	})
}

export default useCheckUserAuth
