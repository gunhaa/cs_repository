# Computer Science

> 개발용어/운영체제/네트워크/데이터베이스/언어를 항목별로 정리한다.

- [Computer Science](#computer-science)
  - [생성 이유](#생성-이유)
  - [개발 상식](#개발-상식)
    - [WebRTC](#webrtc)
    - [GITHUB](#github)
  - [아키텍쳐](#아키텍쳐)
    - [대규모 아키텍쳐 설계](#대규모-아키텍쳐-설계)
  - [운영체제](#운영체제)
    - [운영체제-널널한개발자](#운영체제-널널한개발자)
    - [운영체제-최린](#운영체제-최린)
    - [리눅스-명령어](#리눅스-명령어)
    - [리눅스-운영체제](#리눅스-운영체제)
    - [PintOS](#pintos)
    - [OS구조와 원리](#os구조와-원리)
  - [네트워크](#네트워크)
    - [네트워크기초-크래프트맨](#네트워크기초-크래프트맨)
  - [데이터베이스](#데이터베이스)
    - [국민대학교 김남규 교수/데이터 베이스 실무](#국민대학교-김남규-교수데이터-베이스-실무)
    - [MYSQL](#mysql)
    - [Redis](#redis)
    - [SQLP](#sqlp)
      - [친절한 SQL 튜닝](#친절한-sql-튜닝)
  - [멀티스레드와 동시성](#멀티스레드와-동시성)
  - [C](#c)
  - [JAVA](#java)
    - [JPA](#jpa)
    - [SpringSecurity](#springsecurity)
  - [Javascript](#javascript)
    - [Typescript](#typescript)
    - [Nodejs](#nodejs)
    - [GraphQL/Prisma](#graphqlprisma)
    - [Vue](#vue)
  - [JAVA 와 JS의 차이](#java-와-js의-차이)
  - [Rust](#rust)
  - [SASM](#sasm)
  - [디자인패턴](#디자인패턴)
  - [자료구조](#자료구조)
  - [알고리즘](#알고리즘)
    - [MIT 6.006 Introduction to Algorithms](#mit-6006-introduction-to-algorithms)
  - [프로그래밍 대회에서 배우는 알고리즘 문제 해결 전략(종만북)](#프로그래밍-대회에서-배우는-알고리즘-문제-해결-전략종만북)
  - [Jenkins-Docker-AWS](#jenkins-docker-aws)
  - [Docker \& Kubernetes: The Practical Guide - 2025 Edition](#docker--kubernetes-the-practical-guide---2025-edition)
  - [기술 면접](#기술-면접)
  - [bitlibrary-개발일지](#bitlibrary-개발일지)
  - [정보처리기사 실기](#정보처리기사-실기)
  - [참고자료](#참고자료)

## 생성 이유

- 공식문서가 아닌 블로그는 틀린 내용이 많아 올바른 자료를 찾아 정리하기 위해 작성

- 공부 중 모르는 키워드가 나올 때마다 비슷한 내용을 반복 검색하며 시간을 낭비하는 것을 줄이고, 한눈에 볼 수 있는 자료를 만들기 위해 작성

- 블로그에 작성하는 것이 번거로워 GitHub 레포지토리의 Markdown 파일로 정보를 정리

---

## 개발 상식

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
- [Trailing slash](CS/CommonSense/TrailingSlash.md)
- [Compile](CS/CommonSense/Compile.md)
- [Functional Programming](CS/CommonSense/FunctionalProgramming.md)
- [LLM](CS/CommonSense/LLM.md)
- [Street Coder](CS/CommonSense/StreetCoder.md)
- [gRPC](CS/CommonSense/gRPC.md)
- [sync,async,blocking,non-blocking](CS/CommonSense/SyncAsyncBlockingNonBlocking.md)
- [대칭키, 비대칭키](CS/CommonSense/Symetrickey.md)

---

### WebRTC

- [WebRTC](CS/WebRTC/WebRTC.md)
- [SequenceDiagram](CS/WebRTC/SequenceDiagram.md)

---

### GITHUB

- [git이란?](CS/GIT/GIT.md)
- [git의 구조](CS/GIT/Structure.md)
- [HEAD/Snapshot](CS/GIT/Head.md)
- [Stash](CS/GIT/Stash.md)
- [Merge](CS/GIT/Merge.md)
- [linux-ssh인증](CS/GIT/Linux-SSH.md)

---

## 아키텍쳐

- [클린 아키텍쳐](CS/Architecture/Clean.md)

---

### 대규모 아키텍쳐 설계

> https://www.udemy.com/course/software-architecture-design-large-scale-systems

- [좋은 API 설계](CS/ArchitectureDesign/API.md)
- [REST API](CS/ArchitectureDesign/RestAPI.md)

---

## 운영체제

- [컴퓨터의 기본 구조](CS/OS/Computer.md)
- [메모리의 구조](CS/OS/Memory.md)
- [운영체제란?](CS/OS/OperationSystem.md)
- [가상메모리/페이지교체](CS/OS/Paging.md)
- [파일시스템](CS/OS/File.md)
- [System Call](CS/OS/SystemCall.md)
- [프로세스와 스레드](CS/OS/Process&Thread.md)
  - [STACK의 구조](CS/OS/Stack.md)
  - [컨텍스트 스위칭](CS/OS/ContextSwitching.md)
- [동시성제어](CS/OS/Concurrency.md)
- [부동 소수점/고정 소수점](CS/OS/FloatingPoint.md)

---

### 운영체제-널널한개발자

> https://www.youtube.com/playlist?list=PLXvgR_grOs1BQCziQ_MpM877BdBxwbMzA

- [컴퓨터의 기본 구조](CS/OS/NullNull/Structure.md)
- [1비트와 진법](CS/OS/NullNull/bitsAndBase.md)
- [CPU의 작동원리](CS/OS/NullNull/CPU.md)
- [운영체제](CS/OS/NullNull/OS.md)

---

### 운영체제-최린

> http://www.kocw.net/home/cview.do?cid=5e94ceee75415112

- [운영체제 개요](CS/OS/ChoiLyn/OperationIntro.md)
- [운영체제 역사](CS/OS/ChoiLyn/OperationHistory.md)
- [프로세스](CS/OS/ChoiLyn/OperationProcess.md)
  - [프로세스](CS/OS/ChoiLyn/Process.md)
- [Exception, Thread](CS/OS/ChoiLyn/ExceptionAndThread.md)
- [쓰레드](CS/OS/ChoiLyn/Thread.md)
- [상호 배제와 동기](CS/OS/ChoiLyn/MutexSync.md)

---

### 리눅스-명령어

- [리눅스란?](CS/OS/Linux/Linux.md)
- [WSL](CS/OS/Linux/WSL.md)
- [명령어 구조](CS/OS/Linux/Command.md)
- [파일시스템](CS/OS/Linux/File.md)
- [파일](CS/OS/Linux/CreateFile.md)
- [Nano](CS/OS/Linux/Nano.md)
- [삭제,복사,이동](CS/OS/Linux/Rm.md)
- [파일 다루기](CS/OS/Linux/UseFile.md)
- [리다이렉션](CS/OS/Linux/Redirection.md)
- [파이프](CS/OS/Linux/Pipe.md)
- [확장](CS/OS/Linux/Expansion.md)
- [찾기](CS/OS/Linux/Find.md)
- [grep](CS/OS/Linux/grep.md)
- [권한](CS/OS/Linux/Permission.md)
- [환경](CS/OS/Linux/Environment.md)
- [Scripting](CS/OS/Linux/Scripting.md)
- [Cron](CS/OS/Linux/Cron.md)

---

### 리눅스-운영체제

- [Linux와 SystemCall](CS/OS/Linux/LinuxSystemCall.md)

---

### PintOS

- [PintOS](CS/pintOS/StartPintOS.md)

---

### OS구조와 원리

> https://github.com/gunhaa/LoopyOS

> https://www.yes24.com/Product/Goods/2508562

- [day1](CS/OS/dailyOS/day1.md)
- [day2](CS/OS/dailyOS/day2.md)
- [day3](CS/OS/dailyOS/day3.md)
- [day4](CS/OS/dailyOS/day4.md)

---

## 네트워크

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
- [DNS](CS/Network/DNS.md)
- [Wireshark 패킷 분석](CS/Network/Wireshark.md)
  - [ipv4 단편화](CS/Network/ipv4.md)
  - [TCP:3-way-handshake](CS/Network/3-way-handshake.md)
  - [TCP:4-way-handshake](CS/Network/connection-close.md)
  - [TCP:retransmission](CS/Network/retransmission.md)
  - [HTTP](CS/Network/WiresharkHttp.md)
  - [Server To Req](CS/Network/ServerToReq.md)
- [웹 서비스의 구조](CS/Network/WebServiceStructure.md)

---

### 네트워크기초-크래프트맨

> https://www.youtube.com/watch?v=dsoAkoxZ13o

- [Network란?](CS/Network/CraftMan/Network.md)
- [Internet Protocol](CS/Network/CraftMan/InternetProtocol.md)
- [데이터 단위](CS/Network/CraftMan/Data.md)

---

## 데이터베이스

- [데이터베이스의 정의](CS/Database/Database.md)
- [SQL](CS/Database/SQL.md)
- [DDL, DML, DCL, TCL](CS/Database/DDL.md)
- [Transaction](CS/Database/Transaction.md)
  - [Isolation Level](CS/Database/Isolation.md)
- [ACID](CS/Database/ACID.md)
- [SQL vs NoSQL](CS/Database/SqlnoSql.md)
- [Index](CS/Database/Index.md)
- [데이터 정규화](CS/Database/normalization.md)
- [카디널리티](CS/Database/Cardinality.md)
- [매핑 테이블](CS/Database/MappingTable.md)
- [Lock](CS/Database/Lock.md)
- [MVCC](CS/Database/MVCC.md)
- [UPDATE/DELETE의 실제동작](CS/Database/UpdateDelete.md)
- [COMMIT의 실제 동작](CS/Database/Commit.md)
- [보상 트랜잭션]
- [윈도우 함수](CS/Database/WindowFunction.md)

> [원리와응용 2025] Lecture 9,10. Database Design - Joonseok Lee

- [Lecture 9,10. Database Design](CS/Database/DatabaseDesign.md)

---

### 국민대학교 김남규 교수/데이터 베이스 실무

> https://www.youtube.com/playlist?list=PLg_wJlcMiuKtGdlIaAZ0rOPPQuTDENnEQ

- [Database](CS/Database/KimNamKyu/Database.md)
- [Conceptual Data Modeling](CS/Database/KimNamKyu/Conceptual.md)
- [Logical Data Modeling](CS/Database/KimNamKyu/Logical.md)
- [Part2. 데이터 모델링의 이해](CS/Database/KimNamKyu/DataModeling.md)
- [Part3. 데이터 모델과 성능](CS/Database/KimNamKyu/Performance.md)

---

### MYSQL

> [Real MySQL8.0](https://www.yes24.com/Product/Goods/103415627)

- [MySQL](CS/MySQL/MySQL.md)
- [Architecture](CS/MySQL/Architecture.md)
- [Optimizer](CS/MySQL/Optimizer.md)
- [Transaction & Lock](CS/MySQL/TransactionAndLock.md)
- [Index](CS/MySQL/Index.md)
- [Full Text Search](CS/MySQL/FullTextSearch.md)
  - [Inverted Index](CS/MySQL/InvertedIndex.md)

---

### Redis

- [Redis 개요](CS/Redis/Redis.md)
- [빅데이터 저장 및 분석을 위한 NoSQL & Redis](CS/Redis/NoSQL&Redis.md)
- [node.js redis 인터페이스 사용방법](CS/Redis/Nodejs.md)
- [Redis의 메모리 관리](CS/Redis/Memory.md)

---

### SQLP

- [Todo](CS/SQLP/Todo.md)

#### 친절한 SQL 튜닝

- [1. SQL 처리 과정과 I/O](CS/SQLP/FriendlyTuning/SQLParsingAndIO.md)
- [2. 인덱스 기본](CS/SQLP/FriendlyTuning/Index.md)
- [3. 인덱스 튜닝](CS/SQLP/FriendlyTuning/IndexTuning.md)
- [4. 조인 튜닝](CS/SQLP/FriendlyTuning/JoinTuning.md)
- [5. 소트 튜닝]
- [6. DML 튜닝](CS/SQLP/FriendlyTuning/DMLTuning.md)

---

## 멀티스레드와 동시성

> 인프런 김영한 - 멀티스레드와 동시성(https://www.inflearn.com/course/%EA%B9%80%EC%98%81%ED%95%9C%EC%9D%98-%EC%8B%A4%EC%A0%84-%EC%9E%90%EB%B0%94-%EA%B3%A0%EA%B8%89-1)

> https://github.com/gunhaa/multi_thread_and_concurrency

- [멀티태스킹과 멀티프로세싱](CS/MultiThreadAndConcurrency/Multitasking.md)
- [프로세스와 스레드](CS/MultiThreadAndConcurrency/ProcessThread.md)
- [스레드와 스케쥴링](CS/MultiThreadAndConcurrency/Scheduling.md)
- [컨텍스트 스위칭](CS/MultiThreadAndConcurrency/ContextSwitching.md)
- [스레드의 생명주기](CS/MultiThreadAndConcurrency/LifeCycle.md)
- [메모리 가시성](CS/MultiThreadAndConcurrency/Volatile.md)
- [자바 메모리 모델](CS/MultiThreadAndConcurrency/JavaMemoryModel.md)
- [synchronized](CS/MultiThreadAndConcurrency/Synchronized.md)
- [ReentrantLock](CS/MultiThreadAndConcurrency/ReentrantLock.md)
- [생산자와 소비자](CS/MultiThreadAndConcurrency/ProducerConsumer.md)
- [스레드의 대기](CS/MultiThreadAndConcurrency/Waiting.md)
- [원자적 연산](CS/MultiThreadAndConcurrency/Atomic.md)
- [CAS 연산](CS/MultiThreadAndConcurrency/CAS.md)
- [Spin lock](CS/MultiThreadAndConcurrency/Spinlock.md)
- [실무 관점의 Lock](CS/MultiThreadAndConcurrency/Lock.md)
- [동시성 컬렉션](CS/MultiThreadAndConcurrency/Collection.md)
- [스레드 풀과 Executor 프레임워크](CS/MultiThreadAndConcurrency/Executor.md)
- [Future](CS/MultiThreadAndConcurrency/Future.md)

---

## C

> 독하게 시작하는 C프로그래밍
> https://www.inflearn.com/course/%EB%8F%85%ED%95%98%EA%B2%8C-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-c%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D

- [C를 배우기 전에 알아야할 것들](CS/C/BeforeStartC.md)
- [Memory](CS/C/Memory.md)
- [Execute](CS/C/Execute.md)
- [Reference](CS/C/Reference.md)
- [CPU](CS/C/CPU.md)
- [CPU수준 자료형](CS/C/CPUDataType.md)
- [저급어와 고급어](CS/C/LowHigh.md)
- [컴파일러와 인터프리터](CS/C/CompilerInterpreter.md)

---

## JAVA

- [JAVA의 메모리](CS/JAVA/Memory.md)
- [컴파일 과정](CS/JAVA/Compile.md)
- ["한번 작성하면 어디서든 실행된다"의 의미](CS/JAVA/Mean.md)
- [String, StringBuilder, StringBuffer](CS/JAVA/String.md)
- [JAVA의 접근 제어자](CS/JAVA/Encapsulation.md)
- [System.out.println를 실무에서 절대 사용안하는 이유](CS/JAVA/sysout.md)
- [JAVA의 배열에는 왜 toString()을 오버라이딩 시키지 않았나?](CS/JAVA/Array1.md)
- [Excpetion](CS/JAVA/Exception.md)
- [synchronized](CS/JAVA/synchronized.md)
- [Reflection](CS/JAVA/Reflection.md)
- [버전별 특징](CS/JAVA/Version.md)
- [바이트코드](CS/JAVA/ByteCode.md)

---

### JPA

- [JPA 최적화 순서](CS/JPA/JPA_Optimization.md)

---

### SpringSecurity

- [SpringSecurity](CS/SpringSecurity/springSecurity.md)
- [SpringSecurity의 흐름](CS/SpringSecurity/springSecurityFlow.md)
- [SpringSecurity의 로그인 요청 판단방법](CS/SpringSecurity/HowToReqIsLogin.md)
- [Session Fixation](CS/SpringSecurity/SessionFixation.md)
- [JWT](CS/SpringSecurity/JWT.md)

---

## Javascript

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
- [Modern Javascript](CS/Javascript/Modern.md)
- [SharedArrayBuffer & Atomics](CS/Javascript/BufferAtomics.md)
- [first-class object](CS/Javascript/FirstClassObject.md)
- [Execution Context](CS/Javascript/ExecutionContext.md)

---

### Typescript

> 코드로 정리

> https://github.com/gunhaa/Typescript

- [Typescript Compiler](CS/Typescript/Compiler.md)
- [Typescript, Express 프로젝트 세팅](CS/Typescript/Setting.md)

---

### Nodejs

> nodejs 디자인 패턴 바이블(https://www.yes24.com/Product/Goods/101686866)

- [Nodejs란?](CS/Nodejs/Nodejs.md)
- [Reactor pattern](CS/Nodejs/Reactor.md)
- [libuv](CS/Nodejs/Libuv.md)

---

### GraphQL/Prisma

> 얄팍한 코딩사전/ GraphQL & Apollo 강좌 (https://www.youtube.com/watch?v=9BIXcXHsj0A)

> 웹/앱 개발을 위한 GraphQL (https://product.kyobobook.co.kr/detail/S000001033086)

- [GraphQL](CS/GraphQL/GraphQL.md)
- [Apollo](CS/GraphQL/Apollo.md)
- [자료형](CS/GraphQL/DataType.md)
  - [Union, interface](CS/GraphQL/UnionInterface.md)
  - [인자와 인풋 타입](CS/GraphQL/ArgsInput.md)
- [GraphQL/Prisma 설정](CS/GraphQL/Prisma.md)
- [Production-ready GraphQL](CS/GraphQL/ProductionGraphql.md)
- [DataLoader](CS/GraphQL/DataLoader.md)

---

### Vue

- [Vue, SpringBoot 프로젝트 세팅](CS/Vue/ProjectSetting.md)
- [Browser Rendering](CS/Vue/BrowserRendering.md)
- [Vue의 작동원리](CS/Vue/Mechanism.md)
- [Hook](CS/Vue/Hook.md)
- [상태관리](CS/Vue/Status.md)
- [Proxy](CS/Vue/Proxy.md)
- [Computed](CS/Vue/Computed.md)

---

## JAVA 와 JS의 차이

- [Compiler vs Interpreter](CS/JAVAvsJS/Compiler_Interpreter.md)

---

## Rust

> [Rust in action](https://www.yes24.com/Product/Goods/110368348)

- [수동 메모리 관리](CS/Rust/Memory.md)
- [기본 문법과 예제](CS/Rust/Syntax.md)
- [Race condition 제어](CS/Rust/RaceCondtion.md)
- [포인터](CS/Rust/Pointer.md)
- [스마트포인터](CS/Rust/SmartPointer.md)
- [스택, 힙](CS/Rust/Stack_Heap.md)

---

## SASM

> https://github.com/gunhaa/SASM <br> NASM 코드, 설명 repo

---

## 디자인패턴

> https://github.com/gunhaa/GofDesignPattern <br> GoF design pattern java코드, 설명 github repo

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

## 자료구조

> 데이터 구조 TypeScript로 직접 구현(쉽게 배우는 자료구조 with JAVA 참고) <br>
> javascript 폴더 안 <br>
> 원본 velog(https://velog.io/@gunhaa/series/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)

- [Linked-List](CS/DataStructure/LinkedList.md)
- [Stack](CS/DataStructure/Stack.md)
- [Queue](CS/DataStructure/Queue.md)
- [Priority Queue&Heap](CS/DataStructure/Heap.md)
- [sort](CS/DataStructure/Sort.md)
  - [Selection Sort](CS/DataStructure/SelectionSort.md)
  - [Bubble Sort](CS/DataStructure/BubbleSort.md)
  - [Insertion Sort](CS/DataStructure/InsertionSort.md)
  - [Quick Sort](CS/DataStructure/QuickSort.md)
- [Tree](CS/DataStructure/Tree.md)

---

## 알고리즘

> 프로그래머스를 통해 푼 문제는 Programmer-Backjoon 레포지토리에 Auto Push <br> > https://github.com/gunhaa/Programmers-Baekjoon

- [알고리즘이란?](CS/Algorithm/Algorithm.md)
- [시간복잡도/빅오표기법](CS/Algorithm/TimeComplexity.md)
- [코딩테스트 팁](CS/Algorithm/Tips.md)
  - [PS 기본 철학](CS/Algorithm/PS.md)
- [Swap](CS/Algorithm/Swap.md)
- [Recursion](CS/Algorithm/Recursion.md)
- [Greedy](CS/Algorithm/Greedy.md)
- [BackTracking](CS/Algorithm/BackTracking.md)
- [Dynamic Programming](CS/Algorithm/DP.md)
- Path Finder
  - [DFS](CS/Algorithm/DFS.md)
  - [BFS](CS/Algorithm/BFS.md)
  - 다익스트라
  - A\*

### MIT 6.006 Introduction to Algorithms

> https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/

- [극댓값 찾기/계산 모델](CS/Algorithm/MITOCW/Peek/Peek.md)

---

## 프로그래밍 대회에서 배우는 알고리즘 문제 해결 전략(종만북)

> https://product.kyobobook.co.kr/detail/S000001032946

- [PS는 왜 필요한가?](CS/PS/Intro.md)
- [좋은 코드를 짜기 위한 원칙](CS/PS/GoodCode.md)

---

## Kong Gateway

- [Kong Gateway](CS/Kong/Gateway.md)
- [AdminAPI](CS/Kong/AdminAPI.md)
- [Comsumer](CS/Kong/Consumer.md)

---

## Swagger

- [Swagger](CS/Swagger/Swagger.md)
- [OpenAPI Specification(OAS)](CS/Swagger/OAS.md)

---

## MCP

- [MCP란?](CS/MCP/MCP.md)
- Server Features
  - [Tool](CS/MCP/Tool.md)


--- 

## Hashicorp Vault

---

## Jenkins-Docker-AWS

- [20분만에 전공자처럼 Docker,가상화 이해하기](CS/ETC/NullNull.md)
- [Docker없이 Container만들기](CS/ETC/RawContainer.md)
- [Overview](CS/ETC/Overview.md)
- [CI/CD step](CS/ETC/CI_CD_Step.md)
- [Docker](CS/ETC/Docker.md)
  - [Container](CS/ETC/Container.md)
- [Jenkins](CS/ETC/Jenkins.md)
- [Docker/AWS](CS/ETC/Docker_AWS.md)
- [Swap](CS/ETC/Swap.md)
- [HTTPS](CS/ETC/Https.md)

## Docker & Kubernetes: The Practical Guide - 2025 Edition

> https://github.com/gunhaa/Kubernetes

- [Container&Image](CS/ETC/Docker/Container&Image.md)
- [Docker 주요 명령어 정리](CS/ETC/Docker/Command.md)
- [Docker data](CS/ETC/Docker/Data.md)
- [ENV, ARG](CS/ETC/Docker/Env&ARG.md)
- [Container Network](CS/ETC/Docker/ContainerNetwork.md)
- [Multi Container Application](CS/ETC/Docker/MultiContainerApplication.md)
- [docker-compose](CS/ETC/Docker/Docker-compose.md)
- [Utlity Container](CS/ETC/Docker/UtilityContainer.md)

---

## 기술 면접

- [질문에 대한 대답](CS/Interview/Answer.md)
- [마무리 질문](CS/Interview/Question.md)
- [마음가짐](CS/Interview/Mindset.md)
- [기술면접](CS/Interview/TechInterview.md)
  - 분야별 질문&답변
    - [CS](CS/Interview/CS.md)
    - [Java/Javascript]
    - [Database]

---

## bitlibrary-개발일지

- [프로젝트 시작](CS/Bitlibrary/Overview.md)
- [트러블 슈팅1- Category](CS/Bitlibrary/TroubleShooting1.md)
- [트러블 슈팅2- @PathVariable](CS/Bitlibrary/TroubleShooting2.md)
- [트러블 슈팅3- BookLike](CS/Bitlibrary/TroubleShooting3.md)
- [트러블 슈팅4- https](CS/Bitlibrary/TroubleShooting4.md)
- [설계의 tradeoff](CS/Bitlibrary/TradeOff.md)
- [OAuthJWT](CS/Bitlibrary/OAuthJWT.md)
- [CI&CD 계획](CS/Bitlibrary/CI&CD.md)
- [결과](CS/Bitlibrary/results.md)
- [Certbot을 이용한 인증서 재 갱신](CS/Bitlibrary/Certbot.md)

---

## 정보처리기사 실기

- [계획](CS/InformEngineer/Plan.md)
- [이론](CS/InformEngineer/Theory.md)
- [Java](CS/InformEngineer/Java.md)
- [Python](CS/InformEngineer/Python.md)
- [C](CS/InformEngineer/C.md)

---

## 참고자료

- [김영한 로드맵](https://www.inflearn.com/roadmaps/373)
- [Operating System Concepts](https://product.kyobobook.co.kr/detail/S000001868743)
- [Computer Networking:A-Top-Down Approach](https://product.kyobobook.co.kr/detail/S000061694627)
- [Git 교과서](https://product.kyobobook.co.kr/detail/S000001834368)
- [Linux Command Line 부트캠프: 리눅스 초보자부터 고수까지](https://www.udemy.com/course/linux-command-line-colt/)
- [널널한 개발자](https://www.youtube.com/@nullnull_not_eq_null/playlists)
- [포프티비](https://www.youtube.com/@%ED%8F%AC%ED%94%84%ED%8B%B0%EB%B9%84/videos)
- [자바스크립트 패턴과 테스트](https://www.yes24.com/Product/Goods/33211518)
- [이펙티브 자바](https://www.yes24.com/Product/Goods/65551284)
- [쉽게 배우는 자료구조 with JAVA](https://www.yes24.com/Product/Goods/106400387)
- [자바로 배우는 핵심 자료구조와 알고리즘](https://product.kyobobook.co.kr/detail/S000001810058)
- [JVM 밑바닥까지 파헤치기](https://www.yes24.com/Product/Goods/126114513)
- [이것이 컴퓨터 과학이다](https://www.yes24.com/Product/Goods/130179291)
- [자바를 위한 자료구조](https://www.youtube.com/playlist?list=PLpPXw4zFa0uKKhaSz87IowJnOTzh9tiBk)
- [모두를 위한 컴퓨터 과학](https://www.boostcourse.org/cs112)
- [컴파일러 만들기](https://product.kyobobook.co.kr/detail/S000001805053)
- [실습과 그림으로 배우는 리눅스 구조](https://product.kyobobook.co.kr/detail/S000208795616)
- [쉽게 배우는 Gof의 23가지 디자인 패턴](https://product.kyobobook.co.kr/detail/S000200311846)
- [혼자 공부하는 네트워크](https://product.kyobobook.co.kr/detail/S000212911507?utm_source=google&utm_medium=cpc&utm_campaign=googleSearch&gad_source=1)
- [LLM을 활용한 실전 AI 애플리케이션 개발](https://product.kyobobook.co.kr/detail/S000213834592)
- [한 줄 한 줄 짜면서 익히는 러스트 프로그래밍](https://product.kyobobook.co.kr/detail/S000061351231)
- [(컨테이너 인프라 환경 구축을 위한) 쿠버네티스/도커](https://product.kyobobook.co.kr/detail/S000001834629)
- [리팩터링](https://product.kyobobook.co.kr/detail/S000001810241)
- [(자바 ORM 표준) JPA 프로그래밍](https://product.kyobobook.co.kr/detail/S000000935744)
- [gunhaa velog 정리자료](https://velog.io/@gunhaa/posts)
- [gunhaa notion 정리자료](https://www.notion.so/STUDY-115dc75178eb80e2a9e2c9d12dd52d62)
- [클린 아키텍쳐](https://www.yes24.com/Product/Goods/77283734)
- [Real MySQL8.0](https://www.yes24.com/Product/Goods/103415627)
- [Street Coder](https://www.yes24.com/Product/Goods/122109104)
- [OS구조와 원리](https://www.yes24.com/Product/Goods/2508562)
- [빅데이터 저장 및 분석을 위한 NoSQL & Redis](https://www.yes24.com/Product/Goods/71131862)
- [Rust in action](https://www.yes24.com/Product/Goods/110368348)
- [266가지 문제로 정복하는 코딩 인터뷰](https://www.yes24.com/Product/Goods/103768603)
- [국민대학교 김남규 교수/데이터 베이스 실무](https://www.youtube.com/playlist?list=PLg_wJlcMiuKtGdlIaAZ0rOPPQuTDENnEQ)
- [SQL 쿡북](https://www.yes24.com/Product/Goods/106207663)
- [친절한 SQL 튜닝](https://www.yes24.com/Product/Goods/61254539)
- [SQL 전문가 가이드](https://product.kyobobook.co.kr/detail/S000001399869)
- [오라클 성능 고도화 원리와 해법 1,2](https://product.kyobobook.co.kr/detail/S000061696047)
