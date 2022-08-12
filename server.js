const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const cors = require('cors')
const userRouter = require('./Routes/userRoute')

app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter)

app.listen(PORT,()=>{
    console.log(`listening ${PORT}`)
})