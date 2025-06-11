import { ArrowLeftOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { To, useNavigate } from 'react-router'

const BackButton = ({
	onClick,
	backRoute = '-1',
}: {
	onClick?: () => void
	backRoute?: To
}) => {
	const navigate = useNavigate()
	return (
		<motion.div
			whileTap={{ scale: 0.95 }}
			className='p-2 rounded-full '
			onClick={() => {
				onClick && onClick()
				navigate(backRoute)
			}}
		>
			<ArrowLeftOutlined className='text-xl cursor-pointer' />
		</motion.div>
	)
}

export default BackButton
