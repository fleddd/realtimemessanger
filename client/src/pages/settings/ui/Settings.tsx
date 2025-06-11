import { useQueryClient } from '@tanstack/react-query'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { logout } from '../../../entities/user/api/user.api'
import BackButton from '../../../shared/ui/buttons/ui/BackButton'
import ComponentWithFade from '../../../shared/ui/wrappers/ui/ComponentWithFade'

const Settings = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const onClick = async () => {
		const pendingMessage =
			"Wait a little bit while we're trying to log you out."
		toast
			.promise(logout, {
				pending: pendingMessage,
				success: 'Success!',
				error: {
					render({ data }) {
						return `${data}`
					},
				},
			})
			.then(async () => {
				await queryClient.invalidateQueries({ queryKey: ['auth'] })
				navigate('/', { replace: true })
			})
	}

	return (
		<div className='h-full flex justify-center items-center'>
			<ComponentWithFade>
				<div className='flex gap-10'>
					<BackButton />
					<Button onClick={onClick} color='gold'>
						Logout
					</Button>
				</div>
				<p>
					<br />
					TODO: <br />
					[fix] updating newMessage & deleteMessage queryClient <br />
					[feat] new messages badge counter <br />
					[feat] deleting chats <br />
					[feat] seen/sent message feature
					<br />
					<br />
					[feat] tag user with nickname
					<br />
					[feat] personal notes (saved messages) <br />
					[feat] group chats <br />
					[feat] archive for chats <br />
					<br />
					<br />
					[feat] auth through socials <br />
					[feat] email verification <br />
					[feat] changing email through code verification <br />
					[feat] changing password through code verification
					<br />
					[feat] landing page '/'
					<br />
					[feat] auth page <br />
					[feat] themes
					<br />
					[feat] i18n languages
					<br />
					[feat] seo optimizations <br />
					[feat] performance optimizations <br />
					[feat] accessibility optimizations <br />
				</p>
			</ComponentWithFade>
		</div>
	)
}

export default Settings
