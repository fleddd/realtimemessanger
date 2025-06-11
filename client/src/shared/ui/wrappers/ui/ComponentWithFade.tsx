import { motion } from 'motion/react'
import { ComponentWithFadeProps } from './type'

const ComponentWithFade = ({
	children,
	className,
	...props
}: ComponentWithFadeProps) => {
	const animations = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
		},
		exit: {
			opacity: 0,
		},
	}
	return (
		<motion.div
			variants={animations}
			initial={'hidden'}
			animate={'visible'}
			exit={'exit'}
			className={className}
			{...props}
		>
			{children}
		</motion.div>
	)
}

export default ComponentWithFade
