const User=require('../models/User')

const showUser=(req,res)=>{
    User.find({}).then((result)=>{
        console.log("records fetch",result)
        res.json(result)
    }).catch((err)=>{
        res.json({"message":err})
    })
}
// const createUser=(req,res)=>{
//     const {name, email, password}=req.body
//     const newObj=new User({name,email,password})
//     console.log(newObj)
//     newObj.save().then(()=>{
//         res.json({"message":"success"})
//     }).catch((err)=>{
//         res.json({"message":err})
//     })
// }

module.exports=showUser
