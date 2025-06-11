import { useConversationStore } from '@/entities/message/model/conversation.store'
import { FileType, getBase64 } from '@/shared/lib/media'
import { UploadFile } from 'antd'

export const usePinMedia = (fileList: UploadFile[]) => {
	const { uploadedMedia, setUploadedMedia } = useConversationStore()

	const uploadMedia = () => {
		const images = fileList.map(async file => {
			return await getBase64(file.originFileObj as FileType)
		})
		Promise.all(images).then(values => {
			setUploadedMedia(values)
		})
	}

	const resetMedia = () => {
		setUploadedMedia([])
	}

	return { uploadMedia, resetMedia, uploadedMedia }
}
