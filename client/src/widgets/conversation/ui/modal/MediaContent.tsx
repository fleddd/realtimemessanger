import useMediaByUserId from '@/features/user/useMediaByUserId'
import { LoadingOutlined } from '@ant-design/icons'
import { Empty, Image, Spin } from 'antd'
import Video from '../video-player/Video'

const MediaContent = ({ type, id }: { type: string; id: string }) => {
	const { data, isLoading, isPending } = useMediaByUserId(id, type)
	const mediaUrls = data?.messagesWithMedia.flatMap(msg =>
		msg.media.map(m => m.url)
	)

	if (isLoading || isPending)
		return (
			<div className='w-full grid place-content-center'>
				<Spin percent='auto' indicator={<LoadingOutlined spin />} />
			</div>
		)
	return (
		<div className='w-full grid  grid-cols-[repeat(auto-fit,minmax(100px,1fr))] overflow-y-scroll'>
			{mediaUrls && mediaUrls.length < 1 && (
				<Empty description={'No media here...'} className='pt-4' />
			)}
			{['image', 'gif'].includes(type) ? (
				<Image.PreviewGroup>
					{mediaUrls?.map(item => {
						return (
							<Image
								src={item}
								alt={"Couldn't load the images"}
								className='w-full h-full cursor-pointer aspect-square object-cover'
							/>
						)
					})}
				</Image.PreviewGroup>
			) : (
				<>
					{mediaUrls?.map(item => {
						return <Video src={item} />
					})}
				</>
			)}
		</div>
	)
}

export default MediaContent
