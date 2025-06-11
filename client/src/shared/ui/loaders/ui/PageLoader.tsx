import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const PageLoader = () => {
	return (
		<div className='grow h-full flex flex-col gap-3 items-center justify-center'>
			<Spin percent='auto' indicator={<LoadingOutlined spin />} />
			Loading...
		</div>
	)
}

export default PageLoader
