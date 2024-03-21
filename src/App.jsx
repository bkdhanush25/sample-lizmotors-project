import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, MarkerType } from 'reactflow';

import 'reactflow/dist/base.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initNodes = [
  {
    id: '1',
    type: 'custom',
    data: { name: 'start', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    position: { x: 0, y: 400 },
  },
  {
    id: '2',
    type: 'custom',
    data: { name: 'Research', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 200, y: 0 },
  },
  {
    id: '3',
    type: 'custom',
    data: { name: 'Planning', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 200, y: 200 },
  },
  {
    id: '4',
    type: 'custom',
    data: { name: 'Designing', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 200, y: 400 },
  },
  {
    id: '5',
    type: 'custom',
    data: { name: 'Manufacturing', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 200, y: 600 },
  },
  {
    id: '6',
    type: 'custom',
    data: { name: 'Sales/Marketing', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 200, y: 800 },
  },
  {
    id: '7',
    type: 'custom',
    data: { name: 'External', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: -50 },
  },
  {
    id: '8',
    type: 'custom',
    data: { name: 'Inernal', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: 50 },
  },
  {
    id: '9',
    type: 'custom',
    data: { name: 'PRD', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: 150 },
  },
  {
    id: '10',
    type: 'custom',
    data: { name: 'Specs', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: 250 },
  },
  {
    id: '11',
    type: 'custom',
    data: { name: 'Hardware', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: 350 },
  },
  {
    id: '12',
    type: 'custom',
    data: { name: 'Software', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: 450 },
  },
  {
    id: '13',
    type: 'custom',
    data: { name: 'Material', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: 550 },
  },
  {
    id: '14',
    type: 'custom',
    data: { name: 'Production', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: 650 },
  },
  {
    id: '15',
    type: 'custom',
    data: { name: 'Online', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: 750 },
  },
  {
    id: '16',
    type: 'custom',
    data: { name: 'Dealership', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 600, y: 850 },
  },
  {
    id: '17',
    type: 'custom',
    data: { name: 'B2C', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 1000, y: -100 },
  },
  {
    id: '18',
    type: 'custom',
    data: { name: 'B2C', bgcolor:'#FFC2C2' },
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 1000, y: 0 },
  },
  
];

const initEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e1-5',
    source: '1',
    target: '5',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e1-6',
    source: '1',
    target: '6',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-7',
    source: '2',
    target: '7',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-8',
    source: '2',
    target: '8',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e3-9',
    source: '3',
    target: '9',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e3-10',
    source: '3',
    target: '10',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-11',
    source: '4',
    target: '11',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-12',
    source: '4',
    target: '12',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e5-13',
    source: '5',
    target: '13',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e5-14',
    source: '5',
    target: '14',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e6-15',
    source: '6',
    target: '15',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e6-16',
    source: '6',
    target: '16',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e7-17',
    source: '7',
    target: '17',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e7-18',
    source: '7',
    target: '18',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback((params) => {
    const edge = {
      ...params,
      type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
      },
      
    };
    setEdges((eds) => addEdge(edge, eds));
  }, []);
  
  
  return (
    <div className='w-[100vw] h-[100vh]'>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      className="bg-teal-50"
    >
      <MiniMap pannable zoomable />
      <Controls />
    </ReactFlow>
    </div>
  );
};

export default Flow;
