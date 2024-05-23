const express=require('express')
const router=express.Router()
const authstatus=require('../controllers/protectedController')

router.get('/',authstatus)

module.exports=router