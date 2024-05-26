import React, { useState } from 'react'
import styles from './DashBoardPage.module.css'

function DashBoardPage() {
  const [quizdata,setQuizdata]=useState({
    total_quiz:0,
    total_question:0,
    total_impression:0
  })

  return (
    <div className={styles.dashboard_container}>
        <div className={styles.menubar}>
            <p className={styles.app_logo}>QUIZZIE</p>
            <div className={styles.menu_items}>
                <button className={`${styles.menu_option} ${styles.selected_option}`}>Dashboard</button>
                <button className={styles.menu_option}>Analytics</button>
                <button className={styles.menu_option}>Create Quiz</button>
                <button className={`${styles.menu_option} ${styles.logout_btn}`}>LOGOUT</button>
            </div>
        </div>
        <div className={styles.dashboard_content}>
          <div className={styles.stats_container}>
            <div className={styles.stats}>
               <div className={styles.card}>
                <span className={styles.no_of_quiz}>{quizdata.total_quiz}</span>
               <span className={styles.quiz_text}>
                Quiz Created
                </span>
                </div>
               <div className={styles.card}>
                <span className={styles.no_of_question}>{quizdata.total_question}</span>
                <span className={styles.question_text}>
                Questions Created
                </span>
                </div>
               <div className={styles.card}>
                <span className={styles.no_of_impression}>{quizdata.total_impression}</span>
                <span className={styles.impression_text}>
                Total Impressions
                </span>
                </div>
            </div>
          </div>
          <div className={styles.trendingquiz}>

          </div>
        </div>
    </div>
  )
}

export default DashBoardPage