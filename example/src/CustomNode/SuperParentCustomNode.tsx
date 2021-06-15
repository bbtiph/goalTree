import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const targetHandleStyle: CSSProperties = { background: '#E9A600', width: '25px', height: '25px', left: '-12px', border: 'none'};
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10, top: 'auto' };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const ParentCustomNode: FC<NodeProps> = ({ data }) => {
  return (
    <>
      <div style={{width: '264px', height: '105px', backgroundColor: 'rgba(255, 206, 0, 0.2)', borderRadius: '10px 10px 0px 10px',}}>
          <div style={{padding: '13px'}}>
            <strong style={{fontSize: '12px'}}>{data.label}</strong>
            <p style={{fontFamily: 'montserrat',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '10px',
                lineHeight: '15px',
                display: 'flex',
                alignItems: 'center',
                color: '#1E1E1E'
            }}>{data.text}</p>
          </div>
      </div>
      <Handle type="source" position={Position.Right} style={{opacity: '0'}} />
    </>
  );
};

export default memo(ParentCustomNode);
