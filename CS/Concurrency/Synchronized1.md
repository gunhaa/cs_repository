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