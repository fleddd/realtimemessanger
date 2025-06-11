import { useConversationStore } from '@/entities/message/model'
import { DeleteOutlined, EditOutlined, SelectOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { ReactNode } from 'react'

const MessageClickContext = ({
	children,
	_id,
	message,
	isSender,
}: {
	children: ReactNode
	_id: string
	message: string
	isSender: boolean
}) => {
	const { selectMessage, setMode, setIsDeleteModalOpen, setEditMessage } =
		useConversationStore()

	const items: MenuProps['items'] = [
		{
			label: 'Delete',
			key: '2',
			icon: <DeleteOutlined />,
			onClick: () => {
				selectMessage(_id)
				setIsDeleteModalOpen(true)
			},
		},
		{
			label: 'Select',
			key: '3',
			icon: <SelectOutlined />,
			onClick: () => {
				selectMessage(_id)
				setMode('selecting')
			},
		},
	]

	if (isSender) {
		items.unshift({
			label: 'Edit',
			key: '1',
			icon: <EditOutlined />,
			onClick: () => {
				setEditMessage(message, _id)
				setMode('editing')
				selectMessage(_id)
			},
		})
	}
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

export default MessageClickContext
