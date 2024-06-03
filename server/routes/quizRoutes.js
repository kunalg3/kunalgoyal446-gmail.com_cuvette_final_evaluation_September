const express=require('express')
const router=express.Router()
const {quizCreate,quizGet,quizbyId,quizImpression,quizDelete,quizUpdate,quizReportAdd,getQuizStatistics,getTrendingQuizzes,getQuizAnalysis}=require('../controllers/quizController')

router.post('/',quizCreate)
router.get('/',quizGet)
router.get('/:id',quizbyId)
router.post('/:id/increment-impressions',quizImpression)
router.delete('/:id',quizDelete)
router.put('/:id',quizUpdate)
router.put('/:id/reportadd',quizReportAdd)
router.get('/dashboard/data',getQuizStatistics)
router.get('/dashboard/trending',getTrendingQuizzes)
router.get('/:id/quiz-analysis',getQuizAnalysis)

module.exports=router