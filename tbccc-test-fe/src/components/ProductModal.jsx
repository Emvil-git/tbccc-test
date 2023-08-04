import React from 'react';
import { Transition } from '@headlessui/react';
import { useAppContext } from '../context/appContext';
import { XMarkIcon, PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/20/solid"

function ProductModal() {
    const {isShowProductModal, setIsShowProductModal, selectedProduct, user} = useAppContext();
    const [quantity, setQuantity] = useState(0);

    const handleClose = (event) => {
        event.preventDefault();
        setIsShowProductModal(false)
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
                                        <button className='bg-blue-300 p-1 rounded-lg  shadow shadow-sky-600/25 w-2/6'>
                                            <MinusSmallIcon className='h-8 w-full'/>
                                        </button>
                                        <span className="bg-slate-50 rounded-lg flex justify-center items-center text-xl w-2/4 shadow-inner shadow-sky-700/25 font-bold">9</span>
                                        <button className='bg-blue-300 p-1 rounded-lg shadow shadow-sky-600/25 w-2/6'>
                                            <PlusSmallIcon className='h-8 w-full'/>
                                        </button>
                                    </div>
                                    <section className='my- me-4 text-right'>
                                        <p className='text-blue-400 text-xs'>Subtotal</p>
                                        <p className='text-2xl -mt-1'>900</p>
                                    </section>
                                </div>
                                <button className='w-full bg-blue-500 rounded-lg text-lg text-slate-50 h-12 shadow-lg shadow-sky-600/25'>Add To Cart</button>
                                
                            </div> :
                            <div className="product__add-section d-flex justify-content-end py-3 bg-light">
                                <h6>*YOU CANNOT BUY PRODUCTS AS AN ADMIN</h6>
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