# 동기 처리 1

- 동시성 프로그래밍에서 예기치 못한 결함에 빠지는 상태를 `레이스 컨디션`이라고 부른다
  - e.g. 같은 변수를 read, write에서 +2가 되어야하는데 2개의 스레드가 같은 상태를 read해서 +1만 된 상태
  - 레이스 컨디션을 일으키는 프로그램 코드 부분을 크리티컬 섹션이라고 부른다
- `아토믹 처리`
  - 어떤 처리가 아토믹하다는 뜻은 처리 도중 상태를 시스템적으로 관측할 수 없으며, 처리가 실패하면 처리 전 상태로 완전 복원된다는 의미이다
  - 최근의 CPU는 아토믹 처리용 명령을 지원하며, 이 아토믹처리를 이용해 다양한 동기 처리 기능보다 추상적인 프로그래밍 언어 수준에서의 아토믹 처리를 구현한다
    - 현대 컴퓨터상에서의 동기처리 대부분은 아토믹 명령에 의존한다
    - 아토믹 명령은 CPU 단위로 보장해주는 최고의 동기화 수단이지만 비용이 매우 크다
      - CPU에서 아토믹 명령(LOCK XADD, CMPXCHG, ARM의 LDREX/STREX)은 단일 명령처럼 보이지만, 실제로는 메모리 버스, 캐시 라인, 코어 간 동기화를 강제로 맞추는 작업이 들어간다
      - 결과적으로 단일 연산 비용이 일반 메모리 접근보다 훨씬 무겁다
      - 그래서 동시성 프로그래밍 기법을 사용한 코드 단위의 최적화를 많이 사용한다(크리티컬 섹션 최소화, 락 분할[큰 락을 여러개로 나누는 기법],락 회피[필요없는 부분은 일반 연산, 필요한 부분만 아토믹 연산])

## CAS

```C
#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

// 논리적으로는 아토믹하지만 CPU관점에서 전혀 아토믹하지 않다
// 레이스 컨디션이 발생할수있다
bool compare_and_swap(uint64_t* p, uint64_t val, uint64_t newval) {
	if (*p != val) {
		return false;
	}
	*p = newval;
	return true;
}

// compare_and_swap의 disassemble 결과
    cmpq %rsi, (%rdi) ; rsi와 rdi 메모리 값 비교 후 ZF Flag 저장
    jne LBB0_1        ; ZF flag의 결과가 같지 않다면(jump not equal) goto LBB0_1 
    movq %rdx, (%rdi) ; rdx(세번째 param)의 메모리 주소를 rdi(첫번째 param)로 복사
    movl $1, %eax     ; eax에 상수 1을 저장
    retq              ; 결과값 반환(eax 레지스터의 값) 
LBB0_1:
    xorl %eax, %eax   ; 결과 반환을 저장하는 eax레지스터의 값을 0(false)으로 설정
    retq              ; 결과 값 반환(eax 레지스터의 값)

// gcc/ clang에서 cpu atomic한 연산을 지원한다
bool compare_and_swap_atomic(uint64_t* p, uint64_t val, uint64_t newval) {
    return __sync_bool_compare_and_swap(p, &val, newval);
}

// compare_and_swap_atomic의 disassemble 결과
    movq %rsi, %rax  ; rsi(두 번째 param)의 값을 rax에 복사한다
    xorl %ecx %ecx   ; ecx에 0 설정(false)
    lock cmpxchgq %rdx, (%rdi) ; CAS: lock을 지정할 경우 지정된 명령 중의 메모리 접근은 배타적으로 수행됨을 보장한다, 즉 CPU가 여럿인 경우(다중코어)에도 lock에 설정된 메모리에 접근할 수 있는 CPU는 동시에 하나뿐이다
                               ; 비교 결과가 같으면 ZF=1, 아니면 ZF=0(ZF는 Zero Flag, 마지막 산술/논리 연산 결과를 나타내는 CPU 플래그)
    sete %cl         ; Set Byte on Condition 명령: ZF 클래스의 값을 cl(ecx의 하위 8비트)에 저장한다
    movl %ecx, %eax  ; ecx의 값을 eax로 변경(sete %cl의 결과를 결과 저장용인 %eax에 담는 명령)
    ret q

int main() {
    uint64_t x = 100;
    uint64_t old_val = 100;
    uint64_t new_val = 200;

    if (compare_and_swap(&x, old_val, new_val)) {
        printf("CAS succeeded, x = %llu\n", x);
    }
    else {
        printf("CAS failed, x = %llu\n", x);
    }

    return 0;
}
```

## Mutex

> MUTual Execution<br>
> 베타 실행으로 불리는 동기 처리 방법

- 이름 그대로 뮤텍스는 크리티컬 섹션을 실행할 수 있는 프로세스 수를 최대 1개로 제한하는 동기 처리이다
- 배타적 실행을 위해 공유 변수로 사용할 플래그를 준비하고 해당 플래그가 true면 크리티컬 섹션을 실행하고 그렇지 않으면 실행하지 않는 처리를 생각할 수 있다

```C
bool badLock = false; // 공유 변수
void bad_mutex() {
    retry:
        if(!badLock) {
            badLock = true; // 락 획득
            // 크리티컬 섹션
        } else {
            goto retry;
        }
        badLock = false;
}
// 위 코드는 lock을 write하기 전 같은 lock을 읽으면 레이스 컨디션이 발생해 같은 크리티컬 섹션을 실행시킨다

bool goodLock = false;
// mutex이자 spinlock이다
void good_mutex_spinlock() {
    retry:
        if(!test_and_set(&goodLock)) {
            // tas를 이용해 atomic한 검사와 값 설정을 한다
            // tas의 반환값은 이전의 상태(false)이다
            // 크리티컬 섹션
        } else {
            goto retry;
        }
        tas_release(&goodLock); // 락 해제(반환)
}
```

```rust
use std::sync::{Arc, Mutex, MutexGuard};
use std::thread;

fn mutex_func(lock: Arc<Mutex<u64>>) {
    loop {
        let mut val: MutexGuard<'_, u64> = lock.lock().unwrap();
        *val += 1;
        println!("{}", *val);
    }
}

fn run_mutex() {
// Arc는 쓰레드 세이프한 참조 카운터 타입의 스마트 포인터
    let lock0= Arc::new(Mutex::new(0));

    // 참조 카운터가 증가될 뿐이며 내용은 클론되지 않는다
    let lock1 = lock0.clone();

    // 스레드 생성 후
    // 클로저 내 변수로 이동
    // Rust의 클로저는 람다와 비슷한 동작을 한다
    // move 키워드를 사용하여 소유권을 클로저로 이동시킨다
    let th0 = thread::spawn(move || {
        mutex_func(lock0);
    });

    let th1 = thread::spawn(move || {
        mutex_func(lock1);
    });

    th0.join().unwrap();
    th1.join().unwrap();
}

fn main() {
    run_mutex();
}
```

### Spin lock

- `good_mutex_spinlock()`의 경우 락을 얻을 때 까지 루프를 반복한다
- 이렇게 리소스가 비는것을 기다리며(polling) 락을 획득하는 방법을 spinlock이라고 부른다
- 위 `good_mutex_spinlock()`은 개선 가능하다
  - 아토믹 명령은 실행 속도상의 패널티가 크기에 TAS를 호출하기 전 검사를하고 TAS를 하도록 개선할 수 있다  

```C
bool lock = false;
void spinlock_acquire(volatile bool *lock) {
                    // volatile은 컴파일러가 최적화 하지않도록 이 변수가 다른 하드웨어/스레드에 의해 바뀔 수 있다는 힌트를 준다
                    // 최적화로인한 lock변수의 고정을 방지한다
    for(;;) {
        while(*lock) {
            // tas연산을 통해 점유하고 있던 lock(true)인 상태를 false로 바꾸면 락을 얻고 크리티컬 섹션을 진행할 수 있다
            // tas연산은 argument가 true면 그대로 true를 반환하며, false일 경우 값을 swap한뒤 false를 반환하는 것이 핵심이다
            if(!test_and_set(lock)) {
                return;
            }
        }
    }
}

void spinlock_release(bool *lock) {
    tas_release(lock);
}

int main() {
    for(;;) {
    // 공유자원 lock의 경합이 문제가 된다
        spinlock_acquire(&lock);
        // critical section...

        spinlock_release(&lock);
        break;
    }
}
```

- 이 기법을 TTAS(Test and Test and Set)라고 부른다

## Semaphore

- Mutex는 락을 최대 1개를 획득 가능하지만 세마포어를 이용하면 최대 N개의 프로세스까지 동시에 락을 이용할 수 있다
  - 즉, Semaphore는 Mutex를 보다 일반화한 것으로 혹은 Mutex가 Semaphore의 특수한 버전이라고 할 수 있다

```C
#define NUM 4

void semaphore_acquire(volatile int *cnt) {
    for(;;) {
        
        while(*cnt >= NUM){
            // busy-waiting
        }

        __sync_fetch_and_add(cnt, 1);
        if(*cnt <= NUM) {
            // 루프를 탈출하여 락 획득
            return;
        }
        __sync_fetch_and_sub(cnt, 1);
    }
}

void semaphore_release(int *cnt) {
    __sync_fetch_and_sub(cnt, 1);
}
```

## Readers - Writers Lock

- 레이스 컨디션이 발생하는 이유는 쓰기 때문이다
  - 쓰기만 베타적으로 수행하면 문제가 되지 않는다
  - Mutex와 Semaphore에서 프로세스에 특별한 역할을 설정하지 않았지만, RW Lock에서는 읽기만 수행하는 프로세스(Reader), 쓰기만 수행하는 프로세스(Writer)로 분류하고 다음 제약을 만족하도록 베타 제어를 수행한다
    - 락을 획득 중인 Reader는 같은 시간에 다수(0 이상) 존재할 수 있다
    - 락을 획득 중인 Writer는 같은 시간에 1개만 존재할 수 있다
    - Reader와 Writer는 같은 시간에 락 획득 상태가 될 수 없다
```C
// spinlock 기반 RW Lock
int rcnt = 0;
int wcnt = 0;
bool lock = false;
// Reader
void rwlock_read_acquire(int *rcnt, volatile int *wcnt) {
    for(;;) {
        while(*wcnt); // Writer가 0인 경우만 통과한다
        __sync_fetch_and_add(rcnt, 1);
        if(*wcnt == 0) { // Writer가 없다면 락 획득
            return;
        }
        __sync_fetch_and_sub(rcnt, 1);
    }
}

void rwlock_read_release(int *rcnt) {
    __sync_fetch_and_sub(rcnt, 1);
}

void reader() {
    for(;;) {
        rwlock_read_acquire(&rcnt, &wcnt);
        // 크리티컬 섹션(read)
        rwlock_read_release(&rcnt);
    }
}

// Writer
void rwlock_write_acquire(bool *lock, volatile int *rcnt, int *wcnt) {
    // 대기자는 2명 이상일 수 있다
    // 그래서 wcnt의 최적화는 중요하지않다
    __sync_fetch_and_add(wcnt, 1);
    while (*rcnt);
    spinlock_acquire(lock);
}

void rwlock_write_release(bool *lock, int *wcnt) {
    spinlock_release(lock);
    __sync_fetch_and_sub(wcnt, 1);
}

void writer(){
    for(;;) {
        rwlock_write_acquire(&lock, &rcnt, &wcnt);
        // 크리티컬 섹션(read/write)
        rwlock_write_relase(&lock, &wcnt);
    }
}
```

- volatile은 반복해서 메모리를 직접 읽어야 하는 busy-wait에서만 필요
  - spin대기를 하는 경우만 필요하다
  - atomic연산이라 굳이 최적화 시키지 않아도 된다
- `120p 실험결과`를 확인해보면, Read가 대부분인 경우 뮤텍스보다 RW락을 사용하는 편이 실행 속도가 명확하게 상승한다
  - 하지만 이 경우도 크리티컬 섹션안아 10,000 정도의 CPU클록 사이클을 사용하는 것은 피해야하며 이것이 어려운 부분이다