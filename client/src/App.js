import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import Login from './components/Login';

function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/account' element={<AuthPage/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
