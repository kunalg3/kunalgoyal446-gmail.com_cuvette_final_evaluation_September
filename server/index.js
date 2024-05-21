const express=require('express')
const cors=require('cors')
const login=require('./routes/login')
const authRoutes =require('./routes/authRoutes')
const verifyToken=require('./middleware/authMiddleware')

const app=express()

const PORT=process.env.PORT||8000

app.use(express.json())
app.use(cors())
app.use('/auth',authRoutes)
app.use('/user',verifyToken,login)

//db connection
require('./config/dbConfig')


app.listen(PORT,()=>{console.log(`App listening on port ${PORT}`)})