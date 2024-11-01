# Object vs object

## 1. Object
>  Object는 JavaScript에서 모든 객체의 기본 타입을 정의하는 내장 객체이다. JavaScript에서 객체를 생성할 때 사용하는 생성자 함수이며, 객체를 생성하는 방법 중 하나이다.

> Object는 대문자로 시작하므로 생성자로 사용된다.

 Object는 객체를 생성하고 조작하는 다양한 메소드를 제공한다. 예를 들어, Object.toString() Object.hasOwnProperty 등이 있다.
```javascript
const obj1 = new Object(); // Object 생성자 함수를 사용하여 객체 생성
const obj2 = { key: 'value' }; // 객체 리터럴로 객체 생성

console.log(obj1); // {}
console.log(obj2); // { key: 'value' }
```

## 2. object
> object는 JavaScript의 자료형 중 하나로, 객체를 나타내는 기본적인 타입을 의미한다. JavaScript에서 모든 객체는 object 타입으로 간주된다.

> object는 소문자로 작성되며, 데이터의 타입을 설명하는 데 사용된다.
 JavaScript의 모든 객체(배열, 함수, 정규 표현식 등 포함)는 object로 분류된다. 즉, 객체는 typeof 연산자를 사용했을 때 항상 object로 반환된다.

```javascript
const arr = [1, 2, 3]; // 배열은 객체의 일종
const func = function() {}; // 함수도 객체

console.log(typeof arr); // "object"
console.log(typeof func); // "function" (함수는 객체의 한 형태이므로)
```
## Recap
- Object: JavaScript에서 객체를 생성하는 생성자 함수로, 대문자로 시작한다. 객체 생성 및 조작에 관련된 메소드를 제공한다.
- object: JavaScript의 데이터 타입 중 하나로, 소문자로 작성되며 모든 객체를 의미한다. typeof 연산자를 사용했을 때 객체 타입을 나타내는 값이다.