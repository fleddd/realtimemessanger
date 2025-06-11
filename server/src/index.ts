import cookieparser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { connectDb } from './lib/db'
import { app, server } from './lib/socket'
import AuthRouter from './routes/auth.route'
import ChatRouter from './routes/chats.route'
import MessageRouter from './routes/message.route'
import UserRouter from './routes/user.route'
dotenv.config()

app.use(express.json({ limit: '100mb' }))
app.use(helmet())
app.use(cookieparser())
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
)
app.use('/api/auth', AuthRouter)
app.use('/api/messages', MessageRouter)
app.use('/api/user', UserRouter)
app.use('/api/chats', ChatRouter)

server.listen(5000, async () => {
	console.log('server started ' + process.env.PORT)
	await connectDb()
})
