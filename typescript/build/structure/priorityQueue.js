"use strict";
class priorityQueueHeap {
    constructor(numhHeap) {
        this.heap = new Array(numhHeap);
        this.numhHeap = 0;
    }
    insert(newItem) {
        try {
            if (this.numhHeap >= this.heap.length) {
                throw new Error("HeapErr: Overflow!");
            }
            this.heap[this.numhHeap] = newItem;
            this.percolateUp(newItem, this.numhHeap);
            this.numhHeap++;
            // **ts error객체 사용법 알아보기**
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    percolateUp(newItem, node) {
        let parentsNode = Math.floor((node - 1) / 2);
        if (parentsNode >= 0 && this.heap[node] < this.heap[parentsNode]) {
            // 바꾸기
            let temp = this.heap[parentsNode];
            this.heap[parentsNode] = this.heap[node];
            this.heap[node] = temp;
            this.percolateUp(newItem, parentsNode);
        }
    }
    print() {
        return (console.log(this.heap.join("-")));
    }
}
let heap = new priorityQueueHeap(6);
// heap.insert(4);
// heap.insert(1);
// heap.insert(3);
// heap.insert(6);
// heap.insert(5);
// heap.insert(2);
// 1-4-2-6-5-3
heap.insert(3);
heap.insert(1);
heap.insert(4);
heap.insert(2);
heap.print();
// node priorityQueue.js
