import React from 'react'
import { Disclosure } from '@headlessui/react'

function AdminUserDisclosure() {
  return (
    <div>
        <Disclosure
            as="div"
            className="w-full"
        >
            <Disclosure.Button className="py-3 px-6 flex flex-col bg-white z-20 w-full rounded-lg shadow-md">
                <span>John Doe</span>
                <span className='text-sm text-slate-400'>username</span>
            </Disclosure.Button>
            <Disclosure.Panel className="bg-blue-100 py-3 px-6 rounded-b-lg z-10">
                <section>
                    <span>Email</span>
                    <span>john@mail.com</span>
                </section>

                <section>
                    <span>Is Admin</span>
                    <span>Checkmark</span>
                </section>

                <section>
                    <button
                        className='border border-slate-800 px-4 py-1'
                    >
                        Delete User Account
                    </button>
                </section>
            </Disclosure.Panel>
        </Disclosure>
    </div>
  )
}

export default AdminUserDisclosure