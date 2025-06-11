import { Response } from 'express-serve-static-core'
import { MessageDto } from '../dtos/message.dto'
import { isUsernameChangeAllowed } from '../helpers/user.helpers'
import cloudinary from '../lib/cloudinary'
import Message from '../models/Message.model'
import User from '../models/User.model'
import {
	protectedRouteRequest,
	protectedRouteRequestWithQuery,
} from '../types/auth.types'
import { GetMediaQueryType } from '../types/user.types'

export const updateProfilePicture = async (
	req: protectedRouteRequest,
	res: Response
) => {
	try {
		const { profilePic: newProfilePic } = req.body
		const { _id: userId } = req.user!

		if (!newProfilePic) {
			res.status(400).send({
				errorMsg: 'No new profile picture provided.',
			})
			return
		}

		const base64SizeInBytes = (newProfilePic.length * 3) / 4 - 2
		const maxFileSize = 5 * 1024 * 1024

		if (base64SizeInBytes > maxFileSize) {
			res.status(413).json({
				errorMsg: 'Image is too large. Maximum allowed size is 5MB.',
			})
			return
		}

		const uploadImageResponse = await cloudinary.uploader.upload(
			newProfilePic,
			{
				folder: 'profile_pictures',
				transformation: [{ width: 500, height: 500, crop: 'limit' }],
			}
		)

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				profilePic: uploadImageResponse.secure_url,
			},
			{ new: true }
		).select('-password')

		res.status(200).send({
			message: 'Profile picture was successfuly updated!',
			updatedUser,
		})
	} catch (error) {
		console.error('update-profile error in user controller')
		res.status(500).send({
			errorMsg: "Internal server error. Server couldn't update a user.",
		})
	}
}

export const updateFullName = async (
	req: protectedRouteRequest,
	res: Response
) => {
	try {
		const { fullName } = req.body
		if (!fullName) {
			res.status(400).send({ errorMsg: 'No new full name provided.' })
			return
		}

		const { _id: userId } = req.user!

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				fullName: fullName,
			},
			{ new: true }
		).select('-password')

		res.status(200).json({
			message: 'Profile picture was successfuly updated!',
			updatedUser,
		})
	} catch (error) {
		console.error('update-fullname error in user controller')
		res.status(500).send({
			errorMsg: "Internal server error. Server couldn't update a user.",
		})
	}
}

export const getMessagesWithMediaById = async (
	req: protectedRouteRequestWithQuery<GetMediaQueryType>,
	res: Response
) => {
	try {
		const otherId = req.query.id
		const mediaType = req.query.mediaType
		const { _id: myId } = req.user!

		if (!otherId) {
			res.status(400).send({
				errorMsg: 'Id field is required',
			})
			return
		}

		if (!['image', 'video', 'gif'].includes(mediaType)) {
			res.status(400).json({ error: 'Invalid media type' })
			return
		}
		const userMessages = (await Message.find({
			$or: [
				{ senderId: myId, receiverId: otherId },
				{ senderId: otherId, receiverId: myId },
			],
		})) as MessageDto[]

		const messagesWithMedia = userMessages.filter(
			(message: MessageDto) =>
				message.media &&
				message.media.length > 0 &&
				message.mediaType !== 'text' &&
				message.media.some(item => item.type === mediaType)
		)
		res.status(200).json({
			messagesWithMedia,
		})
	} catch (error) {
		console.error('getMessagesWithMedia error in user controller')
		res.status(500).send({
			errorMsg: "Internal server error. Server couldn't get messages.",
		})
	}
}

export const updateUsername = async (
	req: protectedRouteRequest,
	res: Response
) => {
	try {
		const { newUsername } = req.body

		if (!newUsername) {
			res.status(400).send({ errorMsg: 'No new username provided' })
			return
		}

		const { _id: userId, lastTimeUpdatedUsername } = req.user!

		const canUserChangeUsername = isUsernameChangeAllowed(
			lastTimeUpdatedUsername
		)
		if (!canUserChangeUsername) {
			res.status(400).send({
				errorMsg: `User can change nickname only once per 2 weeks.`,
			})
			return
		}
		const existingUser = await User.findOne({ username: newUsername })

		if (existingUser) {
			res.status(400).send({
				errorMsg: `${newUsername} username already is taken.`,
			})
			return
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				username: newUsername,
				lastTimeUpdatedUsername: Date(),
			},
			{ new: true }
		)
			.select('-password')
			.lean()

		res.status(200).json({
			message: 'Profile picture was successfuly updated!',
			updatedUser,
		})
	} catch (error) {
		console.error('update-fullname error in user controller')
		res.status(500).send({
			errorMsg: "Internal server error. Server couldn't update a user.",
		})
	}
}
