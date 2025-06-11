import { DeleteOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { ReactNode } from 'react'
import { useChatsStore } from '../lib/useChatsStore'

const ChatClickContext = ({
	children,
	_id,
}: {
	children: ReactNode
	_id: string
}) => {
	const { selectChat, setIsSelectingMode } = useChatsStore()

	const items: MenuProps['items'] = [
		{
			label: 'Delete',
			key: '2',
			icon: <DeleteOutlined />,
			onClick: () => {
				selectChat(_id)
				setIsSelectingMode(true)
			},
		},
	]
	return (
		<Dropdown
			className='w-full'
			autoAdjustOverflow
			menu={{ items }}
			trigger={['contextMenu']}
		>
			{children}
		</Dropdown>
	)
}

export default ChatClickContext
