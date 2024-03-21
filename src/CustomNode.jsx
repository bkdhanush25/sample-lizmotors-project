import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }) {
  const [ isShown, setIsShown ] = useState(null);
  return (
<div className='relative'>
{isShown && <p className='text-lg absolute top-[-30px]'>Hello</p>}
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400" onMouseEnter={() => setIsShown(data.name)}
    onMouseLeave={() => setIsShown(null)}>
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-gray-500">{data.job}</div>
        </div>
        
      </div>
      
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-teal-500 rounded-full" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-teal-500 rounded-full" />
      
    </div>
    
    </div>
  );
}

export default memo(CustomNode);