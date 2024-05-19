import React from 'react'
import { useState } from 'react'
import styles from './Login.module.css'

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password:'',
        });
       
    const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <p className={styles.input_type}>Name</p>
            <input 
            type='text' 
            name='name' 
            value={formData.name} 
            onChange={(e)=>handleInputChange(e)}>
            </input>
            <p className={styles.input_type}>Email</p>
            <input 
            type='email' 
            name='email' 
            value={formData.email} 
            onChange={(e)=>handleInputChange(e)}>
            </input>
            <p className={styles.input_type}>Password</p>
            <input 
            type='password' 
            name='password' 
            value={formData.password} 
            onChange={(e)=>handleInputChange(e)}>
            </input>
            <p className={styles.input_type}>Confirm Password</p>
            <input 
            type='password' 
            name='confirm_password' 
            value={formData.confirm_password}
            onChange={(e)=>handleInputChange(e)}>
            </input>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login