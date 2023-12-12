import React from 'react'
import Icon from '../../misc/Icons'
import TodoCRUDBody from './TodoCRUD_Body'
import { Item } from '@/app/misc/globalInterfaces'

export default function TodoCRUD({ isOpen = false, itemData, onChange, onSubmit, onDelete, onSuggest, onDismiss, isProcessing = false }: any) {

    const [item, setItem] = React.useState(itemData);

    const _setItem = (value: any) => {
        onChange(value);
        setItem(value);
    }

    React.useEffect(() => {
        setItem(itemData);
    }, [itemData])

    return (
        <dialog id="dialogTodoCrud" className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                {isProcessing ?
                    <div className="absolute w-full h-full -m-6 flex justify-center items-center bg-base-200 z-10">
                        <span className="loading loading-dots w-[40px]"></span>
                    </div>
                    : null}

                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-[0.5rem] top-2" onClick={onDismiss}>✕</button>
                </form>

{item.id > 0 ?
                <button className="btn btn-sm btn-circle btn-ghost absolute right-[2.8rem] top-2" onClick={onDelete}>
                    <Icon
                        name='Delete'
                        height={20}
                        width={20}
                        color='transparent'
                        path={{
                            stroke: '#EF4040',
                            strokeWidth: 1.5
                        }}
                    />

                </button>

: null}
                <button className={`btn btn-sm btn-circle btn-ghost absolute top-2`}
                style={{
                    right: `${item.id > 0 ? '5.1': '2.8'}rem`
                }}
                onClick={onSuggest}>
                    <Icon
                        name='Suggest'
                        height={20}
                        width={20}
                        color='transparent'
                        path={{
                            stroke: '#7ED7C1',
                            strokeWidth: 1.5
                        }}
                    />

                </button>

                <TodoCRUDBody
                    item={item}
                    onChange={_setItem}
                />

                <div className="modal-action">
                    <button className="btn" onClick={(item.title !== null && item.title !== "") ? onSubmit : null} disabled={(item.title !== null && item.title !== "") ? false : true}>Save</button>
                </div>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={!isProcessing ? onDismiss : null}>close</button>
            </form>
        </dialog>
    )
}
