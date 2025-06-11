import { NextFunction, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserDto } from '../dtos/user.dto'
import User from '../models/User.model'
import { protectedRouteRequest } from '../types/auth.types'

export const protectedRoute = async (
	req: protectedRouteRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.cookies.jwt
		if (!token) {
			res.status(401).send({ errorMsg: 'Unauthorized - No Token Provided' })
			return
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
		if (!decoded) {
			res.status(401).send({ errorMsg: 'Unauthorized - Invalid token' })
			return
		}
		const user = (await User.findById(decoded.userId).select(
			'-password'
		)) as UserDto
		if (!user) {
			res.status(401).send({ errorMsg: 'This user does not exist.' })
			return
		}
		req.user = user

		next()
	} catch (error) {
		console.error('auth middleware error ')

		res.status(500).send({
			errorMsg: "Internal server error. Server couldn't create a user.",
		})
	}
}
