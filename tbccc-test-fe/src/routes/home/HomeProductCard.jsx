import React from 'react'

function HomeProductCard() {
  return (
    <div className='bg-white shadow-lg shadow-slate-200 h-min rounded-xl p-4 px-8'>
        <img
            src="https://d275t8dp8rxb42.cloudfront.net/items/held/Aeos+Cookie.png"
            className='h-48 w-full object-contain'
        />
        <div>
            <section>
                <h3>ProductName</h3>
                <span className='text-sm opacity-75'>AC 100</span>
            </section>
        </div>
    </div>
  )
}

export default HomeProductCard