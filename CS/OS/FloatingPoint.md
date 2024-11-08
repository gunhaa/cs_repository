# Floating Point (부동 소수점)

> 컴퓨터가 소수점을 나타나기 위한 표현 방식이다.

> 소수점이 고정되어 있지 않은 소수 표현 방식으로 필요에 따라 소수점의 위치가 이동할 수 있고 유동적이라는 의미에서 부동 소수점(floating point)이라고 불린다.

> 10진수 소수를 2진수(컴퓨터에 저장되는 형태)로 표현할때 10진수 소수와 2진수 소수의 표현이 딱 맞아 떨어지지 않을 수 있어 문제가 생긴다.

```javascript
let a = 0.1;
let b = 0.2;
let c = 0.3;

if(a+b === c) console.log(`equal`)
else console.log(`not equal`) , console.log(a+b)

// 결과
not equal
0.30000000000000004
```


## 해결 방법

> 부동소수점 오차 문제는 근본적으로 완벽히 해결하기 어렵다.

- 정수 변환: 0.1 대신 100을 10으로 나누는 방식으로 소수를 정수로 변환해 계산한다.
- 반올림: 결과값을 특정 자리까지 반올림하여 표시한다.
- 고정소수점 라이브러리 사용: BigDecimal, decimal.js와 같은 라이브러리를 사용해 정밀한 연산을 수행한다.

결론적으로, 부동소수점은 제한된 비트 내에서 실수를 근사치로 저장하는 방식이며, 컴퓨터의 메모리 제한 때문에 발생하는 불가피한 오차다.

## 고정 소수점

> 고정소수점은 소수점 위치를 고정하여 일정한 소수점 이하 자릿수를 유지함으로써 부동소수점의 오차를 줄이는 방식이다.

### 예시 코드

```javascript
function toFixedPoint(number, decimalPlaces) {
    // 10의 거듭제곱을 만들어 원하는 자리수만큼 소수점을 이동
    const factor = Math.pow(10, decimalPlaces);

    // 실수를 정수로 변환한 후 다시 나눠서 소수점을 고정
    return Math.round(number * factor) / factor;
}

// 예시 사용
console.log(toFixedPoint(12.34567, 2)); // 결과: 12.35
console.log(toFixedPoint(12.34567, 3)); // 결과: 12.346
```
