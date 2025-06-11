import { useCheckUserAuth } from '@/features/auth'
import ErrorPage from '@/pages/error/ui/ErrorPage'
import { AuthLoader } from '@/shared/ui/loaders'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { UserDto } from './types'
import { useUserStore } from './user.store'

const CurrentUserContext = React.createContext<UserDto | null>(null)

export const useCurrentUserContext = () => {
	return React.useContext(CurrentUserContext)
}

export const CurrentUserContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const currentUser = useCheckUserAuth()
	const queryClient = useQueryClient()

	const { connectUser, mySocket } = useUserStore()

	useEffect(() => {
		if (currentUser.data && !mySocket?.connected) {
			connectUser(currentUser.data?._id, queryClient)
		}
	}, [currentUser.data])

	if (currentUser.isPending || currentUser.isLoading) {
		return <AuthLoader />
	}

	if (currentUser.isError) {
		return <ErrorPage errorMessage={currentUser.error.message} />
	}

	return (
		<CurrentUserContext.Provider value={currentUser.data}>
			{children}
		</CurrentUserContext.Provider>
	)
}
