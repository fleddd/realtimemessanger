import { useConversationStore } from '@/entities/message/model'
import { useEditMessage } from '@/features/message'
import { EditOutlined, StopOutlined } from '@ant-design/icons'
import { Button, Form, FormProps, Input, Space } from 'antd'
import { useParams } from 'react-router'
type FieldType = {
	text: string
}

const EditingBar = () => {
	const { editMessage, setMode, setEditMessage, clearSelectedMessages } =
		useConversationStore()
	const { mutateAsync, isPending } = useEditMessage()
	const { id } = useParams()

	const onCancel = () => {
		clearSelectedMessages()
		setMode('typing')
		setEditMessage(undefined, undefined)
	}
	const onEdit: FormProps<FieldType>['onFinish'] = async values => {
		await mutateAsync({
			messageId: editMessage.id!,
			newText: values.text,
			receiverId: id!,
		}).then(() => {
			setMode('typing')
			clearSelectedMessages()
		})
	}
	return (
		<Form<FieldType>
			name='edit'
			onFinish={onEdit}
			validateTrigger={['onSubmit']}
			initialValues={{
				text: editMessage?.message,
			}}
		>
			<Space.Compact
				size='large'
				className='w-full flex justify-center max-h-[40px]'
			>
				<div className='w-full'>
					<Form.Item<FieldType> name='text'>
						<Input className='w-full' placeholder={'Message...'} />
					</Form.Item>
				</div>
				<Button onClick={onCancel}>
					<StopOutlined />
				</Button>
				<Form.Item<FieldType> label={null}>
					<Button loading={isPending} type='default' htmlType='submit'>
						<EditOutlined />
					</Button>
				</Form.Item>
			</Space.Compact>
		</Form>
	)
}

export default EditingBar
