# Spread Operator (스프레드 연산자)

> JavaScript의 스프레드 연산자(Spread Operator)는 `...` 기호를 사용하여 배열이나 객체의 요소를 개별적으로 펼쳐서 사용할 수 있는 기능이다. 스프레드 연산자는 주로 배열 복사, 배열 결합, 함수 호출 시 인수 전달 등 다양한 상황에서 활용된다.

## 사용 예시

### 1. 배열에서의 사용
#### 1.1 배열 복사
> 스프레드 연산자를 사용하여 배열을 쉽게 복사할 수 있다. 새로운 배열을 생성하며 원본 배열의 요소를 복사한다.

```javascript
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];

console.log(copiedArray); // [1, 2, 3]
```
#### 1.2 배열 결합
> 두 개 이상의 배열을 결합할 때도 스프레드 연산자를 사용할 수 있다.

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinedArray = [...array1, ...array2];

console.log(combinedArray); // [1, 2, 3, 4, 5, 6]
```

### 2. 객체에서의 사용
#### 2.1 객체 복사
> 스프레드 연산자를 사용하여 객체를 쉽게 복사할 수 있다. 기존 객체의 프로퍼티를 새로운 객체로 복사한다.

```javascript
const originalObject = { a: 1, b: 2 };
const copiedObject = { ...originalObject };

console.log(copiedObject); // { a: 1, b: 2 }
```

#### 2.2 객체 병합
여러 객체를 하나의 객체로 결합할 때도 스프레드 연산자를 사용할 수 있다.

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const mergedObject = { ...obj1, ...obj2 };

console.log(mergedObject); // { a: 1, b: 3, c: 4 } (obj2의 b가 덮어씀)
```
### 3. 함수 호출 시 인수 전달
> 스프레드 연산자는 배열을 함수의 인수로 전달할 때도 유용하다. 배열의 요소를 개별 인수로 변환한다.
```javascript
const numbers = [1, 2, 3];

function sum(x, y, z) {
    return x + y + z;
}

console.log(sum(...numbers)); // 6
```
### 4. 다른 활용 예
#### 4.1 배열의 특정 요소를 변경하면서 복사
> 스프레드 연산자를 사용하여 배열의 특정 요소를 변경하면서 복사할 수 있다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
const newFruits = [...fruits.slice(0, 1), 'orange', ...fruits.slice(2)];

console.log(newFruits); // ['apple', 'orange', 'cherry']
```

## Recap

> 스프레드 연산자(...)는 새로운 객체나 배열을 복사하여 생성한다. 스프레드 연산자를 사용하면 원본 객체나 배열의 요소를 개별적으로 펼쳐서 **새로운 객체나 배열**을 만들 수 있으며, 이는 원본 데이터의 **불변성을 유지**하면서 작업할 수 있도록 해준다.