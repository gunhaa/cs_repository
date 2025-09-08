# Backpressure

- Publisher가 끊임 없이 emit하는 무수히 많은 데이터를 적절하게 제어하여 데이터 처리에 과부하가 걸리지 않도록 제어하는 것이 Backpressure의 역할이다

## Reactor에서 Backpressure 처리 방식

### 데이터 개수 제어

- Subscriber가 적절히 처리할 수 있는 수준의 데이터 개수를 Publisher에게 요청하는 것이다

```java
    public static void main(String[] args) {
        Flux.range(1,5)
                .doOnRequest(data -> log.info("# doOnRequest(요청 갯수): {}", data))
                .subscribe(new BaseSubscriber<Integer>() {
                    @Override
                    protected void hookOnSubscribe(Subscription subscription) {
                        request(1);
                    }

                    @Override
                    @SneakyThrows
                    protected void hookOnNext(Integer value) {
                        Thread.sleep(2000L);
                        log.info("# hookOnNext: {}", value);
                        request(1);
                    }
                });
    }
    // ... Result
/*
11:29:35.514 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # doOnRequest(요청 갯수): 1
11:29:37.533 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # hookOnNext: 1
11:29:37.533 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # doOnRequest(요청 갯수): 1
11:29:39.548 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # hookOnNext: 2
11:29:39.548 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # doOnRequest(요청 갯수): 1
11:29:41.557 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # hookOnNext: 3
11:29:41.557 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # doOnRequest(요청 갯수): 1
11:29:43.568 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # hookOnNext: 4
11:29:43.568 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # doOnRequest(요청 갯수): 1
11:29:45.582 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # hookOnNext: 5
11:29:45.582 [main] INFO com.webflux.test.reactor.backpressure.DataLimitExample -- # doOnRequest(요청 갯수): 1
*/
```

### Backpressure 전략 사용

1. IGNORE 전략

- Backpressure를 사용하지 않는 전략

2. ERROR 전략

```java
    public static void main(String[] args) throws InterruptedException {
        Flux
                // 0부터 증가한 숫자 전송(0.001초에 한번)
                .interval(Duration.ofMillis(1L))
                .onBackpressureError()
                .doOnNext(data -> log.info("# doOnNext: {}", data))
                // 별도의 스레드 추가 생성/ Schedulers
                .publishOn(Schedulers.parallel())
                .subscribe(data -> {
                            try {
                                // 전달 받은 데이터 처리 속도 0.005초로 설정
                                Thread.sleep(5L);
                            } catch (InterruptedException e) {
                            }
                            log.info("#onNext: {}", data);
                        },
                        error -> log.error("# onError: " , error));
        // reactor.core.Exceptions$OverflowException: The receiver is overrun by more signals than expected (bounded queue...)
        // 해당 코드는 소비자가 소비하는 속도보다 버퍼에 쌓이는 속도가 빨라 StackOverflow Exception이 발생한다
        // 버퍼는 기본 256개, 255에서 문제가 발생한다
        // 버퍼에 있는 데이터가 빠져나가지 않아 문제가 발생한다
        Thread.sleep(2000L);
    }
```

- Downstream의 데이터 처리 속도가 느려서 Upstream의 emit 속도를 따라가지 못할 경우 IllegalStateException 발생시킨다

  - 이 경우 Publisher는 Error Signal을 Subscriber에게 전송하고 삭제한 데이터는 폐기한다

- Reactor `publishOn` 버퍼 오버플로우 동작 원리

  - 핵심 원인

    `publishOn` 연산자에서 오버플로우가 발생하는 핵심 원인은 생산자가 소비자의 데이터 처리 현황에 대한 실시간 피드백을 받지 않기 때문이다 양측의 통신은 '소비된 만큼 채우는' 1:1 실시간 교환 방식이 아니라, 구독 초기에 발생하는 단 한 번의 대량 요청 약속에 기반한다.

  - 동작 방식: Prefetch

    1.  구독이 시작되면, `publishOn`은 내부적으로 업스트림(생산자)에 `request(N)` 신호를 보낸다. `N`은 프리페치(Prefetch) 사이즈이며, 기본값은 256이다.

    2.  생산자는 이 `request(256)` 신호를 '최대 256개의 데이터를 추가적인 확인 없이 보내도 좋다'는 허락으로 간주한다.

    3.  생산자는 자신의 최대 속도로 256개의 데이터를 생산하여 `publishOn`의 내부 버퍼(큐)로 PUSH한다. 이 과정에서 소비자가 데이터를 얼마나 소비했는지는 전혀 고려하지 않는다.

  - 오버플로우 발생 조건

    - 생산자가 초기 요청량인 256개의 데이터를 모두 버퍼로 보낸 후, 257번째 데이터를 버퍼에 넣으려고 시도하는 순간 `reactor.core.Exceptions$OverflowException`이 발생한다.
    - 이는 소비자가 그동안 데이터를 몇 개를 소비하여 버퍼에 빈 공간이 생겼는지와는 무관하게 동작한다.

  - 결론
    `publishOn`의 오버플로우는 '버퍼의 실시간 빈 공간'을 기준으로 발생하는 것이 아니라, '생산자가 초기에 허락받은 생산량(Prefetch)'을 초과했는지를 기준으로 발생한다. 생산자의 유일한 임무는 초기에 약속된 양을 모두 보내는 것이며, 그 임무를 완수한 후 추가로 보내려는 시도가 에러를 유발한다.

3. DROP 전략

```java
    public static void main(String[] args) throws InterruptedException {
        Flux
                .interval(Duration.ofMillis(1L))
                .onBackpressureDrop(dropped -> log.info("# dropped: {}", dropped))
                .publishOn(Schedulers.parallel())
                .subscribe(data -> {
                            try {
                                Thread.sleep(5L);
                                log.info("# onNext: {}", data);
                            } catch (InterruptedException e) {}
                        },
                        error -> log.error("# onError", error));

        Thread.sleep(2000L);
    }
```

- DROP 전략은 Publisher가 Downstream으로 전달할 데이터가 버퍼에 가득 찰 경우, 버퍼 밖에서 대기 중인 데이터 중에서 먼저 emit된 데이터부터 Drop시키는 전략이다
  - Drop된 데이터는 폐기된다
  - 버퍼가 가득 찬 상태에서는 버퍼가 비워질 때까지 데이터를 Drop 한다

4. LATEST 전략

```java
    public static void main(String[] args) throws InterruptedException {
        Flux
                .interval(Duration.ofMillis(1L))
                .onBackpressureLatest()
                .publishOn(Schedulers.parallel())
                .subscribe(data -> {
                            try {
                                Thread.sleep(5L);
                            } catch (InterruptedException e) {}
                            log.info("#onNext: {}", data);
                        },
                        error -> log.error("# onError", error));
        //14:00:17.763 [parallel-1] INFO com.webflux.test.reactor.backpressure.LatestStrategy -- #onNext: 253
        //14:00:17.769 [parallel-1] INFO com.webflux.test.reactor.backpressure.LatestStrategy -- #onNext: 254
        //14:00:17.774 [parallel-1] INFO com.webflux.test.reactor.backpressure.LatestStrategy -- #onNext: 255
        //14:00:17.781 [parallel-1] INFO com.webflux.test.reactor.backpressure.LatestStrategy -- #onNext: 1146
        //14:00:17.786 [parallel-1] INFO com.webflux.test.reactor.backpressure.LatestStrategy -- #onNext: 1147
        //14:00:17.793 [parallel-1] INFO com.webflux.test.reactor.backpressure.LatestStrategy -- #onNext: 1148
        // 결과는 255까지 출력되고,
        // 이후 1146부터 다시 출력된다
        // 버퍼가 가득 찼다가 버퍼가 다시 비워지는 시간 동안 emit되는 데이터가 가장 최근에 emit된 데이터가 된 후,
        // 다음 데이터가 emit되면 다시 폐기되는 과정을 반복하기 때문이다
        Thread.sleep(2000);
    }
```

- LATEST 전략은 Publisher가 Downstream으로 전달할 데이터가 버퍼에 가득 찰 경우, 버퍼 밖에서 대기 중인 데이터 중에서 가장 최근에 emit된 데이터부터 버퍼에 채우는 전략이다
  - DROP전략은 버퍼가 가득 찰 경우 버퍼 밖에서 대기 중인 데이터를 하나씩 차례대로 Drop하면서 폐기한다
  - 이와 달리 LATEST 전략은 새로운 데이터가 들어오는 시점에 가장 최근의 데이터만 남겨두고 나머지 데이터를 폐기한다

5. BUFFER 전략

```java
    public static void main(String[] args) throws InterruptedException {
        Flux
                .interval(Duration.ofMillis(300L))
                .doOnNext(data -> log.info("# emitted by original Flux: {}", data))
                .onBackpressureBuffer(2,
                        dropped -> log.info("** Overflow & Dropped: {} **", dropped),
                        // 두가지 전략 선택 가능
                        // BufferOverflowStrategy.DROP_LATEST)
                        // BufferOverflowStrategy.DROP_OLDEST)
                .doOnNext(data -> log.info("[ # emiteed by Buffer: {} ]", data))
                // 전달받아 data 처리 가능,
                .publishOn(Schedulers.parallel(), false, 1)
                .subscribe(data -> {
                            try {
                                Thread.sleep(1000L);
                            } catch (InterruptedException e) {
                            }
                            log.info("# onNext: {}", data);
                        },
                        error -> log.error("# onError", error));
        Thread.sleep(3000L);
    }
```

- BufferOverflowStrategy.DROP_LATEST
- BufferOverflowStrategy.DROP_OLDEST
- 버퍼의 크기를 정하고, 버퍼가 가득 찼을 경우 버릴 전략을 선택할 수 있다
- 일반적으로 생각하는 버퍼 운용 전략은 해당 전략이다