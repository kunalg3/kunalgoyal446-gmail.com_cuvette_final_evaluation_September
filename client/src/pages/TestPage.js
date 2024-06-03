import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {toast } from 'react-hot-toast'
import styles from './TestPage.module.css'

const TestPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [incorrectClicks, setIncorrectClicks] = useState(0);
  const [attempts, setAttempts] = useState({});

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`/quiz/${id}`);
        const data = response.data;
        setQuizData([data]); // Store data as an array
        setTimeLeft(parseInt(data.time)); // Initialize timer
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
    const currentQuiz = quizData[0];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    setAttempts((prevAttempts) => ({
      ...prevAttempts,
      [currentQuestionIndex]: (prevAttempts[currentQuestionIndex] || 0) + 1
    }));
    if (index === currentQuestion.correctOption) {
      setCorrectClicks((prevCorrectClicks) => prevCorrectClicks + 1);
    } else {
      setIncorrectClicks((prevIncorrectClicks) => prevIncorrectClicks + 1);
    }
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

  const handleSubmitReport = async () => {
    const report = {
      correctClicks,
      incorrectClicks,
      attempts
    };
    console.log(report)
    // try {
    //   await axios.put(`/quiz/${id}/reportadd`, report);
    //   // toast.success("sumitted successfully")
    //   console.log("sumitted successfully")
    // } catch (error) {
    //   console.error('Error submitting quiz report:', error);
    //   toast.error("not sumitted")
    // }
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuiz = quizData[0];

  if (currentQuestionIndex >= currentQuiz.questions.length) {
    handleSubmitReport();
    return <div>Quiz completed! Your score is: {score}</div>;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <div className={styles.background}>
      <div className={styles.test_container}>
        <div className={styles.s_no_container}>
          <span>{currentQuiz.name}</span>
          <span className={styles.timer}>{timeLeft}s</span>
        </div>
        {/* <div className={styles.question}></div> */}
        <div className={styles.question}>
          <h3 className={styles.question_name}>{currentQuestion.name}</h3>
          <div className={styles.question_options}>
              {currentQuestion.options.map((option, index) => (
                <div onClick={() => handleOptionSelect(index)} className={styles.option}>
                  {option.text}
                </div>
              ))}
          </div>
        </div>
        {/* <div>Time left: {timeLeft} seconds</div> */}
        <button onClick={handleNextQuestion}>Next</button>
      </div>
    </div>
  );
};

export default TestPage;
