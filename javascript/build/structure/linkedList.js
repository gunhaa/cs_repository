"use strict";
class Node {
    constructor(item) {
        this.item = item;
        this.next = null;
    }
}
class linkedList {
    constructor(head = null) {
        this.head = head;
        this.len = head ? 1 : 0;
    }
    // append는 연결리스트의 마지막에 node를 추가시킨다.
    append(value) {
        let newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
        }
        else {
            let prevnode = this.head;
            while (prevnode.next !== null) {
                prevnode = prevnode.next;
            }
            prevnode.next = newNode;
        }
        this.len++;
        return console.log(`list 추가됨 : ${value} , 현재길이 : ${this.len}`);
    }
    print() {
        let element = [];
        let Node = this.head;
        while (Node !== null) {
            element.push(Node.item);
            Node = Node.next;
            if (Node === null) {
                break;
            }
        }
        return console.log(`lenght : ${this.len}, element : ${element.join("-")}`);
    }
}
// append, print까지만 구현
let list = new linkedList();
list.append(10);
list.append(20);
list.append(30);
list.print();
