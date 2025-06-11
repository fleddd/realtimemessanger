import { useConversationStore } from '@/entities/message/model'
import useDeleteMessages from '@/features/message/useDeleteMessages'
import { useParams } from 'react-router'

export const useDeleteModal = () => {
	const { id: receiverId } = useParams()
	const { mutateAsync } = useDeleteMessages(receiverId!)
	const {
		selectedMessages,
		isDeleteModalOpen,
		setIsDeleteModalOpen,
		clearSelectedMessages,
		setMode,
	} = useConversationStore()

	const showModal = () => {
		setIsDeleteModalOpen(true)
	}

	const handleOk = async () => {
		await mutateAsync({ messagesId: selectedMessages, receiverId: receiverId! })
		clearSelectedMessages()
		setMode('typing')
		setIsDeleteModalOpen(false)
	}

	const handleCancel = () => {
		setIsDeleteModalOpen(false)
		clearSelectedMessages()
	}

	return {
		isDeleteModalOpen,
		setIsDeleteModalOpen,
		handleCancel,
		handleOk,
		showModal,
	}
}
