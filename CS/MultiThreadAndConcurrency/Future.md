# Future

- 미래의 결과를 받을 수 있는 객체이며, Executor 프레임워크에서 사용하는 인터페이스이다
  - `Future<Integer> future = es.submit(new MyCallable());` 과 같이 사용된다
  - 결과를 즉시 받는 것은 불가능하기에, es.submit()은 결과를 반환하는 대신에 결과를 나중에 받을 수 있는 Future객체를 대신 제공한다
  - Future는 전달한 작업의 미래이며, 이 객체를 통해 전달한 작업의 미래 결과를 받을 수 있다
- Future는 결과가 아직 나오지 않았다면 요청 스레드를 WAITING 상태로 만들고 Blocking 시킨 후 작업이 완료되면 RUNNABLE로 바꾸고 값을 반환하고 이후 로직이 진행된다

## 사용 방법

- `es.submit(Callable)` 을 사용할때는 non-blocking
- `future.get()` 을 사용하면 blocking되어 결과를 기다린다 

## 주요 메서드

- boolean cancle()
  - 아직 완료되지 않은 작업을 취소한다
  - 파라미터로 boolean(mayInterruptIfRunning)을 넣어 진행중이라면 취소시킬지(true) 혹은 계속 진행시킬지(false)를 선택할 수 있다
- boolean isCancelled()
  - 작업이 취소되었는지 여부를 확인한다
- V get()
  - 작업이 완료될 때까지 대기하고, 완료되면 결과를 반환한다
  - 작업이 완료될 때까지 get()을 호출한 스레드를 대기(블로킹)한다. 작업이 완료되면 결과를 반환한다

## Recap

- Future(submit, get)는 Nodejs의 async와 비슷한 동작을 한다(async - await)
  - 스프링의 @Async 어노테이션도 스프링이 관리하는 스레드풀에서 빼와 es.submit()과 같은 동작을 수행하는 것이다
- node.js의 경우 iocp, kpoll과같은 시스템콜을 이벤트루프와 함께 사용해 커널 수준에서 최적화 시키는 전략을 사용하지만 java는 멀티스레드 언어이기 때문에 멀티스레드를 이용해 비슷한 동작을 구현한다
  - Nodejs의 비동기 방법은 iobound에 강점이 있고, java의 Executors 프레임워크를 이용한 전략은 cpubound에 강점이 있다
  - nodejs의 async와 같은 처리를 Executors 프레임워크의 submit을 이용해 db insert시 리턴값이 필요없다면 병렬로 빠르게 처리할 수 있다