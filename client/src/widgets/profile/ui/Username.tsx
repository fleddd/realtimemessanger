import { useCurrentUserContext } from '@/entities/user/model'
import { updateUserUsername } from '@/features/user'
import { SettingOutlined } from '@ant-design/icons'
import { Button, Form, FormProps, Input, Space } from 'antd'
import { useModal } from '../lib/useModal'
import UsernameModal from './UsernameModal'

type FieldType = {
	username: string
}
const Username = () => {
	const authUser = useCurrentUserContext()
	const [form] = Form.useForm()
	const { showModal } = useModal()

	const onSubmit: FormProps<FieldType>['onFinish'] = (value: FieldType) => {
		updateUserUsername(value.username)
	}
	return (
		<Form
			form={form}
			onFinish={onSubmit}
			layout='vertical'
			initialValues={{
				username: authUser?.username || 'user',
			}}
		>
			<p className='text-blue-600 font-semibold pb-1'>Username</p>
			<Space.Compact>
				<Form.Item
					name='username'
					rules={[
						{
							required: true,
							message: "You can't leave full name field empty!",
						},
					]}
				>
					<Input disabled />
				</Form.Item>
				<Form.Item label={null}>
					<Button onClick={showModal}>
						<SettingOutlined />
					</Button>
				</Form.Item>
			</Space.Compact>
			<UsernameModal form={form} />
		</Form>
	)
}

export default Username
