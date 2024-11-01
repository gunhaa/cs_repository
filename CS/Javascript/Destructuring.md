# Destructuring(구조분해할당)

> 구조 분해 할당 구문은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식이다.

> 개발을 하다 보면 함수에 객체나 배열을 전달해야 하는 경우가 생기곤 한다. 가끔은 객체나 배열에 저장된 데이터 전체가 아닌 일부만 필요한 경우가 생기기도 한다. 이럴 때 객체나 배열을 변수로 '분해’할 수 있게 해주는 특별한 문법인 구조 분해 할당(destructuring assignment) 을 사용할 수 있다.

## 이터러블 객체라면 모두 사용 가능한가?

> 구조 분해 할당은 기본적으로 이터러블 객체(iterable objects)와 객체(objects)에서 사용될 수 있다. 그러나 모든 이터러블 객체가 구조 분해 할당에 적합한 것은 아니다. 이터러블 객체는 Symbol.iterator 메소드를 가지고 있는 객체로, 배열, 문자열, Map, Set 등이 이에 해당한다.

> 구조 분해 할당은 일반적인 객체(일반 객체 리터럴)에도 사용할 수 있지만, 이터러블 객체가 아닌 일부 객체(예: Number, Boolean, Symbol 등)에는 사용할 수 없다.

## 사용 예제

### 1. 배열 구조분해 할당

```javascript
const array = [1, 2, 3];

// 구조 분해 할당
const [a, b, c] = array;

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
```

#### 나머지 매개변수 사용

```javascript
const numbers = [1, 2, 3, 4, 5];

// 나머지 매개변수
const [first, second, ...rest] = numbers;

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
```

### 2. 객체 구조 분해 할당

```javascript
const person = {
    name: 'Alice',
    age: 30,
    city: 'New York'
};

// 구조 분해 할당
const { name, age } = person;

console.log(name); // 'Alice'
console.log(age);  // 30
```

#### 기본값 설정
> 프로퍼티가 존재하지 않을 경우 기본 값을 설정할 수 있다.
```javascript
const person = {
    name: 'Alice'
};

// 기본값 설정
const { name, age = 25 } = person;

console.log(name); // 'Alice'
console.log(age);  // 25 (기본값)
```

### 3. 중첩된 객체와 배열
구조 분해 할당은 중첩된 구조에서도 사용할 수 있다.

```javascript
const student = {
    name: 'Bob',
    grades: {
        math: 90,
        english: 85
    }
};

// 중첩된 구조 분해 할당
const { name, grades: { math, english } } = student;

console.log(name);   // 'Bob'
console.log(math);   // 90
console.log(english); // 85
```