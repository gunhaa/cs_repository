# synchronized

- 모든 객체는 내부에 자신만의 락을 가지고 있다
  - 모니터 락 이라고도 부른다
  - 객체 내부에 있고, 확인은 어렵다
  - 인스턴스가 락을 가지고 있다(메서드 마다 락이 있는 것이 아니다)
- 스레드가 synchronized 키워드에 진입하기 위해서는 반드시 해당 인스턴스의 락이 있어야 한다
  - 스레드가 synchronized 키워드 메서드를 실행시키면, 해당 메서드의 인스턴스에 있는 락을 획득한다
  - synchronized 메서드가 여러 개 있는 같은 인스턴스의 경우, 하나의 락을 공유하므로 동시에 접근할 수 없다
  - 락을 획득한 후, 메서드 사용이 끝나면 바로 락을 반납한다
- 락이 없는 상태의 synchronized 메서드에 접근하려는 스레드는 상태를 RUNNABLE에서 BLOCKED상태로 변하며, 락을 획득할 때 까지 무한정 대기한다
  - BLOCKED 상태가 되면 락을 다시 획득하기 전까지는 계속 대기하고, CPU 실행 스케줄링에 들어가지 않는다
- 주의: 락을 획득하는 순서는 보장되지 않는다
  - 락의 획득 순서는 자바 표준에 정의되어 있지 않다
  - 하지만 일반적(확률적)으로 오래 기다린 경우가 락을 획득할 확률이 높다
- volatile을 사용하지 않더라도, synchronized를 사용한다면 메모리 가시성 문제가 해결된다

## 코드블록 synchronized

- 성능 문제가 발생하기 때문에, 동시에 실행할 수 없는 코드 구간은 반드시 필요한 곳으로 한정하여 설정해야 한다
  - 병목현상을 최대한 줄이기 위해, 최대한 짧게 만들어야 한다

## 지역 변수 공유 자원이 아니다(Heap 영역만이 공유 자원이다)

```java
public class SyncTest2Main {

    public static void main(String[] args) {
        MyCounter myCounter = new MyCounter();
        Runnable task = new Runnable() {
            @Override
            public void run() {
                myCounter.count();
            }
        };

        Thread t1 = new Thread(task, "Thread-1");
        Thread t2 = new Thread(task, "Thread-2");
        t1.start();
        t2.start();
    }

    // 스레드의 스택영역에 localValue가 들어간다
    // 지역 변수는 스레드의 개별 저장 공간인 스택영역에 생성된다
    // 지역 변수는 동기화에 대한 걱정을 하지 않아도 된다
    // t1의 localValue와 t2의 localValue는 다른 값이다
    // 이 스택영역은 누구와도 공유하지 않는다
    // 그래서 동시성 문제가 생기지 않는다
    static class MyCounter {
        public void count() {
            int localValue = 0;
            for (int i=0; i < 1000; i++){
                localValue = localValue +1;
            }
            log("result: " + localValue);
        }
    }
}
```

## synchronized의 한계

- java는 멀티스레드언어로 설계되어 synchronized가 처음나왔을땐 혁신적이었지만, 시간이 지날 수록 복잡한 멀티스레드 환경을 구현하기에는 많은 한계가 존재했다
- 무한 대기 문제
  - blocked 상태의 스레드는 락이 풀릴 때 까지 무한 대기한다
    - 중간에 인터럽트 불가능
    - 특정 시간까지 대기하는 타임아웃 불가능
- 공정성 문제
  - 락이 돌아왔을 때 BLOCKED 상태의 여러 스레드들 중 어떤 스레드가 락을 획득할 수 있을지 알 수 없다. 최악의 경우 특정 스레드가 너무 오랜기간동안 락을 획득하지 못할 수 있다
- 이를 해결하기 위해 java ,.vm1.5 부터 java.util.concurrent라는 동시성 문제 해결을 위한 패키지가 추가되었다

## Recap

- synchronized(동기화)를 사용하면 다음 문제를 해결 할수있다
  - 경합 조건(race condition): 두개 이상의 스레드가 경쟁적으로 동일한 자원을 수정할때 발생
  - 데이터 일관성: 여러 스레드가 동시에 읽고 쓰는 데이터의 일관성을 유지
