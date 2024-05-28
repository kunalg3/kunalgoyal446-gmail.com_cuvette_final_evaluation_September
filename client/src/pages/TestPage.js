import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TestPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`/quiz/${id}`);
        const data = response.data;
        setQuizData([data]); // Store data as an array
        setTimeLeft(parseInt(data.timerTime)); // Initialize timer
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    const incrementImpressions = async () => {
      try {
        await axios.post(`/quiz/${id}/increment-impressions`); // Increment impressions
      } catch (error) {
        console.error('Error incrementing impressions:', error);
      }
    };

    fetchQuizData();
    incrementImpressions();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && quizData.length > 0) {
      handleNextQuestion();
    }
  }, [timeLeft, quizData]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    const currentQuiz = quizData[0];
    if (selectedOption !== null && selectedOption === currentQuiz.questions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
      setTimeLeft(parseInt(currentQuiz.timerTime));
    }
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuiz = quizData[0];

  if (currentQuestionIndex >= currentQuiz.questions.length) {
    return <div>Quiz completed! Your score is: {score}</div>;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuiz.name}</h2>
      <div>
        <h3>{currentQuestion.name}</h3>
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li 
              key={index} 
              onClick={() => handleOptionSelect(index)}
              style={{ cursor: 'pointer', backgroundColor: selectedOption === index ? 'lightgray' : 'white' }}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>
      <div>Time left: {timeLeft} seconds</div>
      <button onClick={handleNextQuestion}>Next</button>
    </div>
  );
};

export default TestPage;
