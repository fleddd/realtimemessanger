import { deleteUserChat } from '@/features/message'
import { ClearOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space } from 'antd'
import { useChatsStore } from '../lib/useChatsStore'

const SelectingChatsBar = () => {
	const { selectedChats, clearSelectedChats, setIsSelectingMode } =
		useChatsStore()
	const onClear = () => {
		clearSelectedChats()
	}
	const onCancel = () => {
		clearSelectedChats()
		setIsSelectingMode(false)
	}
	const onDelete = () => {
		deleteUserChat(selectedChats)
	}
	return (
		<Space.Compact size='large' className='w-full flex justify-center'>
			<Button onClick={onCancel}>
				<StopOutlined />
				Cancel
			</Button>
			<Button onClick={onClear} disabled={selectedChats.length < 1}>
				<ClearOutlined />
				Clear all
			</Button>
			<Popconfirm
				autoAdjustOverflow
				title=''
				description='Are you sure to delete this chat?'
				onConfirm={onDelete}
				okText='Yes'
				cancelText='No'
			>
				<Button danger disabled={selectedChats.length < 1}>
					<DeleteOutlined />
					Delete {selectedChats.length}
				</Button>
			</Popconfirm>
		</Space.Compact>
	)
}

export default SelectingChatsBar
