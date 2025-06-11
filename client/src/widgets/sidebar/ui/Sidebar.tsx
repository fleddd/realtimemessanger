import { useCurrentUserContext, useUserStore } from '@/entities/user/model'
import { Online } from '@/widgets/currentOnline'
import {
	CameraOutlined,
	MessageOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useConversationStore } from '../../../entities/message/model/conversation.store'

const Sidebar = () => {
	const { setSearch, setPage } = useUserStore()

	const location = useLocation()
	const navigate = useNavigate()
	const currentUser = useCurrentUserContext()
	const { setUploadedMedia } = useConversationStore()
	const [selectedKey, setSelectedKey] = useState(location.pathname)

	useEffect(() => {
		setSelectedKey(location.pathname)
	}, [location.pathname])

	const handleMenuSelect = (selected: any) => {
		navigate(selected.key)
		setSelectedKey(selected.key)
		setSearch('')
		setPage(1)
		setUploadedMedia([])
	}
	return (
		<Menu
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				gap: 10,
			}}
			onSelect={handleMenuSelect}
			theme='light'
			mode='inline'
			selectedKeys={[selectedKey]}
			items={[
				{
					key: 'avatar',
					icon: (
						<img
							className=' size-[50px] rounded-full aspect-square bg-cover'
							src={currentUser?.profilePic || '/avatar.svg'}
						/>
					),
					disabled: true,
					style: {
						padding: 0,
						width: '50px',
						height: '50px',
						pointerEvents: 'none',
					},
				},
				{
					key: '/home',
					icon: <MessageOutlined />,
					label: 'Chats',
				},
				{
					key: '/profile',
					icon: <CameraOutlined />,
					label: 'Profile',
				},
				{
					key: '/settings',
					icon: <SettingOutlined />,
					label: 'Settings',
				},
				{
					key: 'onlineCounter',
					icon: <Online />,
					label: 'Users online',
					disabled: true,
				},
			]}
		/>
	)
}

export default Sidebar
