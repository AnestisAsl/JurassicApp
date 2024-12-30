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
    data: { label: "Bird Hipped" },
    position: { x: -300, y: 100 },
    style: {
      backgroundColor: "rgba(255, 153, 0, 0.2)",
      height: 500,
      width: 900,
    },
  },
  {
    id: "B",
    data: { label: "Lizard Hipped" },
    position: { x: 700, y: 100 },
    style: {
      backgroundColor: "rgba(255, 102, 0, 0.2)",
      height: 500,
      width: 900,
    },
  },
  {
    id: "A-1",
    type: "input",
    data: { label: "Ornithischians" },
    position: { x: 380, y: 80 },
    parentId: "A",
    extent: "parent",
  },
  {
    id: "B-1",
    type: "input",
    data: { label: "Saurischians" },
    position: { x: 380, y: 80 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "A-2",
    data: { label: "Cerapodans" },
    position: { x: 150, y: 200 },
    parentId: "A",
    extent: "parent",
  },
  {
    id: "B-2",
    data: { label: "Theropods" },
    position: { x: 150, y: 200 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "A-3",
    data: { label: "Thyrophans" },
    position: { x: 600, y: 200 },
    parentId: "A",
    extent: "parent",
  },
  {
    id: "B-3",
    data: { label: "Sauropodomorphs" },
    position: { x: 600, y: 200 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "A-4",
    data: { label: "Ornithopods" },
    position: { x: 50, y: 270 },
    parentId: "A",
    extent: "parent",
  },
  {
    id: "B-4",
    data: { label: "Tetanurans" },
    position: { x: 50, y: 270 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "A-5",
    data: { label: "Marginocephalians" },
    position: { x: 300, y: 270 },
    parentId: "A",
    extent: "parent",
  },
  {
    id: "B-5",
    data: { label: "Ceratosaurs" },
    position: { x: 300, y: 270 },
    parentId: "B",
    extent: "parent",
  },
  {
    id: "A-6",
    data: { label: "Pachycephalosaurs" },
    position: { x: 250, y: 350 },
    parentId: "A",
    extent: "parent",
    style: {
      width: 120,
    },
  },
  {
    id: "B-6",
    data: { label: "Sauropods" },
    position: { x: 520, y: 270 },
    parentId: "B",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "A-7",
    data: { label: "Ceratopsians" },
    position: { x: 380, y: 350 },
    parentId: "A",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "B-7",
    data: { label: "Prosauropods" },
    position: { x: 650, y: 270 },
    parentId: "B",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "B-8",
    data: { label: "Plateosauridae" },
    position: { x: 770, y: 270 },
    parentId: "B",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "A-8",
    data: { label: "Iguanodontians" },
    position: { x: 10, y: 350 },
    parentId: "A",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "B-9",
    data: { label: "Iguanodontians" },
    position: { x: 10, y: 350 },
    parentId: "B",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "A-9",
    data: { label: "Hadrosaurs" },
    position: { x: 120, y: 350 },
    parentId: "A",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "B-10",
    data: { label: "Hadrosaurs" },
    position: { x: 120, y: 350 },
    parentId: "B",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "B-11",
    data: { label: "Pachycephalosaurs" },
    position: { x: 230, y: 350 },
    parentId: "B",
    extent: "parent",
    style: {
      width: 120,
    },
  },
  {
    id: "A-10",
    data: { label: "Stegosaurs" },
    position: { x: 550, y: 270 },
    parentId: "A",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "A-11",
    data: { label: "Ankylosaurs" },
    position: { x: 700, y: 270 },
    parentId: "A",
    extent: "parent",
    style: {
      width: 100,
    },
  },
  {
    id: "DinosaursId",
    position: { x: 550, y: -100 },
    data: { label: "Dinosaurs" },
  },
];
const initialEdges = [
  { id: "a1-a2", source: "A-1", target: "A-2" },
  { id: "a1-a3", source: "A-1", target: "A-3" },
  { id: "a2-a4", source: "A-2", target: "A-4" },
  { id: "a2-a5", source: "A-2", target: "A-5" },
  { id: "a5-a6", source: "A-5", target: "A-6" },
  { id: "a5-a7", source: "A-5", target: "A-7" },
  { id: "a4-a8", source: "A-4", target: "A-8" },
  { id: "a4-a9", source: "A-4", target: "A-9" },
  { id: "a3-a10", source: "A-3", target: "A-10" },
  { id: "a3-a11", source: "A-3", target: "A-11" },

  { id: "b1-b2", source: "B-1", target: "B-2" },
  { id: "b1-b3", source: "B-1", target: "B-3" },
  { id: "b2-b4", source: "B-2", target: "B-4" },
  { id: "b2-b5", source: "B-2", target: "B-5" },
  { id: "b4-b9", source: "B-4", target: "B-9" },
  { id: "b4-b10", source: "B-4", target: "B-10" },
  { id: "b4-b11", source: "B-4", target: "B-11" },
  { id: "b3-b6", source: "B-3", target: "B-6" },
  { id: "b3-b7", source: "B-3", target: "B-7" },
  { id: "b3-b8", source: "B-3", target: "B-8" },

  { id: "A-DinosaursId", source: "DinosaursId", target: "A" },
  { id: "B-DinosaursId", source: "DinosaursId", target: "B" },
];
function DinosaurClassificationFlow() {
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
        <Panel position="top-left">Dinosaur Classification</Panel>

        <Background color="black" />
        <Controls />
        <MiniMap nodeColor="black" nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
}

export default DinosaurClassificationFlow;
