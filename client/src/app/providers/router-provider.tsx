import { BrowserRouter } from 'react-router'
import { AppRouter } from '../routers'

const RouterProvider = () => {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default RouterProvider
