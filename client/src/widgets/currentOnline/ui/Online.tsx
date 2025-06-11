import { useUserStore } from '@/entities/user/model'

const Online = () => {
	const { onlineUsers } = useUserStore()

	return (
		<div className='flex items-center justify-center gap-1 pointer-events-none pr-2'>
			<img
				className='size-4 animate-pulse  pointer-events-none'
				src='\greenCircle.svg'
				alt='online'
			/>
			<span className='font-semibold  pointer-events-none'>
				{onlineUsers.length}
				{''}
			</span>
		</div>
	)
}

export default Online
