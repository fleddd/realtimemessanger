import { Request, Response } from 'express-serve-static-core'
import {
	generateToken,
	hashPassword,
	verifyPassword,
} from '../helpers/auth.helpers'
import {
	LoginRequest,
	MyResponse,
	protectedRouteRequest,
	RegisterRequest,
} from '../types/auth.types'

import { generateUsername } from '../helpers/user.helpers'
import User from '../models/User.model'

export async function register(
	req: Request<{}, {}, RegisterRequest>,
	res: Response<MyResponse>
) {
	const { fullName, email, password } = req.body
	try {
		if (!fullName || !email || !password) {
			res.status(400).send({ errorMsg: 'All fields are required.' })
			return
		}

		if (password.length < 6) {
			res
				.status(400)
				.send({ errorMsg: 'Password must be at least 6 characters' })
			return
		}
		const userInDb = await User.findOne({ email })

		if (userInDb) {
			res.status(400).send({ errorMsg: 'User with this email already exists.' })
			return
		}

		const hashedPassword = await hashPassword(password)

		const lastTimeUpdatedUsername = Date()
		const lastSeenTime = Date()
		const username = generateUsername()
		const newUser = new User({
			email: email,
			password: hashedPassword,
			fullName: fullName,
			username: username,
			lastTimeUpdatedUsername: lastTimeUpdatedUsername,
			lastSeenTime: lastSeenTime,
		})

		if (!newUser) {
			console.error('Error in sign up controller.')
			res.status(400).send({ errorMsg: 'Invalid user data.' })
			return
		}

		generateToken(newUser._id, res)
		await newUser.save()

		res.status(201).send({
			email: email,
			fullName: fullName,
			profilePic: '',
			_id: newUser._id,
			username: username,
			lastTimeUpdatedUsername: lastTimeUpdatedUsername,
			lastSeenTime: lastSeenTime,
		})
	} catch (e) {
		console.error('logout error in auth controller')
		res.status(500).send({
			errorMsg: "Internal server error. Server couldn't create a user.",
		})
	}
}
export const login = async (
	req: Request<{}, {}, LoginRequest>,
	res: Response<MyResponse>
) => {
	const { email, password } = req.body
	try {
		if (!email || !password) {
			res.status(400).send({ errorMsg: 'All fields are required.' })
			return
		}
		const user = await User.findOne({ email })

		if (!user) {
			res.status(400).send({ errorMsg: 'Invalid credentials.' })
			return
		}

		const hashedPassword = user.password
		const isVerified = await verifyPassword(hashedPassword, password)
		if (!isVerified) {
			res.status(400).send({ errorMsg: 'Email or password is wrong.' })
			return
		}

		generateToken(user._id, res)

		res.status(200).json({
			_id: user._id,
			email: user.email,
			fullName: user.fullName,
			profilePic: user.profilePic,
			username: user.username!,
			lastTimeUpdatedUsername: user.lastTimeUpdatedUsername.toString(),
			lastSeenTime: user.lastSeenTime.toString(),
		})
	} catch (e) {
		console.error('login error in auth controller')
		res.status(500).send({
			errorMsg: "Internal server error. Server couldn't create a user.",
		})
	}
}

export const logout = (req: Request, res: Response) => {
	try {
		res.clearCookie('jwt')
		res.send({ message: 'Logged out successfully!' })
	} catch (e) {
		console.error('logout error in auth controller')

		res.status(500).send({
			errorMsg: "Internal server error. Server couldn't create a user.",
		})
	}
}

export const checkAuth = (req: protectedRouteRequest, res: Response) => {
	try {
		res.send(req.user)
	} catch (error) {
		console.error('check auth error in auth controller')

		res.status(500).send({
			errorMsg: "Internal server error. Server couldn't update a user.",
		})
	}
}
