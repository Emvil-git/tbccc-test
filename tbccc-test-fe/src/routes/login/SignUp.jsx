import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';

function SignUp() {
    const navigate = useNavigate();

    const [uName, setUName] = useState("");
    const [uUsername, setUUsername] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [uPassword, setUPassword] = useState("");
    const [uPassword2, setUPassword2] = useState("");

    const { user ,setToken, setUser } = useAppContext();

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    })

    const checkUsername = () => {
        fetch(`https://capstone-2-villanueva.onrender.com/users/checkEmail`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            username: uUsername
        })
        }).then(res => res.json())
        .then(data => {
        console.log(data)
        return(data)
        })
    }

    const checkAndRegister = (ev) => {
        ev.preventDefault()

        fetch(`http://localhost:4000/users/checkEmail`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            email: uEmail
        })
        }).then(res => res.json())
        .then(data => {
        console.log(data)
        if (data === false) {
            if (uPassword === uPassword2 && !checkUsername(uUsername)) {
            fetch(`http://localhost:4000/users/signup`, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                name: uName,
                username: uUsername,
                email: uEmail,
                password: uPassword
                })
            })
            .then(async res => {
                if (res.status === 200) {
                    await fetch(`http://localhost:4000/users/login`, {
                        method: "POST",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                        email: uEmail,
                        password: uPassword
                        })
                    })
                    .then(res => res.json())
                    .then( async data => {
                        if(data) {
                            console.log(data)
                            const newToken = data.access;

                            await fetch('http://localhost:4000/users/getInfo', {
                                headers: {
                                    Authorization: `Bearer ${newToken}`
                                }
                            })
                            .then(res => {
                                console.log(res)
                                return res.json()
                            })
                            .then(data => {
                                console.log(data)
                                localStorage.setItem('token', newToken);
                                localStorage.setItem('user',JSON.stringify(data));
                                setToken(newToken)
                                setUser(data);
                                (data.isAdmin) ? navigate('/admin') : navigate('/')
                            })
                        }
                    })
                }
                })
            } else {
                setUName('');
                setUUsername('');
                setUEmail('');
                setUPassword('');
                setUPassword2('');

                console.log('Non-matching passwords or email taken')
            }
        } else {
            setUName('');
            setUUsername('');
            setUEmail('');
            setUPassword('');
            setUPassword2('');
    
            console.log('Email Taken')
        }
        })
    }

    
  return (
    <div className='grid place-content-center w-full h-full -mt-16'>
        <form onSubmit={checkAndRegister}
            className='p-8 bg-white shadow-lg rounded-xl w-[32vw] flex flex-col items-center'
        >
            <h2 className='text-center text-2xl font-semibold text-blue-600'>Create an Account</h2>
            <p className='text-center mb-8'>Sign up to get started</p>

            <section className='flex flex-col w-full'>
                <label htmlFor="name" className='text-sm text-blue-400 ps-3'>Name</label>
                <input
                    type="text"
                    placeholder='Your Name'
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    value={uName}
                    onChange={(ev) => {setUName(ev.target.value)}}
                    />
            </section>

            <section className='flex flex-col mt-3 w-full'>
                <label htmlFor="username" className='text-sm text-blue-400 ps-3'>Username</label>
                <input
                    type="text"
                    placeholder='yourUsername'
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    value={uUsername}
                    onChange={(ev) => {setUUsername(ev.target.value)}}
                    />
            </section>

            <section className='flex flex-col mt-3 w-full'>
                <label htmlFor="email" className='text-sm text-blue-400 ps-3'>Email</label>
                <input
                    type="email"
                    placeholder='your.email@adre.ss'
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    value={uEmail}
                    onChange={(ev) => {setUEmail(ev.target.value)}}
                    />
            </section>

            <section className='flex flex-col mt-3 w-full'>
                <label htmlFor="password" className='text-sm text-blue-400 ps-3'>Password</label>
                <input
                    type="password"
                    placeholder='$0m3thin6_Un!Qu3'
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    value={uPassword}
                    onChange={(ev) => {setUPassword(ev.target.value)}}
                    />
            </section>
            
            <section className='flex flex-col mt-3 mb-8 w-full'>
                <label htmlFor="password2" className='text-sm text-blue-400 ps-3'>Re-enter Password</label>
                <input
                    type="password"
                    placeholder='$0m3thin6_Un!Qu3'
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    value={uPassword2}
                    onChange={(ev) => {setUPassword2(ev.target.value)}}
                    />
            </section>

            <p className='text-sm ps-1'>Already have an account? <a href="/login" className='text-blue-500 hover:text-blue-700'>Log in</a> instead.</p>
            <button
                className='bg-blue-500 text-xl text-slate-50 w-1/2 py-3 rounded-lg mt-3 mb-2 shadow-md transition hover:shadow-none hover:bg-blue-400 ease-out'
                type='submit'
            >Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp