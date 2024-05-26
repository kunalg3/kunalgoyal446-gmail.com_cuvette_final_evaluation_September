const express=require('express')
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')
const authRoutes =require('./routes/authRoutes')
const testRoutes =require('./routes/testRoutes')
const verifyToken=require('./middleware/authenticateToken')
const mongoose=require('mongoose')
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
app.use('/test',testRoutes)


const dynamicSchema = new mongoose.Schema({}, { strict: false });
const DynamicModel = mongoose.model('Dynamic', dynamicSchema);

app.post('/savedata', async (req, res) => {
  try {
    const dynamicData = new DynamicModel(req.body);
    await dynamicData.save();
    res.status(200).send('Data saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving data: ' + error.message);
  }
});



//db connection
require('./config/dbConfig')


app.listen(PORT,()=>{console.log(`App listening on port ${PORT}`)})