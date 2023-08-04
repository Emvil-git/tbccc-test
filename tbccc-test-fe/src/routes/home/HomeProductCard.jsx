import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { ShoppingBagIcon } from "@heroicons/react/24/solid"
import { useAppContext } from '../../context/appContext';

function HomeProductCard({productData}) {
    const [isHover, setIsHover] = useState(false);
    const {setIsShowProductModal, setSelectedProduct} = useAppContext();

    const handleShop = (event) => {
        event.preventDefault();
        setSelectedProduct(productData);
        setIsShowProductModal(true);
    }

  return (
    <div className='bg-white shadow-lg shadow-slate-200 h-min rounded-xl pt-4 ring-0 hover:ring-4 hover:ring-blue-500/25 duration-500 hover:shadow-none transition-all overflow-hidden'>
        <img
            src={productData.imgUrl}
            className='h-40 w-full object-contain duration-250'
            loading='lazy'
        />
        <div
            className='bg-slate-100 flex items-center px-4 py-2 mt-3 relative'
            onMouseEnter={() => {setIsHover(true)}}
            onMouseLeave={() => {setIsHover(false)}}
        >
            <Transition
                show={isHover}
                as="div"
                className="absolute right-4"
                enter="transition-all ease-out duration-2000 transform"
                enterFrom="opacity-0 translate-x-4"
                enterTo="opacity-100 translate-x-0"
                leave="transition-all ease-in duration-100 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-4"
            >
                <button
                    className='p-2 px-4 bg-blue-500 rounded-full shadow-md flex text-slate-50 hover:bg-blue-400 transition ease-out duration-500 hover:shadow'
                    onClick={handleShop}
                >
                    <ShoppingBagIcon className='h-5 me-2'/>
                    Shop
                </button>
            </Transition>
            <section>
                <h3 className='text-lg font-bold text-blue-500 -mb-1'>{productData.productName}</h3>
                <span className='text-sm opacity-75'>{`AC ${productData.price}`}</span>
            </section>

        </div>
    </div>
  )
}

export default HomeProductCard