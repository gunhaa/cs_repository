# Reactor pattern

- nodejs의 핵심 아키텍처는 Reactor Pattern
- 이 패턴은 non-blocking을 다루기 위해 등장하였고, busy-waiting패턴을 개선한 패턴이다

## busy-waiting 패턴

- non-blocking을 다루는 가장 기본적인 패턴으로, 실제 데이터가 반환될 때 까지 루프내에서 적극적으로 리소스를 폴링하는 것이다
- 이 패턴은 엄청난 CPU의 낭비를 초래한다

```pseudo
resources = [socketA, socketB, socketC]

while (resources.length > 0) {
  for (let i = 0; i < resources.length; i++) {
    resource = resources[i]
    data = resource.read()

    if (data.status === "NO_DATA_AVAILABLE") {
      // 이 순간에는 읽을 데이터가 없음
      continue
    }

    if (data.status === "RESOURCE_CLOSED") {
      // 리소스가 닫히고 리스트에서 삭제
      resources.remove(i)
      continue;
    }
    // 데이터를 받고 처리
    consumeData(data)
  }
}
```

## event demultiplexing 패턴

- busy-waiting 패턴을 극복하고 효율적으로 사용하기 위한 패턴이다
- 동기 이벤트 디멀티 플렉서, 이벤트 통지 인터페이스라고도 불린다

```pseudo
watchedList.add(socketA, FOR_READ)
watchedList.add(fileB, FOR_READ)

while(events = demultiplexer.watch(watchedList)){
    // 이벤트 루프
    for (event of events) {
        // 블로킹하지 않으며 항상 데이터를 반환
        data = event.resource.read()
        if(data === RESOURCE_CLOSED) {
            // 리소스가 닫히고 관찰되는 경우 리스트에서 삭제
            demultiplexer.unwatch(event.resource)
        } else {
            // 실제 데이터를 받으면 처리
            // event의 콜백 함수를 통해 역할을 수행한다
            consumeDate(data)
        }
    }
}
```

- busy-waiting 패턴과의 주된 차이점은, 모든 이벤트가 처리되고 나면 다시 이벤트 디멀티 플렉서가 처리 가능한 이벤트를 반환하기 전까지 루프가 실행되지 않으며 이벤트 루프에 새로운 이벤트가 넣어지면 실행되게 된다
- 즉, 비동기 작업의 완료 결과는 이벤트 루프를 통해 처리되며, event demultiplexing 패턴은 이벤트들을 감지하고 루프에 전달하는 핵심 메커니즘이다
- 즉, 비동기 요청이 발생하면 nodejs 런타임은 해당 요청에 대한 콜백 핸들러를 등록하고, 요청 자체는 libuv를 통해 커널에 위임된다. 이후 커널에서 작업이 완료되면 libuv는 이를 감지하고, 이벤트 루프를 통해 등록된 콜백 핸들러를 실행한다