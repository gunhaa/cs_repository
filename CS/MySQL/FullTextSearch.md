# 전문 검색

> 자기소개 컬럼에서 특정 키워드(쌀사자 보이즈)를 찾아야한다면 MySQL에서는 어떻게 해야하는가?

- 이때 가장 먼저 떠올릴 수 있는 방법은 LIKE 연산자이지만, 이는 여러 한계를 가집니다. 대용량 데이터 환경에서는 전문 검색(Full-Text Search)을 사용하는 것이 훨씬 효율적이고 좋은 해결책이 될 수 있다

## 방법1. LIKE 연산자 사용 - BAD

- LIKE는 SQL에서 문자열의 일부가 일치하는지를 확인하는 가장 기본적인 방법이다
- 와일드카드(%)를 사용하여 패턴 매칭을 수행한다

```sql
-- '쌀사자 보이즈'로 시작하는 경우
SELECT * FROM users WHERE profile_text LIKE '쌀사자 보이즈%';

-- '쌀사자 보이즈'로 끝나는 경우
SELECT * FROM users WHERE profile_text LIKE '%쌀사자 보이즈';

-- '쌀사자 보이즈'를 포함하는 모든 경우
SELECT * FROM users WHERE profile_text LIKE '%쌀사자 보이즈%';
```

- 왜 LIKE는 좋은 선택이 아닐까?
  - 인덱스(Index)를 활용하지 못하는 성능 저하
    - LIKE '%키워드' 와 같이 검색어 앞에 와일드카드(%)가 붙는 경우, 데이터베이스는 인덱스를 효율적으로 사용하지 못하고 테이블 전체를 스캔(Full Table Scan)하게 된다.
    - 데이터가 수만, 수백만 건으로 늘어날 경우 검색 속도가 현저히 느려져 시스템에 큰 부하를 줄 수 있다.
  - 단순 텍스트 매칭의 한계
    - LIKE는 단순히 해당 문자열이 포함되어 있는지만 확인한다.
    - 검색 결과의 관련성(Relevance)을 점수화하여 정렬하는 기능이 없다.

## 방법2. 전문 검색(Full Text Search) 사용 - GOOD

- 전문 검색은 텍스트 데이터의 내용을 색인(Index)하여 특정 단어나 구문에 대한 검색을 빠르고 효율적으로 수행하는 방법이다. 단순히 포함 여부를 넘어, 자연어 처리 기반의 정교한 검색이 가능하다.
- 일반적인 index(B-Tree)와 다른 역색인(Inverted Index)을 사용한다


1. 1단계: 전문 검색 인덱스(Full-Text Index) 생성
    - 전문 검색을 사용하려면 먼저 검색 대상 컬럼에 FULLTEXT 인덱스를 생성해야 한다.

```sql
-- 새로운 테이블을 생성하며 FULLTEXT 인덱스 추가
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    profile_text TEXT,
    FULLTEXT KEY ft_profile (profile_text) -- profile_text 컬럼에 전문 검색 인덱스 생성
) ENGINE=InnoDB;

-- 이미 존재하는 테이블에 FULLTEXT 인덱스 추가
ALTER TABLE users ADD FULLTEXT INDEX ft_profile (profile_text);
```

2. 2단계: MATCH() ... AGAINST() 구문으로 검색

```sql
SELECT *
FROM users
WHERE MATCH(profile_text) AGAINST('쌀사자 보이즈');
```

- 장점
  - 뛰어난 검색 속도: 미리 생성된 FULLTEXT 인덱스를 활용하여 LIKE의 테이블 전체 스캔 방식보다 월등히 빠른 속도를 보장한다
  - 관련도 순 정렬: 전문 검색은 내부적으로 검색 결과의 관련도 점수를 계산한다다. 이 점수를 확인하고, 점수가 높은 순으로 결과를 정렬할 수 있다.
  ```sql
  SELECT
    id,
    name,
    profile_text,
    MATCH(profile_text) AGAINST('쌀사자 보이즈') AS score -- 관련도 점수를 score라는 별칭으로 조회
    FROM users
    WHERE MATCH(profile_text) AGAINST('쌀사자 보이즈')
    ORDER BY score DESC; -- 점수가 높은 순으로 정렬
  ```
  - 다양한 검색 모드 지원
    - 자연어 검색 (Natural Language Mode): 기본 모드이며, 사용자가 입력한 검색어를 자연어로 인식하여 관련성 높은 결과를 찾아준다. (예: AGAINST('쌀사자 보이즈'))
    - 불린 모드 (Boolean Mode): 특정 단어를 반드시 포함(+)하거나 제외(-)하는 등 복잡한 논리 연산이 가능하다.
  ```sql
  -- '쌀사자'는 반드시 포함하고, '보이즈'는 포함하지 않는 결과 검색
    SELECT * FROM users
    WHERE MATCH(profile_text) AGAINST('+쌀사자 -보이즈' IN BOOLEAN MODE);
  ```

## Recap

| 구분 | `LIKE '%검색어%'` | `MATCH() AGAINST()` (전문 검색) |
| :--- | :--- | :--- |
| 성능 | 데이터가 많을수록 매우 느림 (Full Table Scan) | 빠름 (Full-Text Index 사용) |
| 인덱싱 | B-Tree 인덱스 활용 불가 | Full-Text Index 필수 |
| 검색 기능 | 단순 패턴 매칭 | 자연어 처리, 불린 검색, 관련도 점수 |
| 적합한 경우 | 간단한 패턴 검색, 데이터가 적은 테이블 | 대용량 텍스트 검색, 검색 엔진 기능 구현 |