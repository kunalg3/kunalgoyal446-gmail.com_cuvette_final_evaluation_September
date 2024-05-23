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
             <div className={styles.card}>{quizdata.total_quiz}Quiz Created</div>
             <div className={styles.card}>{quizdata.total_question}Questions Created</div>
             <div className={styles.card}>{quizdata.total_impression}Total Impressions</div>
        </div>
    </div>
  )
}

export default DashBoardPage