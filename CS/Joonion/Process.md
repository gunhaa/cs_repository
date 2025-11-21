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
- Process have two possibilites for execution
  - the parent continues to execute concurrently with its children
  - the parent waits until some or all of its childrent have terminated
- Process have two possibilites of address-space
  - the child process is a duplicate of the parent process
  - the child process has a new programs loaded into it
- Process terminates
  - when it finishes executing its final statement
  - exit() system call: asks OS to delete it
  - OS deallocated and reclaims all the resources:
    - allocated memories, open files, and I/O buffers, etc
- zombie and orphan
  - zombie process: 실행이 끝났지만, 부모 프로세스가 wait()를 호출하지 않아 자식의 종료 정보를 회수하지 못함, 그래서 PCB가 커널에 남아 있음
  - orphan process: 부모 프로세스가 먼저 종료되어, 부모가 사라진 자식 프로세스
- in UNIX-like O/S
  - a new process is created by the fork() system call
  - the child process consists of a copy of the address space of the parent process
  - both processes continue execution at the instruction after the fork() system call
  - with one diff
    - the return code for the fork() is zero for the child process, whereas 
    - the nonzero pid of the child is returned to the parent process

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
  - these queues are generally implemented in the linked lists of PCBs
- Context Switching
  - The context of a process is a represented in the PCB
  - when an interrupt occurs, the system saves the current context of the running process, so that, later, it can restore that context when it should be resumed
- The context switch is a task that
  - switches the CPU core to another process
  - performs a state save of the current process
  - and a state restore of a diffrent process
- A process may create several new processes

# Interprocess Communication(IPC)

- a process is independent
  - if it does not share date with any other processses
- a process is cooperating
  - if it can affect or be affected by the other processes
  - clearly, any processes that shares data with other processes is a cooperating process
- IPC
  - cooperating processes require an IPC mechanism
    - that will allow them to exchange data
    - that is, send data to and receive data from each other

### IPC in shared-memory system

- Consider the Producer-Consumer Problem
  - to illistrate the concept of cooperating processes
  - a common paradigm for cooperating process
- Producer-Consumer problem
  - A producer produces information that is consumed by a consumer
  - e.g. a compiler produces assembly code, and a assembler consumes it, a web server produces an HTML file, and a browser consumes it
- (Consumer - Producer)A solution using shared memory
  - To allow producer and consumer to run concurrently
  - let a buffer of items be available
    - a producer can fill the buffer and a consumer can empty the buffer
  - a shared memory is a region memory
    - that is shared by the producer and consumer processes
  - the CODE for accessing and manipulating the shared memory be written explicitly by the application programmer