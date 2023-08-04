import React from 'react'

function HomeProductCard({productData}) {
  return (
    <div className='bg-white shadow-lg shadow-slate-200 h-min rounded-xl pt-4'>
        <img
            src={productData.imgUrl}
            className='h-40 w-full object-contain hover:scale-110 transition ease-out duration-250'
            loading='lazy'
        />
        <div className='bg-slate-100 px-4 py-2 mt-2'>
            <section>
                <h3 className='text-lg font-bold text-blue-500 -mb-1'>{productData.productName}</h3>
                <span className='text-sm opacity-75'>{`AC ${productData.price}`}</span>
            </section>
        </div>
    </div>
  )
}

export default HomeProductCard