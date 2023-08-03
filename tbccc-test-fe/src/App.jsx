import './App.css';
import Home from './routes/home/Home';
import Admin from './routes/admin/Admin';
import Login from './routes/login/Login';

function App() {

  return (
    <>
      <Router>
        <main>
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
