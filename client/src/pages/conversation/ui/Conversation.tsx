import {
	MessagesContextProvider,
	useConversationStore,
} from '@/entities/message/model'
import { ComponentWithFade } from '@/shared/ui/wrappers'
import {
	ConversationInfo,
	ConversationMessages,
	DeleteMessagesModal,
	EditingBar,
	Modal,
	PlayerModal,
	SelectingBar,
	SendMessageBar,
} from '@/widgets/conversation'
import { useParams } from 'react-router'

const Conversation = () => {
	const { id } = useParams()
	const { mode } = useConversationStore()

	return (
		<MessagesContextProvider id={id!}>
			<ComponentWithFade className='flex flex-col h-full gap-2 grow w-full pb-2'>
				<ConversationInfo />
				<ConversationMessages />
				{mode === 'selecting' && <SelectingBar />}
				{mode === 'typing' && <SendMessageBar />}
				{mode === 'editing' && <EditingBar />}
				<Modal />
				<PlayerModal />
				<DeleteMessagesModal />
			</ComponentWithFade>
		</MessagesContextProvider>
	)
}

export default Conversation
