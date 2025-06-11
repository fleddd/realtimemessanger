import { EyeOutlined } from '@ant-design/icons'
import { usePlayerModal } from '../../lib'

const Video = ({ src }: { src: string }) => {
	const { showModal } = usePlayerModal()

	return (
		<div
			onClick={() => showModal(src)}
			className='relative group cursor-pointer overflow-hidden aspect-square '
		>
			<video muted className=' cursor-pointer aspect-square object-cover'>
				<source src={src} type='video/mp4' />
			</video>
			<div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50'></div>

			{/* Текст при ховере */}
			<div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
				<p className='text-white text-sm font-bold space-x-1'>
					<EyeOutlined />
					<span>Preview</span>
				</p>
			</div>
		</div>
	)
}

export default Video
