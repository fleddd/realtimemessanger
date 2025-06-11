import { useConversationStore } from '@/entities/message/model/conversation.store'
import { FormInstance } from 'antd'
import { TenorImage } from 'gif-picker-react'
import { Dispatch, SetStateAction } from 'react'

export const useSendGif = (
	form: FormInstance,

	setIsOpened: Dispatch<SetStateAction<boolean>>
) => {
	const { setUploadedGif } = useConversationStore()

	const sendGif = (selectedItem: TenorImage) => {
		const gif = selectedItem.url
		setUploadedGif([gif])
		form.submit()
		setIsOpened(false)
	}

	return [sendGif]
}
