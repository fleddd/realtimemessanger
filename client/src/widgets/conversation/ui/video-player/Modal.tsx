import { Modal as PlayerModal } from 'antd'
import { usePlayerModal, usePlayerStore } from '../../lib'
import VideoPlayer from './VideoPlayer'
const Modal = () => {
	const { isModalOpen } = usePlayerStore()
	const { handleCancel } = usePlayerModal()
	return (
		<PlayerModal
			zIndex={3000}
			width={800}
			title={'Video Player'}
			open={isModalOpen}
			onCancel={handleCancel}
			onClose={handleCancel}
			footer={null}
			centered
			className=' custom-transparent-modal bg-transparent shadow-none'
		>
			<VideoPlayer />
		</PlayerModal>
	)
}

export default Modal
