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

module.exports={
    quizCreate,
    quizGet,
    quizbyId
}