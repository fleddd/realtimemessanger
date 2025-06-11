import { useCurrentUserContext } from '@/entities/user/model'
import { formatDateForConversation } from '@/shared/lib/date'
import { Button, Form, FormInstance, Input, Modal, Space } from 'antd'
import { useProfileStore } from '../lib/profile.store'
import { useModal } from '../lib/useModal'

const UsernameModal = ({ form }: { form: FormInstance }) => {
	const { isModalOpen } = useProfileStore()
	const { handleCancel } = useModal()
	const authUser = useCurrentUserContext()

	const lastTimeChangedUsername = authUser!.lastTimeUpdatedUsername
		? formatDateForConversation(authUser!.lastTimeUpdatedUsername)
		: ''

	return (
		<Modal
			open={isModalOpen}
			onCancel={handleCancel}
			onClose={handleCancel}
			footer={null}
			centered
		>
			<div className='w-full h-full min-h-40 flex justify-center items-center flex-col'>
				<Space.Compact className='flex'>
					<Form.Item
						name='username'
						rules={[
							{
								required: true,
								message: "You can't leave full name field empty!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button onClick={() => form.submit()} htmlType='submit'>
							Update
						</Button>
					</Form.Item>
				</Space.Compact>
				{lastTimeChangedUsername && (
					<p className='text-gray-400 '>
						Last time username was changed: {lastTimeChangedUsername}
					</p>
				)}
			</div>
		</Modal>
	)
}

export default UsernameModal
