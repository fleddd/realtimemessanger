import { useChatsContext } from '@/entities/message/model'
import { useUserStore } from '@/entities/user/model'
import { Sidebar } from '@/widgets/sidebar'
import {
	SearchOutlined,
	SettingOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Button, Drawer, GetProps, Input, Pagination, Space } from 'antd'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SearchProps = GetProps<typeof Input.Search>

const ChatSearch = () => {
	const chats = useChatsContext()
	const [open, setOpen] = useState(false)

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const { search, setSearch, page, setPage } = useUserStore()
	const onSearch: SearchProps['onSearch'] = value => {
		setSearch(value)
	}
	return (
		<motion.div className='mx-4 mt-2'>
			<Drawer placement='left' onClose={onClose} open={open}>
				<Sidebar />
			</Drawer>
			<Space.Compact className='w-full'>
				<Button
					onClick={showDrawer}
					size='large'
					icon={<SettingOutlined />}
				></Button>
				<Input.Search
					onSearch={onSearch}
					size='large'
					allowClear
					prefix={<UserOutlined />}
					suffix={<SearchOutlined />}
					placeholder='John John'
					enterButton={'Search'}
					className='w-full'
				/>
			</Space.Compact>
			<div className='w-full flex justify-between items-center gap-2 pt-1'>
				{search && (
					<div>
						<span>You searched </span>
						<span className='font-bold'>{search}</span>
						<span>
							{' '}
							Click{' '}
							<span
								onClick={() => setSearch('')}
								className='text-sky-400 font-semibold cursor-pointer'
							>
								here
							</span>{' '}
							to go back.
						</span>
					</div>
				)}
				{search && chats!.totalCount > 12 && (
					<Pagination
						defaultCurrent={1}
						onChange={setPage}
						pageSize={12}
						current={page}
						total={chats?.totalCount}
					/>
				)}
			</div>
		</motion.div>
	)
}

export default ChatSearch
