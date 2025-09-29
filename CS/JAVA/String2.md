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

## JVM이 String 리터럴에서 같은 문자를 판별해 같은 참조를 주는 방법

- 클래스 로딩시 메서드 영역의 상수 풀에서 String 리터럴들을 관리한다
- JVM내부에는 String pool이라는 해시 테이블 구조가 존재한다
  - 새로운 리터럴이 등장하면 JVM은 String pool에서 이미 존재하는지 해시를 이용해 검색한다