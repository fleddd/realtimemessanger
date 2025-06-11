import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const AuthLoader = () => {
	return (
		<Spin
			percent='auto'
			indicator={<LoadingOutlined spin />}
			fullscreen
			tip={'Trying to identify you...'}
		/>
	)
}

export default AuthLoader
