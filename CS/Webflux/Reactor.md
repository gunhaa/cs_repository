# Reactor

```java
    public static void main(String[] args) {
        // Flux: Publisher
        // just.map은 operator로써 전달받은 데이터를 가공하는 역할을 한다
        Flux<String> sequence = Flux.just("Hello,", "Reactor", "Bye");
        sequence.map(data -> data.toLowerCase())
                // Subscriber
                .subscribe(data -> System.out.println(data));

        // Mono는 0, 혹은 1개의 인자인 Publisher이다
        Mono<String> monoSeq = Mono.just("Hello,");
        monoSeq.map(data -> data.toLowerCase())
                // Subscriber
                .subscribe(data -> System.out.println(data));

        Mono.just("Hello Reactor")
                .subscribe(System.out::println);

        Mono.empty()
                .subscribe(
                        // Subscriber가 Publisher로부터 데이터를 전달받기 위해 사용된다
                        none -> System.out.println("# emmited onNext signal"),
                        error -> {},
                        // empty이기에 emit이 되지 않고 complete된다
                        () -> System.out.println("# emiited onComplete signal")
                );
    }
```
```java
    public static void main(String[] args) {
        URI worldTimeUri = UriComponentsBuilder.newInstance().scheme("http")
                .host("worldtimeapi.org")
                .port(80)
                .path("/api/timezone/Asia/Seoul")
                .build()
                .encode()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        // Non-Blocking의 이점은 얻을 수 없지만 요청과 응답을 하나의 Operator 체인으로 깔끔하게 처리할 수 있는 장점이 있다
        Mono.just(
            restTemplate
                    .exchange(worldTimeUri,
                            HttpMethod.GET,
                            new HttpEntity<String>(headers),
                            String.class)
        )
                .map(response -> {
                    DocumentContext jsonContext =
                            JsonPath.parse(response.getBody());
//                    System.out.println(jsonContext.);
                    String datetime = jsonContext.read("$.datetime");
                    return datetime;
                })
                .subscribe(
                        data -> System.out.println("# emitted data: " + data),
                        error -> {
                            System.out.println();
                        },
                        () -> System.out.println("# emitted onComplete signal")
                );
    }
```
```java
    public static void main(String[] args) {
        Flux<String> flux =
                // 두개의 mono를 잇는 방법
                // just는 null을 허용하지 않지만
                // justOrEmpty는 null을 허용한다
                Mono.justOrEmpty("Steve")
                        .concatWith(Mono.justOrEmpty("Jobs"));
        flux.subscribe(System.out::println);
    }
```
```java
    public static void main(String[] args) {
        Flux.concat(
                        Flux.just("Mercury", "Venus", "Earth"),
                        Flux.just("Mars", "Jupiter", "Saturn"),
                        Flux.just("Uranus", "Neptune", "Pluto")
                ) // flux가 반환된다
                .collectList()
                // 반환된 flux를 Mono로 리턴한다(단일 컬렉션)
                .subscribe(planets -> System.out.println(planets));
                // 단일 컬렉션을 출력한다
    }
```

- marble diagram을 통해 Opertor를 이해하는 것이 가장 빠른 방법이다