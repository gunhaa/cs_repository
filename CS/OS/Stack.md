# Stack

> 예제코드 : https://github.com/gunhaa/SASM/blob/main/10_stack.asm

![stack1](images/stack1.png)

```plaintext
         높은 주소
        ───────────────
        |   커널 영역    | ← 접근 불가
        ───────────────
        |     Stack     | ← 위에서 아래로 자람 (감소)
        |               |
        |     ↓↓↓↓↓     |
        ───────────────
        |     Heap      | ← 아래에서 위로 자람 (증가)
        |     ↑↑↑↑↑     |
        |               |
        |     Data      |
        |     BSS       |
        |     Text      |
        ───────────────
         낮은 주소
```

- 스택은 LIFO(Last In, First Out) 구조로, 함수 호출 시 매개변수 전달, 복귀 주소 저장, 지역 변수 보관 등을 위해 사용되는 메모리 영역이다. 메모리는 높은 주소 → 낮은 주소로 확장되며, 스택 포인터(rsp)는 현재 스택의 최상단(top)을 가리킨다.
  - 낮은 주소에서 높은주소로 가는 것은 Heap이며, Stack과 만나면 크래시가 발생한다(Segmentation fault)
- 스택은 함수가 사용하는 일종의 메모장이다
  - 매개 변수 전달
  - 돌아갈 주소 관리

## 예제 코드

```assembly
%include "io64.inc"

section .text
global main
main:
    mov rbp, rsp; for correct debugging

    ; 스택(stack) 메모리 영역을 사용
    ; 함수가 사용하는 일종의 메모장
    ; - 매개 변수 전달
    ; - 돌아갈 주소 관리

    ; 스택 메모리, 스택 프레임
    ; 레지스터는 다양한 용도로 사용
    ; - a b c d 범용 레지스터
    ; - 포인터 레지스터(다양한 용도로 사용, 포인터= 위치를 가리키는 ~)
    ; -- ip (Instruction Pointer): 다음 수행 명령어의 위치
    ; -- sp (stack pointer) : 현재 스택 top 위치(일종의 cursor)
    ; -- bp (base pointer) : 스택 상대주소 계산용

    ; push, pop 이용해서 사용
    push 5
    push 2
    call MAX
    PRINT_DEC 8, rax
    NEWLINE

    ; 스택을 비워놓지 않으면 크래시 발생(리턴 값을 찾지 못함)
    add rsp, 16 ; sp레지스터 두칸 이동시키는 선택도 가능, pop 두번도 가능

    xor rax, rax
    ret

MAX:
    ; stack[length-1] = sp
    ; 여기가 call 된 시점의 stack [ 2, 1, ret, 이전 bp값]
    ; ret함수가 끝나고 다시 돌아올때 필요한 주소값을 넣어준다
    ; sp는 위치가 변한기 때문에 bp를 이용해 상대 위치를 계산한다(고정 위치로 사용)

    push rbp
    mov rbp, rsp ; sp 의 값은 내가 조작하지 않아도 하드웨어가 바꿔주는 값이다

    mov rax, [rbp+16]
    mov rbx, [rbp+24]
    cmp rax, rbx
    jg L1
    mov rax, rbx ; 결과는 rax에
L1:
    pop rbp
    ret


    ; 초기화 된 데이터를 사용
    ; [변수 이름] [크기] [초기값]
    ; [크기]: 예약된 키워드 db(define byte, 1byte) dw(2byte), dd(4byte), dq(8byte)
section .data
    msg db 'Hello World', 0x00

    ; 초기화 되지 않은 데이터
    ; [변수 이름] [크기] [개수]
    ; [크기] resb(1byte) resw(2byte) resd(4byte) resq(8byte)
section .bss
    num resb 1
```

### 함수 호출 흐름

- main 내부, 호출 전

```assembly
push 5      ; 두 번째 인자
push 2      ; 첫 번째 인자
call MAX    ; 함수 호출
```

```plaintext
메모리 (높은 주소 ↓ 낮은 주소)
────────────────────────────
|                         |
| ...                     |
|-------------------------| ← 이전 rsp (호출 전)
|         2 (arg1)        | ← rsp + 0
|         5 (arg2)        | ← rsp + 8
────────────────────────────
```

- call MAX는 자동으로 return address를 push

```plaintext
────────────────────────────
|     return address        | ← rsp
|         2 (arg1)          |
|         5 (arg2)          |
────────────────────────────
```

- MAX 함수 진입

```assembly
push rbp
mov rbp, rsp
```

```plaintext
────────────────────────────
|     이전 rbp 값           | ← rsp / rbp
|     return address        | ← rbp + 8
|         2 (arg1)          | ← rbp + 16
|         5 (arg2)          | ← rbp + 24
────────────────────────────
```

- 해당 상황에서 rbp로 안전하게 접근 가능

```assembly
mov rax, [rbp+16] ; rax ← 2
mov rbx, [rbp+24] ; rbx ← 5
```

- MAX함수 종료전

```assembly
pop rbp    ; 이전 rbp 복구
ret        ; return address로 복귀
```

- main으로 복귀 후

```assembly
add rsp, 16 ; 2, 5 제거
; 스택의 포인터만 잃고, 메모리에 값은 방치되어 쓰레기값이 된다(garage value, dangling pointer)
; 현재 함수(main)의 스택 프레임 최상단으로 이동한다(main 함수의 이전 지역변수가 있다면 사용가능한 위치)
```

```plaintext
────────────────────────────
|        이전 상태 복구      | ← rsp
|       (main 계속 실행)    |
────────────────────────────
```

### 스택 정리

- 함수 호출 후 call에 의해 스택에 쌓인 return address, 인자 등을 정리하지 않으면 프로그램이 크래시 날 수 있다. 예제의 아래 부분에서 그 정리를 한다

```assembly
add rsp, 16   ; push 5, push 2로 밀린 스택을 복구
```

- 스택은 사용할때 pop을 이용해서 스택 값을 사용하는 것이 아니라, rbp(+offset)를 이용해 안전하게 접근한다
  - 위 예제의 경우 스택으로 push되었기에 프로그래머가 직접 순서 정하는 것이다
  - 프로그래머 책임 하에 개수 맞춰야 한다
  - 컴파일러 언어 (C, C++)에서는 컴파일러가 정함, 호출 규약 따른다
  - x86-64 시스템 (Linux, Windows)의 기본 호출 규약의 경우 정해진 레지스터에 넣어주고 함수 내에서 활용할 수 있다