import { HTMLMotionProps } from 'motion/react'
import { ReactNode } from 'react'

export type ComponentWithFadeProps = {
	children?: ReactNode
	className?: string
	props?: HTMLMotionProps<'div'>
}
