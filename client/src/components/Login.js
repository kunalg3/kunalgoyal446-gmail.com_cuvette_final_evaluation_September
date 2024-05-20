import React from 'react'
import { useState } from 'react';
import styles from './LogIn.module.css'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
        });
    const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className={styles.form_field}>
            
            <div className={styles.input_field}>
                <p className={styles.input_type}>Email</p>
                <input 
                type='email' 
                name='email' 
                value={formData.email} 
                onChange={(e)=>handleInputChange(e)}></input>
            </div>
            <div className={styles.input_field}>
                <p className={styles.input_type}>Password</p>
                <input 
                type='password' 
                name='password' 
                value={formData.password} 
                onChange={(e)=>handleInputChange(e)}></input>
            </div>
            
            <button type='submit'>Log In</button>
        </form>
    </div>
  )
}

export default Login