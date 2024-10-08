class Node<T> {

    item: T;
    next: Node<T> | null;

    constructor(item: T) {
        this.item = item;
        this.next = null;
    }

}

class linkedList<T> {

    head: Node<T> | null;
    len: number;

    constructor(head: Node<T> | null = null) {
        this.head = head;
        this.len = head ? 1 : 0;
    }

    // append는 연결리스트의 마지막에 node를 추가시킨다.
    public append(value: T) {

        let newNode = new Node<T>(value);

        if (this.head === null) {

            this.head = newNode;


        } else {

            let prevnode = this.head;

            while (prevnode.next !== null) {
                prevnode = prevnode.next;
            }


            prevnode.next = newNode;
        }

        this.len++;
        return console.log(`list 추가됨 : ${value} , 현재길이 : ${this.len}`);


    }

    public print() {

        let element : T[] = [];

        let Node = this.head;

        while(Node!==null){
            
            element.push(Node.item);
            Node = Node.next;
            
            if(Node ===null){
                break;
            }
       
        }

        return console.log(`lenght : ${this.len}, element : ${element.join("-")}`);
    }

}

// append, print까지만 구현

let list = new linkedList<Number>();

list.append(10);

list.append(20);

list.append(30);

list.print();