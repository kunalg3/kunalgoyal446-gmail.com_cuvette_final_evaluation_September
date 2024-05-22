import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    
      <BrowserRouter>
      <Toaster position='top-right' toastOptions={{duration:2000}}/>
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
