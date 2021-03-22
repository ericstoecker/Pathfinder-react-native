import MinPriorityQueue from './minPriorityQueue';

function dijkstra(graph, startNode, endNode) {
    //array to store nodes
    const nodes = [];
    const visitedNodesInOrder = [];
    

    //initialize all values with infinity(except for start node)
    for(let i = 0; i < graph.length; i++) {
        for(let j = 0; j < graph[i].length; j++) {
            //set start node to 0
            if((startNode.row === i) && (startNode.column === j)) {
                graph[i][j].value = 0;
            } else {
                graph[i][j].value = Infinity;
            }
            
            nodes.push(graph[i][j]);
        }
    }
    
    //create min-priority-queue as min-heap
    const queue = new MinPriorityQueue(nodes);

    
    while(queue.minHeap.heapsize >= 0) {
        //extract next node
        const u = queue.extractMinimum();

        //would otherwise start visiting random nodes, if end node couldn't be found
        if(u.value === Infinity) {
            return {
                visitedNodesInOrder: visitedNodesInOrder,
                shortestPath: undefined
            }
        }
        //add node to visited nodes
        visitedNodesInOrder.push(u);
        
        //check if u is endpoint
        if((u.row === endNode.row) && (u.column === endNode.column)) {
            const shortestPath = traversePath(startNode, u);
            return {
                visitedNodesInOrder: visitedNodesInOrder,
                shortestPath: shortestPath
            };
            //traversePath();
        //else keep searching
        } else {
            u.isVisited = true;
        
            //adjacency list of neighbours
            const adj = getNeighbours(graph, u);

            //const adj = u.neighbours;
            for(let i = 0; i < adj.length; i++) {
                const v = adj[i];
                //search index in map of heap
                const index = queue.minHeap.map.get(`${v.row},${v.column}`);

                if(v.value > u.value + v.weightForNeigh) {
                    queue.decreaseKey(index, u.value + v.weightForNeigh);
                    v.prev = u;
                    /* updateGrid(v.row, v.column, v); */
                    graph[v.row][v.column] = v;
                }
            }
            graph[u.row][u.column] = u;
        }
    }
    return {
        visitedNodesInOrder: visitedNodesInOrder,
        shortestPath: null
    }; 
}

//follows shortest path backwards and return it
function traversePath(startNode, endpoint) {
    const shortestPath = [];
    //start at endpoint
    let node = endpoint;
    while(!(node === startNode)) {
        shortestPath.push(node);
        if(node.prev) {
            node = node.prev;
        } else {
            break;
        }
    }
    return shortestPath;
}

function getNeighbours(grid, u) {
    const neighbours = [];

    const row = u.row;
    const column = u.column;

    //top neighbour
    if(row - 1 >= 0) {
      const topNeighbour = grid[row-1][column];
      neighbours.push(topNeighbour);
    }
    //bottom neighbour
    if((row + 1  < grid.length)) {
      const botNeighbour = grid[row+1][column];
      neighbours.push(botNeighbour);
    }
    //left neighbour
    if(column - 1 >= 0) {
      const leftNeighbour = grid[row][column-1];
      neighbours.push(leftNeighbour);
    }
    //right neighbour
    if(column + 1 < grid[row].length) {
      const rightNeighbour = grid[row][column+1];
      neighbours.push(rightNeighbour);
    }
    return neighbours;
}

export default dijkstra;