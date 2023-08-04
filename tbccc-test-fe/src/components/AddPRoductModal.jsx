import React, { useState, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { useAppContext } from '../context/appContext';
import { XMarkIcon, PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/20/solid"

function AddProductModal() {
    const {isShowAddProductModal ,setIsShowAddProductModal, adminGetProducts} = useAppContext();

    // refs to handle input values
    const [pName, setPName] = useState('');
    const [pDesc, setPDesc] = useState('');
    const [pImgUrl, setPImgUrl] = useState('');
    const [pPrice, setPPrice] = useState();
    const [pQuant, setPQuant] = useState();

    const handleClose = (event) => {
        event.preventDefault();
        setIsShowAddProductModal(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:4000/products/addProduct`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            productName: pName,
            description: pDesc,
            imgUrl: pImgUrl,
            price: pPrice,
            productQuantity: pQuant
        })
      })
      .then(res => {
        console.log(res)
        return res.json
      })
      .then(data => {
            if (data) {
                setPName('');
                setPDesc('');
                setPImgUrl('');
                setPPrice();
                setPQuant();
                adminGetProducts(localStorage.getItem('token'));
                setIsShowAddProductModal(false)
            }
        })
    }

  return (
    <Transition
        show={isShowAddProductModal}
        as='div'
        className='h-screen w-full top-0 bg-blue-900/75 z-40 fixed backdrop-blur grid place-content-center'
        enter="transition-all ease-out duration-250 transform"
        enterFrom="opacity-0 -translate-y-1/4"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in duration-75 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1/4"
    >
        <div className='bg-slate-50 min-h-96 rounded-2xl flex relative shadow-xl shadow-blue-900/25'>
            <button
                className='absolute bg-blue-600 p-2 -top-4 -right-4 rounded-full shadow-lg hover:ring-8 hover:ring-blue-500/50 hover:scale-110 transition duration-500 ease-out'
                onClick={handleClose}
            >
                <XMarkIcon className='h-6 text-slate-50'/>
            </button>
                <form className='w-full bg-slate-100 p-6 py-8 flex flex-col items-center rounded-2xl' onSubmit={handleSubmit}>
                        <h2 className='text-2xl text-blue-600 font-bold mb-4'>Add a Product</h2>
            
                        <section className=' mb-4 w-full flex flex-col'>
                            <label htmlFor="pName" className='text-blue-400 me-3 text-xs'>New Product Name</label>
                            <input
                                type="text"
                                id='pName'
                                placeholder='Product Name'
                                className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                                required
                                value={pName}
                                onChange={(ev) => {setPName(ev.target.value)}}
                                />
                        </section>

                        <section className='mb-4 w-full flex flex-col'>
                            <label htmlFor='description' className='text-blue-400 me-3 text-xs'>New Product Description</label>

                            <textarea
                                id='description'
                                className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out resize-none'
                                rows={3}
                                placeholder="Describe new product..."
                                required
                                value={pDesc}
                                onChange={(ev) => {setPDesc(ev.target.value)}}
                            />
                        </section>

                        <section className='w-full flex flex-col mb-4'>
                            <label htmlFor="img-url" className='text-blue-400 me-3 text-xs'>Product Image URL</label>
                            <input
                                type="text"
                                id='img-url'
                                placeholder='add-produ.ct/image-url/here.png'
                                className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                                required
                                value={pImgUrl}
                                onChange={(ev) => {setPImgUrl(ev.target.value)}}
                                />
                        </section>

                        <div className='flex w-full gap-2 mb-8'>
                            <section className='flex flex-col'>
                                <label htmlFor='price' className='text-blue-400 text-xs'>Price</label>
                                <input
                                    type='number'
                                    id='price'
                                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                                    required
                                    value={pPrice}
                                    onChange={(ev) => {setPPrice(ev.target.value)}}
                                    placeholder="0"/>
                            </section>
                            
                            <section className='flex flex-col'>
                                <label htmlFor='pQuant' className='text-blue-400 text-xs'>Stock</label>
                                <input
                                    type='number'
                                    id='pQuant'
                                    className='bg-slate-200 p-4 py-2 rounded-lg mt-1 focus:outline-none focus:bg-white focus:shadow-lg hover:ring-2 hover:ring-blue-500/25 transition-all ease-out'
                                    required
                                    value={pQuant}
                                    onChange={(ev) => {setPQuant(ev.target.value)}}
                                    placeholder="0"/>
                            </section>
                        </div>
                        
                        <button className='w-1/2 bg-blue-500 rounded-lg text-lg text-slate-50 h-12 shadow-lg shadow-sky-600/25'
                        type='submit'
                        >Add Product</button>
                </form>               
        </div>
    </Transition>
  )
}

export default AddProductModal