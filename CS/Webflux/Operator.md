# Operator

- Reactor같은 리액티브 프로그래밍은 Operator로 시작해서 Operator로 끝난다
  - Operator는 리액티브 프로그래밍에서 가장 중요한 구성요소이다
  - Just(), create(), fromArray(), filter(), map() 같은 메서드는 모두 Operator이다
    - 하지만 이외에도 Reactor는 우리가 접한 Operator 이외에 수많은 Operator를 지원한다

## 자주 사용하는 Operaotr 명세

### Sequence 생성을 위한 Operator

- 리액티브 프로그래밍에서 Sequence는 시간의 흐름에 따라 발생하는 0개 이상의 데이터 또는 이벤트의 연속적인 흐름을 의미한다. Reactor에서는 이러한 Sequence를 표현하기 위해 Mono (0-1개의 데이터)와 Flux (0-N개의 데이터)라는 두 가지 핵심 Publisher 타입을 제공한다
- 이 Sequence는 단순히 데이터를 담고 있는 컬렉션이 아니라, 비동기적으로 발생하는 데이터 신호(onNext), 완료 신호(onComplete), 또는 에러 신호(onError)의 묶음이다
- 모든 Operator는 이 Sequence를 입력으로 받아 새로운 Sequence를 출력하는 방식으로 동작하며, 이를 통해 복잡한 비동기 데이터 파이프라인을 구축한다