import React from 'react'
import { Disclosure } from '@headlessui/react'

function AdminProductDisclosure() {
  return (
    <Disclosure
        as="div"
        className="w-full rounded-lg shadow-md overflow-hidden"
    >
        <Disclosure.Button className="py-3 px-6 flex flex-col bg-white z-20 w-full">
            <span className='text-blue-700'>Aeos Cookie</span>
            <span className='text-sm text-slate-400'>Listed/ProductIDs</span>
        </Disclosure.Button>
        <Disclosure.Panel className="bg-slate-100 py-3 pt-4 px-6 text-sm rounded-b-lg z-10">
            <section className='mb-2'>
                <p className='text-blue-400 me-3 text-xs'>Product Name</p>
                <p className='w-4/5'>Assault Vest</p>
            </section>
            <section className='mb-4'>
                <p className='text-blue-400 me-3 text-xs'>Description</p>
                <p >Gain a shield against Sp. Attack damage while out of combat for 9%/12%/15% max HP (OoC is 5s after leaving combat). This shield must be fully broken before receiving another from Assault Vest.</p>
            </section>
            <div className='flex justify-between w-1/4'>
                <section className='mb-2'>
                    <p className='text-blue-400 me-3 text-xs'>Price</p>
                    <p>250</p>
                </section>
                <section className='mb-2'>
                    <p className='text-blue-400 me-3 text-xs'>Stock</p>
                    <p>100</p>
                </section>
            </div>
            <div className='flex'> 
                <button
                    className='border border-slate-800 bg-slate-800 text-slate-50 text-slate-50 rounded-md px-4 py-1 mt-2 mb-2 me-2'
                >
                    Edit Info
                </button>
                <button
                    className='border border-slate-800 text-slate-800 text-slate-50 rounded-md px-4 py-1 mt-2 mb-2'
                >
                    Unlist Item
                </button>
                <button
                    className='border border-red-500 text-red-500 text-slate-50 rounded-md px-4 py-1 mt-2 mb-2 ms-auto'
                >
                    Delete Item
                </button>
            </div>
        </Disclosure.Panel>
    </Disclosure>
  )
}

export default AdminProductDisclosure