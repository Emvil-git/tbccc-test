import React from 'react'
import HomeProductCard from './HomeProductCard'

function Home() {
  return (
    <div className='px-24 pt-4'>
        <section>
            <h2 className='text-2xl text-slate-800'>Products</h2>
            <div className='grid grid-cols-4 gap-4 mt-4'>
                <HomeProductCard/>
                <HomeProductCard/>
                <HomeProductCard/>
                <HomeProductCard/>
                <HomeProductCard/>
                <HomeProductCard/>
                <HomeProductCard/>
                <HomeProductCard/>
            </div>
        </section>
    </div>
  )
}

export default Home