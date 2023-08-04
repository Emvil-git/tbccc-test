import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { useAppContext } from '../context/appContext';
import { XMarkIcon, PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/20/solid";
import { useNavigate } from 'react-router-dom';

function ProductModal() {
    const {isShowProductModal, setIsShowProductModal, selectedProduct, user, getListedProducts, refreshUserDetails} = useAppContext();
    const [quantity, setQuantity] = useState(0);

    const navigate = useNavigate();

    const handleClose = (event) => {
        event.preventDefault();
        setQuantity(0)
        setIsShowProductModal(false)
    }

    const increaseQuantity = (event) => {
        event.preventDefault();

        if(quantity < selectedProduct.productQuantity) {
            setQuantity(quantity + 1);
        }
    }

    const decreaseQuantity = (event) => {
        event.preventDefault();
        
        if(quantity !== 0) {
            setQuantity(quantity - 1);
        }
    }

    const handleAddToCart = (ev) => {
        ev.preventDefault();

        if (user === null) {
            navigate('/login');
            setIsShowProductModal(false);
        } else {
            const token = localStorage.getItem('token')

            console.log(token)

            fetch('http://localhost:4000/users/cart/add', {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body:JSON.stringify(
                {
                    productId: selectedProduct._id,
                    quantity: quantity,
                }
              )
            })
            .then(res => {
                console.log(res)
                console.log('wee')
                return res.json()
            })
            .then(data => {
              refreshUserDetails(token);
              getListedProducts();
              setQuantity(0)
            })
        }
    }

  return (
    <Transition
        show={isShowProductModal}
        as='div'
        className='h-screen w-full top-0 bg-blue-900/75 z-40 fixed backdrop-blur grid place-content-center'
        enter="transition-all ease-out duration-250 transform"
        enterFrom="opacity-0 -translate-y-1/4"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in duration-75 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1/4"
    >
            <div className='bg-slate-50 w-max min-h-96 rounded-2xl flex relative shadow-xl shadow-blue-900/25'>
                <button
                    className='absolute bg-blue-600 p-2 -top-4 -right-4 rounded-full shadow-lg hover:ring-8 hover:ring-blue-500/50 hover:scale-110 transition duration-500 ease-out'
                    onClick={handleClose}
                >
                    <XMarkIcon className='h-6 text-slate-50'/>
                </button>
                {selectedProduct && 
                <>
                    <div className='flex justify-center items-center p-6'>
                        <img
                            src={selectedProduct.imgUrl} 
                            className='w-96'
                            alt="" />
                    </div>
                    <div className='w-96 bg-slate-200 p-6 py-8 flex flex-col justify-between rounded-e-2xl'>
                        <div>
                            <h2 className='text-2xl text-blue-600 font-bold'>{selectedProduct.productName}</h2>
                            <div className='flex gap-2 w-max text-sm mt-2'>
                                <p className='text-slate-800/75 bg-blue-200 px-3 rounded-full'>{`AC ${selectedProduct.price}`}</p>
                                <p className='text-slate-800/75 bg-blue-200 px-3 rounded-full'>{`${selectedProduct.productQuantity} in Stock`}</p>

                            </div>
                            
                            <section className='mb-12 mt-4'>
                                <p className='text-blue-400 me-3 text-xs'>Description</p>
                                <p className='text-sm'>{selectedProduct.description}</p>
                            </section>
                        </div>
                        {
                            (!user || !user.isAdmin) ? 
                            <div>
                                
                                <div className='grid grid-cols-2 mb-3'>
                                    <div className="flex w-full justify-center gap-1">
                                        <button className='bg-blue-300 p-1 rounded-lg  shadow shadow-sky-600/25 w-2/6'
                                        onClick={decreaseQuantity}
                                        >
                                            <MinusSmallIcon className='h-8 w-full'/>
                                        </button>
                                        <span className="bg-slate-50 rounded-lg flex justify-center items-center text-xl w-2/4 shadow-inner shadow-sky-700/25 ">
                                            {quantity}
                                        </span>
                                        <button className='bg-blue-300 p-1 rounded-lg shadow shadow-sky-600/25 w-2/6'
                                        onClick={increaseQuantity}
                                        >
                                            <PlusSmallIcon className='h-8 w-full'/>
                                        </button>
                                    </div>
                                    <section className='my- me-4 text-right'>
                                        <p className='text-blue-400 text-xs'>Subtotal</p>
                                        <p className='text-2xl font-bold -mt-1'>{quantity * selectedProduct.price}</p>
                                    </section>
                                </div>
                                <button className='w-full bg-blue-500 rounded-lg text-lg text-slate-50 h-12 shadow-lg shadow-sky-600/25'
                                    onClick={handleAddToCart}
                                >Add To Cart</button>
                                
                            </div> :
                            <div className="w-full text-center text-slate-400">
                                <h6>Only Customers can purchase items</h6>
                            </div>
                        }
                    </div>
                </>                
                }

            </div>
    </Transition>
  )
}

export default ProductModal