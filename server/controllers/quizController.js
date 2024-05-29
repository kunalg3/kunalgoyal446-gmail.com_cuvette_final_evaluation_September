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

module.exports={
    quizCreate,
    quizGet,
    quizbyId,
    quizImpression,
    quizDelete,
    quizUpdate
}