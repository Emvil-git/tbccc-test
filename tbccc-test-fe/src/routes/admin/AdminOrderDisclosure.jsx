import React from 'react'
import { Disclosure } from '@headlessui/react'

function AdminOrderDisclosure() {
  return (
    <div
        className="w-full rounded-lg shadow-md bg-white px-6 py-3"
    >
            <section className='mb-6 mt-2'>
                <p className='text-xs text-slate-400'>OrderId</p>
                <p className='text-blue-700'>6t8yghg7iuk</p>
            </section>

            <div className='flex justify-between w-1/2 mb-6'>
                <section>
                    <p className='text-blue-400 me-3 text-xs'>Ordered by</p>
                    <p>John Doe</p>
                </section>
                <section>
                    <p className='text-blue-400 me-3 text-xs'>Ordered on</p>
                    <p>DATEDATEDATEDATE</p>
                </section>
            </div>
            <p className='text-slate-400 mb-2 text-xs'>PRODUCTS</p>
            <div className='mb-4 h-24 w-3/4 overflow-y-auto'>
                <div className='flex justify-between items-center px-4 h-8 rounded text-sm odd:bg-slate-100'>
                    <span>ProductName</span>
                    <span>x 10</span>
                </div>
                <div className='flex justify-between items-center px-4 h-8 rounded text-sm odd:bg-slate-100'>
                    <span>ProductName</span>
                    <span>x 10</span>
                </div>
                <div className='flex justify-between items-center px-4 h-8 rounded text-sm odd:bg-slate-100'>
                    <span>ProductName</span>
                    <span>x 10</span>
                </div>
                <div className='flex justify-between items-center px-4 h-8 rounded text-sm odd:bg-slate-100'>
                    <span>ProductName</span>
                    <span>x 10</span>
                </div>
            </div>
            <section className='mb-2'>
                <p className='text-blue-400 me-3 text-xs'>Total Amount</p>
                <p className='text-lg'>9999999</p>
            </section>
    </div>
  )
}

export default AdminOrderDisclosure