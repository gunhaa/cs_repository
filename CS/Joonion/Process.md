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

### Message-Passing

- O/S provides the means for cooperating processes
  - to communicate with each other via a message-passing facility
- Two operations of the message-passing facility
  - send(message)
  - receive(message)
- Comminication links
  - if two processes P and Q want to communicate
    - the must send to and receiv messages from each other
  - this comm. link can be implemented in a variety of ways
    - direct or indirect communication
    - synchronous and asynchornous communication
    - automatic or explicit buffering
- Under direct communication(process 직접 통신, socket 통신과 유사)
  - each process that wants to communicate
    - must explicitly name the recipent or sender of the communication
  - The primitives of the scheme
    - send(P, msg) - send a message to process P
    - receive(Q, msg) - receiv a message from process Q
  - The properties of communication links in this scheme
    - Links are established automatically
    - A link is associated with exactly two processes
    - There exists exactly one link between each pair of processes
- Under indirect communication(server-client(port) 모델과 유사)
  - the messages are sent to and received from mailboxes or ports
  - a mailbox(also reffered to as ports)
    - can be viewed abstractly as an object
    - into which messages can be placed by processes and
    - from which messages can be removed
  - The primitives of the scheme
    - send(A, msg) - send a message to mailbox A
    - receive(A, msg) - receive a message from mailbox A
  - diffrent design option for implementation
    - blocking or non-blocking

### Examples of IPC System

- Shared memory: POSIX Shared Memory
  - POSIX: Protable Operating System Interface(for unix)
  - unix에서 정한 system call interface로, windows는 따르지않고, linux도 따르지않던 추세였으나 현재는 대부분 맞추는 방향으로 가고 있다(가장 다른 것은 epoll), macOS는 매우 준수하게 지켰다
- Messages Passing: Pipes
  - One of the earliest IPC mechanism on UNIX systems

#### POSIX Shared memory

- is organized using memory-mapped files
  - which associate the region of shared memory with a file
- First, create a shared-memory object(0666 = 권한, permission)
  - `fd = shm_open(name, O_CREAT | ORDWR, 0666);`
- Configure the size of the object in bytes
  - `ftruncate(fd, 4096)`
- Finally, establish a memory-mapped file
  - `mmap(0, SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);`

#### Pipes

- one of the first IPC mechanisms in early UNIX systems
- A pipe acts as a conduit(통로) allowing two processes to communicate
- four issues of pipe implementation
  1. does the pipe allow unidirectional or bidirectional communication
  2. in the case of two-way comm., is it half-duple or full duplex
  3. Must a relationship exist between the communicating process? such as parent-child
  4. can the pipes communicate over a network
- Two common types of pipes
  - Ordinary pipes
    - cannot be accessed from outside the process that created it
    - Typically, a parent process creates a pipe and uses it to communicate with a child process that it created
    - allow two processes to communicate in producer-consumer fashion
      - the producer writes to one end of the pipe(write end)
      - the consumer reads from the other end(read end)
    - unindirectional: only one-way communication is possilbe
    - if need two-way communication, use two pipes
    - on UNIX systems ordinary pipes are constructed using the function
      - `pipe(int fd[])`
      - `fd[0]`: the read end of the pipe
      - `fd[1]`: the write end
  - Named pipes
    - can be accessed without a parent-child relationship

### Communication in Client-Server Systems

- process간 통신에도 client-server 전략을 사용할 수 있다
- Two other strategies in client-server systems
  - sockets
    - are defined as endpoints for communication
  - RPC's (Remote Procedure Calls)
    - abstracts procedure calls between processes on networked systems
- Socket is
  - identified by an IP address concatenated with a port number
- RPC system is
  - hides the details allow communication to take place
    - by providing a stub(proxy function) on the client side
  - the stub of client-side locates the server and
    - marshals(직렬화, byte stream으로 변환시킴) the parameters
  - the stub of server-side received this message
    - unpacks the marshalled parameters and
    - performs the procedure on the server