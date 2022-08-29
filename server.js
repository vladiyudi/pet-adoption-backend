const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const cors = require('cors')
const cookieParser = require('cookie-parser')
const io = require('socket.io')(app.listen(PORT), { origins: '*:*' })

io.on('connection', (socket) => {
    socket.join("some room")
    console.log('a user connected!')
    socket.emit('message',{message: 'welcome to the chat!', user: 'Admin'} )
    socket.on('message', (data) => {console.log(data)
    io.to('some room').emit('message', data) 
    // socket.emit('message', data)
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

// app.listen(PORT,()=>{
//     console.log(`listening ${PORT}`)
// })