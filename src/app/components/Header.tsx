import React from 'react'
import SearchBar from './SearchBar'

export default function Header() {
    return (
        <div className='h-[16rem] w-full flex justify-center items-center'>
            <div className="w-[80%] join p-2 bg-opacity-30 bg-gray-200 rounded-[14px]">
                <input type="text" placeholder="Type here" className="rounded-[10px] input input-bordered w-full join-item" />
                <button className="btn btn-neutral join-item py-2 rounded-[10px]">Neutral</button>
            </div>
        </div>
    )
}
