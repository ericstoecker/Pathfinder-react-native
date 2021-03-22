import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';

import Grid from './components/Grid';
import dijkstra from './algorithm/dijkstra';

export default function App() {
  const rows = 50;
  const columns = 20;

  //leads to bug: should have a queue?
  const [gridMatrix, referenceMatrix] = createGrid(rows, columns);

  const [references, setReferences] = useState(referenceMatrix);
  const [grid, setGrid] = useState(gridMatrix);
  const [startNode, setStartNode] = useState(grid[5][Math.floor(columns/2)]);
  const [endNode, setEndNode] = useState(grid[30][Math.floor(columns/2)]);
  const [hasStarted, setHasStarted] = useState(false);
  

  function createGrid(rows, columns) {
    const grid = [];
    const referenceMatrix = [];

    //iterate through rows
    for(let i = 0; i < rows; i++) {
      const row = [];
      const referenceRow = [];

      //iterate through columns
      for(let j = 0; j < columns; j++) {
        const reference = useRef();

        const node = {
            weightForNeigh: 1,
            isVisited: false,
            prev: undefined,
            isWall: false,
            value: 1,
            row: i,
            column: j,
            reference: reference
        }
        row.push(node);
        referenceRow.push(reference);
      }
      grid.push(row);
      referenceMatrix.push(referenceRow);
    }
    return [grid, referenceMatrix];
  }

  function startAlgorithm() {
    //checks if algorithm has started already
    if(hasStarted) {
      return;
    }

    setHasStarted(true)

    let visitedNodesInOrder;
    let shortestPath;

    
    //copy of grid
    const gridCopy = copyGrid();

    //copy start and end node
    const startNodeCopy = {...startNode};
    const endNodeCopy = {...endNode};
    
    const result = dijkstra(gridCopy, startNodeCopy, endNodeCopy);

    visitedNodesInOrder = result?.visitedNodesInOrder;
    shortestPath = result?.shortestPath;

    //paints visited notes and path
    visualizeAlgorithm(visitedNodesInOrder, shortestPath, 10);

    setHasStarted(false);
  }

  function visualizeAlgorithm(visitedNodesInOrder, shortestPath, delay) {
    const nodes = visitedNodesInOrder;

        nodes.forEach((node, index) => {
          setTimeout(() => {
            
            //get reference of current node to change its style
            const nodeReference = references[node.row][node.column];

            if((node.row === startNode.row) && (node.column === startNode.column)) {
              //change className of visited start node in Node.tsx
              //visitedStartNode

            } else if((node.row === endNode.row) && (node.column === endNode.column)) {
              //change className of visited node in Node.tsx
              //visited endNode
              
            } else {
              //change className of visited node in Node.tsx
              
              nodeReference.current.visitedAnimation();
            }
          }, delay*index);
        });

        if(shortestPath) {
          shortestPath.forEach((node, index) => {
            setTimeout(() => {
              
              const nodeReference = references[node.row][node.column];
              nodeReference.current.pathAnimation();
            }, nodes.length*delay + 350 + index * (delay+50));
          });
        }
  }

  function copyGrid() {
    //matrix to save copy

    //make copy of grid(to not update the grid state in pathfinder because 
    //grid would be a reference to this.state.grid)
    const copy = grid.map((row) => {
      //copy row
      const rowCopy = row.map((node) => {
        //copy node
        return {...node}
      });
      return rowCopy;
    });

    return copy;
  }

  //transforms node into a wall
  const addWall = (row, column) => {
    const node = grid[row][column];

    const isStart = node.row === startNode.row && node.column === startNode.column;
    const isEnd = node.row === endNode.row && node.column === endNode.column;

    if(!isStart && !isEnd && !hasStarted) {
      node.weightForNeigh = Infinity;

      const nodeReference = references[node.row][node.column];
      nodeReference.current.wallAnimation();
    }

  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} >Pathfinder</Text>

      <TouchableOpacity style={styles.startButton} onPress={startAlgorithm} >
        <Text style={styles.startButtonText}>start</Text>
      </TouchableOpacity>

      <Grid 
        grid={grid} 
        startNode={startNode} 
        endNode={endNode}

        onAddWall={addWall}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    alignItems: 'center',
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "600"
  },

  startButton: {
    width: 80,
    height: 30,
    
    marginVertical: 5,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#1abc9c",
    borderColor: "#1abc9c",
  },

  startButtonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "500",
  }
});
