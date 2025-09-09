# Operator

- Reactor같은 리액티브 프로그래밍은 Operator로 시작해서 Operator로 끝난다
  - Operator는 리액티브 프로그래밍에서 가장 중요한 구성요소이다
  - Just(), create(), fromArray(), filter(), map() 같은 메서드는 모두 Operator이다
    - 하지만 이외에도 Reactor는 우리가 접한 Operator 이외에 수많은 Operator를 지원한다

## 자주 사용하는 Operaotr 명세

- 리액티브 프로그래밍에서 Sequence는 시간의 흐름에 따라 발생하는 0개 이상의 데이터 또는 이벤트의 연속적인 흐름을 의미한다. Reactor에서는 이러한 Sequence를 표현하기 위해 Mono (0-1개의 데이터)와 Flux (0-N개의 데이터)라는 두 가지 핵심 Publisher 타입을 제공한다
- 이 Sequence는 단순히 데이터를 담고 있는 컬렉션이 아니라, 비동기적으로 발생하는 데이터 신호(onNext), 완료 신호(onComplete), 또는 에러 신호(onError)의 묶음이다
- 모든 Operator는 이 Sequence를 입력으로 받아 새로운 Sequence를 출력하는 방식으로 동작하며, 이를 통해 복잡한 비동기 데이터 파이프라인을 구축한다
- 필요할 때마다 문서를 확인한 후 필요한 것을 찾아 쓰는 것이 제일 좋다
  - https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Mono.html
  - https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html
  - https://projectreactor.io/docs/core/release/reference/aboutDoc.html

### Sequence 생성을 위한 Operator

- justOrEmpty()
  - null일경우 npe가 발생하지 않고 onComplete signal 전송
- fromIterable()
  - Iterable에 포함된 데이터를 emit하는 flux를 생성한다
- fromStream()
  - Stream에 포함된 데이터를 emit하는 flux를 생성한다
- range( n, m)
  - n부터 1씩 증가하는 연속된 수 m개를 emit하는 flux를 생성한다
- defer()
  - emit을 지연시킨다
- using()
  - 파라미터로 전달받은 resource를 emit하는 flux를 생성한다
- generate()
  - 프로그래밍 방식으로 signal 이벤트를 발생시키며 동기적으로 데이터를 순차적으로 emit하고자 할 경우 사용된다
- create()
  - 프로그래밍 방식으로 signal 이벤트를 발생시키며 비동기적으로 데이터 emit하고자 할 경우 사용된다

### Seqence 필터링 Operator

- filter()
  - Upstream에서 emit된 데이터 중에서 조건에 일치하는 데이터만 Downstream으로 emit 한다
    - 동기적으로 작동한다
  - 즉, 파라미터로 입력 받은 Predicate의 리턴 값이 true인 데이터만 Downstream으로 emit
- filterWhen()
  - 비동기적으로 필터링을 수행한다
  - filter에 비하면 스레드 생성 작업이 들어가 훨씬 무겁다
  - 비동기적으로 순서에 따라 진행이 되지 않더라도 원본 데이터의 순서를 보장한다
- skip()
  - emit된 데이터 중 파라미터로 입력받은 숫자만큼 건너 뛴 후, 나머지 데이터를 Downstream으로 emit한다
- take()
  - upstream에서 emit 되는 데이터 중에서 파라미터로 입력받은 숫자만큼 Downstream으로 emit한다
- next()
  - upstream에서 emit되는 데이터 중 첫 번째 데이터만 downstream으로 emit한다
  - upstream에서 emit되는 데이터가 empty라면 downstream으로 empty mono를 emit한다

### Sequence 변환 Operator

- map()
  - upstream에서 emit된 데이터를 mapper function을 사용하여 변환한 후 downstream으로 emit한다
- flatMap()
  - upstream에서 emit된 데이터를 inner sequence에서 평탄화 작업을 거치면서 하나의 sequence로 병합되어 downstream으로 emit된다
  - 즉, upstream에서 emit되는 데이터수 x inner sequence에서 emit되는 데이터 수 가 최종적으로 subscriber에게 전달된다
- concat()
  - 파라미터로 입력되는 Publisher의 sequence를 연결해서 데이터를 순차적으로 emit한다
  - 먼저 입력된 publisher의 sequence가 종료될 때까지 나머지 publisher의 sequence는 subscribe되지 않고 대기하는 특성을 가진다
- merge()
  - publisher sequence의 emit된 데이터를 인터리빙 방식으로 병합한다
    - 인터리브는 '교차로 배치하다'라는 의미이다
    - 컴퓨터 하드디스크 상의 데이터를 서로 인접하지 않게 배열해 성능을 향상시키거나 인접한 메모리 위치를 서로 다른 메모리 뱅크에 두어 동시에 여러 곳을 접근할 수 있게 해주는 것을 인터리빙 이라고 한다
      - CPU와 메모리의 속도차이를 해결하기 위한 방법
  - concat()처럼 publisher의 sequence가 대기하는 것이 아니라, 모든 publisher의 sequence가 즉시 subscribe된다
- zip()
  - 파라미터로 입력되는 Publisher sequence에서 emit된 데이터를 결합한다
  - 각 publisher가 데이터를 하나씩 emit할 때까지 기다렸다가 결합한다
- and()
  - Mono의 complete signal과 파라미터로 입력된 publisher의 complete signal을 결합하여 새로운 Mono\<void>를 반환한다
     - 결괏값은 필요 없고, 여러 비동기 작업이 모두 끝났다는 사실만 알고 싶을 때 사용하는 신호
     - 모든 작업이 끝난 시점에 최종적으로 후처리 작업을 수행하기 위한 Operator
- colletList()
  - Flux에서 emit된 데이터를 모아 List로 반환한 후 변환된 list를 emit하는 Mono를 반환한다
  - Upstream sequence가 비어 있다면 비어있는 List를 Downstream으로 emit한다
- colletMap()
  - Flux에서 emit된 데이터를 기반으로 key와 value를 생성하여 Map의 element로 추가한 후 최종적으로 map을 emit하는 Mono를 반환한다
  - 만약 upstream이 비어있다면, 비어있는 map을 downstream으로 emit 한다

### Sequence의 내부 동작 확인을 위한 Operator

- Reactor에는 upstream Publisher에서 emit되는 데이터의 변경 없이 부수 효과만을 수행하기 위한 Operator들이 있는데, doOnXXXX()로 시작하는 Operator가 그 역할을 한다

### 에러 처리를 위한 Operator

- Java의 throw 키워드를 사용해서 예외를 의도적으로 던지는 것 같은 역할을 하는 데 주로 체크 예외를 캐치해서 다시던져야 하는 경우 사용할 수 있다

### Sequence의 동작 시간 측정을 위한 Operator

- 동작 시간 자체를 측정하는 특별한 Operator
- elapsed()
  - Tuple<Long, T>형태로 downstream에 emit한다

### Flux Sequence 분할을 위한 Operator

- window(int maxSize)
  - emit되는 첫 번째 데이터부터 maxSize 숫자 만큼의 데이터를 포함하는 새로운 Flux로 분할한다
  - Reactor에서는 이렇게 분할된 Flux를 윈도우라고 부른다
- buffer(int maxSize)
  - upstream에서 emit되는 첫 번째 데이터부터 maxsize의 숫자만큼 데이터를 List버퍼로 한번에 emit 한다
- groupby(keyMapper)
  - emit되는 데이터를 keyMapper로 생성한 key를 기준으로 그룹화한 GroupedFlux를 리턴한다
  - 이 GroupedFlux를 통해 그룹별로 작업을 수행할 수 있다


### 다수의 Subscriber에게 Flux를 멀티캐스팅 하기 위한 Operator

- publish()
  - 구독을 하더라도 구독 시점에 데이터를 emit하지 않고, connect()를 호출하는 시점에 비로소 데이터를 emit 한다
  - 이후 hot sequence로 변경되기 떄문에 구독 시점 emit된 데이터만 전달받을 수 있다