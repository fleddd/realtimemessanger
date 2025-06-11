import { login, register } from '@/entities/user/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useAuth = (isLoginMode: boolean) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: isLoginMode ? login : register,
		onSuccess: data => {
			queryClient.setQueryData(['auth'], data)
		},
	})
}

export default useAuth
