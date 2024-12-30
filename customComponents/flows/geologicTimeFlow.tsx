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
  MarkerType,
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
    position: { x: 50, y: 50 },
    sourcePosition: "right",
    targetPosition: "left",
    parentId: "A",
    extent: "parent",
    style: {
      backgroundColor: "rgba(255, 153, 0, 0.2)",
      height: 440,
      width: 200,
    },
  },
  {
    id: "B-1",
    data: { label: "Cambrian" },
    position: { x: 25, y: 30 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "B-2",
    data: { label: "Ordovician" },
    position: { x: 25, y: 100 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "B-3",
    data: { label: "Silurian" },
    position: { x: 25, y: 170 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "B-4",
    data: { label: "Devonian" },
    position: { x: 25, y: 240 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "B-5",
    data: { label: "Carboniferous" },
    position: { x: 25, y: 310 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "B-6",
    data: { label: "Permian" },
    position: { x: 25, y: 380 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "C",
    data: { label: "Mesozoic" },
    position: { x: 350, y: 50 },
    parentId: "A",
    extent: "parent",
    sourcePosition: "right",
    targetPosition: "left",
    style: {
      backgroundColor: "rgba(255, 153, 0, 0.2)",
      height: 280,
      width: 200,
    },
  },
  {
    id: "C-1",
    data: { label: "Triassic" },
    position: { x: 25, y: 50 },
    parentId: "C",
    extent: "parent",
  },
  {
    id: "C-2",
    data: { label: "Jurassic" },
    position: { x: 25, y: 130 },
    parentId: "C",
    extent: "parent",
  },
  {
    id: "C-3",
    data: { label: "Cretaceous" },
    position: { x: 25, y: 210 },
    parentId: "C",
    extent: "parent",
  },
  {
    id: "D",
    data: { label: "Cenozoic" },
    position: { x: 650, y: 50 },
    parentId: "A",
    extent: "parent",
    sourcePosition: "right",
    targetPosition: "left",
    style: {
      backgroundColor: "rgba(255, 153, 0, 0.2)",
      height: 280,
      width: 200,
    },
  },
  {
    id: "D-1",
    data: { label: "Paleogene" },
    position: { x: 25, y: 50 },
    parentId: "D",
    extent: "parent",
  },
  {
    id: "D-2",
    data: { label: "Neogene" },
    position: { x: 25, y: 130 },
    parentId: "D",
    extent: "parent",
  },
  {
    id: "D-3",
    data: { label: "Quaternary" },
    position: { x: 25, y: 210 },
    parentId: "D",
    extent: "parent",
  },
];
const initialEdges = [
  {
    id: "B-C",
    source: "B",
    target: "C",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },
  {
    id: "C-D",
    source: "C",
    target: "D",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },

  {
    id: "B1-B2",
    source: "B-1",
    target: "B-2",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },
  {
    id: "B2-B3",
    source: "B-2",
    target: "B-3",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },
  {
    id: "B3-B4",
    source: "B-3",
    target: "B-4",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },
  {
    id: "B4-B5",
    source: "B-4",
    target: "B-5",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },
  {
    id: "B5-B6",
    source: "B-5",
    target: "B-6",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },

  {
    id: "C1-C2",
    source: "C-1",
    target: "C-2",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },
  {
    id: "C2-C3",
    source: "C-2",
    target: "C-3",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },

  {
    id: "D1-D2",
    source: "D-1",
    target: "D-2",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },
  {
    id: "D2-D3",
    source: "D-2",
    target: "D-3",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: "black",
    },
    style: {
      strokeWidth: 2,
      stroke: "black",
    },
  },
];
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
    <div style={{ height: "50vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel position="top-left">Geologic Time</Panel>

        <Background color="black" />
        <Controls />
        <MiniMap nodeColor="black" nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
}

export default GeologicTimeFlow;
