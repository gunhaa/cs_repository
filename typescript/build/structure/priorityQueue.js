"use strict";
class priorityQueueMinHeap {
    constructor(numHeap) {
        this.heap = new Array(numHeap);
        this.numHeap = 0;
    }
    insert(newItem) {
        try {
            if (this.numHeap >= this.heap.length) {
                throw new Error("HeapErr: Overflow!");
            }
            this.heap[this.numHeap] = newItem;
            this.percolateUp(newItem, this.numHeap);
            this.numHeap++;
            // **error객체 사용법 알아보기**
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
    deleteMin() {
        //왼쪽 자식의 인덱스 : (부모의 인덱스) * 2 + 1
        //오른쪽 자식의 인덱스 : (부모의 인덱스) * 2 + 2
        let min = this.heap[0];
        this.heap[0] = this.heap[this.numHeap - 1];
        this.heap[this.numHeap - 1] = undefined;
        this.numHeap--;
        this.percolateDown(0);
        return console.log(`삭제된 최소 값 : ${min}`);
    }
    percolateDown(parentIndex) {
        let leftChild = parentIndex * 2 + 1;
        let rightChild = parentIndex * 2 + 2;
        if (leftChild >= this.numHeap - 1)
            return;
        let minChild;
        if (rightChild >= this.numHeap - 1) {
            minChild = leftChild;
        }
        else {
            minChild = this.heap[leftChild] > this.heap[rightChild] ? rightChild : leftChild;
        }
        if (this.heap[minChild] < this.heap[parentIndex]) {
            let temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[minChild];
            this.heap[minChild] = temp;
            this.percolateDown(minChild);
        }
    }
    min() {
        console.log(`현재의 최소값은 : ${this.heap[0]}`);
        return this.heap[0];
    }
    isEmpty() {
        console.log(`empty 상태는 : ${this.heap.filter(node => node !== undefined).length > 0}`);
        return this.heap.filter(node => node !== undefined).length > 0;
    }
    clear() {
        this.heap = new Array(this.numHeap);
    }
}
let heap = new priorityQueueMinHeap(6);
heap.isEmpty();
heap.insert(4);
heap.insert(1);
heap.insert(3);
heap.insert(6);
heap.insert(5);
heap.insert(2);
heap.deleteMin();
heap.min();
heap.isEmpty();
heap.print();
heap.clear();
heap.print();
// node priorityQueue.js
