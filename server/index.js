const express=require('express')
const login=require('./routes/login')
const cors=require('cors')

const app=express()

const port=8000

app.use(express.json())
app.use(cors())
app.use('/user',login)

//db connection
require('./config/dbConfig')


app.listen(port,()=>{console.log(`Example app listening on port ${port}`)})