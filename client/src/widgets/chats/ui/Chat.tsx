import { Chat as ChatType } from '@/entities/message/model'
import { useUserStore } from '@/entities/user/model'
import { formatToSmartDate } from '@/shared/lib/date/'
import { ProfilePicture } from '@/shared/ui/icons'
import { CheckCircleOutlined } from '@ant-design/icons'
import SendOutlined from '@ant-design/icons/lib/icons/SendOutlined'
import { Badge } from 'antd'
import { motion } from 'motion/react'
import { useChatsStore } from '../lib/useChatsStore'
import ChatClickContext from './ChatClickContext'
type props = {
	chat: ChatType
	onClick?: () => void
	isSearched: boolean
}

const Chat = ({ chat, onClick, isSearched }: props) => {
	const { selectedChats, selectChat, isSelectingMode } = useChatsStore()
	const isThisChatSelected = selectedChats.includes(chat._id)
	const { onlineUsers } = useUserStore()
	const messageStatus = [
		<span>
			<SendOutlined /> Sent
		</span>,
		<span>
			<CheckCircleOutlined /> Seen
		</span>,
	]

	const formatedDate = formatToSmartDate(chat.lastMessageTime)

	const isOnline = onlineUsers.includes(chat._id)
	const onClickChat = () => {
		if (isSelectingMode) selectChat(chat._id)
		else {
			if (onClick) onClick()
		}
	}
	return (
		<Badge
			className='min-w-full'
			count={999}
			size='small'
			offset={[-10, 0]}
			color='blue'
		>
			<ChatClickContext _id={chat._id}>
				<motion.div
					onClick={onClickChat}
					whileHover={{
						scale: 1.01,
					}}
					transition={{ type: 'spring' }}
					className={`${
						isSelectingMode && 'cursor-pointer'
					} flex items-center  gap-5 sm:gap-7 ${
						isThisChatSelected ? 'bg-blue-50' : 'bg-gray-50'
					} min-h-28 max-h-28 overflow-hidden p-[10px] rounded-[20px] cursor-pointer`}
				>
					<ProfilePicture
						size='medium'
						src={chat.profilePic}
						showOnline
						isOnline={isOnline}
					/>
					<div className='grow h-full overflow-hidden flex sm:gap-7 max-sm:flex-col max-sm:justify-between  items-center sm:text-lg'>
						<div className='w-full sm:w-max flex sm:flex-col justify-between '>
							<div className='sm:w-36  max-sm:grow text-xl font-semibold'>
								{chat.fullName}
							</div>
							<div
								className={`${
									isSearched && 'hidden'
								} flex flex-col justify-center text-gray-400  max-sm:text-[9px] `}
							>
								<span>{formatedDate}</span>
								<span>{messageStatus[1]}</span>
							</div>
						</div>

						<div
							className={`max-sm:self-start text-gray-400 sm:max-h-20 max-h-10 ${
								chat.lastMessage ? '' : 'underline'
							} ${isSearched && 'hidden'}`}
						>
							<p className='max-w-56 overflow-hidden overflow-ellipsis'>
								{chat.lastMessage || 'Image'}
							</p>
						</div>
					</div>
				</motion.div>
			</ChatClickContext>
		</Badge>
	)
}

export default Chat
