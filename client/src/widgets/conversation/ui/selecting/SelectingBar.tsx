import { useConversationStore } from '@/entities/message/model'
import { ClearOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useDeleteModal } from '../../lib'

const SelectingBar = () => {
	const { selectedMessages, clearSelectedMessages, setMode } =
		useConversationStore()
	const { showModal } = useDeleteModal()
	const onClear = () => {
		clearSelectedMessages()
	}
	const onCancel = () => {
		clearSelectedMessages()
		setMode('typing')
	}
	const onDelete = () => {
		showModal()
	}
	return (
		<Space.Compact size='large' className='w-full flex justify-center'>
			<Button onClick={onCancel}>
				<StopOutlined />
				Cancel
			</Button>
			<Button onClick={onClear} disabled={selectedMessages.length < 1}>
				<ClearOutlined />
				Clear all
			</Button>
			<Button onClick={onDelete} disabled={selectedMessages.length < 1}>
				<DeleteOutlined />
				Delete {selectedMessages.length}
			</Button>
		</Space.Compact>
	)
}

export default SelectingBar
