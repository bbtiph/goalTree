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
import SuperChildCustomNode from './SuperChildCustomNode';
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
  superChild: SuperChildCustomNode,
  parent: ParentCustomNode,
  superParent: SuperParentCustomNode

};

const CustomNodeFlow = () => {
  let isElements = [];
  const obj = {
    goalId: '1',
    goalName: 'Достижение плана по производству концентрата - ## т металла в концентрате',
    parentGoalId: '3',
    positionName: 'Concentrator Operations Manager',
    parentPositionName: null,
    goalType: 'LIBRARY',
    level: 1,
    isUsed: false
  }
  isElements.push(obj);

  const obj2 = {
    goalId: '2',
    goalName: 'Рассмотрение инициатив по оцифровке и оптимизации эффективности отдела;',
    parentGoalId: '3',
    positionName: 'Concentrator Operations Manager',
    parentPositionName: 'lfdf',
    goalType: 'CASCADE',
    level: 1,
    isUsed: false
  }
  isElements.push(obj2);

  const obj3 = {
    goalId: '3',
    goalName: 'Производительность мельницы > ## т/ч: Экспертная оптимизация системы и стабильная работа фабрики.',
    parentGoalId: '4',
    positionName: 'Concentrator Operations Manager',
    parentPositionName: 'sdnfksd',
    goalType: 'CASCADE',
    level: 2,
    isUsed: false
  }
  isElements.push(obj3);

  const obj4 = {
    goalId: '4',
    goalName: 'Выявление и уменьшение неликвидных активов. Организация контроля уровней поставок на складах',
    parentGoalId: '5',
    positionName: 'Concentrator Operations Manager',
    parentPositionName: null,
    goalType: 'CASCADE',
    level: 3,
    isUsed: false
  }
  isElements.push(obj4);

  const obj8 = {
    goalId: '8',
    goalName: 'Выявление и уменьшение неликвидных активов. Организация контроля уровней поставок на складах',
    parentGoalId: null,
    positionName: 'Concentrator Director',
    parentPositionName: null,
    goalType: 'CASCADE',
    level: 1,
    isUsed: false
  }
  isElements.push(obj8);

  const obj5 = {
    goalId: '5',
    goalName: 'Выявление и уменьшение неликвидных активов. Организация контроля уровней поставок на складах',
    parentGoalId: null,
    positionName: 'Concentrator Director',
    parentPositionName: null,
    goalType: 'CASCADE',
    level: 4,
    isUsed: false
  }
  isElements.push(obj5);
  const obj6 = {
    goalId: '6',
    goalName: 'Выявление и уменьшение неликвидных активов. Организация контроля уровней поставок на складах',
    parentGoalId: '7',
    positionName: 'Concentrator Director',
    parentPositionName: null,
    goalType: 'CASCADE',
    level: 1,
    isUsed: false
  }
  isElements.push(obj6);

  const obj7 = {
    goalId: '7',
    goalName: 'Выявление и уменьшение неликвидных активов. Организация контроля уровней поставок на складах',
    parentGoalId: null,
    positionName: 'Concentrator Director',
    parentPositionName: null,
    goalType: 'CASCADE',
    level: 2,
    isUsed: false
  }
  isElements.push(obj7);

  const obj9 = {
    goalId: '9',
    goalName: 'Рассмотрение инициатив по оцифровке и оптимизации эффективности отдела;',
    parentGoalId: '3',
    positionName: 'Concentrator Operations Manager',
    parentPositionName: 'lfdf',
    goalType: 'CASCADE',
    level: 1,
    isUsed: false
  }
  isElements.push(obj9);

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

  let max=0;
  for (let i=0; i<isElements.length; i++) {
    if (isElements[i].level > max) {
      max = isElements[i].level;
    }
  }
  let y = 0, x = 60, resMax = max;
  let counter = 0;
  let index = -1;
  let typeCard;
  while (1) {
    counter = 0;
    for (let i=0; i<isElements.length; i++) {
      if (isElements[i].level==max && !isElements[i].isUsed) {
        if (isElements[i].level == max && isElements[i].level != 1) typeCard = 'superParent';
          else if (isElements[i].level == 1) typeCard = 'superChild';
            else typeCard = 'parent';
        index++;
        counter++;
        isElements[i].isUsed = true;
        elements[index] = {
          id: isElements[i].goalId,
          type: typeCard,
          data: {
            label: (<>{isElements[i].goalName}</>),
            text: (<>{isElements[i].positionName}</>),
          },
          position: { x: x + (resMax - isElements[i].level)*392, y: y },
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
          //draggable: false
        }

        let isGoalId = isElements[i].goalId;

        for (let j=0; j<isElements.length; j++) {
          for (let k=0; k<isElements.length; k++) {

            if (isElements[k].parentGoalId == isGoalId && !isElements[k].isUsed) {
              if (isElements[k].level == max && isElements[k].level != 1) typeCard = 'superParent';
                else if (isElements[k].level == 1) typeCard = 'child';
                else typeCard = 'parent';
              isElements[k].isUsed = true;
              index++;
              elements[index] = {
                id: isElements[k].goalId,
                type: typeCard,
                data: {
                  label: (<>{isElements[k].goalName}</>),
                  text: (<>{isElements[k].positionName}</>),
                },
                position: { x: x + (resMax - isElements[k].level)*392, y: y },
                targetPosition: Position.Left,
                sourcePosition: Position.Right,
               //draggable: false
              }
              if (isElements[k].level != 1) {
                isGoalId = isElements[k].goalId;
                break;
              } else {
                y+=130;
              }
            }

          }


        }

      }
    }

    max--;
    if (max==0) {
      break;
    }
  }
  index++;
  for (let i=0; i<isElements.length; i++) {
    for (let j=0; j<isElements.length; j++) {
      if (isElements[i].goalId == isElements[j].parentGoalId) {
        elements[index] = {
          id: isElements[i].goalId + '-' + isElements[j].parentGoalId,
          source: isElements[i].goalId,
          target: isElements[j].goalId,
          type: 'smoothstep',
          style: edgeCustomStyle
        }
        index++;
      }
    }
  }



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
      edgeTypes={edgeCustomStyle}
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
