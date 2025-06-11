import { useCurrentUserContext } from '@/entities/user/model'
import { updateUserFullName } from '@/features/user'
import { Form } from 'antd'
import { useState } from 'react'
import { FieldType } from '../lib'
import EditButton from './EditButton'
import Info from './Info'

const InfoForm = () => {
	const [form] = Form.useForm()
	const authUser = useCurrentUserContext()
	const [isProfileTouched, setIsProfileTouched] = useState<boolean>(false)

	const onSubmit = (values: FieldType) => {
		updateUserFullName(values.fullName)
		setIsProfileTouched(prev => !prev)
	}
	return (
		<Form
			layout='vertical'
			form={form}
			initialValues={{
				fullName: authUser?.fullName,
				email: authUser?.email,
			}}
			onFinish={onSubmit}
			requiredMark={'optional'}
			className='flex justify-center items-center'
			autoComplete='off'
		>
			<div className='grow'>
				<Info isProfileTouched={isProfileTouched} />
				<EditButton
					isProfileTouched={isProfileTouched}
					setIsProfileTouched={setIsProfileTouched}
					form={form}
				/>
			</div>
		</Form>
	)
}

export default InfoForm
