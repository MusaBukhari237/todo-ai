import { Item } from '@/app/misc/globalInterfaces';
import { itemTemplate } from '@/app/misc/globalVariables';
import React from 'react'
import Label from '../Label';

export default function TodoCRUDLabels({ labelsData, onChange }: any) {

  const [labelInput, setLabelInput] = React.useState('')

  const handleLabelAdd = (labelName: string) => {
    if (labelName.length > 0) {
      onChange([...labelsData, labelName]);
      setLabelInput('');
    }
  }

  const handleLabelDelete = (labelIndex: number) => {
    if (labelIndex > -1) {
      const tempLabels = [...labelsData];
      tempLabels.splice(labelIndex, 1);
      // tempLabels.filter((label: string, index: number) => index === labelIndex);
      console.log(tempLabels);
      onChange(tempLabels);
    }
  }

  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <span className="label label-text w-[80px]">Labels : </span>

      <div className='w-full rounded-[15px] border-[1px] border-gray-500 p-2 '>

        <input type="text"
          value={labelInput}
          className=' rounded-tl-lg rounded-tr-lg p-2 pb-2 bg-base-300/40 w-full mb-2 border-[1px] border-b-gray-500'
          placeholder='Enter Labels Here...'
          onChange={(e) => setLabelInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? handleLabelAdd((e.target as HTMLInputElement).value) : null}

        />

        <div className="flex flex-wrap flex-row items-center">

          {labelsData.length > 0 ?
            labelsData.map((label: any, index: number) => {
              return <Label
                onClick={() => handleLabelDelete(index)}
                key={`todoCRUD_Body_LabelBox_${index}`}
                title={label}
                isDeletable={true}
              />;
            })
            :
            <span className="w-full p-1.5  bg-base-300/50 rounded-tl-0 rounded-tr-0 rounded-lg text-white text-center text-sm">No Labels Here...</span>
          }

        </div>
      </div>
    </div>)
}
