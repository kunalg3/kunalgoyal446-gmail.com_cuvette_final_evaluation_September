const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://kunalgoyalg:mAS2xRQk88q5YzeW@cluster0.al0iwy9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('Database Connected'))
.catch((err)=>console.log('Database not connected',err))