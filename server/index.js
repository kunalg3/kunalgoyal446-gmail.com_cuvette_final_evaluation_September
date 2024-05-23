const express=require('express')
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')
const authRoutes =require('./routes/authRoutes')
const verifyToken=require('./middleware/authenticateToken')
// const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')

const app=express()

const PORT=process.env.PORT||8000

app.use(express.json())
app.use(cors())
// app.use(cookieParser())
app.use(bodyParser.json())
// app.use(epress.urlencoded({extended:false}))

app.use('/auth',authRoutes)
app.use('/user',verifyToken,userRoutes)

//db connection
require('./config/dbConfig')


app.listen(PORT,()=>{console.log(`App listening on port ${PORT}`)})