import MinHeap from './minHeap';

class MinPriorityQueue {
    minHeap;

    constructor(array) {
        this.minHeap = new MinHeap(array);
    }

    //returns min of heap
    min() {
        if(this.minHeap.heapsize === 0) {
            throw Error('Heap underflow');
        }
        return this.minHeap.heap[0];
    }

    //returns min and deletes it
    extractMinimum() {
        if(this.minHeap.heapsize === 0) {
            throw Error('Heap underflow');
        }
        const min = this.minHeap.heap[0];

        //this.minHeap.heap[0] = this.minHeap.heap[this.minHeap.heapsize-1];
        //swap first and last element, delete last
        this.minHeap.swap(0, this.minHeap.heapsize-1);
        this.minHeap.pop();
        //recreate min-heap
        this.minHeap.minHeapify(0);

        return min;
    }
    
    //decrease key of ith element to k
    decreaseKey(i, k) {
        //index out of bounds
        if(i >= this.minHeap.heapsize) {
            throw Error('no such object');
        }
        //new key bigger than old key
        if(k > this.minHeap.heap[i].value) {
            throw Error('new key too big')
        }
        //set new key
        this.minHeap.heap[i].value = k;
        //recreate min heap
        while((i > 0) && (this.minHeap.heap[this.minHeap.parent(i)].value > this.minHeap.heap[i].value)) {
            this.minHeap.swap(i, this.minHeap.parent(i));
            i = this.minHeap.parent(i);
        }
    }

    //not used in dijkstra, hence optional
    /* insert(k: any) {
        const value = k.value;
        //set key of k to infinity
        const inf = Infinity;
        k.value = inf;

        this.minHeap.push(k);
        //this.decreaseKey(this.minHeap.heapsize-1, value);
    } */
}


export default MinPriorityQueue;