# Currying

> JS의 경우 클래스를 이용한 객체지향뿐만 아니라, 프로토타입 기반의 객체지향, 나아가 함수형 프로그래밍까지 가능한 멀티 패러다임 언어이다

> JavaScript에서 함수형 프로그래밍을 사용하는 방법 중 하나가 커링이다.

> 수학과 컴퓨터 과학에서 커링(currying)이란 다중 인수 (혹은 여러 인수의 튜플)을 갖는 함수를 단일 인수를 갖는 함수들의 함수열로 바꾸는 것을 말한다.

## Currying 이란?

![currying](images/currying1.png)

## 왜 쓰는거임?

> 부수효과를 최대한으로 줄이고, 동일한 입력이 들어가면 동일한 출력이 나오게 하여 가독성과 유지보수를 용이하게 하기 위해서

## 사용 예시

> 실제 애플리케이션에서 커링은 데이터 처리, 이벤트 핸들러 설정, 설정 함수 등 다양한 상황에서 유용하다. 

> API 요청을 만드는 경우

```javascript

function apiRequest(method) {
    return function(url) {
        console.log(`Making a ${method} request to ${url}`);
        // API 요청 코드
    };
}

const getRequest = apiRequest('GET');
getRequest('/api/data'); // Making a GET request to /api/data

```