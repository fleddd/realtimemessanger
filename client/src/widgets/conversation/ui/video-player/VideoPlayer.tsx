import { useEffect, useRef } from 'react'
import { usePlayerStore } from '../../lib'

const VideoPlayer = () => {
	const { src, isModalOpen } = usePlayerStore()
	const videoRef = useRef<HTMLVideoElement>(null)
	useEffect(() => {
		if (!isModalOpen) {
			videoRef.current!.pause()
			videoRef.current!.currentTime = 0
		}
	}, [isModalOpen])

	return (
		<video
			key={src}
			ref={videoRef}
			controls
			className='aspect-video object-contain bg-black cursor-pointer'
		>
			<source src={src} />
		</video>
	)
}

export default VideoPlayer
