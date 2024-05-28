const express=require('express')
const router=express.Router()
const {quizCreate,quizGet,quizbyId,quizImpression}=require('../controllers/quizController')

router.post('/',quizCreate)
router.get('/',quizGet)
router.get('/:id',quizbyId)
router.post('/:id/increment-impressions',quizImpression)

module.exports=router