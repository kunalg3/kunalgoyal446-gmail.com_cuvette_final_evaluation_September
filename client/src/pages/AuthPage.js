import React from 'react'
import styles from './AuthPage.module.css'
import SignUp from '../components/SignUp'
import LogIn from '../components/LogIn'
import { useState } from 'react'

function AuthPage() {
  const [token,setToken]=useState(true);
  const handleSignupForm=(e)=>{
    setToken(false)
    // e.target.style.filter= 'drop-shadow(0 0 15px rgb(206, 208, 255))'
  }
  const handleLoginForm=(e)=>{
    setToken(true)
    // e.target.style.filter= 'drop-shadow(0 0 15px rgb(206, 208, 255))'
  }
  // const localstyles={
  //   select:{filter: drop-shadow(0 0 15px rgb(206, 208, 255))}
  // }
  return (
    <div className={styles.fadebackground}>
        <div className={styles.background}>
            <h1 className={styles.heading}>QUIZZIE</h1>
            <div className={styles.authmenuflex}>
                <div className={styles.authmenu}>
                    <button className={styles.menu_btn} onClick={handleSignupForm} 
                    style={token?{
                      filter:'none'
                    }:
                    {
                      filter: 'drop-shadow(0 0 15px rgb(206, 208, 255))'
                    }}
                    >Sign Up</button>
                    <button className={styles.menu_btn} onClick={handleLoginForm} 
                    style={token?{
                      filter: 'drop-shadow(0 0 15px rgb(206, 208, 255))'
                    }:
                    {
                      filter:'none'
                    }}
                    >Log In</button>
                </div>
            </div>
            {token?<LogIn/>:<SignUp/>}
        </div>
    </div>
  )
}

export default AuthPage