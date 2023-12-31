import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext';
import NavMenu from './NavMenu';
import ProfileModal from './ProfileModal';

function Navbar() {
    const navigate = useNavigate();
    const {user, setUser} = useAppContext();

  return (
    <nav className='bg-blue-500 text-slate-50 w-full h-16 flex justify-between items-center px-12 shadow-lg shadow-color-slate-100 relative z-30 sticky top-0'>
        <h1
            className='text-lg drop-shadow cursor-pointer hover:scale-110 transition ease-out duration-250'
            onClick={() => navigate('/')}
        >
            <span className='font-light'>app</span>
            <span className='font-black'>Name</span>
        </h1>
        <div>
            {user ? <NavMenu userData={user}/>:
            <>
                <button
                    onClick={() => {navigate('signup')}}
                    className='border border-slate-50 rounded-full w-24 py-1'
                >
                    Sign Up
                </button>
                <button
                    onClick={() => {navigate('login')}}
                    className='border border-slate-50 bg-slate-50 text-blue-600 rounded-full w-24 py-1 ms-2 shadow-md shadow-color-blue-600'
                >
                    Log In
                </button>
            </>
            }
        </div>
        {user && <ProfileModal/>}
    </nav>
  )
}

export default Navbar