import { useConversationStore } from '@/entities/message/model'
import { Modal } from 'antd'
import { useDeleteModal } from '../../lib'
const DeleteMessagesModal = () => {
	const { isDeleteModalOpen, handleCancel, handleOk } = useDeleteModal()
	const { selectedMessages } = useConversationStore()

	return (
		<Modal
			title={`Delete ${selectedMessages.length} messages?`}
			width={300}
			open={isDeleteModalOpen}
			onCancel={handleCancel}
			onClose={handleOk}
			onOk={handleOk}
			centered
		></Modal>
	)
}

export default DeleteMessagesModal
