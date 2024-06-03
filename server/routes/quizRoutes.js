const express=require('express')
const router=express.Router()
const {quizCreate,quizGet,quizbyId,quizImpression,quizDelete,quizUpdate,quizReportAdd}=require('../controllers/quizController')

router.post('/',quizCreate)
router.get('/',quizGet)
router.get('/:id',quizbyId)
router.post('/:id/increment-impressions',quizImpression)
router.delete('/:id',quizDelete)
router.put('/:id',quizUpdate)
router.put('/:id/reportadd',quizReportAdd)
module.exports=router