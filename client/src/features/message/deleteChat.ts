import { deleteChat } from '@/entities/message/api'
import { toast } from 'react-toastify'

export const deleteUserChat = (chatsId: string[]) => {
	toast.promise(deleteChat(chatsId), {
		pending: 'Loading...',
		success: 'You deleted chat!',
		error: {
			render({
				data,
			}: {
				data: {
					errorMsg: string
				}
			}) {
				return `${data.errorMsg}`
			},
		},
	})
}
