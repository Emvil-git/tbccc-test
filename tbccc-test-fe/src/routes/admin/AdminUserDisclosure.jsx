import React from 'react'
import { Disclosure } from '@headlessui/react'
import { useAppContext } from '../../context/appContext'

function AdminUserDisclosure({userData}) {

    const{adminGetUsers} = useAppContext();

    
    const handleDelete = (ev) => {
        ev.preventDefault();
    
        fetch(`http://localhost:4000/users/adminDeleteUser/${userData._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            adminGetUsers(localStorage.getItem('token'))
        })
    }

  return (
    <Disclosure
        as="div"
        className="w-full rounded-lg shadow-md overflow-hidden"
    >
        <Disclosure.Button className="py-3 px-6 flex flex-col bg-white z-20 w-full">
            <span className='text-blue-700'>{userData.username}</span>
            <span className='text-sm text-slate-400'>{`${userData.isAdmin ? 'Admin' : 'Customer'} Account`}</span>
        </Disclosure.Button>
        <Disclosure.Panel className="bg-slate-100 py-3 pt-4 px-6 text-sm rounded-b-lg z-10">
            <section className='mb-2'>
                <p className='text-blue-400 me-3 text-xs'>Name</p>
                <p>{userData.name}</p>
            </section>
            <section className='mb-2'>
                <p className='text-blue-400 me-3 text-xs'>Email</p>
                <p>{userData.email}</p>
            </section>
            <button
                className='border border-red-500 text-red-500 text-slate-50 rounded-md px-4 py-1 mt-2 mb-2'
                onClick={handleDelete}
            >
                Delete User Account
            </button>
        </Disclosure.Panel>
    </Disclosure>
  )
}

export default AdminUserDisclosure