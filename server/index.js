const express=require('express')
const cors=require('cors')
const login=require('./routes/login')
const authRoutes =require('./routes/authRoutes')

const app=express()

const port=8000

app.use(express.json())
app.use(cors())
app.use('/auth',authRoutes)
app.use('/user',login)

//db connection
require('./config/dbConfig')


app.listen(port,()=>{console.log(`Example app listening on port ${port}`)})