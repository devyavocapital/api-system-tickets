import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { tokenApi } from './middleware/tokenApi.js'
import { categoryRouter } from './routes/categories.js'
import { commentRouter } from './routes/comments.js'
import { createUserRouter } from './routes/createUser.js'
import { routerImages } from './routes/images.js'
import { issuesRouter } from './routes/issues.js'
import { loginRouter } from './routes/login.js'
import { namesRouter } from './routes/names.js'
import { notificationRouter } from './routes/notifications.js'
// import { statsRouter } from "./routes/stats.js";
import cron from 'node-cron'
import { getEmailRemainder } from './models/email.js'

const app = express()
const http = createServer(app)

const PORT = process.env.PORT || 4000

const socketIO = new Server(http, {
  cors: {
    origin: '*'
  }
})

app.use(cors())
app.use(express.json())

let users = []

socketIO.on('connection', (socket) => {
  // console.log(`⚡: ${socket.id} user just connected!`)
  socket.on('notification', (data) => {
    // console.log({ dataNotification: data })
    socketIO.emit('notificationResponse', data)
  })

  socket.on('newUser', (data) => {
    users.push(data)
    socketIO.emit('newUserResponse', users)
  })

  socket.on('disconnect', () => {
    // console.log('🔥: A user disconnected')
    users = users.filter((user) => user.socketID !== socket.id)
    socketIO.emit('newUserResponse', users)
    socket.disconnect()
  })
})

app.use('/api/v1/login', tokenApi, loginRouter)
app.use('/api/v1/create', tokenApi, createUserRouter)
app.use('/api/v1/issues', tokenApi, issuesRouter)
app.use('/api/v1/comments', tokenApi, commentRouter)
app.use('/api/v1/names', tokenApi, namesRouter)
app.use('/api/v1/categories', tokenApi, categoryRouter)
app.use('/api/v1/notifications', tokenApi, notificationRouter)
app.use('/images', routerImages)
// app.use("/api/v1/stats", tokenApi, statsRouter);
app.use('/', (req, res) => {
  res.status(200).json({ msg: 'Estas usando la version 1' })
})

//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

cron.schedule('00 9 * * *', () => {
  console.log('test')
  getEmailRemainder()
}, {
  scheduled: true,
  timezone: 'America/Mexico_City'
})

http.listen(PORT, () => {
  console.log('El servidor esta usando el puerto: ', PORT)
})
