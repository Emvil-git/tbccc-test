import './App.css';
import Home from './routes/home/Home';
import Admin from './routes/admin/Admin';
import Login from './routes/login/Login';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <main className='body-font font-quicksand text-slate-800 bg-slate-50 h-screen'>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
