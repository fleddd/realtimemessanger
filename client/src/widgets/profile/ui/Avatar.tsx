import { useCurrentUserContext } from '@/entities/user/model/currentUserContext'
import { updateUserPicture } from '@/features/user'
import {
	PreviewSingleImageComponent,
	useImagesPreview,
} from '@/shared/lib/media'
import { UploadButton } from '@/shared/ui/buttons'
import { useQueryClient } from '@tanstack/react-query'
import { Upload } from 'antd'

const Avatar = () => {
	const authUser = useCurrentUserContext()
	const queryClient = useQueryClient()

	const {
		previewSingleImage,
		previewOpen,
		fileList,
		setPreviewOpen,
		handleOnChange,
		handleSinglePreview,
		setPreviewSingleImage,
	} = useImagesPreview()

	return (
		<div className='flex justify-center mb-5'>
			<Upload
				method='PUT'
				withCredentials
				defaultFileList={[
					{
						uid: '-1',
						name: 'image.png',
						status: 'done',
						url: authUser?.profilePic || '/avatar.svg',
					},
				]}
				customRequest={options => updateUserPicture(options, queryClient)}
				listType='picture-circle'
				onPreview={handleSinglePreview}
				onChange={handleOnChange}
				maxCount={1}
			>
				{fileList.length >= 2 ? null : <UploadButton />}
			</Upload>
			<PreviewSingleImageComponent
				previewOpen={previewOpen}
				setPreviewOpen={setPreviewOpen}
				previewSingleImage={previewSingleImage}
				setPreviewSingleImage={setPreviewSingleImage}
			/>
		</div>
	)
}

export default Avatar
