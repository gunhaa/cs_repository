# Cold / Hot Sequence

```java
    public static void main(String[] args) throws InterruptedException {
        // 구독이 발생할 때마다 처음부터 실행 - cold Sequence 동작이다
        Flux<String> coldFlux =
                Flux
                        .fromIterable(Arrays.asList("KOREA", "JAPAN", "CHINESE"))
                        .map(String::toLowerCase);
        coldFlux.subscribe(country -> log.info("# Subscriber1: {}", country));
        System.out.println("-------------------------------------");
        Thread.sleep(2000L);
        coldFlux.subscribe(country -> log.info("# Subscriber2: {}", country));
    }
```

```java
    public static void main(String[] args) throws InterruptedException{
        // Hot Sequence는 구독한 시점의 타임라인부터 emit된 데이터를 받을 수 있다
        String[] singers = {"Singer A", "Singer B", "Singer C", "Singer D", "Singer E"};

        log.info("# Begin concert: ");

        Flux<String> concertFlux =
                Flux
                        .fromArray(singers)
                        // 데이터 소스로 입력된 각 데이터의 emit을 일정시간 동안 지연시키는 Operator
                        // Operator의 디폴트 스레드 스케쥴러가 Parallel이기에, parallel-1,2,3.. 등의 스레드가 로그에 찍힌다
                        .delayElements(Duration.ofSeconds(1))
                        // Hot Sequence로 동작하게 해주는 Operator
                        .share();

        concertFlux.subscribe(
                singer -> log.info("# Subscriber1 is watching {}'s song", singer)
        );

        Thread.sleep(2500);

        concertFlux.subscribe(
                singer -> log.info("# Subscriber2 is watching {}'s song", singer)
        );

        Thread.sleep(3000);
    }
```

- 리액티브 프로그램의 Cold는 무언가를 새로 시작하는 것을 뜻하며, Hot은 무언가를 새로 시작하지 않는 것을 뜻한다
- Publisher가 데이터를 emit하는 과정이 한 번만 일어나고, Subscriber가 각각의 구독 시점 이후에 emit 된 데이터만 전달 받는 것을 Hot Sequence라고 한다
- share(), cache() 등의 Operator를 이용해 Cold Sequence를 Hot Sequence로 변환 할 수 있다
  - cache()를 이용해 미리 계산해 놓은 값을 이후 구독자에게 전달해 줄 수 있다
- Hot Sequence는 Subscriber의 최초 구독이 발생해야 Publisher가 데이터를 emit하는 warm up과 subscriber의 구독 여부와 상관없이 데이터를 emit하는 Hot으로 구분할 수 있다