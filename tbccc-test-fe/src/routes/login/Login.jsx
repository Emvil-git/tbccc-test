import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const {user ,setUser, setToken} = useAppContext();

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    })

    const handleLogin = async (ev) => {
        ev.preventDefault();

        fetch(`http://localhost:4000/users/login`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
              email: email,
              password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data) {
                getUserData(data.access)
            }
        })

        setEmail('');
        setPassword('');
    } 

    const getUserData = (userToken) => {
        fetch('http://localhost:4000/users/getInfo', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('token', userToken);
            localStorage.setItem('user',JSON.stringify(data));
            setToken(userToken)
            setUser(data);
            (data.isAdmin) ? navigate('/admin') : navigate('/')
        })
    }
    
  return (
    <div className='grid place-content-center w-full h-full -mt-16'>
        <form action=""
            className='p-8 bg-white shadow-lg rounded-xl w-[32vw] flex flex-col items-center'
        >
            <h2 className='text-center text-2xl font-semibold text-blue-600'>Welcome Back!</h2>
            <p className='text-center mb-8'>Sign in to your account</p>

            <section className='flex flex-col w-full'>
                <label htmlFor="email" className='text-sm text-blue-400 ps-3'>Email</label>
                <input
                    type="email"
                    placeholder='Enter email'
                    value={email} onChange={(ev) => {setEmail(ev.target.value)}}
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    />
            </section>

            <section className='flex flex-col mt-4 mb-8 w-full'>
                <label htmlFor="email" className='text-sm text-blue-400 ps-3'>Password</label>
                <input
                    type="password"
                    placeholder='Enter password'
                    value={password} onChange={(ev) => {setPassword(ev.target.value)}}
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    />
            </section>

            <p className='text-sm ps-1'>Don't have an account? <a href="/signup" className='text-blue-500 hover:text-blue-700'>Register</a> for free!</p>
            <button
                onClick={handleLogin}
                className='bg-blue-500 text-xl text-slate-50 w-1/2 py-3 rounded-lg mt-3 mb-2 shadow-md transition hover:shadow-none hover:bg-blue-400 ease-out'
            >Log In</button>
        </form>
    </div>
  )
}

export default Login