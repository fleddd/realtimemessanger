import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const QueryProvider = ({
	children,
	client,
}: {
	children: ReactNode
	client: QueryClient
}) => {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default QueryProvider
