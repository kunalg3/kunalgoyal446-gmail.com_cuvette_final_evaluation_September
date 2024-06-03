const DynamicModel=require('../models/DynamicModel')

  const quizCreate = async (req, res) => {
    try {
      const dynamicData = new DynamicModel(req.body);
      await dynamicData.save();
      res.status(200).send('Data saved successfully!');
    } catch (error) {
      res.status(500).send('Error saving data: ' + error.message);
    }
  };

  const quizGet= async (req, res) => {
    try {
      const quizzes = await DynamicModel.find();
      res.json(quizzes);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const quizbyId=async (req, res) => {
    try {
      const quiz = await DynamicModel.findById(req.params.id);
      res.json(quiz);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const quizImpression=async(req,res)=>{
    try {
      const quiz = await DynamicModel.findById(req.params.id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      quiz.impressions += 1;
      await quiz.save();
      res.status(200).json({ message: 'Impressions incremented' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  const quizDelete = async (req, res) => {
    try {
      const quiz = await DynamicModel.findByIdAndDelete(req.params.id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

  const quizUpdate = async (req, res) => {
    try {
      const quiz = await DynamicModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Ensure the update is valid based on the schema
      });
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      res.status(200).json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

  const quizReportAdd = async (req, res) => {
    try {
      // const { correctClicks, incorrectClicks, attempts } = req.body;
      // const quiz = await DynamicModel.findById(req.params.id);
  
      // if (!quiz) {
      //   return res.status(404).send('Quiz not found');
      // }
  
      // quiz.questions.forEach((question, index) => {
      //   if (attempts[index]) {
      //     question.Attempt += attempts[index];
  
      //     if (correctClicks) {
      //       question.correctClicked += correctClicks[index] || 0;
      //     }
  
      //     if (incorrectClicks) {
      //       question.wrongClicked += incorrectClicks[index] || 0;
      //     }
  
      //     question.options.forEach((option, optIndex) => {
      //       if (correctClicks) {
      //         option.correctClicked = option.correctClicked || 0;
      //         if (optIndex === question.correctOption) {
      //           option.correctClicked += correctClicks[index] || 0;
      //         }
      //       }
  
      //       if (incorrectClicks) {
      //         option.wrongClicked = option.wrongClicked || 0;
      //         if (optIndex !== question.correctOption) {
      //           option.wrongClicked += incorrectClicks[index] || 0;
      //         }
      //       }
  
      //       option.attempt = option.attempt || 0;
      //       option.attempt += attempts[index];
      //     });
      //   }
      // });
  
      // await quiz.save();
      // res.send('Quiz report updated successfully');
      const {score}=req.body
      res.send('quiz submitted successfully')
    } catch (error) {
      console.error('Error updating quiz report:', error);
      res.status(500).send('Internal server error');
    }
  };
  
  
  const getQuizStatistics = async (req, res) => {
    try {
      const quizzes = await DynamicModel.find();
      const totalQuizzes = quizzes.length;
      const totalQuestions = quizzes.reduce((acc, quiz) => acc + (quiz.questions ? quiz.questions.length : 0), 0);
      const totalImpressions = quizzes.reduce((acc, quiz) => acc + (quiz.impressions || 0), 0);
  
      res.json({
        // quizzes:"hello"
        totalQuizzes,
        totalQuestions,
        totalImpressions
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
  
  const getTrendingQuizzes = async (req, res) => {
    try {
      const quizzes = await DynamicModel.find({ impressions: { $gt: 10 } }).sort({ impressions: -1 });
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

  const getQuizAnalysis = async (req, res) => {
    try {
      const quiz = await DynamicModel.findById(req.params.id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      const analytics = quiz.questions.map((question) => ({
        question: question.name,
        correctClicks: question.correctClicked,
        wrongClicks: question.wrongClicked,
        attempts: question.Attempt,
      }));
  
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

module.exports={
    quizCreate,
    quizGet,
    quizbyId,
    quizImpression,
    quizDelete,
    quizUpdate,
    quizReportAdd,
    getQuizStatistics,
    getTrendingQuizzes,
    getQuizAnalysis
}