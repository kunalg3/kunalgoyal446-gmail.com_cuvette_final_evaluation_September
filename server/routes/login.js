const express=require('express')
const router=express.Router()
const {showUser,createUser}=require('../controllers/homeController')

router.get('/',showUser)
router.post('/',createUser)

module.exports=router