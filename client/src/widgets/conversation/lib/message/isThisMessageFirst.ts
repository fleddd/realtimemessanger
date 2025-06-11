import { Message } from '@/entities/message/model/types'

export const isThisMessageFirst = (
	date: string,
	index: number,
	arr: Message[]
) => {
	const thisMessageDate = new Date(date).toISOString().split('T')[0]
	const nextMessageDate =
		index < arr.length - 1
			? new Date(arr[index + 1].createdAt).toISOString().split('T')[0]
			: null

	const isThisMessageFirst =
		index === arr.length - 1 || thisMessageDate !== nextMessageDate

	return isThisMessageFirst
}
