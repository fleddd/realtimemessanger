import { Image } from 'antd'
import { Dispatch, SetStateAction } from 'react'

export const PreviewSingleImageComponent = ({
	previewSingleImage,
	previewOpen,
	setPreviewSingleImage,
	setPreviewOpen,
}: {
	previewSingleImage: string
	previewOpen: boolean
	setPreviewSingleImage: Dispatch<SetStateAction<string>>
	setPreviewOpen: Dispatch<SetStateAction<boolean>>
}) => {
	if (!previewSingleImage) return

	return (
		<Image
			wrapperStyle={{ display: 'none' }}
			preview={{
				visible: previewOpen,
				onVisibleChange: visible => setPreviewOpen(visible),
				afterOpenChange: visible => !visible && setPreviewSingleImage(''),
			}}
			src={previewSingleImage}
		/>
	)
}

export const PreviewGroupImagesComponent = ({
	previewGroupImages,
	previewOpen,
	setPreviewOpen,
}: {
	previewGroupImages: string[]
	previewOpen: boolean
	setPreviewGroupImages?: Dispatch<SetStateAction<string[]>>
	setPreviewOpen: Dispatch<SetStateAction<boolean>>
}) => {
	if (previewGroupImages.length < 1) return

	return (
		<Image.PreviewGroup
			preview={{
				visible: previewOpen,
				onVisibleChange: visible => setPreviewOpen(visible),
				afterOpenChange: visible => !visible,
			}}
			items={previewGroupImages}
		/>
	)
}
