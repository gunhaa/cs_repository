# Context

- Context는 어떤 상황에서 그 사황을 처리하기 위해 필요한 정보
- 프로그래밍 세계에서의 예시
  - ServletContext는 Servlet이 Servlet Container와 통신하기 위해서 필요한 정보를 제공하는 인터페이스
  - Spring에서 ApplicationContext는 애플리케이션의 정보를 제공하는 인터페이스이며, 제공하는 대표적인 정보가 바로 Spring Bean 객체이다
- 이처럼 프로그래밍 세계에서의 Context 역시 어떠한 상황을 처리하거나 해결하기 위해 필요한 정보를 제공하는 어떤 것이다

## Reactor의 Context

> A key/value store that is propagated between components such as operators via the context protocol. (::Reactor API Document)

- Reactor의 context는 Reactor 구성요소 간에 전파 되는 key/value 형태의 저장소라고 정의한다
  - Downstream에서 Upstream으로 Context가 전파되어 Operator 체인상의 각 Operator가 해당 Context의 정보를 동일하게 이용할 수 있음을 의미한다
- Context는 실행 스레드와 매핑되는 것이 아닌 Subscriber와 매핑 된다
  - 구독이 발생할 때마다 해당 구독과 연결된 하나의 Context가 생긴다
- 예를 들어 웹 어플리케이션에서 HTTP 요청이 들어왔을 때 부여된 Transaction ID 혹은 Authentication Token를 스트림의 여러 연산자에서 참조하고 싶을 때 문제가 발생한다
  - ThreadLocal은 특정 스레드에만 데이터를 묶어두기 때문에, 다른 스레드에서 실행되는 연산자는 그 데이터에 접근할 수 없다
  - Context는 바로 이 문제를 해결하기 위해 등장했다
```java
    public static void main(String[] args) throws InterruptedException {
        Mono
            .deferContextual(ctx ->
                    Mono
                            .just("hello" + " " + ctx.get("firstName"))
                            .doOnNext(data -> log.info("# just doOnNext : {}", data)))
                            .subscribeOn(Schedulers.boundedElastic())
                            .publishOn(Schedulers.parallel())
                            .transformDeferredContextual(
                                    (mono, ctx2) -> mono.map(data -> data + " " + ctx2.get("lastName"))
                            )
                            .contextWrite(context -> context.put("lastName", "Jobs"))
                            .contextWrite(context -> context.put("firstName", "Steve"))
                            .subscribe(data -> log.info("# onNext: {}", data));

            Thread.sleep(100L);
    }
```
```plaintext
      [ 생산자 (Publisher) ]
          ↑           |
          |           |
      업스트림         |  데이터 흐름
     (Upstream)       | (Downstream)
   구독 & Context      |    (Data)
          |           |
          |           ↓
      [ 소비자 (Subscriber) ]
```

- 구독 신호(Subscription Signal)가 소비자로부터 생산자를 향해 거슬러 올라갈 때(Upstream), 마치 서류 가방을 전달하듯 Context를 함께 가지고 올라가기 때문에, 그 신호를 받는 모든 중간 연산자와 최종 생산자가 Context의 내용을 알 수 있다