import { useConversationStore } from '@/entities/message/model'
import { Form, Input } from 'antd'

type FieldType = {
	text: string
}

const InputMessageBar = () => {
	const { uploadedMedia, uploadedGif } = useConversationStore()

	return (
		<div className='w-full'>
			<Form.Item<FieldType>
				name='text'
				rules={[
					{
						required: uploadedMedia.length < 1 && uploadedGif.length < 1,
						message: 'Text or image field is required.',
						validateTrigger: 'onSubmit',
						whitespace: true,
					},
				]}
			>
				<Input
					variant='borderless'
					className='h-10 p-2'
					placeholder={'Message...'}
				/>
			</Form.Item>
		</div>
	)
}

export default InputMessageBar
