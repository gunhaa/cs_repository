# 동시성 컬렉션

- 자바의 일반적인 컬렉션은 스레드 세이프하지 않다(java.util 패키지가 제공하는 컬렉션)

## 해결방법 

- synchronized를 사용하면 동기적인 컬렉션으로 사용 가능하다(Proxy 이용이 베스트)
- 자바는 컬렉션을 위한 프록시 기능을 제공한다

```java
    public static void main(String[] args) {
        // 동기화 프록시 리스트 생성방법
        List<String> list = Collections.synchronizedList(new ArrayList<>());
        list.add("data1");
        list.add("data2");
        list.add("data3");
        // class java.util.Collections$SynchronizedRandomAccessList
        System.out.println(list.getClass());
        System.out.println("list = " + list);
    }
```

### 그러면 처음부터 스레드 안전하게 만들면 되지 않나?

- synchronized, Lock, CAS등 모든 방식은 정도의 차이는 있지만 성능과 트레이드 오프가 있다
- 결국 동기화를 사용하지 않는 것이 가장 빠르다
- 컬렉션이 항상 멀티스레드에서 사용되는 것도 아니다
- 미리 동기화를 해둔다면 단일 스레드에서 사용할 때 동기화로 인해 성능이 저하된다
- 즉, 동기화가 꼭 필요한 경우에만 동기화를 적용하는 것이 필요하다

### synchronized proxy의 단점

> synchronized proxy는 단순 무식하게 모든 메서드에 synchornized를 거는 것이다. 따라서 동기화에 대한 최적화가 이루어지지 않는다. 그래서 자바는 이런 단점을 보완하기 위해 java.util.concurrent 패키지에 동시성 컬렉션을 제공한다

> 즉 테이블 락과 같이 동작하는게 synchronized proxy 방법이고, concurrent 패키지는 레코드락을 거는 방식과 비슷하게 동작한다

1. 동기화 오버헤드 발생, synchronized가 멀티스레드 환경의 안전을 보장하지만 호출시마다 동기화 비용이 추가되어 성능이 저하된다
2. 전체 컬렉션에 대한 동기화가 이루어져 잠금범위가 넓어진다. 이는 잠금 경합(lock contention)을 증가시키고, 병렬 처리의 효율성을 저하시키는 요인이 된다. 모든 메서드에 대해 동기화를 적용하다 보면 특정 스레드가 컬렉션을 사용하고 있을 때 다른 스레드가 대기해야 하는 상황이 빈번해질 수 있다
3. 정교한 동기화가 불가능하다. synchronized 프록시를 사용하면 컬렉션 전체에 대한 동기화가 이루어지지만, 특정 부분이나 메서드에 대해 선택적으로 동기화를 적용하는 것은 어렵다. 이는 과도한 동기화로 이어질 수 있다

### java.util.concurrent 패키지

> ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue 등이 있다

- synchronized, Lock(ReentrantLock), CAS, 분할 잠금 기술(segment lock) 등 다양한 방법을 섞어서 매우 정교한 동기화를 구현하면서 동시에 성능도 최적화했다
- 각각의 최적화는 매우 어렵게 구현되어 있으며, 자세한 구현을 이해하는 것보다는 멀티스레드 환경에 필요한 동시성 컬렉션을 잘 선택해서 사용할 수 있으면 충분하다

#### 동시성 컬렉션 종류
- List
  - CopyOnWriteArrayList: ArrayList의 대안
- Set
  - CopyOnWriteArraySet: HashSet의 대안
  - ConcurrentSkipListSet: TreeSet의 대안(정렬된 순서 유지, Comparator 사용 가능)
- Map
  - ConcurrentHashMap: HashMap의 대안
  - ConcurrentSkipListMap: TreeMap의 대안(정렬된 순서 유지, Comparator 사용 가능)
- Queue
  - ConcurrentLinkedQueue: 동시성 큐, 비 차단(non-blocking, 어떤 작업을 요청했을 때, 바로 결과를 반환한다, 즉 작업이 성공했는지 실패했는지 즉시 알려준다) 큐이다
- Deque
  - ConcurrentLinkedDeque: 동시성 데크, 비 차단(non-blocing) 큐이다
- 스레드를 차단하는 블로킹 큐
  - ArrayBlockingQueue
    - 크기가 고정된 블로킹 큐
    - 공정모드를 사용할 수 있다, 공정 모드를 사용하면 성능이 저하될 수 있다
  - LinkedBlockingQueue
    - 크기가 무한하거나 고정된 블로킹 큐
  - PriorityBlockingQueue
    - 우선순위가 높은 요소를 먼저 처리하는 블로킹 큐
  - SynchronousQueue
    - 데이터를 저장하지 않는 블로킹 큐로, 생산자가 데이터를 추가하면 소비자가 그 데이터를 받을 때 까지 대기한다. 생산자- 소비자 간에 직접적인 hand-off 메커니즘을 제공한다.
    - 중간에 큐 없이 생산자, 소비자가 직접 거래한다
  - DelayQueue
    - 지연된 요소를 처리하는 블로킹 큐로, 각 요소는 지정된 지연 시간이 지난 후에야 소비될 수 있다. 일정 시간이 지난 후 작업을 처리해야하는 스케줄링 작업에 사용된다