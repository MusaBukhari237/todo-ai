import React from 'react'
import { Priorities, Statuses } from '../misc/globalVariables'
import Label from './Label'

export default function TodoBox({ _key = 0, title, description, dateTime, priority = 0, status = 0, labels = [], onClick = () => null, ...props }: any) {

    return (
        <div key={_key} className='cursor-pointer text-current bg-opacity-20 bg-gray-500 rounded-[20px] p-6 w-full flex flex-col gap-2' onClick={onClick}>
            <div className="flex flex-row gap-1 justify-between items-center">
                <div className="flex flex-row gap-1 items-center">
                    <span className={`text-[10px] font-semibold truncate px-3 py-1 m-1 rounded-xl cursor-pointer hover:bg-opacity-80 border-[1px] ${Statuses[status].style}`}>{Statuses[status].title}</span>
                    <time className=''>{dateTime}</time>
                </div>
                <span className={`text-[10px] font-semibold truncate px-3 py-1 m-1 rounded-xl cursor-pointer hover:bg-opacity-80 ${Priorities[priority].style}`}>{Priorities[priority].title}</span>
            </div>
            <h3 className='mb-2 text-[20px] font-bold truncate'>{title}</h3>
            <div className='flex justify-center m-2'>
                <hr className='w-[60px] h-[4px] bg-current rounded-[50px]' />
            </div>
            <span className='leading-normal line-clamp-3'>{description}</span>
            <div className="flex flex-wrap justify-start mt-2">
                {labels.map((item: any, index: number) => <Label
                    key={`${_key}_label_${index}`}
                    title={item} />
                )}
            </div>
        </div>
    )
}
