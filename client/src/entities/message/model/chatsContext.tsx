import { ResponseChatsType } from '@/entities/message/model'
import { useUserStore } from '@/entities/user/model'
import { useChats } from '@/features/message'
import { ErrorPage } from '@/pages'
import { PageLoader } from '@/shared/ui/loaders'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const ChatsContext = React.createContext<ResponseChatsType | null>(null)

export const useChatsContext = () => {
	return React.useContext(ChatsContext)
}

export const ChatsContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { search, page } = useUserStore()
	const chats = useChats(search, page)
	const { subscribeToChatsNotification, unSubscribeToChatsNotification } =
		useUserStore()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (chats.isSuccess) subscribeToChatsNotification(queryClient)
		return () => unSubscribeToChatsNotification()
	}, [])

	if (chats.isFetching || chats.isLoading) {
		return <PageLoader />
	}

	if (chats.isError) {
		return <ErrorPage errorMessage={"Couldn't load chats with this user"} />
	}

	return (
		<ChatsContext.Provider value={chats.data!}>
			{children}
		</ChatsContext.Provider>
	)
}
