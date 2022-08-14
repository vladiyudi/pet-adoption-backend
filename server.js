const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const cors = require('cors')
const userRouter = require('./Routes/userRoute')
const petRouter = require('./Routes/petsRoutes')

app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/pets', petRouter)

app.listen(PORT,()=>{
    console.log(`listening ${PORT}`)
})