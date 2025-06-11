import { Router } from 'express'
import {
	getMessagesWithMediaById,
	updateFullName,
	updateProfilePicture,
	updateUsername,
} from '../controllers/user.controller'
import { protectedRoute } from '../middlewares/auth.middleware'

const router = Router()

router.put('/update/picture', protectedRoute, updateProfilePicture)
router.put('/update/fullname', protectedRoute, updateFullName)
router.put('/update/username', protectedRoute, updateUsername)

router.get('/media', protectedRoute, getMessagesWithMediaById)

export default router
