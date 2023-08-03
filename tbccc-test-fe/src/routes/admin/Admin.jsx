import React from 'react'
import { Tab } from '@headlessui/react'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

function Admin() {
    
    const tabList = ["Users", "Products", "Orders"]

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
            <Tab.Panels className="h-screen pt-16">
              <Tab.Panel>Content 1</Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
  )
}

export default Admin