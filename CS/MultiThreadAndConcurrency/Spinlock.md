# Spin lock

> CAS 연산을 이용한 락이다

- CAS연산시 CPU 자체가 싱글 스레드처럼 동작하기 때문에 때문에 동시에 여러 명령을 실행할 수 없으며, CAS 연산은 원자적으로 처리되기 때문에 경쟁하는 둘 중 하나만 성공한다
- 동시에 명령이 들어가도, 먼저 들어간 한개만 성공하고 다른 한개의 명령은 실패한다
- 스핀 락 방식은 아주 짧은 CPU 연산을 수행할 때 사용해야 효율적이다. 잘못 사용하면 오히려 CPU 자원을 더 많이 사용할 수 있다

## 왜 "CPU가 싱글스레드처럼 동작한다"고 말하는가?
- 실제로 현대 CPU는 멀티코어 + 멀티스레드(SMT: Simultaneous Multi-Threading) 구조다
- 하지만 원자적 연산(CAS)이 실행될 때는
  - 해당 명령어(LOCK CMPXCHG)가 CPU 버스/메모리 버스를 잠깐 점유한다
  - 해당 메모리 주소에 대해 다른 스레드/코어가 접근하지 못하도록 막는다
    - CAS 전: 여러 코어, 여러 스레드가 동시에 같은 변수 접근 가능
    - CAS 실행 중: 단 하나의 코어만 접근 가능 ← 마치 싱글스레드처럼 동작
    - CAS 후: 다시 병렬 실행 가능

## spinlock bad

- 실행 코드

```java
    public static void main(String[] args) {
//        SpinLockBad spinLock = new SpinLockBad();
        SpinLock spinLock = new SpinLock();
        Runnable task = new Runnable() {
            @Override
            public void run() {
                spinLock.lock();
                try {
                    //critical section
                    log("비즈니스 로직 실행");
                } finally {
                    spinLock.unlock();
                }
            }
        };
        Thread t1 = new Thread(task, "Thread-1");
        Thread t2 = new Thread(task, "Thread-2");
        t1.start();
        t2.start();
    }
```

- SpinLockBad Class

```java
public class SpinLockBad {
    private volatile boolean lock = false;

    public void lock() {
        log("락 획득 시도");
        while (true) {
            
            // volatile로 같은 것을 읽었기 때문에 동시에 실행이 되어 동시성 이슈가 발생한다
            // critical section을 보호하지 못한다
            // 1. 락의 사용여부 확인 2. 락의 값 변경
            // 두 가지가 원자적이지 않다는 문제가 있다

            // 여기서 해결 방안이 있다, 바로 이 두가지 코드를 하나로 묶어 원자적으로 처리하는 것이다
            
            if(!this.lock) { // 1. 락 사용 여부 확인
                sleep(100); // 문제 상황 확인용, 스레드 대기
                this.lock = true; // 2. 락의 값 변경
                break;
            } else {
                // 락을 획득할 때 까지 스핀 대기(바쁜 대기) 한다
                log("락 획득 실패 - 스핀 대기");
            }
        }
        log("락 획득 완료");
    }

    public void unlock() {
        this.lock = false; // 원자적인 연산
        log("락 반납 완료");
    }
}
```

## spinlock

```java
public class SpinLock {

    // CAS연산을 지원한다
    private final AtomicBoolean lock = new AtomicBoolean(false);

    public void lock() {
        log("락 획득 시도");

        // CAS연산은 두 연산을 하나의 원자적인 연산으로 만들어준다
        // 1. 락 사용 여부 확인(lock의 값이 false라면) 2. 락의 값 변경(lock의 값을 true로 변경)
        while(!lock.compareAndSet(false, true)) {
            // 락을 획득할 떄 까지 스핀대기(busy waiting) 한다
            log("락 획득 실패- 스핀 대기");
        }
        log("락 획득 완료");
    }

    public void unlock() {
        lock.set(false);
        log("락 반납 완료");
    }
}
```

### spinlock의 장점

- spinlock의 원자적인 연산은 스레드 입장에서 쪼갤수 없는 연산이다. 따라서 여러 스레드가 동시에 실행해도 안전하다
- CAS를 이용하면 무거운 동기화 작업 없이 아주 가벼운 락(spinlock)을 만들 수 있다
- 동기화 락을 사용하는 경우 스레드가 락을 획득하지 못하면 BLOCKED, WAITING등으로 상태가 변하고(Context switching 비용 발생) 대기상태의 스레드를 꺠워야하는 무겁고 복잡한 과정이 추가로 들어간다
  - 성능의 저하가 발생한다
- CAS를 이용한 락 방식은 사실 락이 없다
  - 단순히 while문을 반복할 뿐이다
  - 대기하는 스레드도 RUNNABLE 상태를 유지하며 가볍고 빠르게 작동할 수 있다

### spinlock의 단점

- 락을 대기하는 스레드가 BLOCKED, WAITING 상태로는 빠지지 않지만 RUNNABLE 상태로 락을 획득할 때 까지 while문을 반복하는 문제가 있다
- 락을 기다리는 스레드가 CPU를 계속사용하면서 대기하는 것이다
- BLOCKED, WAITING 상태의 스레드는 CPU를 거의 사용하지 않지만, RUNNABLE 상태로 while문을 반복 실행하는 방식은 CPU 자원을 계속해서 사용하는 것이다
- 동기화 락을 사용하면 RUNNABLE 상태의 스레드가 BLOCKED, WAITING 상태에서 다시 RUNNABLE 상태로 이동해 CPU자원을 거의 사용하지 않을 수 있다
- 그래서 동기화 락을 사용하는 방식보다 스레드를 RUNNABLE로 살려둔 상태에서 계속 락 획득을 반복 체크하는 것이 더 효율적인 경우에 이런 방식을 사용해야 한다
- 이 방식은 스레드의 상태가 변경되지 않기 때문에 매우 락을 빠르게 획득하고, 또 바로 실행할 수 있는 장점이 있다

### 효율적인 경우

- 안전한 임계 영역이 필요하지만, 연산이 길지 않고 매우 짧게 끝날 때 사용해야한다
  - ex) 숫자 값의 증가, 자료 구조에 데이터 추가와 같이 CPU 사이클이 금방끝나는 연산에 사용하면 효과적
  - 데이터 베이스의 결과 대기나 다른 서버의 요청을 기다리는 것 처럼 오래 기다리는 작업에 사용하면 CPU를 계속 사용하며 기다리는 최악의 결과가 나올 수도 있다

### spinlock 이름의 유래

- 스레드가 락을 해제되기를 기다리면서 반복문을 통해 계속 확인하는 모습이 마치 제자리에서 회전(spin)하는 것 처럼 보인다
- 그래서 이런 방식을 '스핀 락' 이라고 부른다
- 스레드가 락을 획득할 때 까지 기다리는 것을 '스핀 대기(spin wait)'또는 CPU 자원을 게속 사용하면서 바쁘게 대기한다고해서 바쁜 대기(busy wait)라고 한다