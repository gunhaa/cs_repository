# 일급 객체

> 일급객체(First-class Object)란 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킨다. 

- '일급'이란 사용할 때 다른 요소들과 아무런 차별이 없다는 것을 뜻한다
- 함수형 프로그래밍 언어의 주요한 특징이며, Javascript는 함수가 일급 객체이다
  - Java의 경우 함수는 일급 객체가 아니다
- 일급 객체를 아래 3가지 조건을 충족한 객체를 일컫는다
  - 모든 일급 객체는 변수나 데이터에 담을 수 있어야 한다.
  - 모든 일급 객체는 함수의 파라미터로 전달 할 수 있어야 한다.
  - 모든 일급 객체는 함수의 리턴값으로 사용 할수 있어야 한다.
  
## 그렇다면, 함수가 일급객체이기 때문에 할 수 있는 것은 무엇인가?

- 고차함수(Higher order function)를 만들 수 있다
  - 함수를 매개변수로 받거나, 함수 결과로 함수를 반환하는 함수
  - 즉, 함수를 값으로 다루는 함수이며, 함수형 프로그래밍의 핵심 개념이다.
- 콜백(callback)을 사용할 수 있다.
  - 다른 함수에 인자로 전달되어, 특정 시점에 호출되는 함수
  - 비동기 처리나 이벤트 처리, 고차함수 사용 시 자주 등장
  - 함수의 실행 주도권을 인자로 넘긴 함수에게 넘기는 특징을 가지고 있다

## Java와 Javascript의 비교

### 1. 모든 일급 객체는 변수나 데이터에 담을 수 있어야 한다

```java
public class Main {

    public static void hello(){
        System.out.println("Hello World");
    }

    public static void main(String[] args) {
		Object a = hello; // !! 메서드를 변수에 할당 불가능
    }
}
```

```javascript
const hello = function() {
	console.log("Hello World"); // 메서드를 변수에 할당 할 수 있다
}
```

### 2. 모든 일급 객체는 함수의 파라미터로 전달 할 수 있어야 한다.

```java
public class Main {

    public static void hello(){
        System.out.println("Hello World");
    }
    
    public static void print(Object func) {
    	func();
    }

    public static void main(String[] args) {
		print((Object) hello) // !! static 메서드를 함수 매개변수로 전달 불가능
    }
}
```

```javascript
const hello = function() {
	console.log("Hello World");
}

function print(func) {
	func();
}

print(hello); // 메서드를 함수 매개변수로 전달할 수 있다
```

### 3. 모든 일급 객체는 함수의 리턴값으로 사용 할수 있어야 한다.

```javascript
const hello = function() {
	console.log("Hello World");
    return function() {
    	console.log("Hello World 22");
    }
}

const hello2 = hello();
hello2();
```