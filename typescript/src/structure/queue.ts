class Queue<T>{

    queue : T[];
    capacity : number;
    numItems : number; // 큐의 총 원소 수
    front : number; // 큐의 맨 앞 원소의 인덱스
    tail : number; // 큐의 맨 뒤 원소의 인덱스

    constructor(capacity : number){

        this.queue = new Array(capacity);
        this.capacity = capacity;
        this.numItems = 0;
        this.front = 0;
        this.tail = 0;
    }

    enqueue(item : T){

        if(this.numItems >= this.capacity){
            this.resize();
        }

        this.queue[this.tail] = item;
        this.numItems++;
        this.tail++;
    }

    resize(){
        let resizeLength = this.capacity*2
        this.queue.length = resizeLength;
        this.capacity = resizeLength;
        console.log(`용량이 부족해서 추가됨`);
    }

    dequeue(){
        if(this.isEmpty()){
            console.log("삭제 할 원소가 없음");
            return;
        }

        console.log(`삭제하는 원소 : ${this.queue[this.front]}`);
        this.numItems--;
        this.front++;
    }


    frontElement(){
        return console.log(this.queue[this.front]);
    }

    isEmpty(){
        console.log(this.queue.filter(item => item !== undefined).length === 0)
        return this.queue.filter(item => item !== undefined).length === 0;
    }

    dequeueAll(){
        let newQueue = new Array(this.capacity);
        this.queue = [...newQueue];
        this.numItems = 0;
        this.front = 0;
        this.tail = 0;
    }

}

let queue = new Queue<Number>(2);
console.log(queue.queue.length);
queue.isEmpty();
queue.enqueue(1);
queue.frontElement();
queue.enqueue(2);
queue.dequeue();
queue.frontElement();
queue.isEmpty();
queue.dequeueAll();
queue.isEmpty();
queue.dequeue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.frontElement();
console.log(queue.queue.length);
queue.enqueue(4);
queue.enqueue(5);