import { BackButton } from '@/shared/ui/buttons'
import { ComponentWithFade } from '@/shared/ui/wrappers'
import { Avatar, InfoForm, Username } from '@/widgets/profile'

const Profile = () => {
	return (
		<ComponentWithFade className='w-full h-full flex justify-center items-center'>
			<div className='w-fit flex flex-col gap-2'>
				<div className='self-start'>
					<BackButton backRoute={'/home'} />
				</div>
				<div>
					<Avatar />
					<Username />
					<InfoForm />
				</div>
			</div>
		</ComponentWithFade>
	)
}

export default Profile
