import { log } from 'console'
import { Response } from 'express'
import { MongooseError } from 'mongoose'
import cloudinary from '../lib/cloudinary'
import { getReceiverSocketId, io } from '../lib/socket'
import Message from '../models/Message.model'
import User from '../models/User.model'
import { protectedRouteRequest } from '../types/auth.types'

export const getMessages = async (
	req: protectedRouteRequest,
	res: Response
) => {
	try {
		const myId = req.user?._id
		const { senderId } = req.params

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: senderId },
				{ senderId: senderId, receiverId: myId },
			],
		}).sort({ createdAt: -1 })
		const sender = await User.findOne({ _id: senderId }).select('-password')

		res.status(200).json({ userInfo: sender, messages: messages })
	} catch (error) {
		console.error('getMessages error in message controller')
		res.status(500).send({
			errorMsg: 'Internal server error.',
		})
	}
}

export const sendMessage = async (
	req: protectedRouteRequest,
	res: Response
) => {
	try {
		const myId = req.user?._id
		const { receiverId } = req.params

		const receiverUser = await User.findById({ _id: receiverId })
		const senderUser = await User.findById({ _id: myId })
		if (!receiverUser || !senderUser) {
			res
				.status(400)
				.send({ errorMsg: "Couldn't send a message to unknown user." })
			return
		}

		const { text, media, mediaType } = req.body

		if (!text && !media) {
			res.status(400).json({ errorMsg: 'Text and Image fields are empty.' })
			return
		} else if (
			mediaType !== 'gif' &&
			mediaType !== 'media' &&
			mediaType !== 'text'
		) {
			res
				.status(400)
				.json({ errorMsg: 'Media type must be either media or gif or text.' })
			return
		}

		let mediaUrls = []
		if (media && media.length > 0 && mediaType !== 'text') {
			if (mediaType !== 'gif') {
				mediaUrls = await Promise.all(
					media.map(async (media: string) => {
						const uploadResponse = await cloudinary.uploader.upload(media, {
							folder: 'messages_media',
							resource_type: 'auto',
						})
						const type = uploadResponse.resource_type
						return {
							url: uploadResponse.secure_url,
							type: type, // Will be either 'image' or 'video'
						}
					})
				)
			} else {
				mediaUrls[0] = {
					url: media[0],
					type: 'gif',
				}
			}
		}

		const newMessage = new Message({
			senderId: myId,
			receiverId: receiverId,
			text: text,
			media: mediaUrls,
			senderFullName: senderUser.fullName,
			mediaType: mediaType,
			isSeen: false,
		})

		await newMessage.save()

		const receiverSocketId = getReceiverSocketId(receiverId)
		if (receiverSocketId) {
			io.to(receiverSocketId).emit('newMessage', newMessage)
		}

		res.status(200).json(newMessage)
	} catch (error) {
		log(error)
		if (error instanceof MongooseError)
			console.error('sendMessage error. ', error.message)
		res.status(500).send({
			errorMsg: 'Internal server error.',
		})
	}
}

export const deleteMessages = async (
	req: protectedRouteRequest,
	res: Response
) => {
	try {
		const { receiverId, messagesId } = req.body
		const myId = req.user!._id
		if (messagesId.length < 1) {
			res.status(400).send({ errorMsg: "Couldn't delete 0 messages." })
			return
		}

		await Message.deleteMany({ _id: { $in: messagesId } })

		const receiverSocketId = getReceiverSocketId(receiverId)
		if (receiverSocketId) {
			io.to(receiverSocketId).emit('deleteMessage', myId, messagesId)
		}

		res.status(200).send({ message: 'Successful delete.' })
	} catch (error) {
		console.error('deleteMessages error in message controller')
		res.status(500).send({
			errorMsg: 'Internal server error.',
		})
	}
}

export const editMessage = async (
	req: protectedRouteRequest,
	res: Response
) => {
	try {
		const { receiverId, messageId, newText } = req.body
		if (!receiverId || !messageId || !newText) {
			res.status(400).send({ errorMsg: 'Some required fields are empty!' })
			return
		}
		const editedMessage = await Message.findByIdAndUpdate(
			messageId,
			{
				text: newText,
				isEdited: true,
			},
			{ new: true }
		)

		const receiverSocketId = getReceiverSocketId(receiverId)
		if (receiverSocketId) {
			io.to(receiverSocketId).emit('newMessage', editedMessage)
		}

		res.status(200).json(editedMessage)
	} catch (error) {
		console.error('editMessage error in message controller')
		res.status(500).send({
			errorMsg: 'Internal server error.',
		})
	}
}

export const markMessageAsSeen = async (
	req: protectedRouteRequest,
	res: Response
) => {
	try {
		const { messagesId } = req.body
		if (!messagesId) {
			res.status(400).send({ errorMsg: 'Some required fields are empty!' })
			return
		}

		const result = await Message.updateMany(
			{ _id: { $in: messagesId } },
			{ $set: { seen: true } }
		)

		res.status(200).json(result)
	} catch (error) {
		console.error('editMessage error in message controller')
		res.status(500).send({
			errorMsg: 'Internal server error.',
		})
	}
}
