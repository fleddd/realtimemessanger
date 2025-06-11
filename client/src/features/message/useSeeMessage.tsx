import { editMessage } from '@/entities/message/api'
import { useMutation } from '@tanstack/react-query'

const useSeeMessage = () => {
	return useMutation({
		mutationKey: ['seenMessage'],
		mutationFn: editMessage,
	})
}

export default useSeeMessage
