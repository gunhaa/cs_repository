# JVM이란?

- Java Virtual Machine
  - User영역의 Process이다
  - Virtual이라는 이름처럼 H/W를 S/W로 가상화 시킨 것이다
- Kernel, H/W 영역을 다루기에 OS에 의존성이 생기는 Native code와 달리 User mode에서 process로 실행되기에 OS에 의존성이 없다(OS에 맞는 JVM을 써서 의존성 문제를 해결한다)
  - java코드를 byte code로 컴파일 한 후 OS에 맞는 JVM이 binary code로 만들어주기에 OS dependency가 없다

## Java, C++의 메모리 관리 차이

- C++과 다르게 Java는 개체 메모리에 대한 권한이 없다
  - 개발자에게는 소유권도 없고 책임도 없다
  - 개발자가 GC를 호출해 메모리를 조작하려고하면 일반적으로 문제가 발생한다
  - 운영 중 문제가 발생한다면 JVM을 알아야 대응할 수 있다

## JVM의 동작

1. Byte code로 번역한 후(컴파일)
2. JVM을 통해 런타임으로 실행된다(실행)
   1. 클래스 로딩: 링킹 포함, java.lang.Class 클래스를 이용한 클래스 관리
   2. 런타임 데이터 영역: 클래스 로더가 불러온 데이터들을 저장하는 JVM의 메모리 공간
   3. 실행 엔진: 메모리에 올라온 바이트 코드를 실제로 실행하는 역할을 한다(Interpreter, JIT Compiler)