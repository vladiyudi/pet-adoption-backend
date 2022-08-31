const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const cors = require('cors')
const cookieParser = require('cookie-parser')
const io = require('socket.io')(app.listen(PORT), { origins: '*:*' })
const petCol = require('./Schemas/petSchema')
const pino = require('pino-http')

io.on('connection', (socket) => {
    socket.join("some room")
    socket.on('message', (data) => {console.log(data)
    io.to('some room').emit('message', data) 
})  
})

const nameSpace = io.of('/serverNews')
nameSpace.on('connection', (socket) => {
    petCol.watch().on('change', (change) => {
        socket.emit('message', change)
    })
})

const userRouter = require('./Routes/userRoute')
const petRouter = require('./Routes/petsRoutes')

require("dotenv").config({path:"./.env"})
const mongoose = require('mongoose')
const DBase = process.env.DATABASE
mongoose.connect(DBase, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

app.use(cookieParser())
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use('/images', express.static('images'))
app.use('/api/users', userRouter)
app.use('/api/pets', petRouter)
app.use(pino({level: process.env.LOG_LEVEL}))

// app.listen(PORT,()=>{
//     console.log(`listening ${PORT}`)
// })

module.exports = nameSpace