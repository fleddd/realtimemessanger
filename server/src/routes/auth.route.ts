import { Router } from 'express'
import {
	checkAuth,
	login,
	logout,
	register,
} from '../controllers/auth.controller'
import { protectedRoute } from '../middlewares/auth.middleware'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)

router.get('/check', protectedRoute, checkAuth)

export default router
