import { useProfileStore } from './profile.store'

export const useModal = () => {
	const { isModalOpen, setIsModalOpen } = useProfileStore()

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return { isModalOpen, setIsModalOpen, handleCancel, showModal }
}
