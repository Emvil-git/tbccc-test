import React, { useEffect } from 'react'
import HomeProductCard from './HomeProductCard'
import { useAppContext } from '../../context/appContext'

function Home() {

    const {products, getListedProducts} = useAppContext();

    useEffect(()=>{
        getListedProducts()
    },[])

  return (
    <div className='px-24 pt-4'>
        <section>
            <h2 className='text-2xl text-slate-800'>Products</h2>
            <div className='grid grid-cols-4 gap-4 mt-4'>
                {products.map(product => <HomeProductCard key={product._id} productData={product}/>)}
            </div>
        </section>
    </div>
  )
}

export default Home