# SystemCall

- 시스템콜은 CPU의 특수한 명령을 실행해야지만 호출된다.
- 프로세스는 기본적으로 User mode로 실행되고 있지만, 커널에 처리를 요청하려고 System Call을 호출하면 CPU에서는 인터럽트 이벤트가 발생하여 CPU는 User mode에서 Kerner mode로 변경된다.
- 요청한 내용 처리가 끝나면 System Call 처리가 종료되고, User mode로 돌아가 프로세스의 동작을 계속 진행한다.
- Kerner은 프로세스가 요청한 내용을 처리하기 전에 프로세스의 요구가 유효한지 확인한다
    - ex. 시스템의 메모리 용량 이상의 메모리 요구
    - 요구사항이 맞지 않는다면 kerner은 system call을 실패했다고 처리한다.
- User mode에서 system call을 통하지않고 CPU모드를 변경하는 방법은 없다.
    - 만약 그런 방법이 있다면 커널이 있어도 User가 하드웨어를 다룰 수 있게 되어 문제가 된다.
- 시스템 콜은 어셈블리어로 특정 동작을 구현해놓은 함수이다.

## System call 동작 확인
- Linux에서 시스템콜의 호출은 `strace` 명령어를 통해 확인할 수 있다.
- 다음 코드를 통해 hello world를 출력하기위한 시스템콜들을 hello.log에서 확인할 수 있다.

```bash

#hello.c 파일 확인
root@oracle:~# cat hello.c
#include <stdio.h>

int main(void)
{
        puts("hello world");
        return 0;
}

#hello.c , hello로 컴파일
root@oracle:~# gcc -o hello hello.c

# system call 호출 로그 생성
root@oracle:~# strace -o hello.log ./hello
hello world

# system call 호출 로그 확인
root@oracle:~# cat hello.log
execve("./hello", ["./hello"], 0x7ffe6fea7880 /* 26 vars */) = 0
# execve 시스템 호출은 새로운 프로그램을 실행하는데 사용된다. 여기서 "./hello"라는 프로그램을 실행하며, 실행 인수로는 "./hello"만 전달된다.
# 환경 변수는 26개가 설정되어 있다. 호출이 성공하여 0을 반환한다.

brk(NULL) = 0x560614575000
# brk 시스템 호출은 힙 메모리의 끝 주소를 반환한다. NULL로 호출하면 현재 힙의 끝 주소를 반환한다.

mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f6acca5d000
# mmap 시스템 호출은 메모리를 매핑한다. 여기서는 8KB의 메모리를 읽기/쓰기 권한으로 매핑하고, 해당 메모리는 익명이며 파일과 연결되지 않는다.
# 매핑된 메모리의 시작 주소는 0x7f6acca5d000이다.

access("/etc/ld.so.preload", R_OK) = -1 ENOENT (No such file or directory)
# access 시스템 호출은 지정된 파일에 대한 접근 가능 여부를 확인한다. "/etc/ld.so.preload" 파일을 읽을 수 있는지 확인했으나, 해당 파일이 없어서 ENOENT 오류가 발생한다.

openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
# openat 시스템 호출은 "/etc/ld.so.cache" 파일을 읽기 전용으로 연다. O_CLOEXEC 플래그는 파일을 열고 나서 자식 프로세스에서 자동으로 닫도록 설정한다.
# 파일 디스크립터 값 3을 반환한다.

fstat(3, {st_mode=S_IFREG|0644, st_size=20067, ...}) = 0
# fstat 시스템 호출은 열린 파일 디스크립터에 대한 상태 정보를 반환한다. 파일의 권한, 크기, 타입 등을 포함한 정보를 가져온다.
# 파일의 크기는 20067바이트이며, 권한은 0644이다.

mmap(NULL, 20067, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f6acca58000
# mmap 시스템 호출은 파일을 메모리에 매핑한다. "/etc/ld.so.cache" 파일을 읽기 전용으로 매핑한다.
# 매핑된 메모리의 주소는 0x7f6acca58000이다.

close(3) = 0
# close 시스템 호출은 파일 디스크립터 3을 닫는다. 호출이 성공하여 0을 반환한다.

openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
# "/lib/x86_64-linux-gnu/libc.so.6" 라이브러리를 읽기 전용으로 연다. 파일 디스크립터 3을 반환한다.

read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\220\243\2\0\0\0\0\0"..., 832) = 832
# read 시스템 호출은 파일 디스크립터 3에서 데이터를 읽는다. `libc.so.6`의 ELF 헤더를 읽으며, 832 바이트를 읽었다.

fstat(3, {st_mode=S_IFREG|0755, st_size=2125328, ...}) = 0
# fstat 시스템 호출은 파일 디스크립터 3에 대한 상태 정보를 가져온다. `libc.so.6` 파일의 크기는 2125328바이트, 권한은 0755이다.

mmap(NULL, 2170256, PROT_READ, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7f6acc846000
# mmap 시스템 호출은 `libc.so.6` 파일을 메모리에 매핑한다. 읽기 전용으로 매핑하고, 매핑된 메모리의 주소는 0x7f6acc846000이다.

mmap(0x7f6acc86e000, 1605632, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x28000) = 0x7f6acc86e000
# `libc.so.6`에서 실행 가능한 부분을 메모리로 매핑한다. `PROT_EXEC` 플래그는 실행 권한을 부여한다.

mmap(0x7f6acc9f6000, 323584, PROT_READ, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1b0000) = 0x7f6acc9f6000
# `libc.so.6`의 나머지 데이터를 메모리에 매핑한다.

mmap(0x7f6acca45000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1fe000) = 0x7f6acca45000
# 또 다른 메모리 영역을 읽기/쓰기 권한으로 매핑한다.

mmap(0x7f6acca4b000, 52624, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7f6acca4b000
# 새로운 익명 메모리 영역을 읽기/쓰기 권한으로 매핑한다.

close(3) = 0
# 파일 디스크립터 3을 닫는다.

mmap(NULL, 12288, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f6acc843000
# 또 다른 익명 메모리 영역을 매핑한다.

arch_prctl(ARCH_SET_FS, 0x7f6acc843740) = 0
# 아키텍처 특정 작업으로 프로세스의 제어 레지스터를 설정한다.

set_tid_address(0x7f6acc843a10) = 1190
# 현재 스레드의 ID를 설정한다. 스레드 ID를 설정하고, 1190을 반환한다.

set_robust_list(0x7f6acc843a20, 24) = 0
# 스레드의 강력한 예외 처리 목록을 설정한다.

rseq(0x7f6acc844060, 0x20, 0, 0x53053053) = 0
# 시스템 상태를 업데이트하거나 확인하는 `rseq` 호출을 한다.

mprotect(0x7f6acca45000, 16384, PROT_READ) = 0
# 메모리 영역을 읽기 전용으로 보호 설정한다.

mprotect(0x5605e372e000, 4096, PROT_READ) = 0
# 또 다른 메모리 영역을 읽기 전용으로 보호 설정한다.

mprotect(0x7f6acca95000, 8192, PROT_READ) = 0
# 또 다른 메모리 영역을 읽기 전용으로 보호 설정한다.

prlimit64(0, RLIMIT_STACK, NULL, {rlim_cur=8192*1024, rlim_max=RLIM64_INFINITY}) = 0
# 스택 크기 제한을 확인하거나 설정한다.

munmap(0x7f6acca58000, 20067) = 0
# 메모리 매핑을 해제한다.

fstat(1, {st_mode=S_IFCHR|0600, st_rdev=makedev(0x88, 0), ...}) = 0
# 표준 출력(`stdout`)에 대한 파일 상태 정보를 가져온다.

getrandom("\xa8\x33\x9b\x9f\xb9\x12\x55\x25", 8, GRND_NONBLOCK) = 8
# 난수 데이터를 생성한다.

brk(NULL) = 0x560614575000
# 힙 메모리의 끝 주소를 다시 반환한다.

brk(0x560614596000) = 0x560614596000
# 힙 메모리 끝 주소를 새로운 값으로 확장한다.

write(1, "hello world\n", 12) = 12
# 표준 출력(`stdout`)에 "hello world\n"을 출력한다.

exit_group(0) = ?
# 프로그램을 정상 종료한다. 0은 정상 종료를 의미한다.

```

- 이 예제에서 중요한 것은, 어떤 언어를 사용하든 write() system call로 문자열을 화면에 출력한다는 것이다.

### System Call의 wrapper 함수

- system call은 보통의 함수 호출과 다르게 C언어 등의 고급 언어에서는 직접 호출이 불가능하다.
- 호출하기 위해서는 아키텍처에 의존하는 어셈블리 코드를 통해서 호출할 수 있다.
- x86_64 아키텍처에서는 getppid() 시스템 콜을 다음과 같이 호출한다. 
```assembly
mov $0x6e,%eax
syscall
```
- OS의 도움이 없다면, 모든 프로그램은 시스템 콜을 호출할 때마다 아키텍처에 의존하는 어셈블리어를 써서 고급언어로부터 어셈블리 코드를 호출해야 했을 것이다.
    - OS는 내부적으로 System Call만 호출하는 함수를 제공하는데 이를 System Call Wrapper라고 한다.
    - Wrapper함수는 아키텍처 별로 존재한다.
    - 고급언어로 써진 사용자 프로그램은 각 언어에 대응하여 준비된 시스템 콜의 Wrapper 함수를 호출하기만 하면 된다.
- window와 linux 실행의 차이는 wrapper 함수의 차이로 인해 만들어진다.

## 리눅스의 확장자

- 확장자 없이 컴파일한 실행 파일은 실제로 문제 없이 실행될 수 있다. 확장자는 주로 파일의 종류나 용도를 나타내는 데 사용되지만, 리눅스는 파일 이름에 대한 제한이 없고, 확장자는 단순히 관습적인 요소일 뿐이다. 즉, .c, .a, .out 등의 확장자는 파일의 타입을 구분하는 데 도움이 될 뿐, 실행 가능 여부와는 관계없다.