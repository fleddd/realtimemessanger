import { ConversationType } from '@/entities/message/model'
import { useUserStore } from '@/entities/user/model'
import { useCurrentChatMessages } from '@/features/message'
import { ErrorPage } from '@/pages'
import { PageLoader } from '@/shared/ui/loaders'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const CurrentChatMessages = React.createContext<ConversationType | null>(null)

export const useCurrentChatMessagesContext = () => {
	return React.useContext(CurrentChatMessages)
}

export const MessagesContextProvider = ({
	id,
	children,
}: {
	id: string
	children: React.ReactNode
}) => {
	const data = useCurrentChatMessages(id!)
	const {
		subscribeToNewMessages,
		unSubscribeToNewMessages,
		subscribeToDeleteMessage,
		unSubscribeToDeleteMessage,
	} = useUserStore()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (data.isSuccess) {
			subscribeToNewMessages(queryClient)
			subscribeToDeleteMessage(queryClient)
		}
		return () => {
			unSubscribeToNewMessages()
			unSubscribeToDeleteMessage()
		}
	}, [data])
	if (data.isFetching || data.isLoading) {
		return <PageLoader />
	}

	if (data.isError) {
		return <ErrorPage errorMessage={"Couldn't load messages for this chat"} />
	}

	return (
		<CurrentChatMessages.Provider value={data.data!}>
			{children}
		</CurrentChatMessages.Provider>
	)
}
