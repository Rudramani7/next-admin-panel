'use client';

import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  EdgeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Node gradient colors
const nodeColors: Record<string, string[]> = {
  '1': ['#4caf50', '#81c784'],       // Start
  '2': ['#2196f3', '#64b5f6'],       // Collect Data
  '3': ['#ff9800', '#ffb74d'],       // Process Data
  '4': ['#9c27b0', '#ba68c8'],       // Validate
  '5': ['#f44336', '#e57373'],       // Error handling
  '6': ['#00bcd4', '#4dd0e1'],       // Review
  '7': ['#ff5722', '#ff8a65'],       // Finish
};

// Nodes with extra details
const initialNodes: Node[] = [
  { id: '1', data: { label: '🚀 Start\nInitiate Process' }, position: { x: 0, y: 0 }, style: { width: 120, height: 80, borderRadius: 20, color: 'white', padding: 10, background: 'linear-gradient(135deg,#4caf50,#81c784)', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' } },
  { id: '2', data: { label: '📝 Collect Data\nInputs from user' }, position: { x: 250, y: -50 }, style: { width: 160, height: 80, borderRadius: 20, color: 'white', padding: 10, background: 'linear-gradient(135deg,#2196f3,#64b5f6)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' } },
  { id: '3', data: { label: '⚙️ Process Data\nCompute & Transform' }, position: { x: 500, y: 0 }, style: { width: 180, height: 80, borderRadius: 20, color: 'white', padding: 10, background: 'linear-gradient(135deg,#ff9800,#ffb74d)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' } },
  { id: '4', data: { label: '✅ Validate\nCheck for errors' }, position: { x: 750, y: -50 }, style: { width: 160, height: 80, borderRadius: 20, color: 'white', padding: 10, background: 'linear-gradient(135deg,#9c27b0,#ba68c8)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' } },
  { id: '5', data: { label: '❌ Error Handling\nRetry or Notify' }, position: { x: 750, y: 100 }, style: { width: 160, height: 80, borderRadius: 20, color: 'white', padding: 10, background: 'linear-gradient(135deg,#f44336,#e57373)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' } },
  { id: '6', data: { label: '🔍 Review\nFinal checks' }, position: { x: 1000, y: 0 }, style: { width: 160, height: 80, borderRadius: 20, color: 'white', padding: 10, background: 'linear-gradient(135deg,#00bcd4,#4dd0e1)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' } },
  { id: '7', data: { label: '🏁 Finish\nProcess Complete' }, position: { x: 1250, y: 0 }, style: { width: 160, height: 80, borderRadius: 20, color: 'white', padding: 10, background: 'linear-gradient(135deg,#ff5722,#ff8a65)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' } },
];

// Custom gradient edge matching node colors
const GradientEdge = ({ id, sourceX, sourceY, targetX, targetY, source, target }: EdgeProps) => {
  const gradientId = `grad-${id}`;
  const sourceColor = nodeColors[source]?.[0] || '#000';
  const targetColor = nodeColors[target]?.[0] || '#000';

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={sourceColor} />
          <stop offset="100%" stopColor={targetColor} />
        </linearGradient>
      </defs>
      <path
        d={`M${sourceX},${sourceY} C${sourceX + 100},${sourceY} ${targetX - 100},${targetY} ${targetX},${targetY}`}
        stroke={`url(#${gradientId})`}
        strokeWidth={4}
        fill="none"
      />
    </>
  );
};

// Edges connecting the nodes
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'custom', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'custom', animated: true },
  { id: 'e3-4', source: '3', target: '4', type: 'custom', animated: true },
  { id: 'e3-5', source: '3', target: '5', type: 'custom', animated: true },
  { id: 'e4-6', source: '4', target: '6', type: 'custom', animated: true },
  { id: 'e5-6', source: '5', target: '6', type: 'custom', animated: true },
  { id: 'e6-7', source: '6', target: '7', type: 'custom', animated: true },
];

export default function DetailedGradientGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const onConnect = (connection: Connection) =>
    setEdges((eds) =>
      addEdge({ ...connection, type: 'custom', animated: true }, eds)
    );

  const handleMouseEnter = (node: Node) => setTooltip(`${node.data.label}`);
  const handleMouseLeave = () => setTooltip(null);

  return (
    <div style={{ width: '100%', height: 700, position: 'relative' }}>
      <ReactFlow
        nodes={nodes.map((n) => ({ ...n, onMouseEnter: () => handleMouseEnter(n), onMouseLeave: handleMouseLeave }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        edgeTypes={{ custom: GradientEdge }}
      >
        <MiniMap nodeColor={(node) => nodeColors[node.id]?.[0] || '#aaa'} />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>

      {tooltip && (
        <div style={{ position: 'absolute', top: 10, left: 10, padding: 10, background: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: 6 }}>
          {tooltip}
        </div>
      )}
    </div>
  );
}
