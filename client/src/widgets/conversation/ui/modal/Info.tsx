import { UserDto } from '@/entities/user/model'
import { formatToSmartDate } from '@/shared/lib/date'
import { ProfilePicture } from '@/shared/ui/icons'
import { Card, Tag } from 'antd'

const Info = ({ userInfo }: { userInfo: UserDto }) => {
	const lastSeenTime = formatToSmartDate(userInfo.lastSeenTime)

	return (
		<Card>
			<Card.Meta
				avatar={
					<ProfilePicture preview size='large' src={userInfo.profilePic} />
				}
				title={userInfo.fullName}
				description={
					<div className='flex flex-col'>
						<div className='mb-4'>
							<p className='text-gray-400'>Last seen {lastSeenTime}</p>
						</div>
						<div className='flex flex-col gap-2'>
							<div>
								<a
									href={`mailto:${userInfo.email}&body=email`}
									className='text-black font-semibold'
								>
									{userInfo.email}
								</a>
								<p className='text-gray-400'>Email</p>
							</div>
							<div>
								<a
									href={`tel:${userInfo.email}&body=email`}
									className='text-black font-semibold'
								>
									+380975052928
								</a>
								<p className='text-gray-400'>Phone number</p>
							</div>
							<div>
								<Tag>
									<p className='text-black '>{userInfo.username}</p>
								</Tag>
								<p className='text-gray-400'>Username</p>
							</div>
						</div>
					</div>
				}
			/>
		</Card>
	)
}

export default Info
