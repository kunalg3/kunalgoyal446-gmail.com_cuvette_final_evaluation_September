import '../pages/CreateQuizPage.css'
import React, { useState } from 'react';
import axios from 'axios';

const DynamicFormModal = ({ show, handleClose }) => {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, { id: questions.length + 1, name: '', options: ['', '', '', ''], correctOption: 0 }]);
      setActiveQuestion(questions.length);
    }
  };

  const deleteQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      setActiveQuestion(Math.max(0, activeQuestion - 1));
    }
  };

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleQuestionNameChange = (index, event) => {
    const newQuestions = questions.map((question, i) =>
      i === index ? { ...question, name: event.target.value } : question
    );
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const newQuestions = questions.map((question, i) =>
      i === index ? { ...question, options: question.options.map((option, j) => j === optionIndex ? event.target.value : option) } : question
    );
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index, event) => {
    const newQuestions = questions.map((question, i) =>
      i === index ? { ...question, correctOption: parseInt(event.target.value) } : question
    );
    setQuestions(newQuestions);
  };

  const handleFormSubmit = async () => {
    const quizData = { name: quizName, questions };
    try {
      const response = await axios.post('http://localhost:5000/api/quizzes', quizData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Success:', response.data);
      handleClose();  // Optionally close the modal on success
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        {!questions.length && (
          <div>
            <h2>Quiz Name</h2>
            <input
              type="text"
              value={quizName}
              onChange={handleQuizNameChange}
              placeholder="Enter quiz name..."
            />
            <button onClick={() => setQuestions([{ id: 1, name: '', options: ['', '', '', ''], correctOption: 0 }])}>Next</button>
          </div>
        )}
        {!!questions.length && (
          <>
            <h2>Quiz: {quizName}</h2>
            <div className="tabs">
              {questions.map((question, index) => (
                <div key={index} className={`tab-container ${activeQuestion === index ? 'active' : ''}`}>
                  <button
                    className={`tab ${activeQuestion === index ? 'active' : ''}`}
                    onClick={() => setActiveQuestion(index)}
                  >
                    Question {index + 1}
                  </button>
                  {questions.length > 1 && (
                    <button className="delete-button" onClick={() => deleteQuestion(index)}>&times;</button>
                  )}
                </div>
              ))}
              <button className="add-button" onClick={addQuestion} disabled={questions.length >= 5}>
                + Add Question
              </button>
            </div>
            <div className="form-container">
              {questions.map((question, index) => (
                <div key={index} className={`form-content ${activeQuestion === index ? 'active' : ''}`}>
                  <form>
                    <div className="form-group">
                      <label htmlFor={`questionName${index}`}>Question Name</label>
                      <input
                        type="text"
                        id={`questionName${index}`}
                        value={question.name}
                        onChange={(e) => handleQuestionNameChange(index, e)}
                        placeholder="Enter question name..."
                      />
                    </div>
                    {question.options.map((option, optionIndex) => (
                      <div className="form-group" key={optionIndex}>
                        <label htmlFor={`option${optionIndex}${index}`}>Option {optionIndex + 1}</label>
                        <input
                          type="text"
                          id={`option${optionIndex}${index}`}
                          value={option}
                          onChange={(e) => handleOptionChange(index, optionIndex, e)}
                          placeholder={`Enter option ${optionIndex + 1}...`}
                        />
                        <label htmlFor={`correctOption${optionIndex}${index}`}>Correct Option</label>
                        <input
                          type="radio"
                          id={`correctOption${optionIndex}${index}`}
                          name={`correctOption${index}`}
                          value={optionIndex}
                          checked={question.correctOption === optionIndex}
                          onChange={(e) => handleCorrectOptionChange(index, e)}
                        />
                      </div>
                    ))}
                  </form>
                </div>
              ))}
            </div>
            <button className="submit-button" onClick={handleFormSubmit}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicFormModal;
