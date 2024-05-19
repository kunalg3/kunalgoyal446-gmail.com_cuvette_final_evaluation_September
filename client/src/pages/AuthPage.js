import React from 'react'
import styles from './AuthPage.module.css'
import Login from '../components/Login'

function AuthPage() {
  return (
    <div className={styles.fadebackground}>
        <div className={styles.background}>
            <h1 className={styles.heading}>QUIZZIE</h1>
            <div className={styles.authmenuflex}>
            <div className={styles.authmenu}>
                <button className={styles.menu_btn}>Sign Up</button>
                <button className={styles.menu_btn}>Log In</button>
            </div>
            </div>
            <Login/>
        </div>
    </div>
  )
}

export default AuthPage