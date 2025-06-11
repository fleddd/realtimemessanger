import { updateFullName } from '@/entities/user/api'
import { toast } from 'react-toastify'

export const updateUserFullName = (fullName: string) => {
	toast.promise(updateFullName(fullName), {
		pending: 'Loading...',
		success: 'You successfully updated full name!',
		error: {
			render({ data }) {
				return `${data}`
			},
		},
	})
}
