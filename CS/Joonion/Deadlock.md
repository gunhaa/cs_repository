# Deadlock

- A Deadlock is 
  - a situation in which
    - every process in a set of processes is waiting for
    - an event that can be caused only by another process in the set
  - a situation in which
    - a waiting thread (or process) can never again change state,
    - because the resources it has requested
    - are held by other waiting threads(or processes)
- 경쟁하는 스레드들 사이에 분배되어야 할 유한한 수의 자원들에서 발생하는 문제이다

## Deadlock Characterization

- deadlock은 생각보다 발생하기 어려우며, 찾기도 매우 어렵다
- deadlock의 발생원인의 핵심은 프로그래머의 프로그래밍 실수이다
  - 4가지 원인 중 가장 핵심은 순환 참조이며, 가장 찾기 어려운 부분이다
- deadlock의 발생 조건은 4가지가 있으며, 반드시 동시에 발생해야 데드락이 발생한다
- four necessary conditions
  - Mutual Execlusion
    - At least one resources is held in a non-sharable mode
  - Hold and Wait
    - A thread holds at least one resource and waiting to acquire additional resources held by other threads
  - NO preemption
    - Resources cannot be preempted
  - Circular Wait
    - A set of waiting threads exist such that the dependency graph of waiting is circular

## Deadlock Avoidance

> [Concrruency Programming Repo에서 직접 구현](https://github.com/gunhaa/concurrency_programming)