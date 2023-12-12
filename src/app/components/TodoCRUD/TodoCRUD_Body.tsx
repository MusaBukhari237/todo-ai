import { Item } from '@/app/misc/globalInterfaces';
import { Priorities, Statuses } from '@/app/misc/globalVariables'
import React from 'react'
import TodoCRUDLabels from './TodoCRUD_Labels';

export default function TodoCRUDBody({ item, onChange }: { item: Item, onChange: any }) {

  return (
    <div className='flex flex-col gap-4'>

      <input
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
        className="font-bold text-lg bg-transparent"
        placeholder='Enter Your Title Here...'
      />

      <div className="flex flex-wrap flex-row gap-2 items-center">
        <span className="label label-text">Status : </span>
        <div className="flex flex-wrap flex-row items-center">
          {Object.keys(Statuses).map((statusItem: any, index: number) => {
            const status = Statuses[statusItem];
            return <span
              onClick={() => onChange({ ...item, status: Number(statusItem) })}
              key={`todoCRUD_Body_StatusBox_${index}`}
              className={`text-[10px] h-auto font-semibold truncate border-[1px] px-3 py-1 m-1 rounded-[50px] cursor-pointer hover:bg-opacity-80 ${item.status === Number(statusItem) ? 'mb-5 shadow-lg' : ''} ${status.style}`}
            >
              {status.title}
            </span>;
          }
          )}

        </div>
      </div>

      <textarea
        value={item.description}
        onChange={(e) => onChange({ ...item, description: e.target.value })}
        className="textarea w-full textarea-bordered h-24"
        placeholder="eg: Cook something good, like Risotto or Pasta or something delicious."
      ></textarea>


      <div className="flex flex-wrap flex-row gap-2 items-center">
        <span className="label label-text">Priority : </span>
        <div className="flex flex-wrap flex-row items-center">
          {Object.keys(Priorities).map((priorityItem: any, index: number) => {
            const priority = Priorities[priorityItem];
            return <span
              onClick={() => onChange({ ...item, priority: Number(priorityItem) })}
              key={`todoCRUD_Body_PriorityBox_${index}`}
              className={`text-[10px] h-auto font-semibold truncate px-3 py-1 m-1 rounded-[50px] cursor-pointer hover:bg-opacity-80 ${item.priority === Number(priorityItem) ? 'mb-5 shadow-lg' : ''} ${priority.style}`}
            >
              {priority.title}
            </span>;
          }
          )}

        </div>
      </div>


      <TodoCRUDLabels
        labelsData={item.labels}
        onChange={(value: any) => onChange({...item, labels: value})}
      />



    </div>
  )
}
