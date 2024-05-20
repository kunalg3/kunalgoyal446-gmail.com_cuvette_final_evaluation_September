import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import SignUp from './components/SignUp';

function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/account' element={<AuthPage/>}/>
        <Route path='/' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
