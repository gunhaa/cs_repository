# String Class

- JAVA의 String 리터럴은 불변을 보장한다
  - 멀티스레드에서의 안전을 보장한다
  - + 연산시 새로운 String객체를 생성한다
```java
String a = "hello";
String b = "hello";
System.out.println(a == b); // true

String c = new String("hello");
System.out.println(a == c); // false
```

## JVM의 String 관리

1. 컴파일 시점
  - 자바 소스 코드에서 문자열 리터럴이 등장하면 .class의 Constant Pool에 상수풀 인덱스와 함께 기록한다
2. 클래스 로딩 시점
  - ClassLoader가 .class파일을 읽어 들일 때, 클래스 파일의 constant pool 정보가 Heap영역의 Meta space - 런타임 상수 풀(Runtime Constant Pool)로 옮겨진다
  - 이 시점은 문자열 값이 아닌, 이 클래스에서 문자열 리터럴이 필요하다는 것을 알린다
  - 메타데이터가 로딩된다
3. 실행 시점
  - String Intern Pool(Heap)에서 이미 존재하는 문자열인지 확인한다
  - 없다면 새로운 객체를 만들어 등록한다

## JVM이 String 리터럴에서 같은 문자를 판별해 같은 참조를 주는 방법

- 클래스 로딩시 힙 영역의 Meta space 의 Runtime constant pool에서 심볼을 관리한다
- JVM내부 Heap에는 String Intern Pool이라는 해시 기반의 관리 구조(String Table)가 존재한다
  - 새로운 리터럴이 등장하면 JVM은 String Intern pool에서 이미 존재하는지 해시를 이용해 검색한다
  - str.intern() 을 호출하면 JVM은 StringTable 에서 해당 문자열이 존재하는지 hashCode 기반 버킷 탐색을 한다
    - hash 충돌이 일어날경우 equals를 사용해 동등성을 판단한다