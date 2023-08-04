import './App.css';
import Home from './routes/home/Home';
import Admin from './routes/admin/Admin';
import Login from './routes/login/Login';
import SignUp from './routes/login/SignUp';
import Navbar from './components/Navbar';
import ProductModal from './components/ProductModal';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { AppContextProvider } from './context/appContext';

function App() {

  return (
    <AppContextProvider>
      <Router>
        <main className='relative text-slate-800 bg-slate-50 h-screen overflow-auto'>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
          <ProductModal/>
        </main>
      </Router>
    </AppContextProvider>
  )
}

export default App
