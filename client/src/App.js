import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import {Toaster} from 'react-hot-toast'
import DashBoardPage from './pages/DashBoardPage';
import CreateQuizPage from './pages/CreateQuizPage'
import AnalyticsPage from './pages/AnalyticsPage'
import TestPage from './pages/TestPage';
import axios from 'axios'

axios.defaults.baseURL='http://localhost:8000'
axios.defaults.withCredentials=true;

function App() {
  return (
    
      <BrowserRouter>
      <Toaster position='top-right' toastOptions={{duration:2000}}/>
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/dashboard' element={<DashBoardPage/>}/>
        {/* <Route path='/quiz' element={<CreateQuizPage/>}/> */}
        <Route path='/analytics' element={<AnalyticsPage/>}/>
        <Route path='/quiz/:id' element={<TestPage/>}/>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
