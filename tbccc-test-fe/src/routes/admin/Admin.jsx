import React, { useEffect } from 'react';
import { Tab } from '@headlessui/react';
import AdminUserDisclosure from './AdminUserDisclosure';
import AdminProductDisclosure from './AdminProductDisclosure';
import AdminOrderDisclosure from './AdminOrderDisclosure';
import { useAppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

function Admin() {
    
    const tabList = ["Users", "Products", "Orders"]

    const { user, adminUsers, adminProducts, adminGetProducts, adminGetUsers, setIsShowAddProductModal} = useAppContext();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if (!user || !user.isAdmin) {
            navigate('/')
        }
    },[]);

    useEffect(()=>{
       if (user.isAdmin) {
            adminGetUsers(token);
            adminGetProducts(token);
        }
    },[]);

    const showAddProductModal = (event) => {
        event.preventDefault();
        setIsShowAddProductModal(true);
    }

  return (
        <Tab.Group
            as='div'
            className='flex h-screen -mt-16'
        >
            <div className='bg-slate-200 pt-20 w-1/6'>
                <h2 className='ps-12 my-4 text-lg'>Admin Panel</h2>
                <Tab.List
                    className='gap-2 ps-4 flex flex-col'
                >
                    {tabList.map(category => 
                        <Tab
                            className={({ selected }) =>
                              classNames(
                                'h-12 text-left focus:outline-none transition-all',
                                selected
                                  ? 'bg-slate-50 text-blue-500 text-lg me-0 rounded-none rounded-s-lg ps-10'
                                  : 'ps-8 rounded-lg text-slate-400 me-24 hover:bg-blue-500/25 hover:text-white hover:me-8'
                              )
                            }
                        >
                            {category}
                        </Tab>
                    )}
                </Tab.List>
            </div>
            <Tab.Panels className="pt-24 pb-8 ps-12 pe-24 bg-slate-50 w-full h-full overflow-y-auto">
              <Tab.Panel>
                <div
                    className='w-2/3'
                >
                    <h3 className='font-medium text-3xl mb-4'>Users</h3>
                    <div className='flex flex-col gap-2'>
                        {adminUsers.map(user => <AdminUserDisclosure userData={user}/>)}
                    </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div
                    className='w-2/3'
                >
                    <div className='flex justify-between mb-4'>
                        <h3 className='font-medium text-3xl'>Products</h3>
                        <button className='bg-blue-500 text-slate-50 p-2 px-6 rounded-lg shadow-md hover:ring-4 hover:ring-blue-500/50 transition duration-500 ease-out -translate-y-1'
                            onClick={showAddProductModal}
                        >
                            Add new Product
                        </button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {adminProducts.map(product => <AdminProductDisclosure product={product}/>)}
                    </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div
                className='w-2/3'
                >
                    <h3 className='font-medium text-3xl mb-4'>Orders</h3>
                    <div className='flex flex-col gap-2'>
                        <AdminOrderDisclosure/>
                        <AdminOrderDisclosure/>
                        <AdminOrderDisclosure/>
                        <AdminOrderDisclosure/>
                    </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
  )
}

export default Admin