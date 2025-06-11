import { Response } from 'express'
import Message from '../models/Message.model'
import User from '../models/User.model'
import { protectedRouteRequest } from '../types/auth.types'

export const getChats = async (req: protectedRouteRequest, res: Response) => {
	try {
		const myId = req.user?._id
		const searchChatQuery = req.query.search

		const limit = 12
		const page = parseInt(req.query.page?.toString() || '1')
		const skip = (page - 1) * limit

		if (searchChatQuery) {
			const searchedUsers = await User.aggregate([
				{
					$search: {
						index: 'chats',
						text: {
							query: searchChatQuery,
							path: ['fullName', 'username'],
							fuzzy: { maxEdits: 2 },
						},
					},
				},
				{
					$project: {
						password: 0,
					},
				},
			])

			const totalCount = searchedUsers.length

			const limitedUsers = searchedUsers.slice(skip, skip + limit)

			res.status(200).send({
				totalCount,
				users: limitedUsers,
			})
			return
		}

		const lastMessages = await Message.aggregate([
			{
				$match: {
					$or: [{ receiverId: myId }, { senderId: myId }],
				},
			},
			{
				$sort: { createdAt: -1 },
			},
			{
				$group: {
					_id: {
						$cond: [{ $eq: ['$senderId', myId] }, '$receiverId', '$senderId'],
					},
					lastMessage: { $first: '$text' },
					lastMessageTime: { $first: '$createdAt' },
				},
			},
		])

		const userIds = lastMessages.map(msg => msg._id)

		const users = await User.find({ _id: { $in: userIds } })
			.select('-password')
			.lean()

		const usersWithLastMessage = users.map(user => {
			const lastMessage = lastMessages.find(
				msg => msg._id.toString() === user._id.toString()
			)
			return {
				...user,
				lastMessage: lastMessage?.lastMessage || null,
				lastMessageTime: lastMessage?.lastMessageTime || null,
			}
		})

		usersWithLastMessage.sort(
			(a, b) =>
				new Date(b.lastMessageTime).getTime() -
				new Date(a.lastMessageTime).getTime()
		)

		const totalCount = usersWithLastMessage.length

		res.status(200).send({
			totalCount,
			users: usersWithLastMessage,
		})
	} catch (error) {
		res.status(500).send({
			errorMsg: 'Internal server error.',
		})
	}
}

export const deleteChat = async (req: protectedRouteRequest, res: Response) => {
	const { chatsId } = req.body
	if (chatsId.length < 1) {
		res.status(400).send({ errorMsg: 'No chat id provided.' })
		return
	}
	await Message.deleteMany({
		$or: [{ senderId: { $in: chatsId } }, { receiverId: { $in: chatsId } }],
	})

	res.status(200).send({ message: 'Success!' })
	try {
	} catch (error) {
		res.status(500).send({
			errorMsg: 'Internal server error.',
		})
	}
}
