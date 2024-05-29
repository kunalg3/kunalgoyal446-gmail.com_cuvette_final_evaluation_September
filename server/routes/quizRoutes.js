const express=require('express')
const router=express.Router()
const {quizCreate,quizGet,quizbyId,quizImpression,quizDelete}=require('../controllers/quizController')

router.post('/',quizCreate)
router.get('/',quizGet)
router.get('/:id',quizbyId)
router.post('/:id/increment-impressions',quizImpression)
router.delete('/:id',quizDelete)

module.exports=router