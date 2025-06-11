import { useConversationStore } from '@/entities/message/model'
import { useSendMessage } from '@/features/message'
import { AdditionalTab, PinMedia } from '@/widgets/conversation'
import { SendOutlined } from '@ant-design/icons'
import { Button, Form, FormProps, Space } from 'antd'
import { useParams } from 'react-router'
import InputMessageBar from './InputMessageBar'

type FieldType = {
	text: string
}

const SendMessageBar = () => {
	const { uploadedMedia, uploadedGif, setUploadedMedia, setUploadedGif } =
		useConversationStore()
	const [form] = Form.useForm()

	const { id: receiverId } = useParams()

	const { mutateAsync, isPending } = useSendMessage()

	const onMessageSendClick: FormProps<FieldType>['onFinish'] = async value => {
		const media = uploadedGif.length > 0 ? uploadedGif : uploadedMedia
		const mediaType = uploadedGif.length > 0 ? 'gif' : 'media'

		await mutateAsync({
			text: value?.text,
			receiverId: receiverId!,
			media: media,
			mediaType: media.length > 0 ? mediaType : 'text',
		})
		setUploadedMedia([])
		setUploadedGif([])
		form.resetFields()
	}

	return (
		<Form
			form={form}
			name='messages'
			onFinish={onMessageSendClick}
			validateTrigger={['onSubmit']}
		>
			<Space.Compact className='w-full max-h-[40px]'>
				<PinMedia />
				<InputMessageBar />
				<AdditionalTab form={form} />
				<Form.Item<FieldType> label={null}>
					<Button
						loading={isPending}
						type='text'
						className='min-h-10 sm:block'
						htmlType='submit'
					>
						<SendOutlined />
					</Button>
				</Form.Item>
			</Space.Compact>
		</Form>
	)
}
export default SendMessageBar
