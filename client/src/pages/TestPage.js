import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styles from './TestPage.module.css';

const TestPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [correctClicks, setCorrectClicks] = useState({});
  const [incorrectClicks, setIncorrectClicks] = useState({});
  const [attempts, setAttempts] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`/quiz/${id}`);
        const data = response.data;
        setQuizData(data);
        if (data.questions.length > 0) {
          setTimeLeft(parseInt(data.questions[0].time));
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    const incrementImpressions = async () => {
      try {
        await axios.post(`/quiz/${id}/increment-impressions`);
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
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && quizData && !quizCompleted) {
      handleNextQuestion();
    }
  }, [timeLeft, quizData, quizCompleted]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    const currentQuestion = quizData.questions[currentQuestionIndex];

    setAttempts(prevAttempts => ({
      ...prevAttempts,
      [currentQuestionIndex]: (prevAttempts[currentQuestionIndex] || 0) + 1
    }));

    if (index === currentQuestion.correctOption) {
      setCorrectClicks(prevCorrectClicks => ({
        ...prevCorrectClicks,
        [currentQuestionIndex]: (prevCorrectClicks[currentQuestionIndex] || 0) + 1
      }));
    } else {
      setIncorrectClicks(prevIncorrectClicks => ({
        ...prevIncorrectClicks,
        [currentQuestionIndex]: (prevIncorrectClicks[currentQuestionIndex] || 0) + 1
      }));
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    if (selectedOption !== null && selectedOption === currentQuestion.correctOption) {
      setScore(prevScore => prevScore + 1);
    }
    setSelectedOption(null);

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(parseInt(quizData.questions[currentQuestionIndex + 1].time));
    } else {
      setQuizCompleted(true);
      handleSubmitReport();
    }
  };

  const handleSubmitReport = async () => {
    const report = {
      correctClicks,
      incorrectClicks,
      attempts
    };
    console.log(report);
    try {
      await axios.put(`/quiz/${id}/reportadd`, report);
      console.log('Submitted successfully');
      toast.success('Submitted successfully');
    } catch (error) {
      console.error('Error submitting quiz report:', error);
      toast.error('Not submitted');
    }
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  if (quizCompleted) {
    return <div>Quiz completed! Your score is: {score} out of {quizData.questions.length}</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className={styles.background}>
      <div className={styles.test_container}>
        <div className={styles.s_no_container}>
          <span>{quizData.name}</span>
          <span className={styles.timer}>{timeLeft}s</span>
        </div>
        <div className={styles.question}>
          <h3 className={styles.question_name}>{currentQuestion.name}</h3>
          <div className={styles.question_options}>
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index} 
                onClick={() => handleOptionSelect(index)} 
                className={`${styles.option} ${selectedOption === index ? styles.selected : ''}`}
              >
                {option.text}
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleNextQuestion}>Next</button>
      </div>
    </div>
  );
};

export default TestPage;
