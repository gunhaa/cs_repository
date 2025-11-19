# Process

- a process is a program in execution
  - a process is the unit of work in an operating system
  - a process will need certain resourcees to accomplish its task(CPU time, memory, files, I/O devices)
- memory layout of a process is divided into multiple sections(text, data, heap, stack section)
- when process executes, it changes state
  - New: the process is being created
  - Running: Instructions are being executed
  - Waiting: the process is waiting for some event to occur, such as an I/O completion or reception of a signal
  - Ready: the process is waiting to be assigned to a processor
    - processor: processor = 처리기 = 명령을 실행하는 주체 = OS가 말하는 “실행 가능한 논리 CPU 단위”
  - Terminated: the process has finished execution
- a process is..
  - a program that performs a single thread of execution
  - modern operating systems have extended the process concept
    - to allow a process to have multiple threads(lightweight process) of execution
    - and thus perform more than one task at a time

### PCB(Process Control Block) e.g.TCB(Task Control Block)

- PCB or TCB
  - Each process is represented in the operating system by the PCB
- A PCB contains many pieces of information associated with a specific process
  - e.g. process state, program counter, cpu registers, cpu-scheduling information, memory-management information, accounting information, I/O status information
- OS는 여러 PCB를 관리하기 위해 linked list 기반 큐를 사용한다
  - PCB는 정보가 들어있는 구조체이다
  - Ready Queue, Waiting (Blocked) Queue, Suspended Queue 등을 사용하고 pcb를 넣어 순서대로 사용한다

# Process Scheduling

- The objective of `multiprogramming` is to have some process running at all times so as to maximize CPU utilization
  - CPU가 idle 상태가 되려고 할 때, 다른 ready 상태 프로세스를 바로 투입한다
- the objective of `time sharing` is to switch a CPU core among processes so frequently
  - that users can interact with each program while running
- Sceduling Queues
  - As processes enter the system, they are put into a ready queue, where they are ready and waiting to execute on a CPU's core
  - processes that are waiting for a certain event to occur are placed in a wait queue
  - these queues are generally implemented in the linked lists of PBCs