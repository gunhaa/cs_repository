# JS에서의 This

> 자바스크립트 내에서 this는 '누가 나를 불렀나'를 뜻한다. 즉, 선언이 아닌 호출에 따라 달라진다.

> 함수나 메서드가 실행되는 동안 그 함수가 실행되는 문맥(Context)을 참조한다.

## 1. 글로벌 컨텍스트

> 전역에서 this를 사용할 경우 브라우저 환경에서는 window 객체를, Node.js 환경에서는 global 객체를 가리킨다.

```javascript
console.log(this); // 브라우저 환경에서는 window 객체 출력
```

## 2. 객체의 메서드 내부에서 this
> 메서드 내부에서 this는 해당 메서드를 소유하는 객체 자신을 가리킨다.
```javascript
const person = {
    name: "Alice",
    greet() {
        console.log("Hello, " + this.name); // this는 person 객체
    }
};
person.greet(); // "Hello, Alice"
```

## 3. 생성자 함수에서 this
> 생성자 함수에서 this는 새로 생성되는 인스턴스 객체를 참조한다.

> 생성자 함수는 일반적으로 대문자로 시작하는 함수명으로 정의되며, new 키워드로 호출될 때 this가 새로운 인스턴스를 가리킨다.
```javascript
function Person(name) {
    this.name = name;
}
const bob = new Person("Bob");
console.log(bob.name); // "Bob"
```

## 4. 함수 내에서의 this (엄격 모드와 비엄격 모드)
> 일반 함수에서의 this는 호출 방식에 따라 달라진다. 비엄격 모드에서는 전역 객체를 가리키고, **엄격 모드에서는 undefined**가 된다.
```javascript
function showThis() {
    console.log(this);
}
showThis(); // 비엄격 모드: window, 엄격 모드: undefined
```

## 5. 이벤트 핸들러에서의 this
> 이벤트 핸들러에서 this는 이벤트를 발생시킨 요소를 참조한다.
```html
코드 복사
<button id="myButton">Click me</button>
<script>
    const button = document.getElementById("myButton");
    button.onclick = function () {
        console.log(this); // 클릭된 버튼 요소
    };
</script>
```
## 6. 화살표 함수에서의 this
> 화살표 함수는 렉시컬 스코프를 사용하기 때문에 화살표 함수가 선언될 당시의 this를 그대로 사용한다.

> 화살표 함수 내에서의 this는 상위 스코프의 this를 그대로 가져오므로, 동적으로 변하지 않는다.
```javascript
코드 복사
const person = {
    name: "Charlie",
    greet: function() {
        const innerFunction = () => {
            console.log(this.name); // this는 person 객체
        };
        innerFunction();
    }
};
person.greet(); // "Charlie"
```