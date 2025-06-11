import { ChatsContextProvider } from '@/entities/message/model'
import ComponentWithFade from '@/shared/ui/wrappers/ui/ComponentWithFade'
import {
	ChatSearch,
	ChatsList,
	SelectingChatsBar,
	useChatsStore,
} from '@/widgets/chats'
const Home = () => {
	const { isSelectingMode } = useChatsStore()
	return (
		<ChatsContextProvider>
			<ComponentWithFade className='h-full flex flex-col gap-2 '>
				<ChatSearch />
				<ChatsList />
				{isSelectingMode && <SelectingChatsBar />}
			</ComponentWithFade>
		</ChatsContextProvider>
	)
}

export default Home
