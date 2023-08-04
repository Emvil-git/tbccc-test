import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../routes/admin/Admin';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

function NavMenu({userData}) {

    const [isHover, setIsHover] = useState(false);
    const {setUser, setIsShowProfileModal} = useAppContext();
    const navigate = useNavigate();

    const showProfileModal = (event) => {
        event.preventDefault();
        setIsShowProfileModal(true);
    } 

    const handleLogOut = (event) => {
        event.preventDefault();
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    } 

  return (
        <Menu
            as="div"
            className="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Menu.Button
                className='px-4 py-2 hover:bg-blue-100/25 w-48 text-right rounded-lg'
            >{userData.name}</Menu.Button>
            <Transition
                show={isHover}
                as="div"
                className="absolute right-0"
                enter="transition-all ease-out duration-2000 transform"
                enterFrom="opacity-0 -translate-y-8 max-h-0"
                enterTo="opacity-100 translate-y-0 max-h-24"
                leave="transition-all ease-in duration-100 transform"
                leaveFrom="opacity-100 translate-y-0 max-h-96"
                leaveTo="opacity-0 -translate-y-8 max-h-0"
            >
                <Menu.Items 
                    as='div'
                    className="flex flex-col text-slate-800 text-right bg-white rounded-lg shadow-lg p-2 mt-2 w-48"
                >
                    {userData.isAdmin ? <>
                        <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={classNames(' rounded p-2 transition-all', active && 'bg-blue-100 pe-4')}
                                        href="/admin"
                                    >
                                        Admin Panel
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={classNames(' rounded p-2 transition-all cursor-pointer', active && 'bg-blue-100 pe-4')}
                                        onClick={showProfileModal}
                                    >
                                        User Profile
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={classNames(' rounded p-2 transition-all cursor-pointer', active && 'bg-blue-100 pe-4')}
                                        onClick={handleLogOut}
                                    >
                                        Log Out
                                    </a>
                                )}
                            </Menu.Item>
                        </> : <>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={classNames(' rounded p-2 transition-all', active && 'bg-blue-100 pe-4')}
                                        href="/account-settings"
                                    >
                                        Cart
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={classNames(' rounded p-2 transition-all', active && 'bg-blue-100 pe-4')}
                                        onClick={showProfileModal}
                                    >
                                        Profile
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={classNames(' rounded p-2 transition-all', active && 'bg-blue-100 pe-4')}
                                        onClick={handleLogOut}
                                    >
                                        Log Out
                                    </a>
                                )}
                            </Menu.Item>
                        </>
                    }
                </Menu.Items>
            </Transition>
        </Menu>
  )
}

export default NavMenu