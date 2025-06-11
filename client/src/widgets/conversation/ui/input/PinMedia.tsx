import {
	PreviewGroupImagesComponent,
	useImagesPreview,
} from '@/shared/lib/media'
import { BadgeWithCount } from '@/shared/ui/badges'
import { InboxOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { useState } from 'react'
import { acceptedFormats } from '../../config/constants'
import { usePinMedia } from '../../lib'

const PinMedia = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const {
		fileList,
		setFileList,
		handleOnChange,
		handleGroupPreview,
		previewGroupImages,
		previewOpen,
		setPreviewGroupImages,
		setPreviewOpen,
	} = useImagesPreview()

	const { uploadedMedia, uploadMedia, resetMedia } = usePinMedia(fileList)

	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
		uploadMedia()
	}

	const handleCancel = () => {
		setIsModalOpen(false)
		setFileList([])
		resetMedia()
	}

	return (
		<BadgeWithCount count={uploadedMedia.length}>
			<Button type='text' onClick={showModal} className='min-h-10'>
				<PaperClipOutlined />
			</Button>
			<Modal
				title='Pin the images or videos to your message	 🖼️'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				onClose={handleCancel}
			>
				<Dragger
					beforeUpload={file => {
						setFileList(prev => [...prev, file])
						return false
					}}
					name='File'
					multiple
					showUploadList
					onPreview={handleGroupPreview}
					onChange={handleOnChange}
					accept={acceptedFormats}
					fileList={fileList}
					hasControlInside
					maxCount={9}
				>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>
						Click or drag file to this area to upload
					</p>
					<p className='ant-upload-hint'>
						Support most popular Video/Image formats. Max file sizes: Video -
						100Mb, Image - 10Mb
					</p>
				</Dragger>
				<PreviewGroupImagesComponent
					previewGroupImages={previewGroupImages}
					setPreviewGroupImages={setPreviewGroupImages}
					previewOpen={previewOpen}
					setPreviewOpen={setPreviewOpen}
				/>
			</Modal>
		</BadgeWithCount>
	)
}

export default PinMedia
