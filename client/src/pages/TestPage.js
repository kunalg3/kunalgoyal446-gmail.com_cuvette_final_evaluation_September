import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

function TestPage() {
    
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
    <div>
      <h1>Available Quizzes</h1>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TestPage