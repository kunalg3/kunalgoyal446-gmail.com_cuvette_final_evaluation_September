const express=require('express')
const router=express.Router()
const {quizCreate,quizGet}=require('../controllers/quizController')

router.post('/',quizCreate)
router.get('/',quizGet)

module.exports=router