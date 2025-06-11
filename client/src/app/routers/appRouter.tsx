import { CurrentUserContextProvider } from '@/entities/user/model/'
import { useCheckUserAuth } from '@/features/auth'
import { AnimatePresence } from 'motion/react'
import { lazily } from 'react-lazily'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import AppLayout from './ui/appLayout'

import { Auth, ErrorPage, Home, Landing } from '@/pages'
const { Settings, Profile, Conversation } = lazily(
	() => import('@/pages/index')
)

const AppRouter = () => {
	const currentUserQuery = useCheckUserAuth()
	const isAuthorized = currentUserQuery?.isSuccess

	const location = useLocation()
	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route
					index
					element={
						isAuthorized ? <Navigate to={'/home'} replace /> : <Landing />
					}
				/>
				<Route
					path='auth'
					element={isAuthorized ? <Navigate to={'/home'} replace /> : <Auth />}
				/>

				<Route
					element={
						<CurrentUserContextProvider>
							<AppLayout />
						</CurrentUserContextProvider>
					}
				>
					<Route
						path='home'
						element={!isAuthorized ? <Navigate to='/auth' replace /> : <Home />}
					/>
					<Route path='home/:id' element={<Conversation />} />
					<Route path='settings' element={<Settings />} />
					<Route path='profile' element={<Profile />} />
				</Route>
				<Route
					path='*'
					element={<ErrorPage errorMessage="This page doesn't exist" />}
				/>
			</Routes>
		</AnimatePresence>
	)
}

export default AppRouter
