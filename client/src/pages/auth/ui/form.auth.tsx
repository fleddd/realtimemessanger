import { useAuth } from '@/features/auth'
import { AutocompleteEmail } from '@/widgets/autocompleteEmail'
import { Button, Form, FormProps, Input } from 'antd'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export type FieldType = {
	email: string
	password: string
	fullName: string
}

type FormAuth = {
	isLogining: boolean
}

const FormAuth = ({ isLogining }: FormAuth) => {
	const navigate = useNavigate()

	const { mutateAsync } = useAuth(isLogining)

	const onFinish: FormProps<FieldType>['onFinish'] = values => {
		const pendingMessage = isLogining
			? 'Logging in...'
			: 'Creating a new account...'

		toast
			.promise(mutateAsync(values), {
				pending: pendingMessage,
				success: 'Success!',
				error: {
					render({ data }) {
						return `${data}`
					},
				},
			})
			.then(() => {
				navigate('/home', { replace: true })
			})
	}

	return (
		<Form
			name='auth'
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 300, minWidth: 300 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			className='flex  justify-center  flex-col'
		>
			<Form.Item<FieldType>
				label='Email'
				name='email'
				rules={[
					{ required: true, message: 'Please input your email!' },
					{
						type: 'email',
						message: 'This is not valid email.',
					},
				]}
				hasFeedback
			>
				<AutocompleteEmail />
			</Form.Item>

			{!isLogining && (
				<Form.Item<FieldType>
					label='Full Name'
					name='fullName'
					rules={[
						{ required: true, message: 'Please input your full name!' },
						{ min: 3, message: 'This field must be at least 3 characters!' },
					]}
					hasFeedback
				>
					<Input placeholder='John John' />
				</Form.Item>
			)}

			<Form.Item<FieldType>
				label='Password'
				name='password'
				rules={[
					{ required: true, message: 'Please input your password!' },
					{ min: 6, message: 'Password must be at least 6 characters' },
				]}
				hasFeedback
			>
				<Input.Password placeholder='******' minLength={6} />
			</Form.Item>
			<Form.Item label={null}>
				<Button type='primary' size='large' htmlType='submit'>
					{isLogining ? 'Login' : 'Create a new account.'}
				</Button>
			</Form.Item>
		</Form>
	)
}

export default FormAuth
