
class MinHeap {
    heap;
    heapsize;
    //will store indeces
    map;

    constructor(array) {
        this.heap = array;
        this.heapsize = this.heap.length;
        this.map = new Map();

        this.buildMinHeap();
        this.createMap();
    }

    //create map to store indices of elements
    createMap() {
        for(let i = 0; i < this.heap.length; i++) {
            const row = this.heap[i].row;
            const column = this.heap[i].column;
            this.map.set(`${row},${column}`, i);
        }
    }
    
    //creates a min heap
    buildMinHeap() {
        //min heapify for every element that is not a leave
        for(let i = Math.floor(this.heapsize/2)-1; i >= 0; i--) {
            this.minHeapify(i);
        }
    }

    minHeapify(i) {
        let min = i;
        //if left child is smaller
        if((this.left(i) < this.heapsize) && (this.heap[this.left(i)].value < this.heap[i].value)) {
            min = this.left(i);
        }
        //if right child is even smaller
        if((this.right(i) < this.heapsize) && (this.heap[this.right(i)].value < this.heap[min].value)) {
            min = this.right(i);
        }
        if(min !== i) {
            this.swap(i, min);
            this.minHeapify(min);
        }
    }

    parent(i) {
        return Math.floor((i+1)/2) - 1;
    }

    //left child
    left(i) {
        return (i+1) * 2 - 1;
    }

    //right child
    right(i) {
        return (i+1) * 2;
    }

    swap(i, j) {
        const a = this.heap[i];
        const b = this.heap[j];
    
        this.heap[i] = b;
        this.heap[j] = a;

        //update index value in map
        let row = a.row;
        let column = a.column;
        this.map.set(`${row},${column}`, j);

        row = b.row;
        column = b.column;
        this.map.set(`${row},${column}`, i);
    }

    pop() {
        this.heap.pop();
        this.heapsize--;
    }

    push(k) {
        this.heap.push(k);
        this.heapsize++;
    }
}

export default MinHeap;