import { Router } from 'express'
import {
	deleteMessages,
	editMessage,
	getMessages,
	sendMessage,
} from '../controllers/message.controller'
import { protectedRoute } from '../middlewares/auth.middleware'

const router = Router()

router.get('/:senderId', protectedRoute, getMessages)

router.post('/send/:receiverId', protectedRoute, sendMessage)
router.delete('/', protectedRoute, deleteMessages)
router.put('/', protectedRoute, editMessage)

export default router
