import { useCurrentChatMessagesContext } from '@/entities/message/model'
import { Modal as ProfileModal } from 'antd'
import { useProfileModal } from '../../lib/modal/useProfileModal'
import Info from './Info'
import Media from './Media'
const Modal = () => {
	const { isModalOpen, handleCancel, handleOk } = useProfileModal()
	const chat = useCurrentChatMessagesContext()
	const userInfo = chat!.userInfo
	return (
		<ProfileModal
			title={'User info'}
			open={isModalOpen}
			onCancel={handleCancel}
			onClose={handleOk}
			onOk={handleOk}
			footer={null}
			centered
		>
			<div className='py-5 flex flex-col gap-5'>
				<Info userInfo={userInfo} />
				<Media userInfo={userInfo} />
			</div>
		</ProfileModal>
	)
}

export default Modal
