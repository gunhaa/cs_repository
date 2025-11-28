# Synchronization Tools

- Cooperating processes
  - can either affect or be affected by each other
  - can share a logical address space or be allowed to share data
  - however, concurrent access to shared data
    - may result in data inconsistency
  - hence, we need to ensure
    - the orderly execution of cooperating processes
    - that share a logical address space to maintain data consistency
- The integrity of data shared by several processes(or threads)
  - concurrent execution
    - a process may be interrupted at any point in its instruction stream
    - the processing core may be assigned to another process
  - parallel execution
    - two or more instruction streams(representing diffrent processes)
    - execute simulataneously on separate processing cores
- two statements `count++`
  - may be implemented in machine language as follows
  ```plaintext
  register1 = count
  register1 = register1 + 1
  count = register1
  ```
  - even though register1 may be the same physical register
    - the contents of these registers will be
    - saved and restored by the interrupt handler(or scheduler)
- the concureent execution of `count++` and `count--`
  - is equivalent to a sequential execution
  - in which the lower-level statements presented previously
  - are interleaved in some arbitary order
  - bad case ( `count++`, `count--` execute)
  ```
  t0: producer execute register1 = count [register1 = 5]
  t1: producer execute register1 = register1 + 1 [register1 = 6]
  t2: consumer execute register2 = count [register1 = 5]
  t3: consumer execute register2 = register2 - 1 [register1 = 4]
  t4: producer execute count = register1 [count = 6]
  t5: consumer execute count = register2 [count = 4]
  ```
- Race Condition
  - where several processes(or threads)
  - access and manipulate the same(or shared) data concurrently
  - and the outcome of the execution depends on the particular order in which the access takes place
- To guard against the race condition
  - we need to ensure that
    - only one process at a time can manipulate the shared data(e.g. the variable count)
  - to make such a gurantee,
    - we require that the processes are synchronized in some way
    - to say, process(or thread) synchronization

## The Critical Section Problem

- Consider a system consisting of n processes
  - each process has a segment of code, called a critical section
  - in which the process may be accessing and updating data
  - that is shared with at least one other process
- The important feature of the system is that
  - when one process is executing in its critical section
  - no other process is allowed to execute in its critical section
- The critical-section problem
  - No two processes are executing in their critical sections at the same time
  - To design a protocol(규칙/방법/알고리즘, 프로세스 synchronized에 사용되는) that
    - the processes can use to synchronize their activity
    - so as to cooperatively share data
  - “임계구역 문제(critical section)란, 여러 프로세스가 공유 데이터를 다룰 때 서로 충돌하지 않도록 하며 동시에 임계구역에 들어오지 못하게 하는 동기화 프로토콜을 설계하는 문제이다”

## Perterson's Solution

- 고전적인 소프트웨어 기반 해결책이다
  - 현대 컴퓨터 구조가 load와 store같은 기본적인 기계어를 수행하는 방식때문에 올바르게 실향된다고 보장할 ㄱ수 없다
```C
while (true) {
    flag[i] = true;
    // 상대에게 차례를 준다, turn은 하나의 수밖에 존재할수 없다(현대 CPU에서는 read add write가 다르기에 성립되지않음)
    turn = j;
    while (flag[j] && turn == j) {}

    // critical section

    flag[i] = false;
    
    // remainder section
}
```

## Hardware Support for Synchronization

- Hardware-Based Solution
  - Hardware instructions that provide
    - support for solving the critical section problem
    - can be used directly as synchronization tools,
    - can be used to form the foundation of more abstract mechanism
  - Three primitive operations
    - memory barriers or fences
    - hardware instructions
    - atomic variables
- memory barriers
  - 컴퓨터 아키텍쳐는 메모리의 모든 변경 사항을 다른 모든 프로세서로 전파하는 명령을 제공한다
  - 이 명령어를 활용하여 다른 프로세서에서 실행중인 스레드에 메모리 변경 사항이 보이는 것을 보장한다
  - 아래 예제는 flag의 값이 x보다 먼저 적재되도록 보장한다
    ```C
    while(!flag)
    memory_barrier();
    print x;
    ```
- hardware Instructions
  - 현대 기계들은 한 word의 내용을 검사하고 변경하거나, two word의 내용을 원자적으로 swap할 수 있는(인터럽트되지 않는 하나의 단위로서)하드웨어 명령어들을 제공한다
  - `test_and_set()`과 `compare_and_swap()`이 대표적이다
- `test_and_set()`은 아래와 같은 구조이며, 원자적으로 실행된다는 것이 핵심 특징이다
```C
boolean test_and_set(boolean *target) {
boolean rv = *target;
*target = true;
return rv;
}

// 해당 방식의 구현이 가능하다
do {
while(test_and_set(&lock))
    ; 
    //critical section
    lock = false;
} while(true);
```
- `compare_and_swap()`은 CAS연산이라고 불리며 두 개의 word에 대해 원자적인 연산을 제공하며, 두 word의 교환에 기반을 둔 기법을 사용한다
  - CPU가 한 번에 읽고 쓰는 기본 데이터 단위(64bit = 8byte, 32bit = 4byte)(8 byte, 16 byte까지 가능, x86-64, arm은 8byte만 가능)
  - java의 `AtomicReference<String>`은 참조값만 CAS하는 방식이다
- `Atomic Variables`
  - Typicall, the `compare_and_swap()` instruction
    - is used for construction other tools such as an atomic variable
  - an atomic variable provides
    - atomic operations on basic data types such as integers and booleans
    - can be used to ensure mutual exclusion in situations
    - where there may be a single variable with race condition
  - 즉 아토믹 변수는 CAS연산의 응용이며, 이를 활용해 상호 배제/ 레이스 컨디션을 보장한다

## Mutex Locks

- Higher-level software tools to solve the CSP(critical section problem)
  - Mutex Locks: the simplest tools for synchronization
  - Semaphore: more robust, convenient, and effective tool
  - Monitor: overcomes the demerits of mutex and semaphore
  - Liveness: ensures for processes to make progress
- Mutex Lock
  - mutex: MUtual EXclusion
  - to protect critical section and prevent race condition
  - a process must acquire the lock before entering a critical section
  - releases the lock when it exits the critical section
- Two functions and one variable for the Mutex Locks
  - `acquire()` and `release()`
  - available: a Boolean variable whose value indicates
    - if the lock is available or not
  ```C
  acquire() {
    while (!available) {}
      // busy waiting
    available = false;
  }

  release() {
    available = true;
  }
  ```
  - calls to either acquire() and release() must be performed atomically
  - can be implemented using the compare_and_swap operation
  - the type of mutex lock using the method of busy waiting
    - the process spins while waiting for the lock to become available
  - however, spinlocks do have an advantage,
    - in that no context switch is required waiting on a lock
    - a context switch may take considerable time
  - IN certain circumstances on multicore systems,
    - spinlocks are the preferable choice for locking
    - one thread can spin on one processing core
    - while another thread performs its critical section on another core

## Semaphore

- A semaphore S is 
  - an integer variable that, aprat from initialization
  - is accessed only through two standard atomic operations:
  - wait() and signal(), or sometimes P() and V()
- defining of wait() and signal()
```C
// 조건을 만족하지 못하면 spin 대기를 한다
wait(S) {
    S--;
    while (S <= 0);
        // busy wait
}

// 내가 사용을 중지하는 신호를 준다
signal(S) {
    S++;
}
```

- All modifications to the integer value of the semphore
  - in the wait() and signal() operations must be executed atomically
- Binary and Counting Semaphores
  - Binary Semaphore
    - rang only between 0 and 1: similar to mutex lock
  - Counting Semaphore
    - range over and unrestricted domain
    - can be used to resources with a finite number of instance
- Semaphore Implementation
  - Semaphores also suffer. from the problem of busy waiting
  - To overcome this problem, modify the definition of P() and V()
  - When a process executes the wait() operation
    - and finds that the semaphore is not positive, it must wait
    - rather than busy waiting, suspend itself and goes to the waiting queue
  - When other process executes the signal() operation
    - waiting processes can be restarted and placed into the ready queue

## Monitors

- The difficulty of using semaphores
  - the semaphore is convenient and effective for synchoronization
  - however, timing errors can happen
    - if particular execution sequences take place
    - these sequences do not always occur,
    - and it is hard to detect
    - 프로그래머가 제대로 코딩을 하면 생기지 않는 문제이지만, 사람이 실수를 할 수는 없기에 찾기 힘든 문제가 생기는 것이다
- java에서는 wait()을 통해 wait set으로 보내고, notify()를 통해 깨운다
  - wait()은 notify()가 없더라도 꺠어날 수 있어, while로 방어하는 로직이 best이다
  - Spurious Wakeup이라고 부르며, java 정식 스펙이다(JLS)

```java
import java.util.LinkedList;
import java.util.Queue;

public class ProducerConsumerExample {

    // 1. 공유 자원: 유한한 크기의 버퍼
    private static final int CAPACITY = 5;
    private final Queue<Integer> buffer = new LinkedList<>();

    // 2. 생산자 메서드
    public void produce(int value) throws InterruptedException {
        synchronized (buffer) { // 🔒 synchronized: 락 획득 (상호 배제)

            // wait() 사용 (조건 불충족 시 대기)
            // 버퍼가 가득 찼으면 (조건: buffer.size() < CAPACITY), 생산자는 락을 해제하고 대기
            while (buffer.size() == CAPACITY) {
                System.out.println("생산자: 버퍼 가득 참. 대기 시작. (Size: " + buffer.size() + ")");
                buffer.wait(); // 락 해제 후 대기 셋(Wait Set)으로 이동
                // 깨어나도 다시 조건 확인
            }

            // 조건 충족 시 작업 진행
            buffer.add(value);
            System.out.println("생산자: 아이템 생성 -> " + value + " (Size: " + buffer.size() + ")");

            // notifyAll() 사용 (조건 충족 알림)
            // 새로운 아이템을 추가했으니, 혹시 소비자가 기다리고 있다면 깨워줍니다.
            buffer.notifyAll();
            
        } // synchronized: 블록을 나가며 락 해제
    }

    // 3. 소비자 메서드
    public int consume() throws InterruptedException {
        int value = -1;

        synchronized (buffer) { // 🔒 synchronized: 락 획득 (상호 배제)

            // wait() 사용 (조건 불충족 시 대기)
            // 버퍼가 비어 있으면 (조건: !buffer.isEmpty()), 소비자는 락을 해제하고 대기
            while (buffer.isEmpty()) {
                System.out.println("소비자: 버퍼 비어 있음. 대기 시작. (Size: " + buffer.size() + ")");
                buffer.wait(); // 락 해제 후 대기 셋(Wait Set)으로 이동
                // 깨어나도 다시 조건 확인
            }

            // 조건 충족 시 작업 진행
            value = buffer.poll();
            System.out.println("소비자: 아이템 소비 <- " + value + " (Size: " + buffer.size() + ")");

            // notifyAll() 사용 (조건 충족 알림)
            // 아이템을 제거했으니, 혹시 생산자가 기다리고 있다면 깨워줍니다.
            buffer.notifyAll(); 
            
        } // synchronized: 블록을 나가며 락 해제

        return value;
    }

    // 메인 실행 부분 (스레드 생성 및 실행)
    public static void main(String[] args) {
        ProducerConsumerExample pc = new ProducerConsumerExample();
        
        // 생산자 스레드
        Thread producer = new Thread(() -> {
            try {
                for (int i = 0; i < 10; i++) {
                    pc.produce(i);
                    Thread.sleep(100); // 시뮬레이션 지연
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        // 소비자 스레드
        Thread consumer = new Thread(() -> {
            try {
                for (int i = 0; i < 10; i++) {
                    pc.consume();
                    Thread.sleep(300); // 시뮬레이션 지연
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
    }
}
```
- while 루프를 사용하면, 스레드가 깨어난 후 곧바로 임계 영역을 실행하는 대신, 루프의 조건문으로 돌아가 "내가 깨어날 조건이 정말 충족되었는지?"를 다시 확인한다(java의 best practice)
