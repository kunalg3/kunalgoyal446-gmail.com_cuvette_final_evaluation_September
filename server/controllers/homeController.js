const User=require('../models/User')

const get=(req,res)=>{
    User.find({}).then((result)=>{
        console.log("records fetch",result)
        res.json(result)
    }).catch((err)=>{
        res.json({"message":err})
    })
}

const post=(req,res)=>{
    const newObj=new User({
        firstName:"pqrs",
        lastName:"opal"
    })
    newObj.save().then((res)=>{
        res.json({"message":"success"})
    }).catch((err)=>{
        res.json({"message":"error"})
    })
}

module.exports={
    get,
    post
}