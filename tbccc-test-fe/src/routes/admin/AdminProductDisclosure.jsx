import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { classNames } from './Admin';
import { useAppContext } from '../../context/appContext';

function AdminProductDisclosure({product}) {

    const [isEditing, setIsEditing] = useState(false);
    const [pName, setPName] = useState(product.productName);
    const [pDesc, setPDesc] = useState(product.description);
    const [pPrice, setPPrice] = useState(product.price);
    const [pStocks, setPStocks] = useState(product.productQuantity);

    const {adminGetProducts} = useAppContext();

    const handleProductUpdate = (ev) => {
        ev.preventDefault();

        const token = localStorage.getItem('token');

        fetch(`http://localhost:4000/products/updateInfo/${product._id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                productName: pName,
                description: pDesc,
                price: pPrice,
                productQuantity: pStocks
            })
        })
        .then(res => res.json())
        .then(data => {
            setIsEditing(false);
            adminGetProducts(token);        
        })
    }

    const handleEdit = (event) => {
        event.preventDefault();
        setIsEditing(true)
    }
    
    const handleUnlist = (ev) => {
        ev.preventDefault();
    
        fetch(`http://localhost:4000/products/unlist/${product._id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            adminGetProducts(localStorage.getItem('token'))
        })
    }

    const handleRelist = (ev) => {
        ev.preventDefault();
    
        fetch(`http://localhost:4000/products/list/${product._id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            adminGetProducts(localStorage.getItem('token'))
        })
    }

    const handleDelete = (ev) => {
        ev.preventDefault();
    
        fetch(`http://localhost:4000/products/delete/${product._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            adminGetProducts(localStorage.getItem('token'))
        })
    }

  return (
    <Disclosure
        as="div"
        className="w-full rounded-lg shadow-md overflow-hidden"
    >
        <Disclosure.Button className="py-3 px-6 flex flex-col bg-white z-20 w-full">
            <span className='text-blue-700'>{product.productName}</span>
            <span className={`text-sm ${product.isListed ? "text-green-400" : "text-red-400"}`}>{product.isListed ? 'Listed' : 'Unlisted'}</span>
        </Disclosure.Button>
        <Disclosure.Panel
        as='form'
        className="bg-slate-100 py-3 pt-4 px-6 text-sm rounded-b-lg z-10"
        >
             <section className='mb-2 flex flex-col'>
                <label htmlFor='productName' className='text-blue-400 me-3 text-xs'>Product Name</label>
                <input
                    type='text'
                    id='productName'
                    className={classNames('focus:outline-none transition-all ease-out duration-75' ,isEditing ? 'bg-slate-200 px-4 py-1 rounded mt-1 focus:shadow-md focus:bg-white' : 'bg-slate-100 cursor-default')}
                    readOnly={!isEditing}
                    placeholder="Enter product name"
                    value={pName}
                    required
                    onChange={(ev) => {setPName(ev.target.value)}}/>
            </section>

             <section className='mb-4 flex flex-col'>
                <label htmlFor='description' className='text-blue-400 me-3 text-xs'>Description</label>
                {isEditing ? 
                    <textarea
                    type='text'
                    id='description'
                    className='focus:outline-none bg-slate-200 px-4 py-1 rounded mt-1 focus:shadow-md focus:bg-white resize-none transition-all ease-out duration-75'
                    rows={3}
                    placeholder="Enter product name"
                    value={pDesc}
                    required
                    onChange={(ev) => {setPDesc(ev.target.value)}}/> :
                    <p >{product.description}</p>
                }
            </section>
            
            <div className='flex gap-4 justify-between w-1/4 mb-4'>
                <section>
                    <label htmlFor='productName' className='text-blue-400 me-3 text-xs'>Price</label>
                    <input
                        type='number'
                        id='productName'
                        className={classNames('focus:outline-none transition-all ease-out duration-75' ,isEditing ? 'bg-slate-200 px-4 py-1 rounded mt-1 focus:shadow-md focus:bg-white' : 'bg-slate-100 cursor-default')}
                        readOnly={!isEditing}
                        placeholder="Enter product name"
                        value={pPrice}
                        required
                        onChange={(ev) => {setPPrice(ev.target.value)}}/>
                </section>
                <section>
                    <label htmlFor='productName' className='text-blue-400 me-3 text-xs'>Stock</label>
                    <input
                        type='number'
                        id='productName'
                        className={classNames('focus:outline-none transition-all ease-out' ,isEditing ? 'bg-slate-200 px-4 py-1 rounded mt-1 focus:shadow-md focus:bg-white' : 'bg-slate-100 cursor-default')}
                        readOnly={!isEditing}
                        placeholder="Enter product name"
                        value={pStocks}
                        required
                        onChange={(ev) => {setPStocks(ev.target.value)}}/>
                </section>
            </div>
            <div className='flex'> 
                {
                    isEditing ? <button
                        onClick={handleProductUpdate}
                        className='border border-slate-800 bg-slate-800 text-slate-50 text-slate-50 rounded-md px-4 py-1 mt-2 mb-2 me-2'
                    >
                        Update Info
                    </button> : 
                    <button
                        onClick={handleEdit}
                        className='border border-slate-800 bg-slate-800 text-slate-50 text-slate-50 rounded-md px-4 py-1 mt-2 mb-2 me-2'
                    >
                        Edit Info
                    </button>
                }
                {product.isListed ? 
                    <button
                        className='border border-slate-800 text-slate-800 text-slate-50 rounded-md px-4 py-1 mt-2 mb-2'
                        onClick={handleUnlist}
                    >
                        Unlist Item
                    </button> : 
                    <button
                        className='border border-slate-800 text-slate-800 text-slate-50 rounded-md px-4 py-1 mt-2 mb-2'
                        onClick={handleRelist}
                    >
                        Re-list Item
                    </button>
                    
                }
                <button
                    className='border border-red-500 text-red-500 text-slate-50 rounded-md px-4 py-1 mt-2 mb-2 ms-auto'
                    onClick={handleDelete}
                >
                    Delete Item
                </button>
            </div>
        </Disclosure.Panel>
    </Disclosure>
  )
}

export default AdminProductDisclosure