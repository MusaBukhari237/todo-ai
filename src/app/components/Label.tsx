import React from 'react'

export default function Label({ title, isDeletable = false, ...props }: any) {
    return (
        <div
            className={`flex flex-row justify-between gap-1 items-center cursor-pointer text-[10px] font-semibold px-3 py-1 m-1 rounded-xl border-[1px] bg-base-100 bg-opacity-40 hover:bg-opacity-10 truncate`}
            {...props}
        >
            <span>
                {title}
            </span>
            {
                isDeletable ?

                    <button className='-mr-2 h-[15px] w-[15px] flex justify-center items-center rounded-[50px] bg-gray-500/40'>
                        <span>✕</span>
                    </button>
                    : null
            }
        </div>
    )
}
