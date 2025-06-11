import { updateProfilePicture } from '@/entities/user/api'
import { QueryClient } from '@tanstack/react-query'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { toast } from 'react-toastify'

export const updateUserPicture = (
	options: UploadRequestOption,
	queryClient: QueryClient
) => {
	const { file, onSuccess, onError } = options
	const reader = new FileReader()

	reader.readAsDataURL(file as Blob)

	reader.onload = async () => {
		const base64Image = reader.result as string
		if (!base64Image) throw new Error('Error converting file to base64')

		const base64SizeInBytes = (base64Image.length * 3) / 4 - 2

		const maxFileSize = 5 * 1024 * 1024
		if (base64SizeInBytes > maxFileSize) {
			toast.error('Image size is too big. The maximum allowed size is 5 mb.')
			onError?.(new Error('Too big image.'))
			return
		}

		toast
			.promise(updateProfilePicture(base64Image), {
				pending: 'Loading...',
				success: 'Success!',
				error: {
					render({ data }) {
						return `${data}`
					},
				},
			})
			.then(() => {
				queryClient.invalidateQueries({ queryKey: ['auth'] })
				onSuccess?.({ status: 'done' })
			})
			.catch(() => onError?.(new Error('Upload failed')))
	}
}
