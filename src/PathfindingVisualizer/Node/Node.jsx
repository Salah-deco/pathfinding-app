import React from 'react'

import './node.css'

export default function Node({col, row, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp}) {
    const extraClassName = 
    isFinish ? 'node-finish' : 
    isStart ? 'node-start' : 
    isWall ? 'node-wall' : '';

  return (
    <div 
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      ></div>
  )
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
}