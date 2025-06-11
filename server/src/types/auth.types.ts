import { Request } from 'express'
import { UserDto } from '../dtos/user.dto'
type EmptyObject = Record<string, never>
export type MyResponse = UserDto | { errorMsg: string }
export type RegisterRequest = {
	email: string
	fullName: string
	password: string
}

export type LoginRequest = {
	email: string
	password: string
}
export interface protectedRouteRequest extends Request {
	user?: UserDto
}
export type RequestWithQuery<T> = Request<
	EmptyObject,
	EmptyObject,
	EmptyObject,
	T
>
export interface protectedRouteRequestWithQuery<T> extends RequestWithQuery<T> {
	user?: UserDto
}

export interface JwtPayload {
	userId: string
}
