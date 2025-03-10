# Functional programming 함수형 프로그래밍

> https://www.youtube.com/watch?v=7aEQLvvnQIY

- 함수형 프로그래밍은 코드 작성 '스타일' 이다.
- OOP를 쓰는 개발자라도 새로운 관점과 접근 방식을 얻을 수 있어 배워놓는 것이 좋다.
- 일종의 새로운 사고 방식을 배우는 것이다

## imperative code 명령형 코드

- Make me a sandwich
    - 원하는 결과를 표현하기 위해 작성
    - 결과 값을 선언하는 코드
    - js는 명령형과 선언형 코드의 특징을 모두 가지고 있다.

```javascript
function removeOdd(items){
    const result = [];
    for (let i=0; i<items.length; i++){
        if(items[i]%2 === 0){
            result.push(items[i]);
        }
    }
    return result;
}
```
## declarative code 선언형 코드

1. 빵
2. 양상추 + 토마토 + 치즈
3. 합치기
4. 완성
    - 원하는 결과를 얻기 위해 필요한 지침에 따라 코드가 작성됨
    - CSS가 선언형 코드
    - 선언형 프로그래밍은 명령형 프로그래밍의 추상화 계층 위에서 동작
    - 함수형은 선언형 코드이다.
    - 함수에 대한 구현을 알아야 해서 싫어하는 사람도 많다

```javascript
function checkForOdd(item){
    return item%2 === 0;
}

function removeOdd(items){
    return items.filter(checkForOdd);
}
```