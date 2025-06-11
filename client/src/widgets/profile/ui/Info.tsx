import { AutocompleteEmail } from '@/widgets/autocompleteEmail'
import { Form, Input } from 'antd'
import { FieldType } from '../lib'

const Info = ({ isProfileTouched }: { isProfileTouched: boolean }) => {
	return (
		<div className='flex flex-col gap-2'>
			<Form.Item<FieldType>
				name='fullName'
				label={<span className='text-blue-600 font-semibold'>Full name</span>}
				rules={[
					{ required: true, message: "You can't leave full name field empty!" },
				]}
			>
				<Input
					min={3}
					maxLength={20}
					count={{
						max: 20,
					}}
					disabled={!isProfileTouched}
				/>
			</Form.Item>
			<Form.Item<FieldType>
				label={<span className='text-blue-600 font-semibold'>Email</span>}
				name='email'
				rules={[
					{ type: 'email', message: 'Please input valid email!' },
					{
						required: true,
						message: 'Please input a new email or discard changes!',
					},
					{
						min: 3,
						message: 'This field must be at least 3 characters!',
					},
				]}
			>
				<AutocompleteEmail disabled />
			</Form.Item>
		</div>
	)
}

export default Info
