# ReentrantLock

- Lock.support를 통해 Lock을 다양하게 구현할 수 있지만, 너무 저수준이라 작성할 코드가 많아진다
- 이를 극복하기 위해 java에서 Lock인터페이스와 그 구현체인 ReentrantLock를 제공한다
  - ReentrantLock의 경우 공정/비공정 모드가 존재한다(순서가 보장/비보장)
  - 비공정도 내부가 큐로되어 있어서 어느정도 순서가 일치하지만, 갑자기 등장한 스레드에게 순서를 뺏기는 경우가 있어 비공정이라고 정의하는 것이다
- Lock 인터페이스를 구현한 다른 여러 구현체가 존재하고, 이를 이용해 다양한 락 구현이 가능하다

## Lock 인터페이스

```java
 package java.util.concurrent.locks;

 public interface Lock {
    void lock();
    void lockInterruptibly() throws InterruptedException;
    boolean tryLock();
    boolean tryLock(long time, TimeUnit unit) throws InterruptedException;
    void unlock();
    Condition newCondition();
 }
```

- Lock 인터페이스는 동시성 프로그래밍에서 쓰이는 안전한 임계 영역을 위한 락을 구현하는데 사용된다
  - 인터페이스는 다음과 같은 메서드를 제공한다. 대표적인 구현체가 ReentrantLock이다
- 이 인터페이스를 사용하면 고수준의 동기화가 구현 가능하다
  - Lock인터페이스는 synchronized 블록보다 더 많은 유연성을 제공하며, 특히 락을 특정 시간만큼 시도하거나 인터럽트 가능한 락을 구현할때 유용하다
  - 인터페이스의 메서드명만 봐도 synchronized의 무한대기 문제도 깔끔하게 극복할 수 있다
