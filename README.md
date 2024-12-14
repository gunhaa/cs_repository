# 자료구조/코딩테스트

## 목표
- 모든 데이터 구조 JS/TS로 직접 구현(쉽게 배우는 자료구조 with JAVA / 문병로 참고)
  - 코드를 보지 않고 pseudo-code와 개념만 보고 구현하기
- 자료구조 이미 공부한것 다시 빠르게 구현
- 프로그래머스를 통해서 풀고, 기록이 필요한 문제는 해당 레포지토리에 기록
- 프로그래머스를 통해 푼 문제는 Programmer-Backjoon 레포지토리에 Auto Push
- 하루에 한 문제는 풀기

---

<br>


# CS

## 목표

> https://github.com/jwasham/coding-interview-university 같은 github repository 만드는 것을 목표로한다.


---

### 참고

> velog 정리 / https://velog.io/@gunhaa/posts

> notion 정리 / https://www.notion.so/STUDY-115dc75178eb80e2a9e2c9d12dd52d62

> 인프런 널널한 개발자 / https://www.youtube.com/@nullnull_not_eq_null/playlists

> 포프티비 / https://www.youtube.com/@%ED%8F%AC%ED%94%84%ED%8B%B0%EB%B9%84/videos

> 자바스크립트 패턴과 테스트 / https://www.yes24.com/Product/Goods/33211518

> 이펙티브 자바 / https://www.yes24.com/Product/Goods/65551284

> 쉽게 배우는 자료구조 with JAVA / https://www.yes24.com/Product/Goods/106400387

> 자바로 배우는 핵심 자료구조와 알고리즘 / https://product.kyobobook.co.kr/detail/S000001810058

> JVM 밑바닥까지 파헤치기 / https://www.yes24.com/Product/Goods/126114513

> 이것이 컴퓨터 과학이다 / https://www.yes24.com/Product/Goods/130179291 

> 자바를 위한 자료구조  / https://www.youtube.com/playlist?list=PLpPXw4zFa0uKKhaSz87IowJnOTzh9tiBk

> 모두를 위한 컴퓨터 과학 / https://www.boostcourse.org/cs112

> 김영한 스프링 로드맵 / https://www.inflearn.com/roadmaps/373

> Linux Command Line / https://www.udemy.com/course/linux-command-line-colt/?couponCode=BFCPSALE24

---


- 다음의 항목들을 목차로 CS를 정리한다.
   - [개발 상식](#개발-상식)
   - [운영체제](#운영체제)
       - [리눅스](#리눅스)
   - [네트워크](#네트워크)
   - [데이터 베이스](#데이터베이스)
   - [디자인 패턴](#디자인-패턴)
   - [언어별 특징](#언어별-특징)

---

### 개발 상식
- [프로그래밍이란?](CS/CommonSense/Programing.md)
- [서버란 무엇인가?](CS/CommonSense/Server.md)
- [클린코드/주석](CS/CommonSense/CleanCode.md)
- [TDD(Test Driven Development)](CS/CommonSense/TDD.md)
- [OOP(Object-Oriented Programming)](CS/CommonSense/OOP.md)
- [SOLID](CS/CommonSense/SOLID.md)
- [DRY](CS/CommonSense/DRY.md)
- [WATERFALL](CS/CommonSense/WaterFall.md)
- [AGILE](CS/CommonSense/Agile.md) 
- [프로토콜/인터페이스](CS/CommonSense/Protocol.md)
- [Base64](CS/CommonSense/Base64.md)
- [CRDT(Conflict-free Replicated Data Type)/LWW-Register](CS/CommonSense/CRDT.md)
- [CORS](CS/CommonSense/CORS.md)
- [CI/CD](CS/CommonSense/CI_CD.md)
- [Load Balancing](CS/CommonSense/Load_Balancing.md)
- [Managed language / Unmanaged language](CS/CommonSense/Managed.md)
- [단축평가](CS/CommonSense/Short_evaluation.md)
- [API](CS/CommonSense/API.md)
- [REST](CS/CommonSense/Restapi.md)
- [Refactoring](CS/CommonSense/Refactoring.md)


---

### 운영체제

- [컴퓨터의 기본 구조](CS/OS/Computer.md)
- [운영체제란?](CS/OS/OperationSystem.md)
- [가상메모리/페이지교체](CS/OS/Paging.md)
- [파일시스템](CS/OS/File.md)
- [System Call](CS/OS/SystemCall.md)
- [프로세스와 스레드](CS/OS/Process&Thread.md)
- [동시성제어](CS/OS/Concurrency.md)
- [부동 소수점](CS/OS/FloatingPoint.md)

### 리눅스 

- [리눅스란?](CS/OS/Linux/Linux.md)
- [WSL](CS/OS/Linux/WSL.md)
- [명령어 구조](CS/OS/Linux/Command.md)
- [파일시스템](CS/OS/Linux/File.md)
- [파일](CS/OS/Linux/CreateFile.md)
- [Nano](CS/OS/Linux/Nano.md)
- [삭제,복사,이동](CS/OS/Linux/Rm.md)
- [파일 다루기](CS/OS/Linux/UseFile.md)

---

### 네트워크

- [모든 개발자를 위한 HTTP 웹 기본 지식 정리 - 김영한](CS/Network/Basic.md)
    - [PORT](CS/Network/Port.md)
    - [URI](CS/Network/URI.md)
    - [쿠키](CS/Network/Cookie.md)
    - [캐시](CS/Network/Cache.md)
- [브라우저에서의 요청처리(클라이언트<->서버)](CS/Network/ClientToServer.md)
- [네트워크의 목표](CS/Network/object.md)
- [OSI 7 계층](CS/Network/OSI7.md)
- [TCP/IP 모델](CS/Network/TCP_IP.md)
- [TCP/UDP 프로토콜](CS/Network/TCP_UDP.md)
- [HTTP/HTTPS 프로토콜](CS/Network/Http.md)
- [Http 상태코드](CS/Network/HttpError.md)
- [WebSocket 프로토콜](CS/Network/Websocket.md)
- [3-way-hanshake(http - Keep-alive, stateless)](CS/Network/3way.md)
- [http프로토콜 버전 별 차이](CS/Network/Httpversion.md)
- [Socket이란?](CS/Network/Socket.md)
- [브라우저](CS/Network/Browser.md)
- [DNS](CS/CommonSense/DNS.md)

---

### 데이터베이스

- [데이터베이스의 정의](CS/Database/Database.md)
- [SQL](CS/Database/SQL.md)
- [DDL, DML, DCL, TCL](CS/Database/DDL.md)
- [Transaction](CS/Database/Transaction.md)
- [ACID](CS/Database/ACID.md)
- [SQL vs NoSQL](CS/Database/SqlnoSql.md)
- [Index](CS/Database/Index.md)
- [데이터 정규화](CS/Database/normalization.md)


---

### 언어별 특징(JAVA)
- [JAVA란?](CS/JAVA/JAVA.md)
- [JAVA의 메모리](CS/JAVA/Memory.md)
- [컴파일 과정](CS/JAVA/Compile.md)
- ["한번 작성하면 어디서든 실행된다"의 의미](CS/JAVA/Mean.md)
- [String, StringBuilder, StringBuffer](CS/JAVA/String.md)
- [JAVA의 접근 제어자](CS/JAVA/Encapsulation.md)
- [System.out.println를 실무에서 절대 사용안하는 이유](CS/JAVA/sysout.md)
- [JAVA의 배열에는 왜 toString()을 오버라이딩 시키지 않았나?](CS/JAVA/Array1.md)
- [synchronized](CS/JAVA/synchronized.md)
- [Reflection](CS/JAVA/Reflection.md)
- [Serializable]
- [!!버전별 특징](CS/JAVA/Version.md)


---

### 언여별 특징(Javascript)

- [EventLoop](CS/Javascript/Eventloop.md)
- [Prototype](CS/Javascript/Prototype.md)
- [This](Cs/Javascript/This.md)
- [Closure](CS/Javascript/Closure.md)
- [Currying](CS/Javascript/Currying.md)
- [Destructuring Assignment](CS/Javascript/Destructuring.md)
- [Spread Operator](CS/Javascript/Spread.md)
- [Object vs object](CS/Javascript/Ob_ob.md)
- [Truthy / Falsy](CS/Javascript/Truthy.md)
- [Nullish coalescing operator](CS/Javascript/NullOperator.md)

---

### JAVA 와 JS의 차이

- [Compiler vs Interpreter](CS/JAVAvsJS/Compiler_Interpreter.md)

---
### JPA

- [JPA 최적화 순서](CS/JPA/JPA_Optimization.md)


---

### 디자인 패턴

- [디자인 패턴이란?](CS/DesignPattern/DesignPattern.md)

- 생성 패턴

  - [싱글톤 패턴](CS/DesignPattern/Singleton.md)
  - [팩토리 메서드 패턴](CS/DesignPattern/FactoryMethod.md)
  - [빌더 패턴](CS/DesignPattern/Builder.md)

- 구조 패턴

  - [어댑터 패턴](CS/DesignPattern/Adapter.md)
  - [데코레이터 패턴](CS/DesignPattern/Decorator.md)
  - [퍼사드 패턴](CS/DesignPattern/Facade.md)
  - [프록시 패턴](CS/DesignPattern/Proxy.md)

- 행위 패턴
  - [옵저버 패턴](CS/DesignPattern/Observer.md)
  - [전략 패턴](CS/DesignPattern/Strategy.md)
  - [커맨드 패턴](CS/DesignPattern/Command.md)

--- 

### 자료구조

- [시간복잡도/빅오표기법](CS/DataStructure/TimeComplexity.md)


### 알고리즘

- [투포인터]
- [유클리드 호제법(최대공약수/최소공배수)]

### CI/CD - Docker - AWS

- [자료](CS/ETC/Etc.md)
- [Docker](CS/ETC/Docker.md)