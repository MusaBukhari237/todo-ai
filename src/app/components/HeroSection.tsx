import React from 'react'
import SearchBar from './SearchBar'
import Icon from '../misc/Icons'

export default function HeroSection({ searchValue = (result: any) => null, onAdd, onRefresh, ...props }: any) {

    return (<>
        <div className='h-[16rem] w-full flex justify-center items-center'>
            <div className="lg:w-[60%] md:w-[80%] w-[95%] flex flex-row gap-2 p-2 bg-opacity-20 bg-gray-500  rounded-[14px]">
                <SearchBar onChange={searchValue} />
                <button onClick={onRefresh} className="btn btn-info bg-opacity-40 py-2 rounded-[10px]">
                    <Icon
                        name="Refresh2"
                        width={25}
                        height={25}
                    />
                </button>
                <button onClick={onAdd} className="btn btn-info bg-opacity-40 py-2 rounded-[10px]">Add Todo</button>
            </div>
        </div>
    </>
    )
}
