"use client";

import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

const initialNodes = [
  {
    id: "A",
    data: { label: "Phanerozoic" },
    position: { x: -300, y: 100 },
    style: {
      backgroundColor: "rgba(255, 153, 0, 0.2)",
      height: 500,
      width: 900,
    },
  },
  {
    id: "B",
    data: { label: "Paleozoic" },
    position: { x: -300, y: 100 },
    sourcePosition: "right",
    parentId: "A",
    extent: "parent",
    style: {
      backgroundColor: "rgba(255, 153, 0, 0.2)",
      height: 200,
      width: 300,
    },
  },
  {
    id: "C",
    data: { label: "Mesozoic" },
    position: { x: -300, y: 100 },
    parentId: "A",
    extent: "parent",
    style: {
      backgroundColor: "rgba(255, 153, 0, 0.2)",
      height: 200,
      width: 300,
    },
  },
  {
    id: "D",
    data: { label: "Cenozoic" },
    position: { x: -300, y: 100 },
    parentId: "A",
    extent: "parent",
    style: {
      backgroundColor: "rgba(255, 153, 0, 0.2)",
      height: 200,
      width: 300,
    },
  },
];
const initialEdges = [];
function GeologicTimeFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  return (
    <div style={{ height: "50vh", width: "50vw" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel position="top-left">Dinosaur Classification</Panel>

        <Background color="black" />
        <Controls />
        <MiniMap nodeColor="black" nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
}

export default GeologicTimeFlow;
