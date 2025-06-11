import { LoginRequest, RegisterRequest } from '../model/types'

export const register = async ({
	email,
	password,
	fullName,
}: RegisterRequest) => {
	const res = await fetch(import.meta.env.VITE_BASE_URL + 'auth/register', {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify({
			email: email,
			password: password,
			fullName: fullName,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage.errorMsg)
	}

	return await res.json()
}

export const login = async ({ email, password }: LoginRequest) => {
	const res = await fetch(import.meta.env.VITE_BASE_URL + 'auth/login', {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify({
			email: email,
			password: password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage.errorMsg)
	}

	return await res.json()
}

export const checkAuth = async () => {
	const res = await fetch(import.meta.env.VITE_BASE_URL + 'auth/check', {
		method: 'GET',
		credentials: 'include',
	})

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage.errorMsg)
	}

	return await res.json()
}

export const logout = async () => {
	const res = await fetch(import.meta.env.VITE_BASE_URL + 'auth/logout', {
		method: 'POST',
		credentials: 'include',
	})

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage.errorMsg)
	}

	return await res.json()
}

export const updateProfilePicture = async (profilePic: string) => {
	const res = await fetch(
		import.meta.env.VITE_BASE_URL + 'user/update/picture',
		{
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ profilePic: profilePic }),
		}
	)

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage.errorMsg)
	}

	return await res.json()
}

export const updateFullName = async (newFullName: string) => {
	const res = await fetch(
		import.meta.env.VITE_BASE_URL + 'user/update/fullname',
		{
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fullName: newFullName }),
		}
	)

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage.errorMsg)
	}

	return await res.json()
}

export const updateUsername = async (newUsername: string) => {
	const res = await fetch(
		import.meta.env.VITE_BASE_URL + 'user/update/username',
		{
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ newUsername: newUsername }),
		}
	)

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage.errorMsg)
	}

	return await res.json()
}

export const getMediaById = async (id: string, mediaType: string) => {
	const res = await fetch(
		import.meta.env.VITE_BASE_URL +
			`user/media?id=${id}&mediaType=${mediaType}`,
		{
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)

	if (!res.ok) {
		const errorMessage = await res.json()

		throw new Error(errorMessage.errorMsg)
	}

	return await res.json()
}
