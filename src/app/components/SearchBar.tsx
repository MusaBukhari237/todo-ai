'use client';

import React from 'react'

export default function SearchBar({ onChange = (result: any) => null, ...props }: any) {

    const [searchValue, setSearchValue] = React.useState("");

    const _setSearchValue = (value: string) => {
        setSearchValue(value);
        onChange(value);
    };

    return (<div className='w-full flex justify-end items-center'>
        <input type="text" placeholder="Search here..." value={searchValue} className="rounded-[10px] input input-bordered w-full" onChange={(e) => _setSearchValue(e.target.value)} />
        {
            searchValue !== "" ?
                <svg onClick={() => _setSearchValue("")} xmlns="http://www.w3.org/2000/svg" className="absolute mr-[10px] h-8 w-8 hover:bg-base-300/60 cursor-pointer p-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                : null
        }
    </div>)
}
