import { Router } from 'express'
import { deleteChat, getChats } from '../controllers/chats.controller'
import { protectedRoute } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', protectedRoute, getChats)
router.delete('/', protectedRoute, deleteChat)

export default router
