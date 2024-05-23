import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import {Toaster} from 'react-hot-toast'
import DashBoardPage from './pages/DashBoardPage';
import CreateQuizPage from './pages/CreateQuizPage'

function App() {
  return (
    
      <BrowserRouter>
      <Toaster position='top-right' toastOptions={{duration:2000}}/>
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/dashboard' element={<DashBoardPage/>}/>
        <Route path='/quiz' element={<CreateQuizPage/>}/>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
