# Nullish coalescing operator (널 병합 연산자) 

> Null 병합 연산자(??)는 주로 JavaScript와 C#에서 된다.

> JS에서는 첫 번째 피연산자가 null 또는 undefined일 때 두 번째 피연산자의 값을 반환하는 기능을 가지고 있다.

> JavaScript에서 ?? 연산자는 ES2020(ES11)에서 도입되었다

## 예시

```javascript
let name = null;
let defaultName = "Guest";
let userName = name ?? defaultName; // name이 null이므로 defaultName이 반환됨

console.log(userName); // "Guest"
```

```javascript
let score = 0;
let finalScore = score ?? 10; // score가 0이지만 null이 아니므로 score가 반환됨

console.log(finalScore); // 0
```

## || 와 비교(단축평가 참고)

```javascript
let name = "";
let userName1 = name || "Guest";  // 빈 문자열은 falsy로 평가되어 "Guest"가 반환됨
let userName2 = name ?? "Guest";   // name이 빈 문자열이므로 ""가 반환됨

console.log(userName1); // "Guest"
console.log(userName2); // ""
```