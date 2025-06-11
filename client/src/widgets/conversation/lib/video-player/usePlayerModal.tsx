import { usePlayerStore } from './player.store'

export const usePlayerModal = () => {
	const { isModalOpen, setIsModalOpen, setSrc } = usePlayerStore()

	const showModal = (src: string) => {
		setSrc(src)
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setSrc('')
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setSrc('')
		setIsModalOpen(false)
	}

	return { isModalOpen, setIsModalOpen, handleCancel, handleOk, showModal }
}
