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