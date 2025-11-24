# CPU Scheduling

> 해당 챕터에서 CPU scheduling 하는 하드웨어는 생각하기 쉽도록 다중 코어가 아닌 단일 코어로 가정한다

- CPU scheduling is..
  - the basis of multiprogrammed operating systems
  - the objective of multiprogramming is
    - to have some processes running at all times
- cpu scheduling에는 cpu가 사용되는 cpu burst에는 cpu를 사용하고, I/O시점에는 cpu를 다른 용도로 사용하기 위한 것이다
- cpu scheduler
  - selects a process from the processes in memory
    - that are ready to execute and allocates the CPU to that process
  - Then, how can we select a next process?
    - Linked List, Binary tree
    - FIFO Queue
    - Priority Queue: How can determine the priority of a process?
    - 다양한 자료구조의 ready queue가 존재하며, queue에 있는 record들은 일반적으로 process의 PCB(process control block)이다
- preemptive(선점) vs non-preemptive(비선점)
  - Non-preemptive scheduling
    - a process keeps the CPU until it releases it
    - either by terminating or by switching to the waiting state
  - Preemptive scheduling
    - a process can be preempted by the scheduler
- Decision Making for CPU-scheduling
  1. When a process switches from the running to waiting state
  2. When a process switches from the running to ready state
  3. When a process switches from the waiting to ready state
  4. When a process terminates
  - 1 & 4: no choice - non-preemptive
  - 2 & 3: chices - preemptive or non-preemptive
- The dispatcher is
  - a module that gives control of the CPU's core
    - to the process selected by the CPU scheduler
  - The functions of dispatcher
    - switching context from one process to another
    - switching to user mode
    - jumping to the proper location to resume the user program
  - The dispatcher should be as fast as possible
    - since it is invoked during every context switch

## Scheduling Criteria

- Scheduling algorithm은 다른 특성을 가지고있으며, 알고리즘을 고르기 위한 기준이 될 수 있는 것들은 아래와 같다
  - CPU utilization(이용률): to keep the CPU as busy as possilbe
  - throughput(처리량): the number of processes completed per time unit
  - turnaround time(총 처리 시간): from the time of submission to the time of completion
  - waiting time(대기 시간): the amount of time that a process spends waiting in the ready queue, the sum of periods spend waiting in the ready queue
  - response time(응답 시간): the time it tkaes to start responding

## Scheduling Algorithm

> algorithm은 단순한 것부터 복잡한 현대식 알고리즘으로 발전하였으며, 여기서는 단순->복잡의 순서(발전 순서)로 설명한다

- CPU scheduling main problem: decide which of the processes in the ready queue is to be allocated the CPU's core

### 1. FCFS, First Come First Serve

- the simplest CPU-scheduling algorithm
- the process that requests the CPU first
  - is allocated the CPU first
  - can be easily implemented with a FIFO queue
- The FCFS scheduling algorithm is non-preemptive
- convoy effect(호위 효과)에 주의하여야 한다
  - 모든 다른 프로세스들이 하나의 긴 프로세스가 CPU를 양도하기를 기다리는 것

### 2. SJF, Shortest Job First(= SRTF, Shortest Remaining Time First)

- SJF associates with each process
  - the length of the process's next CPU burst
- When the CPU is available
  - assign it to the process that has the smallest next CPU burst
- If two or more processses are even, break the tie with the FCFS
- The SJF scheduling algorithm is probably optimal
  - it gives the minimum average waiting time for a given set of processes
  - but there is no way to know the length of the next CPU burst
  - we may be able to predict the length of the next CPU
- The SJF algorith can be either preemptive or non-preemptive
  - 앞의 프로세스가 실행되는 동안 새로운 프로세스가 준비 큐에 도착하면 선택이 발생하며,
  - 새로운 프로세스가 현재 실행되고 있는 프로세스의 남은 시간 보다 더 짧은 CPU 버스트를 가질 수도 있다
  - 선점형/비선점형에 따라 알고리즘의 선택이 바뀔 수 있다
- CPU burst를 정확히 구할 수 없는 문제 때문에 정확히 구현될 수 없는 알고리즘이다

### 3. RR, Round Robin

- preemptive FCFS with a time quantum(할당량/time-slice)
- a time quantum(or time slice) is a small unit of time
  - generally from 10 to 100 milliseconds in length
- The ready queue is treated as a circular queue
- the scheduler goes around the ready queue,
  - allocating the CPU to each process
  - for a time interval of up to 1 time quantum
- the average waiting time under the RR policy is often long
- the RR scheduling algorithm is preemptive
  - if a process's CPU burst exceeds one time quantum,
  - that process is preempted and is put back in the ready queue

### 4. Priority-based

- A priority is associated with each process,
  - and the CPU is allocated to the process with the highest priority
  - processes with equal priority are scheduled in FCFS order
- SJF is a special case of the priority-based scheduling
  - in this case, the priority is the inverse(역수) of the next CPU burst
- priority scheduling can be
  - either preemptive or non-preemptive
- The problem of starvation(indefinite blocking)
  - a blocked process: ready to run, but waiting for the CPU
  - some low-priority processes may wait indefinitely
- A solution to the starvation problem is aging
  - gradually increase the priority of processes
    - that wait in the system for a long time
- another solution is combine RR and Priority scheduling
  - execute the highest-priorty process and runs processes with the same priority using round-robin scheduling

### 5. MLQ, Multi Level Queue

- ready queue를 우선순위에 따라 분리하는 방법이다
  - 실시간 프로세스/시스템 프로세스/대화형 프로세스/배치 프로세스 큐로 나눈다
- 첫 번째 구현은 각 큐는 낮은 우선순위의 큐보다 절대적인 우선순위를 가진다
  - 예를 들어 실시간 프로세스, 시스템 프로세스 등이 비어있지 않으면 배치 프로세스는 실행될 수 없다
  - 배치프로세스가 실행중이어도 실시간 프로세스가 들어가면 선점될 것이다
- 다른 구현은 큐들 사이에 시간을 나누어 사용하는 것이다
  - 각 큐는 CPU 시간의 일정량을 받아서 자기 큐에 있는 다양한 프로세스를 스케줄 할 수 있다
  - 우선 순위가 높은 큐일수록 많은 시간을 주고, 우선 순위가 낮을수록 적은 시간을 준다

### 6. MLFQ, Multi Level Feedback Queue

- 현대 CPU에 사용되는 알고리즘이다
- 이 알고리즘은 특정 시스템에 부합하도록 구성 가능하다
- 매개변수를 산정해야하는 특정 방법이 필요하기에 가장 복잡한 알고리즘 이기도하다
- 이 알고리즘의 multi level schelduer queue를 만드는 매개변수는 다음과 같다
  - 큐의 개수
  - 각 큐를 위한 스케줄링 알고리즘
  - 한 프로세스를 높은 우선순위 큐로 올려주는 시기를 결정하는 방법
  - 한 프로세스를 낮은 우선 순위 큐로 강등시키는 시기를 결저앟는 방법
  - 프로세스에 서비스가 필요할 때 프로세스가 들어갈 큐를 결정하는 방법

## Thread Scheduling

- on most modern operating system
  - it is kernel threads - not processes - that are being scheduled,
  - and user thread are managed by a thread library
    - so, the kernel is unaware of them,
    - ultimately mapped to associated kernel threads(유저 스레드는 결국 실행되기 위해 커널 스레드를 사용해야 한다)