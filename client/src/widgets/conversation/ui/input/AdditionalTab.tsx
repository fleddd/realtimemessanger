import { SmileOutlined } from '@ant-design/icons'
import { Button, FormInstance, Popover, Segmented } from 'antd'
import EmojiPicker from 'emoji-picker-react'
import GifPicker from 'gif-picker-react'
import { useState } from 'react'
import { AddEmojiToText, useSendGif } from '../../lib/index'

type props = {
	form: FormInstance
}

const AdditionalTab = ({ form }: props) => {
	const [tab, setTab] = useState<string>('Emoji')
	const [isOpened, setIsOpened] = useState<boolean>(false)
	const [sendGif] = useSendGif(form, setIsOpened)

	const AdditionalTabComponent = (
		<div
			className='w-88 flex flex-col justify-center '
			onClick={e => e.stopPropagation()}
		>
			<Segmented<string>
				options={['Emoji', 'Gif']}
				block
				onChange={(value: string) => {
					setTab(value)
				}}
			/>
			<div>
				{tab === 'Emoji' ? (
					<div onClick={e => e.stopPropagation()}>
						<EmojiPicker
							onEmojiClick={selectedItem => AddEmojiToText(selectedItem, form)}
						/>
					</div>
				) : (
					<div>
						<GifPicker
							onGifClick={selectedItem => sendGif(selectedItem)}
							tenorApiKey={import.meta.env.VITE_TENOR_API_KEY}
						/>
					</div>
				)}
			</div>
		</div>
	)

	return (
		<Popover
			open={isOpened}
			arrow
			className='mr-10'
			trigger={['click', 'hover']}
			content={AdditionalTabComponent}
		>
			<Button
				type='text'
				onClick={() => setIsOpened(prev => !prev)}
				style={{ padding: 10 }}
				size='large'
			>
				<SmileOutlined />
			</Button>
		</Popover>
	)
}

export default AdditionalTab
