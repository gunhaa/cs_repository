# Virtual Memory

- a technique to allow the execution of processes
  - that are not completely in memory
  - so, programs can be larger than physical memory
- abstracts main memory into an extremly large array of storage
  - separating logical memory from physical memory
- provides an efficient mechanism
  - for sharing files and libraries and process creation
- Virtual Address Space
  - the logical (or virtual) view of how a process is stored in memory
  - Typically, begins a certain logical address, to say, address 0,
  - and exists in contiguous memory
  - allows files and memory to be shared by two or more processes
    - through page sharing

## Demand Paging

- Consider how an executable program
  - might be loaded from secondary storage into memory
  - One option is to load the entire program in physical memory
  - `The demand paging` is an alternative strategy
    - to load pages only as they are needed
    - commonly used in virtual memory systems
  - With demand-paged virtual memory,
    - `pages are loaded only when they are demanded during execution`
- Basic Concepts of the Demand Paging
  - While a process is executing,
    - some pages will be in memory and some will be in secondary storage
  - To distinguish between these two situation
    - the valid-invalid bit scheme can be used
    - valid: the page is both legal(유효) and in memory
    - invalid: the either is not valid or currently in secondary storage(hdd, ssd)
- The procedure for handling the Page Fault
  1. Check an internal table for the process to determine(reference was valid or invalid status)
  - 페이지 폴트 트랩(trap)을 발생하면, OS는 먼저 페이지 테이블을 확인한 후 해당 가상 주소가 유효한 영역에 대한 요청인지 판단한다
  2. If the reference was valid, terminate the process, or valid but page fault, we now page it in
  - 프로세스가 할당받지 않은 메모리 영역에 접근 시도했다면, 세그멘테이션 폴트가 발생하며 프로세스는 강제 종료된다
  3. Find a free frame 
  - OS는 Free-Frame List에서 빈 물리 메모리 공간(Frame)을 할당한다. 만약 빈 프레임이 없다면, 페이지 교체 알고리즘을 사용하여 기존 페이지 중 하나를 디스크로 내보내고(Swap Out/Page Out), 그 공간을 확보한다
  4. Schedule a secondary storage operation to read the desired(원하는) page into the newly allocated frame
  - OS는 파일 시스템을 통해 디스크 상에서 필요한 페이지의 위치를 찾고, 디스크 I/O 요청을 발생시켜 데이터를 RAM의 할당된 프레임으로 전송하도록 예약(스케줄링)한다 (이때 CPU는 다른 작업을 수행할 수 있다)
  5. When the storage read is complete, modify the internal table and the page table to indicate that the page is now in memory
  - 디스크 I/O 작업이 완료되어 데이터가 RAM으로 완전히 들어오면, OS는 페이지 테이블의 비트를 0에서 1(유효)로 바꾸고, 물리 프레임 번호를 기록한다. 또한, TLB 항목도 무효화하여 최신 정보로 갱신되도록 한다
  6. Restart the instruction that was interrupted by the trap
  - 모든 준비가 끝났으므로, OS는 페이지 폴트로 인해 중단되었던 CPU의 명령어를 처음부터 다시 실행하도록 한다. 이제 이 명령어는 RAM에 있는 데이터에 접근하여 정상적으로 완료한다
- pure demand paging(=lazy loading 이 page의 기본 로직이라는 이야기)
- Demand page에서, page table에 유효 비트가 0(invalid)라면 page fault를 발생시키고 위 과정을 통해 I/O가 발생해 메모리를 채운다
- Locality of Reference
  - If a program accesses several new pages with each instruction,
    - to say, one page for the instruction and may pages for data,
    - possibly causes multiple page faults per instruction
  - Fortunately, analysis running processes
    - show that this behavior is exceedingly unlikely
  - Programs tend to have the locality of reference,
    - which results in reasonable performance from demand paging
  - 지역 참조는 prefetching의 근본 이론이다
    - CPU가 I/O를 요청해 페이지를 가져올때, 참조 지역성에 기반해 미리 데이터를 캐시로 가져온다(X를 fetch해온다면, X+1/X+2 page를 미리 가지고 와서 캐시에 보관해서 사용하는 것이다)

## Paging Replacement Algorithm

- FIFO(First in First out)
  - queue방식이며, 가장 쉬운 구현 방법이고 매우 비효율적이다
- Optimal Page Replacement(최적 페이지 교체)
  - `앞으로 가장 오랫동안 사용되지 않을 페이지를 찾아 교체하라`
  - 예측이 필요한 알고리즘이라, 구현은 사실상 어렵다
- LRU(LRU Page Replacement)
  - 가장 오랜 기간 사용되지 않은 페이지를 교체하는 알고리즘이다

## Thrashing

- a situation that a process is busy swapping pages in and out
- If a process does not have enough pages,
  - the page-fault rate is very high
- 과도한 페이징 작업을 `스레싱`이라고 부른다
  - 어떤 프로세스가 실제 실행보다 더 많은 시간을 페이징에 사용하고 있으면 스레싱이 발생했다고 표현한다