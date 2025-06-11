import { Image } from 'antd'
import { ProfilePictureProps } from './type'

const ProfilePicture = ({
	size,
	src = '',
	isOnline,
	showOnline = false,
	preview = false,
}: ProfilePictureProps) => {
	const sizes = {
		small: {
			minWidth: '30px',
			smMinWidth: '30px',
		},
		medium: {
			minWidth: '50px',
			smMinWidth: '50px',
		},
		large: {
			minWidth: '75px',
			smMinWidth: '75px',
		},
	}
	const onlineBadgeSizes = {
		small: '10px',
		medium: '15px',
		large: '20px',
	}

	return (
		<div
			className={`size-[${sizes[size].minWidth}] sm:size-[${sizes[size].smMinWidth}]  relative`}
		>
			<Image
				preview={preview}
				width={sizes[size].minWidth}
				height={sizes[size].minWidth}
				src={src || '/avatar.svg'}
				className={`size-[${sizes[size].minWidth}] sm:size-[${sizes[size].smMinWidth}] rounded-full aspect-square object-cover`}
				alt={`profile image`}
			/>
			{showOnline && (
				<img
					width={onlineBadgeSizes[size]}
					height={onlineBadgeSizes[size]}
					src={isOnline ? '/greenCircle.svg' : '/grayCircle.svg'}
					className='absolute bottom-0 right-0'
				/>
			)}
		</div>
	)
}

export default ProfilePicture
