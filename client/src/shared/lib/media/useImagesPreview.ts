import { UploadFile, UploadProps } from 'antd'
import { useState } from 'react'
import { getBase64 } from './getBase64'
import { FileType } from './type'
export const useImagesPreview = () => {
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewSingleImage, setPreviewSingleImage] = useState('')
	const [previewGroupImages, setPreviewGroupImages] = useState([''])
	const [fileList, setFileList] = useState<UploadFile[]>([])

	const handleSinglePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType)
		}

		setPreviewSingleImage(file.url || (file.preview as string))
		setPreviewOpen(true)
	}
	const handleGroupPreview = async () => {
		const images = fileList.map(
			async (file: UploadFile) =>
				await getBase64(file.originFileObj as FileType)
		)
		Promise.all(images).then(values => {
			console.log(values)

			setPreviewGroupImages(values)
			setPreviewOpen(true)
		})
	}
	const handleOnChange: UploadProps['onChange'] = ({
		fileList: newFileList,
	}) => {
		setFileList(newFileList)
	}

	// const PreviewSingleImageComponent = (

	// )

	// const PreviewGrouImagesComponent = () => {
	// 	const {
	// 		previewGroupImages,
	// 		previewOpen,
	// 		setPreviewGroupImages,
	// 		setPreviewOpen,
	// 	} = useImagesPreview()
	// 	if (!previewGroupImages) return

	// 	return (
	// 		<Image.PreviewGroup
	// 			preview={{
	// 				visible: previewOpen,
	// 				onVisibleChange: visible => setPreviewOpen(visible),
	// 				afterOpenChange: visible => !visible && setPreviewGroupImages(['']),
	// 			}}
	// 			items={previewGroupImages}
	// 		/>
	// 	)
	// }

	return {
		fileList,
		previewSingleImage,
		previewGroupImages,
		previewOpen,
		setPreviewOpen,
		setFileList,
		handleSinglePreview,
		handleGroupPreview,
		setPreviewGroupImages,
		setPreviewSingleImage,
		handleOnChange,
	}
}
