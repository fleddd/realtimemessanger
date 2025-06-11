import { updateUsername } from '@/entities/user/api'
import { toast } from 'react-toastify'

export const updateUserUsername = (username: string) => {
	toast.promise(updateUsername(username), {
		pending: 'Loading...',
		success: 'You successfully updated full name!',
		error: {
			render({ data }) {
				return `${data}`
			},
		},
	})
}
