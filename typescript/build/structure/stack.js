"use strict";
class Stack {
    constructor(capacity) {
        this.stack = new Array(capacity);
        this.capacity = capacity;
        this.topIndex = -1;
    }
    push(item) {
        if (this.topIndex + 1 >= this.capacity) {
            console.log(`resize 실행, topindex : ${this.topIndex}`);
            this.resize();
        }
        this.stack[++this.topIndex] = item;
    }
    resize() {
        let resizeLength = this.capacity * 2;
        this.stack.length = resizeLength;
        this.capacity = resizeLength;
    }
    print() {
        return console.log(this.stack.join(", "));
    }
    top() {
        return console.log(`맨 위 element : ${this.stack[this.topIndex]}`);
    }
    pop() {
        console.log(`해당 element를 반환하고 삭제 하였음 : ${this.stack[this.topIndex]}`);
        this.topIndex--;
        console.log(`그 결과 topIndex : ${this.topIndex}`);
        return this.stack[this.topIndex];
    }
    isEmpty() {
        let bool = true;
        if (this.stack.filter(item => item !== undefined).length > 0) { // 
            bool = false;
        }
        return bool;
    }
    popAll() {
        let newstack = new Array(this.capacity);
        this.stack = [...newstack];
        this.topIndex = -1;
    }
}
let stack = new Stack(2);
let stack2 = new Stack(3);
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.push(6);
stack.push(7);
stack.push(8);
stack.print();
stack.top();
stack.pop();
console.log(stack.isEmpty());
console.log(stack2.isEmpty());
stack.popAll();
stack.print();
