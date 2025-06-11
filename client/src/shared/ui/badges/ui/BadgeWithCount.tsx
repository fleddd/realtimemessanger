import { Badge, Space } from 'antd'
import { ReactNode } from 'react'

const BadgeWithCount = ({
	children,
	count,
}: {
	children: ReactNode
	count: number
}) => {
	return (
		<Space>
			<Badge
				title='Amount of pinned images'
				count={count}
				color='blue'
				style={{ zIndex: 999 }}
			>
				{children}
			</Badge>
		</Space>
	)
}

export default BadgeWithCount
