const User=require('../models/User')
const test=async(req,res)=>{
    try {
        const newObj=new User(req.body)
        await newObj.save();    
        console.log(newObj)
        res.json({message:"success"})
    } catch (error) {
        res.json({error:"error failed"})
    }
}
module.exports=test;