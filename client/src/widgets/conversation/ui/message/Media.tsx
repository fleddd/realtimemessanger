import {
	PreviewGroupImagesComponent,
	useImagesPreview,
} from '@/shared/lib/media'
import { Badge, Carousel, Space } from 'antd'

type mediaProps = {
	media: {
		url: string
		type: string
	}[]
}

const Media = ({ media }: mediaProps) => {
	const { previewOpen, setPreviewOpen } = useImagesPreview()
	const images = media
		.filter(media => media.type === 'image' || media.type === 'gif')
		.map(media => media.url)

	const videos = media.filter(media => media.type === 'video')

	return (
		<div className='flex flex-col '>
			{images.length > 0 && (
				<Space className='w-fit h-fit'>
					<div className='w-full h-full flex items-center'>
						<Badge
							title={`There are ${media?.length} images here.`}
							count={images?.length > 1 ? images?.length : 0}
							color='blue'
						>
							<div
								className='flex flex-col grow'
								onClick={() => setPreviewOpen(true)}
							>
								<img
									src={images[0]}
									alt={"Couldn't load the images"}
									className='cursor-pointer overflow-hidden'
								/>
								<PreviewGroupImagesComponent
									previewGroupImages={images}
									previewOpen={previewOpen}
									setPreviewOpen={setPreviewOpen}
								/>
							</div>
						</Badge>
					</div>
				</Space>
			)}
			{videos.length > 0 && (
				<Space className='flex justify-center bg-black'>
					<Badge
						title={`There are ${media?.length} images here.`}
						count={videos?.length > 1 ? videos?.length : 0}
						color='blue'
						className='h-fit'
					>
						<Carousel
							dots={videos.length > 1}
							arrows={videos.length > 1}
							className='sm:max-w-[480px]  max-sm:w-[300px] w-[480px] sm:h-64 max-h-88 '
						>
							{videos.map((item, index) => (
								<div key={item.url + index}>
									<video
										controls
										className={`aspect-video ${
											images.length > 0 ? '' : 'rounded-t-xl'
										}`}
									>
										<source src={item.url} type='video/mp4' />
										Your browser does not support the video tag.
									</video>
								</div>
							))}
						</Carousel>
					</Badge>
				</Space>
			)}
		</div>
	)
}

export default Media
