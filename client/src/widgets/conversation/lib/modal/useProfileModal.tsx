import { useConversationStore } from '@/entities/message/model'

export const useProfileModal = () => {
	const { isModalOpen, setIsModalOpen } = useConversationStore()

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return { isModalOpen, setIsModalOpen, handleCancel, handleOk, showModal }
}
