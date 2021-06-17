import React, {CSSProperties, MouseEvent, useState} from 'react';

import ReactFlow, {
  addEdge,
  ArrowHeadType,
  Background,
  Connection,
  Controls,
  Edge,
  Elements,
  FlowElement,
  FlowTransform,
  isNode,
  MiniMap,
  Node,
  OnLoadParams,
  Position,
  removeElements,
  SnapGrid,
} from 'react-flow-renderer';

import './index.css';
import ColorSelectorNode from "./ColorSelectorNode";

const onNodeDragStart = (_: MouseEvent, node: Node) => console.log('drag start', node);
const onNodeDrag = (_: MouseEvent, node: Node) => console.log('drag', node);
const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
const onNodeDoubleClick = (_: MouseEvent, node: Node) => console.log('node double click', node);
const onPaneClick = (event: MouseEvent) => console.log('pane click', event);
const onPaneScroll = (event?: MouseEvent) => console.log('pane scroll', event);
const onPaneContextMenu = (event: MouseEvent) => console.log('pane context menu', event);
const onSelectionDrag = (_: MouseEvent, nodes: Node[]) => console.log('selection drag', nodes);
const onSelectionDragStart = (_: MouseEvent, nodes: Node[]) => console.log('selection drag start', nodes);
const onSelectionDragStop = (_: MouseEvent, nodes: Node[]) => console.log('selection drag stop', nodes);
const onSelectionContextMenu = (event: MouseEvent, nodes: Node[]) => {
  event.preventDefault();
  console.log('selection context menu', nodes);
};
const onElementClick = (_: MouseEvent, element: FlowElement) =>
  console.log(`${isNode(element) ? 'node' : 'edge'} click:`, element);
const onSelectionChange = (elements: Elements | null) => console.log('selection change', elements);
const onLoad = (reactFlowInstance: OnLoadParams) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const onMoveEnd = (transform?: FlowTransform) => console.log('zoom/move end', transform);
const onEdgeContextMenu = (_: MouseEvent, edge: Edge) => console.log('edge context menu', edge);
const onEdgeMouseEnter = (_: MouseEvent, edge: Edge) => console.log('edge mouse enter', edge);
const onEdgeMouseMove = (_: MouseEvent, edge: Edge) => console.log('edge mouse move', edge);
const onEdgeMouseLeave = (_: MouseEvent, edge: Edge) => console.log('edge mouse leave', edge);
const onEdgeDoubleClick = (_: MouseEvent, edge: Edge) => console.log('edge double click', edge);

const nodeTypes = {
  selectorNode: ColorSelectorNode,
};



const initialElements: Elements = [
  {
    id: '0',
    type: 'input',
    data: {
      label: (
          <>
            <div>
              <h3>
                Достижение плана по <br/> производству концентрата - ## т <br/> металла в концентрате
              </h3>
            </div>
          </>
      ),
    },
    position: { x: -100, y: 0 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    draggable: false
  },
  {
    id: '1',
    data: {
      label: (
        <>
          <strong>Parent</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    draggable: false
  },
  {
    id: '2',
    data: {
      label: (
        <>
          <strong>Child 1</strong>
        </>
      ),
    },
    position: { x: 600, y: 0 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    draggable: false
  },
  {
    id: '3',
    data: {
      label: (
        <>
          <strong>Child 2</strong>
        </>
      ),
    },
    position: { x: 600, y: 100 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    draggable: false
  },

  { id: 'e1-1', source: '0', target: '1', type: 'smoothstep'},
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep'},
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep'},
];

const connectionLineStyle: CSSProperties = { stroke: '#ddd' };
const snapGrid: SnapGrid = [16, 16];

const nodeStrokeColor = (n: Node): string => {
  if (n.style?.background) return n.style.background as string;
  if (n.type === 'input') return '#0041d0';
  if (n.type === 'output') return '#ff0072';
  if (n.type === 'default') return '#1a192b';

  return '#eee';
};

const nodeColor = (n: Node): string => {
  if (n.style?.background) return n.style.background as string;

  return '#fff';
};

const OverviewFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onPaneScroll={onPaneScroll}
      onPaneContextMenu={onPaneContextMenu}
      onNodeDragStart={onNodeDragStart}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onNodeDoubleClick={onNodeDoubleClick}
      onSelectionDragStart={onSelectionDragStart}
      onSelectionDrag={onSelectionDrag}
      onSelectionDragStop={onSelectionDragStop}
      onSelectionContextMenu={onSelectionContextMenu}
      onSelectionChange={onSelectionChange}
      onMoveEnd={onMoveEnd}
      onLoad={onLoad}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      onEdgeContextMenu={onEdgeContextMenu}
      onEdgeMouseEnter={onEdgeMouseEnter}
      onEdgeMouseMove={onEdgeMouseMove}
      onEdgeMouseLeave={onEdgeMouseLeave}
      onEdgeDoubleClick={onEdgeDoubleClick}
    >
      <MiniMap nodeStrokeColor={nodeStrokeColor} nodeColor={nodeColor} nodeBorderRadius={2} />
      <Controls />
      <Background color="#aaa" gap={20} />
    </ReactFlow>
  );
};

export default OverviewFlow;
