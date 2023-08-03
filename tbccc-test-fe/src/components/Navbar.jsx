import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();

  return (
    <nav className='bg-blue-500 text-slate-50 w-full py-4 flex justify-between items-center px-12 shadow-lg shadow-color-slate-100'>
        <h1
            className='text-lg drop-shadow cursor-pointer hover:scale-110 transition ease-out duration-250'
            onClick={() => navigate('/')}
        >
            <span className='font-light'>app</span>
            <span className='font-black'>Name</span>
        </h1>
        <div>
            <button
                className='border border-slate-50 rounded-full w-24 py-2'
            >
                Sign Up
            </button>
            <button
                className='border border-slate-50 bg-slate-50 text-blue-600 rounded-full w-24 py-2 ms-2 shadow-md shadow-color-blue-600'
            >
                Log In
            </button>
        </div>
    </nav>
  )
}

export default Navbar