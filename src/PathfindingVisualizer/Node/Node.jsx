import React from 'react'

import './node.css'

export default function Node({isStart, isFinish}) {
    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';

  return (
    <div className={`node ${extraClassName}`}></div>
  )
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
}