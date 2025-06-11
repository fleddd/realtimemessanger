import bcrypt from 'bcrypt'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const generateToken = (
	userId: mongoose.Types.ObjectId,
	res: Response
) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
		expiresIn: '7d',
	})

	res.cookie('jwt', token, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
	})

	return token
}

export const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

export const verifyPassword = async (
	hashedPassword: string,
	password: string
): Promise<boolean> => {
	return await bcrypt.compare(password, hashedPassword)
}
