import React from 'react'
import { useState } from 'react';
import styles from './LogIn.module.css'
import axios from 'axios'
import {toast} from 'react-hot-toast'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
        });
    const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.post('http://localhost:8000/auth/login',formData)
            if(data.error){
                toast.error(data.error)
            }
            else{
                console.log(data.token)
                toast.success("Welcome! Login Success")
            }
        } catch (error) {
            toast.error("Login Failed! Internal sever error")
        }
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