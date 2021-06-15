import React, { useState, useEffect, MouseEvent } from 'react';
import { ChangeEvent } from 'react';

import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Node,
  FlowElement,
  OnLoadParams,
  Elements,
  Position,
  SnapGrid,
  Connection,
  Edge,
} from 'react-flow-renderer';

import ChildCustomNode from './ChildCustomNode';
import ParentCustomNode from './ParentCustomNode';
import SuperParentCustomNode from "./SuperParentCustomNode";

const onLoad = (reactFlowInstance: OnLoadParams) => console.log('flow loaded:', reactFlowInstance);
const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element);

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const edgeCustomStyle = { stroke: '#E9A600' };
const snapGrid: SnapGrid = [16, 16];
const nodeTypes = {
  child: ChildCustomNode,
  parent: ParentCustomNode,
  superParent: SuperParentCustomNode
};

const CustomNodeFlow = () => {
  let isElements = [];
  const obj = {
    goalId: '1',
    goalName: '123',
    parentGoalId: null,
    positionName: 'Достижение плана по производству концентрата - ## т металла в концентрате',
    parentPositionName: null,
    goalType: 'LIBRARY',
    level: 1
  }
  isElements.push(obj);

  const obj2 = {
    goalId: '2',
    goalName: '123',
    parentGoalId: '3',
    positionName: 'Рассмотрение инициатив по оцифровке и оптимизации эффективности отдела;',
    parentPositionName: 'lfdf',
    goalType: 'CASCADE',
    level: 1
  }
  isElements.push(obj2);

  const obj3 = {
    goalId: '3',
    goalName: '123',
    parentGoalId: '4',
    positionName: 'Производительность мельницы > ## т/ч: Экспертная оптимизация системы и стабильная работа фабрики.',
    parentPositionName: 'sdnfksd',
    goalType: 'CASCADE',
    level: 2
  }
  isElements.push(obj3);

  const obj4 = {
    goalId: '4',
    goalName: '123',
    parentGoalId: null,
    positionName: 'Выявление и уменьшение неликвидных активов. Организация контроля уровней поставок на складах',
    parentPositionName: null,
    goalType: 'CASCADE',
    level: 3
  }
  isElements.push(obj4);

  const [elements, setElements] = useState<Elements>([]);
  const [bgColor, setBgColor] = useState<string>(initBgColor);

  useEffect(() => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setElements((els) =>
          els.map((e) => {
            if (isEdge(e) || e.id !== '2') {
              return e;
            }

            const color = event.target.value;

            setBgColor(color);

            return {
              ...e,
              data: {
                ...e.data,
                color,
              },
            };
          })
      );
    };
  }, []);
  let counter = 0;
  let counter1 = 0;
  let counter2 = 0;

  for (let i=0; i<isElements.length; i++) {
    if (isElements[i].level == 1) {
      counter++;
      elements[i] = {
        id: isElements[i].goalId,
        type: 'child',
        data: {
          label: (
              <>
                {isElements[i].goalName}
              </>
          ),
          text: (
              <>
                {isElements[i].positionName}
              </>
          ),
        },
        position: { x: 844, y: counter * 130 },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        draggable: false
      }
    } else if (isElements[i].level == 2) {
      counter1++;
      elements[i] = {
        id: isElements[i].goalId,
        type: 'parent',
        data: {
          label: (
              <>
                {isElements[i].goalName}
              </>
          ),
          text: (
              <>
                {isElements[i].positionName}
              </>
          ),
        },
        position: { x: 452, y: counter1 * 130 },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        draggable: false
      }
    } else if (isElements[i].level == 3) {
      counter2++;
      elements[i] = {
        id: isElements[i].goalId,
        type: 'superParent',
        data: {
          label: (
              <>
                {isElements[i].goalName}
              </>
          ),
          text: (
              <>
                {isElements[i].positionName}
              </>
          ),
        },
        position: { x: 60, y: counter2 * 130 },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        draggable: false
      }
    }
  }
  let z = counter + counter1 + counter2;
  for (let i=0; i<isElements.length; i++) {
    for (let j=0; j<isElements.length; j++) {
      if (isElements[i].goalId == isElements[j].parentGoalId) {
        elements[z] = {
          id: isElements[i].goalId + '-' + isElements[j].parentGoalId,
          source: isElements[i].goalId,
          target: isElements[j].goalId,
          type: 'smoothstep'
        }
        z++;
      }
    }
  }

  // let max=0;
  // for (let i=0; i<isElements.length; i++) {
  //   if (isElements[i].level > max) {
  //     max = isElements[i].level;
  //   }
  // }
  //
  // while (1) {
  //
  //   while (1){
  //     for (let i=0; i<isElements.length; i++) {
  //       if (isElements[i].level==max && isElements[i].isUsed==false) {
  //         isElements[i].isUsed = true;
  //         let resGoalId = isElements[i].goalId;
  //         for (let j=0; j<isElements.length; j++) {
  //           if (isElements[j].parentGoalId == resGoalId){
  //             isElements[j].isUsed = true;
  //           }
  //         }
  //         break
  //       }
  //     }
  //   }
  //
  // }

  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, els));

  return (
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultZoom={1.5}
    >
      <MiniMap
        nodeStrokeColor={(n: Node): string => {
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'selectorNode') return bgColor;
          if (n.type === 'output') return '#ff0072';

          return '#eee';
        }}
        nodeColor={(n: Node): string => {
          if (n.type === 'selectorNode') return bgColor;

          return '#fff';
        }}
      />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
