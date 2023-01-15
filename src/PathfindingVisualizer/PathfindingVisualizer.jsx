import React, { useEffect, useState } from 'react'
import Node from './Node/Node'
import './pathfindingVisualizer.css'

import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra.js'





export default function PathfindingVisualizer() {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    
    // get width and height of the window
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    console.log(windowWidth, windowHeight);
    // size of the grid depends on the width and height of the window
    const [numRows, setNumRows] = useState(Number.parseInt((windowHeight - 250) / 26));
    const [numCols, setNumCols] = useState(Number.parseInt(windowWidth / 26));
    
    // start and finish nodes are randomly generated
    const [startNodeRow, setStartNodeRow] = useState(Math.floor(Math.random() * numRows));
    const [startNodeCol, setStartNodeCol] = useState(Math.floor(Math.random() * numCols));
    const [finishNodeRow, setFinishNodeRow] = useState(Math.floor(Math.random() * numRows));
    const [finishNodeCol, setFinishNodeCol] = useState(Math.floor(Math.random() * numCols));
    
    console.log(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);


    useEffect(() => {
        const grid = getInitialGrid();
        setGrid(grid);
    }, [])

    const getInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < numRows; row++) {
            const currentRow = [];
            for (let col = 0; col < numCols; col++) {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
    }

    const createNode = (col, row) => {
        return {
            col,
            row,
            isStart: row === startNodeRow && col === startNodeCol,
            isFinish: row === finishNodeRow && col === finishNodeCol,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        };
    }

    const handleMouseDown = (row, col) => {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    }

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }

    const getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }

    const visualizeDijikstra = () => {
        const visitedNodesInOrder = dijkstra(grid, grid[startNodeRow][startNodeCol], grid[finishNodeRow][finishNodeCol]);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[finishNodeRow][finishNodeCol]);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                // console.log(document.getElementById(`node-${node.row}-${node.col}`)); // use Refs instead of document.getElementById
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 50 * i);
        }
    }


  return (<>
        <header>
            <h1 className='title'>Pathfinding Visualizer</h1>
            <div>
                <span >Choose the algorithm: </span>
                <button className='algorithm-button' id='dijkstra' onClick={() => visualizeDijikstra()}>Dijkstra</button>
                <button className='algorithm-button' disabled>A* (A star)</button>
            </div>
            {/* <div>
                <label htmlFor="num_rows">Rows</label>
                <input type="number" name="num_rows" id="" value={numRows} min={0} onChange={(e)=> setNumRows(e.target.value)} />
            </div>
            <div>
                <label htmlFor="num_rows">Columns</label>
                <input type="number" name="num_cols" id="" value={numCols} min={0} onChange={(e) => setNumCols(e.target.value)} />
            </div> */}
        </header>
        <div className='grid'>
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const { col, row, isFinish, isStart, isWall } = node;
                            return (<Node
                                key={nodeIdx}
                                col={col}
                                row={row}
                                isFinish={isFinish}
                                isStart={isStart}
                                isWall={isWall}
                                mouseIsPressed={mouseIsPressed}
                                onMouseDown={(row, col) => handleMouseDown(row, col)}
                                onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                onMouseUp={() => handleMouseUp()}
                                ></Node>)
                        })}
                    </div>
                )
            })}
        </div>
        <div className='map-key'>
            <span><span className='square start-node'></span>Start Node</span>
            <span><span className='square finish-node'></span>Finish Node</span>
            <span><span className='square shortest-path-node'></span>Shortest-path Node</span>
            <span><span className='square univisited-node'></span>Unvisited Node</span>                
            <span><span className='square visited-node'></span>Visited Node</span>
            <span><span className='square wall-node'></span>Wall Node</span>
            <div>
                <p>PS: Click and drag to create walls</p>
            </div>
        </div>
  </>)
}
