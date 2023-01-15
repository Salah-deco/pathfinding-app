import React, { useEffect, useState } from 'react'
import Node from './Node/Node'
import './pathfindingVisualizer.css'

export default function PathfindingVisualizer() {
    const [nodes, setNodes] = useState([]);

    // Size of grid
    const [numRows, setNumRows] = useState(16);
    const [numCols, setNumCols] = useState(40);


    // Randomly generate start and finish nodes
    const [startNodeRow, setStartNodeRow] =  useState(Number.parseInt(Math.random() * 15));
    const [startNodeCol, setStartNodeCol]  = useState(Number.parseInt(Math.random() * 40));
    const [finishNodeRow, setFinishNodeRow] = useState(Number.parseInt(Math.random() * 15));
    const [finishNodeCol, setFinishNodeCol] = useState(Number.parseInt(Math.random() * 40));


    useEffect(() => {
        const nodes = [];
        for (let row = 0; row < numRows; row++) {
            const currentRow = [];
            for (let col = 0; col < numCols; col++) {
                const currentNode = {
                    col,
                    row,
                    isStart: row === startNodeRow && col === startNodeCol,
                    isFinish: row === finishNodeRow && col === finishNodeCol,
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        setNodes(nodes);
    }, [])


  return (<>
        <header>
            <h1>Pathfinding Visualizer</h1>
            {/* <div>
                <label htmlFor="num_rows">Rows</label>
                <input type="number" name="num_rows" id="" min={0} onChange={(e)=>setNumRows(e.target.value)} />
            </div>
            <div>
                <label htmlFor="num_rows">Columns</label>
                <input type="number" name="num_cols" id="" min={0} onChange={(e) => setNumCols(e.target.value)} />
            </div> */}
        </header>
        <div className='grid'>
            {nodes.map((row, rowIdx) => {
                return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            
                            return (<Node 
                                    key={nodeIdx}
                                    isStart={node.isStart}
                                    isFinish={node.isFinish}
                                    test={'foo'}
                                ></Node>)
                        })}
                    </div>
                )
            })}
        </div>
  </>)
}
