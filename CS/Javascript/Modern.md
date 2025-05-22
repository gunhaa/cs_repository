# modern js 의 기능

> https://compat-table.github.io/compat-table/es6/ 에서 확인 가능

- 구형 브라우저에서는 지원되지 않는다
- 타입스크립트에서는 이런 문제를 해결해서 잘 컴파일해준다
- 차세대 자바스크립트는 es6, 혹은 그 이후를 뜻한다

## const, let, var

- const 재할당의 경우 js는 브라우저에서 에러 발생, ts는 ide단게에서 에러 발생
  - const의 제일 중요한 것은 재할당 불가
  - 선언시 값을 할당해야함
- let, var
  - let은 var과 같이 재할당이 가능하다
  - var의 경우 스크립트 모든 곳에서 사용가능하다
  - let은 블록 스코프를 가지고 있다
    - let은 블록이 도입되어, 해당 스코프와 하위 스코프만 참조할 수 있다

### 호이스팅

- 자바스크립트 엔진이 실행되기 전에 모든 변수, 함수 선언부를 스코프의 최상단으로 끌어올리는 동작
- js 스크립트 사용시 인터프리터가 작동하기전에 모든 변수를 위로 올려서 사용변수를 정리하는것이며, let의 경우 아직 할당이 안됬으면 에러터지고, var는 undefined로 미리 넣어놔서 이상한 동작을 한다
- let이나 const는 호이스팅되지만, undefined로 초기화되지 않는다
- 이 초기화 전까지의 시점이 바로 TDZ(Temporal Dead Zone)이다
  - 이 구간에서 변수에 접근하면 ReferenceError가 발생한다

### Recap

- `const`: 재할당 불가, 블록 스코프. 객체/배열 내부 수정은 가능. 선언 시 초기화 필수
- `let`: 재할당 가능, 블록 스코프. 안전하고 의도된 범위 제어 가능
- `var`: 재할당 가능, 함수 스코프. 호이스팅 시 undefined로 초기화되어 예기치 않은 동작 발생 가능

## 화살표 함수

- function을 더 깔끔하게 사용하는 방법
- 중괄호가 없고 표현식이 하나일 경우 그 값이 반환된다
  - 표현식: 실행하면 값이 나오는 코드 (ex: 3 + 5, x \* 2, 함수 호출)
- 매개변수도 한개라면 괄호를 생략할 수 있다
- 객체 내부에서 function으로 정의된 메서드는 호출한 객체가 this가 된다
- 화살표 함수는 객체의 this를 잃어버리기 때문에 메서드에 적합하지 않다
- 객체 메서드를 외부로 분리해 호출하면 this가 바뀔 수 있으니 주의해야 한다
- 객체 메서드는 화살표 함수로 정의하지 말라는 것이 JavaScript의 best practice다.

## 스프레드 연산자

- 배열의 모든 값을 추출하고 싶을 때 사용한다

```javascript
const hobbies = ["sports", "cooking"];
const activeHobbies = ["hiking"];
// const activeHobbies = ['hiking', ...hobbies]; 해당 방식으로도 사용가능

activeHobbies.push(hobbies[0], hobbies[1]); // 비효율적
activeHobbies.push(...hobbies); // 스프레드 연산자 사용

const person = {
  name: "Max",
  age: 30,
};

// 해당 방식은 참조 복사로, 같은 포인터를 가리킨다
const copiedPersonSamePointer = person;
// 해당 방식은 얕은 복사로, 1단계 속성만 복제되며 중첩 객체는 공유된다(원시 타입은 값 복사, 참조 타입은 주소(참조)만 복사)
const copiedPerson = { ...person };
```

## Rest syntax

- 함수의 인자를 스프레드 연산자로 받을 수 있다

```typescript
const addNumbers = add(5, 10, 2, 3.7);

const add = (...numbers: number[]) => {
  return numbers.reduce((res, val) => {
    return res + val;
  });
};
```

## 구조 할당(디스트럭처링)

```typescript
const numbers = [0, 1, 2, 3, 4, 5];

// 배열은 순서대로 꺼내진다
const [a, b, ...remaingElements] = numbers;

const person = {
  name: "max",
  age: 10,
};

// 키를 같은 이름의 변수에 저장한다
// 키 이름이 중요하며, 순서는 중요하지 않다
// 객체의 속성 이름이어야 해당 키의 값을 가져올 수 있다
const { name, age } = person;

// :userName으로 key의 값을 새로 정할 수 있다
const { name: username, age } = person;
```
