# 운영체제란? 

- def) Operation system
  - Operation system is a software that operates a computer system
  - Operation system is a program running at all times on the computer
  - Operation system is to provide system services to application programs
    - system call은 spring에서 일종의 service layer method와 비슷하다(kernel을 통해 hardware의 동작을 추상화 시키고 보안을 유지한다)
  - Operation system is to manage **processes, resources, user interfaces, and so on
  - Operation system is a software that manages a computer's hardware 
    - It also provides a basis for application programs and acts as an intermediary between the computer user and the computer hardware
  - but there are NO universally accepted definition of an operating system 
    - common definition: "the one program running at all times on the computer"
    - usually called the kernel
    - along with the kernel, there are two other types of programs
      - system programs
      - application programs
- def) Computer
  - Computer is a machine that processes the information
  - Computer system can be divided roughly into four components
    1. hardware
    2. operating system
    3. application programs
    4. user
- def) information
  - Information can be defined as a quantitative representation measures the uncertainty
  - information의 최소 단위: bit
  - information의 처리: 정보의 상태 변환(0에서 1로, 1에서 0으로)
    - 어떻게?
    - 덧셈: 반가산기/전가산기
    - 뺄셈: 2의 보수 표현법
    - 곱셈과 나눗셈: 덧셈과 뺄셈의 반복
    - 실수 연산: 부동 소수점 표현법
    - 함수: GOTO
  - information의 저장과 전송: 플립-플롭, 데이터 버스
  - Memory, CPU(ALU), GOTO(제어흐름)와 Data Bus(데이터의 전달)를 이용한 information의 이동으로 컴퓨터의 구현이 가능하다
- 그럼 컴퓨터는 만능인가?
  - 범용성: NOT, OR, AND 게이트만으로 모든 계산을 할 수 있다
  - 계산가능성: Turing-computable 즉, 튜링 머신으로 계산 가능한 것만 해결 가능하다(halt problem 불가)
- 컴퓨터를 만든 사람?
  - Alan Turing – Turing Machine
    - 튜링머신의 아키텍쳐 -   테이프/헤드/유니버셜 튜링머신/튜링 머신
    - 현대 컴퓨터의 아키텍쳐 - 메모리/CPU/운영체제/응용프로그램
    - 아키텍처가 같기 떄문에 앨런 튜링은 컴퓨터의 아버지라고 불린다
  - John von Neumann – ISA: Instruction Set Architecture
   - A stored-program computer is a computer that stores programs in a memory
   - A program is a set of instructions that tells a computer's hardware to perform a task
   - stored-program computer인 ISA를 만들었기에 폰 노이만은 컴퓨터의 아버지라고 불린다