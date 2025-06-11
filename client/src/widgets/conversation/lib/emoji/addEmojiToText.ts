import { FormInstance } from 'antd'
import { EmojiClickData } from 'emoji-picker-react'

export const AddEmojiToText = (
	selectedItem: EmojiClickData,
	form: FormInstance
) => {
	const emoji = selectedItem.emoji
	const prevText = form.getFieldValue('text')
	const newText = prevText ? prevText + emoji : emoji
	form.setFieldValue('text', newText)
}
