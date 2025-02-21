# Stack

> https://velog.io/@gunhaa/TSStack

> TypeScript로 구현된 Stack

접시가 쌓여 있으면 맨 위에 있는 접시를 들어내 사용하고 새 접시는 맨 위에 쌓는다. 데이터를 이런 방식으로 쌓고 빼는 자료구조가 스택이다. 이 때문에 가장 뒤에 들어온 것이 가장 먼저 나가는 구조라는 뜻으로 LIFO(Last-In-First-Out, 후입선출)이라고 불린다.

스택을 활용한 예제
- 키보드 입력을 하다가 백스페이스 키를 누르면 최근에 입력한 글자를 지운다.
- 모든 편집기는 최근에 한 작업 순으로 취소하는 기능이 있다(ctrl+z)
- 함수 A가 함수 B를 호출하고 함수 B가 함수C를 호출하는 호출 체인은 나중에 각 함수가 끝나면 돌아갈 때를 대비해서 호출 경로를 잘 관리해야한다.



## 스택의 특징

![img](images/Stack.png)

- 스택은 맨 위의 원소만 접근 가능한 것이 가장 큰 특징이다. 스택의 맨 위 원소를 스택 탑(top)/스택 탑 원소라고 부른다.
- Stack을 구현할 때 기본 용량이 필요하다. 
  - 메모리 효율성과 성능 최적화를 위해서이며 특히 스택을 배열 기반으로 구현하는 경우 기본 용량을 정하는 것이 중요하며, 다음과 같은 이유가 있습니다


## 구현할 Stack의 추상 데이터 타입(ADT)

```
맨 윗 부분에 원소를 추가한다.(기본 크기는 4, 넣을때마다 배열을 확장한다.) o 
맨 윗 부분에 있는 원소를 알려준다. o
맨 윅부분에 있는 원소를 삭제하면서 알려준다. o 
스택이 비어 있는지 확인한다. o
스택을 비운다. 
원소들을 알려준다. o 
```

## length를 사용안하고 topindex로 구현하는 이유

1. 배열의 길이(length) 사용과 topIndex의 차이

 배열의 길이를 사용해서 상단 요소를 추적할 수 있으면, 코드가 단순해 보일 수 있지만 고정 크기의 배열을 사용하면 몇 가지 제한 사항이 생긴다.

- 고정 크기 배열에서의 문제점
배열 기반 스택에서는 length 속성이 배열에 할당된 전체 크기를 반환하기 때문에, 고정된 크기의 배열을 사용할 경우, 스택의 실제 크기(현재 채워진 요소의 개수)와 배열 크기(length)가 다를 수 있다.
예를 들어, 배열을 크기 10으로 선언했지만 실제로는 3개의 요소만 스택에 저장된 경우, 배열의 length는 여전히 10이므로 상단 요소를 추적할 수 없다.
- 그러면 동적 배열을 사용한다면? 

 **동적 배열에서는 가능하지만 비효율적이다**

 동적 배열 기반 스택에서 배열의 크기가 자동으로 확장되는 경우, length를 사용해 스택의 크기를 추적할 수 있다. 그러나 매번 length를 확인하거나 상단 요소에 접근할 때마다 배열의 크기를 재계산해야 하므로 오버헤드가 발생할 수 있다. 반면, topIndex는 상단 요소가 위치한 정확한 인덱스를 저장하고 있어, 빠르게 상단에 접근할 수 있고 배열의 크기와 무관하게 동작한다.

 2. topIndex를 사용하는 이유
- 빠른 접근
topIndex는 상단 요소가 위치한 인덱스를 명확하게 유지하고 있기 때문에, **O(1)** 의 시간 복잡도로 상단 요소에 접근할 수 있다.
만약 length를 이용한다면, 동적 배열에서는 추가적인 연산이 필요할 수 있다. 고정 크기의 배열에서는 length 자체가 전체 배열의 크기를 나타내기 때문에 topIndex가 필요하다.
- 배열의 크기와 실제 데이터 크기의 차이
고정 크기 배열을 사용하는 스택에서는 배열의 크기와 스택에 실제로 저장된 데이터의 크기가 다를 수 있다. topIndex를 통해 현재 스택에 저장된 데이터의 개수와 위치를 명확하게 관리할 수 있다.
반면, 배열의 길이를 기반으로 하면 이 차이를 구분하기 어렵다.

## class Stack

```
class Stack<T> {

    stack: T[];
    topIndex: number; // 최근에 삽입된 원소의 인덱스
    capacity: number;

    constructor(capacity: number) {
        this.stack = new Array(capacity);
        this.capacity = capacity;
        this.topIndex = -1;
    }

    push(item: T) {


        if (this.topIndex + 1 >= this.capacity) {
            console.log(`resize 실행, topindex : ${this.topIndex}`);
            this.resize();
        }

        this.stack[++this.topIndex]=item;

    }

    resize() {
        let resizeLength = this.capacity*2
        this.stack.length = resizeLength;
        this.capacity = resizeLength;
    }

    print(){
        return console.log(this.stack.join(", "));
    }

    top(){
        return console.log(`맨 위 element : ${this.stack[this.topIndex]}`);
    }

    pop(){
        console.log(`해당 element를 반환하고 삭제 하였음 : ${this.stack[this.topIndex]}`);
        this.topIndex--;

        console.log(`그 결과 topIndex : ${this.topIndex}`);

        return this.stack[this.topIndex];
    }

    isEmpty(){

        let bool = true;

        if(this.stack.filter(item => item !== undefined).length > 0){ // 
            bool = false;
        }

        return bool;
    
    }

    popAll(){

        let newstack = new Array(this.capacity);

        this.stack=[...newstack];

        this.topIndex = -1;

    }

}

let stack = new Stack<Number>(2);
let stack2 = new Stack<Number>(3);
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
```

## JS의 new Array()

new Array(배열의 길이)로 배열을 만들어내게 되면, 모든 element에 undefined가 들어가 있다.

즉, length는 아무것도 넣지 않은 상태여도 undefined가 들어가 있어서 전체의 길이가 나오게 된다.

예를 들어 let arr = new Array(3)으로 만들고 arr.push(1)을 한다면

arr은 [undefined , undefined , undefined , 3]이 된다.

자료 구조를 구현할때는 new Array()로 사용할만 하지만, 일반 배열이 필요하다면 조심해서 사용해야 한다.