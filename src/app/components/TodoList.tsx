import React from 'react'
import TodoBox from './TodoBox'
import Search from '../misc/Search'

export default function TodoList({ itemsData, searchValue, onSelect, ...props }: any) {

    const [items, setItems] = React.useState(itemsData);
    const [bkpItems, setBkpItems] = React.useState(itemsData);

    React.useEffect(() => {
        const tempSearch = Search(items, bkpItems, ["description", "title", "dateTime"], searchValue);
        setItems(tempSearch);
    }, [searchValue]);

    React.useEffect(() => {
        setItems(itemsData);
        setBkpItems(itemsData);
    }, [itemsData]);

    return (
        <div className='lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-5 py-2 w-full grid  gap-4 '>

            {
                items.map((item: any, index: number) =>
                    <TodoBox
                        onClick={() => onSelect(item)}
                        key={`todobox_${index}`}
                        _key={`todobox_${index}`}
                        title={item.title}
                        description={item.description}
                        dateTime={item.dateTime}
                        priority={item.priority}
                        status={item.status}
                        labels={item.labels}
                    />
                )
            }

        </div>
    )

}