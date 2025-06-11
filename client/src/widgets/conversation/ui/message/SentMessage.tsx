import { Message, useConversationStore } from '@/entities/message/model'
import { useCurrentUserContext, useUserStore } from '@/entities/user/model'
import { formatDateToHours } from '@/shared/lib/date'
import { useEffect, useRef, useState } from 'react'
import Media from './Media'
import MessageClickContext from './MessageClickContext'

const SentMessage = ({
	text,
	senderId,
	media,
	createdAt,
	_id,
	isEdited,
	isSeen,
}: Message) => {
	const messageRef = useRef(null)

	const loggedInUser = useCurrentUserContext()
	const { mySocket } = useUserStore()
	const {
		selectedMessages,
		selectMessage,
		mode,
		newSeenMessagesId,
		clearSeenMessages,
		addNewSeenMessageId,
	} = useConversationStore()
	const [setIsVisible] = useState(false)

	const myId = loggedInUser?._id
	const isSender = senderId === myId
	const isSelected = selectedMessages.some(id => id === _id)

	const formatedDate = formatDateToHours(createdAt)

	const textColor = isSender ? 'text-white' : 'text-black'
	const defaultColors = isSender ? 'bg-sky-500' : 'bg-gray-100'
	const backgroundColor = media && !text ? 'bg-transparent' : defaultColors

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setTimeout(() => {
					if (entry.isIntersecting) addNewSeenMessageId(_id)
				}, 500)
			},
			{ threshold: 0.5 }
		)

		if (messageRef.current) {
			observer.observe(messageRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<MessageClickContext isSender={isSender} message={text} _id={_id}>
			<div ref={messageRef} className={`grow flex `}>
				<div
					className={`w-full flex items-center ${
						isSender ? 'flex-row' : 'flex-row-reverse'
					}  gap-2 max-sm:text-[10px] `}
				>
					<div
						onClick={() => {
							if (mode === 'selecting') selectMessage(_id)
						}}
						className={`grow flex  ${
							isSender ? 'justify-end' : 'justify-start'
						} ${isSelected && 'bg-blue-100'} ${
							mode === 'selecting' && 'cursor-pointer'
						} rounded-xl`}
					>
						<div
							className={`sm:max-w-[520px] ${backgroundColor} rounded-xl ${textColor} ${
								!media && 'px-4 py-2'
							} `}
						>
							{media.length > 0 && (
								<div
									className={`rounded-t-xl overflow-hidden ${
										mode === 'selecting' && 'pointer-events-none'
									}`}
								>
									<Media media={media} />
								</div>
							)}
							<p className={`${media && 'px-4 py-2'}  break-words`}>{text}</p>
						</div>
					</div>
					<div className='flex flex-col items-center'>
						<span className='max-sm:text-[8px]'>{formatedDate}</span>
						{isEdited && (
							<span className='text-gray-400 text-[8px]'>Edited</span>
						)}
						{isSeen ? (
							<span className='text-[8px]'>seen</span>
						) : (
							<span className='text-[8px]'>Sent</span>
						)}
					</div>
				</div>
			</div>
		</MessageClickContext>
	)
}

export default SentMessage
