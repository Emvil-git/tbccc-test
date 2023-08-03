import React from 'react'

function SignUp() {
  return (
    <div className='grid place-content-center w-full h-full -mt-16'>
        <form action=""
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
                    />
            </section>

            <section className='flex flex-col mt-3 w-full'>
                <label htmlFor="username" className='text-sm text-blue-400 ps-3'>Username</label>
                <input
                    type="text"
                    placeholder='yourUsername'
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    />
            </section>

            <section className='flex flex-col mt-3 w-full'>
                <label htmlFor="email" className='text-sm text-blue-400 ps-3'>Email</label>
                <input
                    type="email"
                    placeholder='your.email@adre.ss'
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    />
            </section>

            <section className='flex flex-col mt-3 mb-8 w-full'>
                <label htmlFor="email" className='text-sm text-blue-400 ps-3'>Password</label>
                <input
                    type="password"
                    placeholder='$0m3thin6_Un!Qu3'
                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                    />
            </section>

            <p className='text-sm ps-1'>Already have an account? <a href="">Log in</a> instead.</p>
            <button
                className='bg-blue-500 text-xl text-slate-50 w-1/2 py-3 rounded-lg mt-3 mb-2 shadow-md transition hover:shadow-none hover:bg-blue-400 ease-out'
            >Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp