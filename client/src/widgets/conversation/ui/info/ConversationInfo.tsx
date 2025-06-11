import {
	useConversationStore,
	useCurrentChatMessagesContext,
} from '@/entities/message/model'
import { useUserStore } from '@/entities/user/model'
import { formatToSmartDate } from '@/shared/lib/date'
import { BackButton } from '@/shared/ui/buttons'
import { ProfilePicture } from '@/shared/ui/icons'
import { useProfileModal } from '../../lib'

const ConversationInfo = () => {
	const data = useCurrentChatMessagesContext()
	const { setMode, clearSelectedMessages } = useConversationStore()
	const { onlineUsers } = useUserStore()
	const { showModal } = useProfileModal()
	const { userInfo } = data!
	const isOnline = onlineUsers.includes(data!.userInfo._id)
	const lastSeenTime = formatToSmartDate(userInfo.lastSeenTime)

	return (
		<div className=' w-full h-full max-h-12 flex gap-2 items-center  rounded-xl px-1'>
			<BackButton
				onClick={() => {
					setMode('typing')
					clearSelectedMessages()
				}}
				backRoute={'/home'}
			/>

			<div
				onClick={showModal}
				className='flex items-center gap-2  cursor-pointer  px-2'
			>
				<ProfilePicture
					src={userInfo.profilePic}
					size='medium'
					showOnline
					isOnline={isOnline}
				/>
				<div className='flex flex-col'>
					<span className='font-semibold'>{userInfo.fullName}</span>
					<div className=' flex flex-col justify-center text-gray-400  max-sm:text-[10px] '>
						<span>{isOnline ? 'Online' : `Last seen ${lastSeenTime}`}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConversationInfo
