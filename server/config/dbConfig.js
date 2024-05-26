const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://kunalgoyal446:quizapppswd@cluster0.td8xjkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('Database Connected'))
.catch((err)=>console.log('Database not connected',err))