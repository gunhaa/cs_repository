# 기술면접

## `${20250723_INTERVIEW}`

> 아는 개념도, 다시 정리해서 암기<br>
> 자연스럽게 설명 할 수 있도록<br>

- 사용할 기술을 정확히 정리하기
  - ex) 외주시 사용했던 Firebase

### Database

- Index란 무엇인가를 물었을때, 아는 것과 말로 표현해내는 것은 확실히 다르다
  - 2줄로 요약된 나만의 답변을 만들어야 한다
- MySQL의 특징적인 인덱스
- 자기소개 컬럼이 있는데, 일부 내용을 빠르게 검색해야 할 경우 해결 방법은?
  - Full-Text Search (전문 검색) 인덱스 활용
    - MySQL, PostgreSQL, MariaDB 등 주요 DBMS에서 제공하는 Full-Text Index 생성
  - 전용 검색엔진 사용 (Elasticsearch)
    - DB 외부에 전문 검색엔진을 두고, 텍스트 데이터를 동기화해서 검색 처리

### 동시성

- 분산락

### GraphQL

- GraphQL의 단점은 무엇인가?
  - Caching, Authroize에 관한 이야기로 풀어내기
  - 기술을 적용시 장/단점을 확실히 알고 기술적 의사결정을 해야한다

### 보안

- 대칭키, 비대칭키
  - HTTPS는 대칭키인가, 비대칭키 인가?
    - HTTPS는 비대칭키로 handshake후 대칭키를 가지고 통신을 한다
