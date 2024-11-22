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
    type: "group",
    position: { x: 0, y: 0 },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: "A-1",
    type: "input",
    data: { label: "Child Node 1" },
    position: { x: 10, y: 10 },
    parentId: "A",
    extent: "parent",
  },
  {
    id: "A-2",
    data: { label: "Child Node 2" },
    position: { x: 10, y: 90 },
    parentId: "A",
    extent: "parent",
  },
  {
    id: "B",
    type: "output",
    position: { x: -100, y: 200 },
    data: null,
    style: {
      width: 170,
      height: 140,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "B-1",
    data: { label: "Child 1" },
    position: { x: 50, y: 10 },
    parentId: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: "B-2",
    data: { label: "Child 2" },
    position: { x: 10, y: 90 },
    parentId: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: "B-3",
    data: { label: "Child 3" },
    position: { x: 100, y: 90 },
    parentId: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: "C",
    type: "output",
    position: { x: 100, y: 200 },
    data: { label: "Node C" },
  },
];
const initialEdges = [
  { id: "a1-a2", source: "A-1", target: "A-2" },
  { id: "a2-b", source: "A-2", target: "B" },
  { id: "a2-c", source: "A-2", target: "C" },
  { id: "b1-b2", source: "B-1", target: "B-2" },
  { id: "b1-b3", source: "B-1", target: "B-3" },
];
function Flow() {
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
        <Panel position="top-left">top-left</Panel>

        <Background color="black" />
        <Controls />
        <MiniMap nodeColor="black" nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
}

export default Flow;
