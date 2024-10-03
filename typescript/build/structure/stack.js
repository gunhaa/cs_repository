"use strict";
class Stack {
    constructor(arr) {
        this.arr = arr;
        this.virus = 1;
    }
    push(param) {
        return this.arr.push(param);
    }
    pop() {
        let popElemnet = this.arr[this.arr.length - 1];
        console.log(popElemnet);
        this.arr.splice(this.arr.length - 1, 1);
        return popElemnet;
    }
}
let stack = new Stack([1, 2]);
console.log(stack);
stack.push(3);
console.log(stack);
stack.pop();
console.log(stack);
