import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import {Toaster} from 'react-hot-toast'
import DashBoardPage from './pages/DashBoardPage';
import CreateQuizPage from './pages/CreateQuizPage'
import AnalyticsPage from './pages/AnalyticsPage'
import TestPage from './pages/TestPage';
import axios from 'axios'
import ProtectedRoutes from './components/ProtectedRoutes';

axios.defaults.baseURL='http://localhost:8000'
axios.defaults.withCredentials=true;

function App() {
  return (
    
      <BrowserRouter>
      <Toaster position='top-right' toastOptions={{duration:2000}}/>
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/dashboard' element={<ProtectedRoutes/>}>
          <Route path='/dashboard' element={<DashBoardPage/>}/>
        </Route>
        {/* <Route path='/quiz' element={<CreateQuizPage/>}/> */}
        <Route path='/analytics' element={<ProtectedRoutes/>}>
          <Route path='/analytics' element={<AnalyticsPage/>}/>
        </Route>
        <Route path='/quiz/:id' element={<TestPage/>}/>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
