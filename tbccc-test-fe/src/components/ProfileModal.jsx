import React, {useState} from 'react';
import { Transition } from '@headlessui/react';
import { useAppContext } from '../context/appContext';
import { XMarkIcon } from "@heroicons/react/20/solid";
import { classNames } from '../routes/admin/Admin';

function ProfileModal() {
    
    const {user, isShowProfileModal, setIsShowProfileModal, refreshUserDetails} = useAppContext();

    const [isEditing, setIsEditing] = useState(false);
    const [uName, setUName] = useState(user.name);
    const [uUsername, setUUsername] = useState(user.username);
    const [uEmail, setUEmail] = useState(user.email);

    const handleUserInfoUpdate = (ev) => {
        ev.preventDefault();

        const token = localStorage.getItem('token');

        fetch(`http://localhost:4000/users/updateInfo`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: uName,
                username: uUsername,
                email: uEmail,
            })
        })
        .then(res => res.json())
        .then(data => {
            setIsEditing(false); 
            refreshUserDetails(token);
            if (user.isAdmin) {
                adminGetUsers(token);
            }        
        })
    }

    const handleDelete = (ev) => {
        ev.preventDefault();
    
        fetch(`http://localhost:4000/users/deleteUser/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            refreshUserDetails(localStorage.getItem('token'))
        })
    }

    const handleClose = (event) => {
        event.preventDefault();
        setIsEditing(false);
        setIsShowProfileModal(false);
    }

    const handleEdit = (event) => {
        event.preventDefault();
        setIsEditing(true)
    }



  return (
    <Transition
        show={isShowProfileModal}
        as='div'
        className='h-screen w-full top-0 bg-blue-900/75 z-40 fixed backdrop-blur grid place-content-center'
        enter="transition-all ease-out duration-250 transform"
        enterFrom="opacity-0 -translate-y-1/4"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in duration-75 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1/4"
    >
        <div className='bg-slate-50 w-[32vw] min-h-96 rounded-2xl flex flex-col items-center relative shadow-xl shadow-blue-900/25'>
            <button
                className='absolute bg-blue-600 p-2 -top-4 -right-4 rounded-full shadow-lg hover:ring-8 hover:ring-blue-500/50 hover:scale-110 transition duration-500 ease-out'
                onClick={handleClose}
            >
                <XMarkIcon className='h-6 text-slate-50'/>
            </button>

            <div className='-mb-12 z-20'>
                <h2 className='text-2xl mt-6 w-full text-center'>Your Profile</h2>
 
                <img src="https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Slowbro.png" alt="" className='h-56 w-456 object-cover rounded-full bg-blue-500 m-6 mt-3 ring-4 ring-blue-500 ring-offset-4'/>
            </div>

            <form
            className="bg-slate-100 w-full flex flex-col py-3 pt-4 px-6 rounded-lg"
            >
                <section className={`mb-2 w-full flex flex-col ${isEditing && 'mt-6'}`}>
                    <label htmlFor='name' className='text-blue-400 me-3 text-xs'>Name</label>
                    <input
                        type='text'
                        id='name'
                        className={classNames('focus:outline-none transition-all ease-out duration-75' ,isEditing ? 'bg-slate-200 px-4 py-2 rounded mt-1 focus:shadow-md focus:bg-white' : 'bg-slate-100 cursor-default py-1')}
                        readOnly={!isEditing}
                        placeholder="Your Name"
                        value={uName}
                        required
                        onChange={(ev) => {setUName(ev.target.value)}}/>
                </section>

                <section className='mb-2 w-full flex flex-col'>
                    <label htmlFor='username' className='text-blue-400 me-3 text-xs'>Username</label>
                    <input
                        type='text'
                        id='username'
                        className={classNames('focus:outline-none transition-all ease-out duration-75' ,isEditing ? 'bg-slate-200 px-4 py-2 rounded mt-1 focus:shadow-md focus:bg-white' : 'bg-slate-100 cursor-default py-1')}
                        readOnly={!isEditing}
                        placeholder="yourUsername"
                        value={uUsername}
                        required
                        onChange={(ev) => {setUUsername(ev.target.value)}}/>
                </section>

                <section className='mb-2 w-full flex flex-col'>
                    <label htmlFor='email' className='text-blue-400 me-3 text-xs'>Email</label>
                    <input
                        type='email'
                        id='email'
                        className={classNames('focus:outline-none transition-all ease-out duration-75' ,isEditing ? 'bg-slate-200 px-4 py-2 rounded mt-1 focus:shadow-md focus:bg-white' : 'bg-slate-100 cursor-default py-1')}
                        readOnly={!isEditing}
                        placeholder="your.email@adre.ss"
                        value={uEmail}
                        required
                        onChange={(ev) => {setUEmail(ev.target.value)}}/>
                </section>

                
                <div className='flex flex-col mt-4 ,b-2'> 
                    {
                        isEditing ? <button
                            onClick={handleUserInfoUpdate}
                            className='bg-blue-500 border border-blue-500 shadow-lg text-slate-50 text-slate-50 rounded-md px-4 py-3 mt-2 mb-2 hover:bg-blue-400 hover:border-blue-400 transition ease-out hover:shadow-none'
                        >
                            Update Info
                        </button> : 
                        <button
                            onClick={handleEdit}
                            className='bg-blue-500 border border-blue-500 shadow-lg text-slate-50 text-slate-50 rounded-md px-4 py-3 mt-2 mb-2 hover:bg-blue-400 hover:border-blue-400 transition ease-out hover:shadow-none'
                        >
                            Edit Info
                        </button>
                    }
                   
                    <button
                        className='border w-full border-red-500 text-red-500 text-slate-50 rounded-md px-4 py-3 mb-2'
                        onClick={handleDelete}
                    >
                        Delete Account
                    </button>

                </div>
            </form>            
        </div>
    </Transition>
  )
}

export default ProfileModal