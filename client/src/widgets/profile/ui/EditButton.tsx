import { useCurrentUserContext } from '@/entities/user/model'
import { Button, Form, FormInstance, Space } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const EditButton = ({
	isProfileTouched,
	setIsProfileTouched,
	form,
}: {
	isProfileTouched: boolean
	setIsProfileTouched: Dispatch<SetStateAction<boolean>>
	form: FormInstance
}) => {
	const user = useCurrentUserContext()
	const fullNameField = Form.useWatch('fullName', form)
	const [isFieldTouched, setIsFieldTouched] = useState(false)
	const onReset = () => {
		form.resetFields()
		setIsProfileTouched(false)
	}

	useEffect(() => {
		if (fullNameField != user?.fullName) {
			return setIsFieldTouched(true)
		}
		setIsFieldTouched(false)
	}, [fullNameField])

	return (
		<div className='flex items-center justify-center gap-2'>
			{!isProfileTouched ? (
				<Button
					htmlType='button'
					onClick={() => setIsProfileTouched(prev => !prev)}
				>
					Edit
				</Button>
			) : (
				<Space.Compact>
					<Button disabled={!isFieldTouched} type='primary' htmlType='submit'>
						Save changes
					</Button>

					<Button onClick={onReset}>Cancel</Button>
				</Space.Compact>
			)}
		</div>
	)
}

export default EditButton
