import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './AnalyticsPage.module.css';
import DynamicFormModal from '../components/DynamicFormModal';
import toast from 'react-hot-toast';

function AnalyticsPage() {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleQuizClick = async (quizId) => {
    const quizLink = `${window.location.origin}/quiz/${quizId}`;
    try {
      await navigator.clipboard.writeText(quizLink);
      toast.success('Quiz link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy the text to clipboard:', err);
      toast.error('Failed to copy the quiz link. Please try again.');
    }
  };

  const handleEditQuiz = (quizId) => {
    // Handle quiz edit functionality here
  };

  const handleDeleteQuiz = async(quizId) => {
    try {
      await axios.delete(`/quiz/${quizId}`);
      toast.success('Quiz deleted successfully!');
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error('Failed to delete the quiz:', error);
      toast.error('Failed to delete the quiz. Please try again.');
    }
  };

  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.menubar}>
        <p className={styles.app_logo}>QUIZZIE</p>
        <div className={styles.menu_items}>
          <Link to='/dashboard'>
            <button className={styles.menu_option}>Dashboard</button>
          </Link>
          <Link to='/analytics'>
            <button className={`${styles.menu_option} ${styles.selected_option}`}>Analytics</button>
          </Link>
          <button className={styles.menu_option} onClick={handleShow}>Create Quiz</button>
          <button className={`${styles.menu_option} ${styles.logout_btn}`}>LOGOUT</button>
        </div>
      </div>
      <div className={styles.analysis_container}>
        <h1 className={styles.analysis_heading}>Quiz Analysis</h1>
        <div className={styles.quiztable}>
          <div className={styles.quiztable_firstrow}>
            <p className={styles.quiztable_heading}>S.No</p>
            <p className={styles.quiztable_heading}>Quiz Name</p>
            <p className={styles.quiztable_heading}>Created on</p>
            <p className={styles.quiztable_heading}>Impressions</p>
            <p className={styles.quiztable_heading}></p>
            <p className={styles.quiztable_heading}></p>
          </div>
          <ul className={styles.quizlist}>
            {quizzes.map((quiz, index) => (
              <li
                key={quiz._id}
                className={`${styles.quiz_row} ${index % 2 === 0 ? styles.row_even : styles.row_odd}`}
              >
                <span className={styles.quiz_data}>{index + 1}</span>
                <span className={styles.quiz_data}>{quiz.name}</span>
                <span className={styles.quiz_data}>{quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : 'Unknown date'}</span>
                <span className={styles.quiz_data}>{quiz.impressions}</span>
                <span className={styles.quiz_data}>
                  <button className={styles.action_button} onClick={() => handleEditQuiz(quiz._id)}>Edit</button>
                  <button className={styles.action_button} onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                  <button className={styles.action_button} onClick={() => handleQuizClick(quiz._id)}>Share</button>
                </span>
                <span className={styles.quiz_data}>
                  <Link to={`/quiz-analysis/${quiz._id}`} className={styles.analysis_link}>Analysis</Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DynamicFormModal show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default AnalyticsPage;
