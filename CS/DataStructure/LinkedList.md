# LinkedList

> https://velog.io/@gunhaa/LinkedList-Typescript-%EA%B5%AC%ED%98%84


> 타입스크립트를 공부할겸 자료구조를 직접 구현해보고 정리하기 위해 시리즈를 작성해본다

## 리스트란?

 리스트는 대표적인 자료구조 중 하나로 '줄 세워져 있는 데이터' 또는 '죽 늘어선 데이터'를 의미한다.
 간단하게 예시를 들자면 정수 리스트, 어떤 그룹에 속하는 사람들 리스트, 서비스를 기다리는 사람들 리스트 등 많은 예시를 들 수 있다.

## LinkedList(연결리스트)란?

 연결 리스트는 선형적인 데이터 구조라는 점에서 배열과 유사하다. 하지만 배열과 달리, 연결 리스트의 요소(elements)들은 연속적인 메모리 주소나 인덱스에 저장되지 않는다. 각 요소는 포인터 또는 다음 레퍼런스를 가진다.

 연결 리스트의 각 요소를 노드(node)라 부른다. 노드는 일반적으로 데이터 그리고 다음 노드를 가리키는 링크, 이 2가지 아이템으로 구성된다.


## 구현할 연결리스트의 추상 데이터 타입(ADT)

 
```
리스트의 마지막에 원소를 삽입(append)
리스트의 길이와 원소를 출력(print)
```






![img](images/LinkedList.png)

 연결 리스트의 가장 첫 번째 지점을 헤드(head)라 부른다. 헤드는 연결 리스트의 첫 번째 노드를 의미합니다. 마지막 노드는 null을 가르키고, 만약 연결 리스트가 비어있는 경우, 헤드는 null을 참조하게 된다.
 즉, head는 item이 null이고 다음 노드를 가르키는 포인터만 존재한다. 연결리스트의 마지막(tail)부분은 null값을 참조한다.

### class Node
```
  class Node<T> {

      item: T;
      next: Node<T> | null;

      constructor(item: T) {
          this.item = item;
          this.next = null;
      }

  }
```

### class LinkedList
```
  class linkedList<T> {

      head: Node<T> | null;
      len: number;

      constructor(head: Node<T> | null = null) {
          this.head = head;
          this.len = head ? 1 : 0;
      }

      // append는 연결리스트의 마지막에 node를 추가시킨다.
      append(value: T) {

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

      print() {

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
```

### 예제코드 

```
  let list = new linkedList<Number>();

  list.append(10);

  list.append(20);

  list.append(30);
```

### 결과
	
list 추가됨 : 10 , 현재길이 : 1
list 추가됨 : 20 , 현재길이 : 2
list 추가됨 : 30 , 현재길이 : 3
lenght : 3, element : 10-20-30



#### <참고 자료>
쉽게 배우는 자료구조 with java - 문병로

https://www.freecodecamp.org/korean/news/implementing-a-linked-list-in-javascript/
