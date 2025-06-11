import { queryClient } from '@/shared/api/query-client'
import { ToastContainer } from 'react-toastify'
import QueryProvider from './query-provider'
import RouterProvider from './router-provider'

const Providers = () => {
	return (
		<QueryProvider client={queryClient}>
			<RouterProvider />
			<ToastContainer
				closeOnClick
				pauseOnFocusLoss={false}
				pauseOnHover={false}
				position='top-center'
				autoClose={2000}
			/>
		</QueryProvider>
	)
}

export default Providers
