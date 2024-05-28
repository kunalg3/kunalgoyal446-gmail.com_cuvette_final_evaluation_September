import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import styles from './AnalyticsPage.module.css'
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
            <p className={styles.quiztable_heading}>Impression</p>
          </div>
        </div>
        <ul>
          {quizzes.map(quiz => (
            <li key={quiz._id}>
              <Link onClick={() => handleQuizClick(quiz._id)}>
                  {quiz.name} - Created on: {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : 'Unknown date'} --
                  Impressions - {quiz.impressions}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <DynamicFormModal show={showModal} handleClose={handleClose}/>
    </div>
  )
}

export default AnalyticsPage