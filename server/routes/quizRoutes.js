const express=require('express')
const router=express.Router()
const {quizCreate,quizGet,quizbyId}=require('../controllers/quizController')

router.post('/',quizCreate)
router.get('/',quizGet)
router.get('/:id',quizbyId)

module.exports=router