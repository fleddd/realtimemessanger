import { UserDto } from '@/entities/user/model'
import { Segmented } from 'antd'
import { useState } from 'react'
import MediaContent from './MediaContent'

const Media = ({ userInfo }: { userInfo: UserDto }) => {
	const [type, setType] = useState<string>('image')

	return (
		<div className='w-full'>
			<Segmented<string>
				options={['image', 'video', 'gif']}
				block
				onChange={(value: string) => {
					setType(value)
				}}
			/>
			<div className='flex  min-h-[160px] '>
				<MediaContent type={type} id={userInfo._id} />
			</div>
		</div>
	)
}

export default Media
