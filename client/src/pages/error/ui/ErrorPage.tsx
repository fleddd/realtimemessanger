import { Alert } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

type props = {
	errorMessage: string
}

const ErrorPage = ({ errorMessage }: props) => {
	const navigate = useNavigate()
	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate('/auth')
		}, 3000)

		return () => clearInterval(timeout)
	}, [])
	return (
		<div className='h-dvh flex flex-col items-center justify-center'>
			<Alert
				message='Error Occured'
				showIcon
				description={errorMessage}
				type='error'
				action={<p>Redirecting in 3 seconds.</p>}
			/>
		</div>
	)
}

export default ErrorPage
