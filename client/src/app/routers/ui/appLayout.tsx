import { PageLoader } from '@/shared/ui/loaders'
import { Layout, theme } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router'
const { Content } = Layout

const AppLayout = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<Layout style={{ height: '100dvh' }}>
			<Layout style={{ display: 'flex', gap: 10 }}>
				<Content
					className='p-4  max-sm:p-3 max-sm:m-2 shadow-md'
					style={{
						height: '100%',
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: '16px',
					}}
				>
					<Suspense fallback={<PageLoader />}>
						<Outlet />
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	)
}

export default AppLayout
