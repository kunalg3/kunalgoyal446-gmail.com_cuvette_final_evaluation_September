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

const quizGet=(req,res)=>{
    res.json({message:'I am quiz get'})
}

module.exports={
    quizCreate,
    quizGet
}