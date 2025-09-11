# Database의 NULL 이란?

- NULL - 알 수 없는 값
- NULL은 빈 상자가 아닌, 상자가 있는지 조차 모른다는 표시이다
  - price = 0, 숫자 0이라는 값
  - description = '' 글자가 없는 값이 있다 (두 쉼표 사용)
  - NULL 값이 있는지 자체를 모른다
  - 따라서 어떤 값 = NULL이라는 비교연산은 항상 알 수 없음(UNKNOWN) 이라는 결과를 반환한다
  - NULL = NULL 조차도 true가 아닌 unknown이다
  - 비교는 양쪽이 다 값을 가질 때만 참 거짓을 결정할 수 있다
  - where 절은 조건의 결과가 true인 행만 반환하므로, 알 수 없음(unknown)으로 판별된 행은 결과에 포함시키지 않는다
  - 이런 문제를 해결하기 위해 SQL은 IS NULL이라는 특별한 키워드를 제공한다

## NULL의 정렬
- MySQL의 NULL 정렬 규칙
  - MySQL은 NULL을 가장 작은 값으로 취급한다
- Oracle은 NULL을 가장 큰 값으로 취급한다
- 내가 사용하는 DB가 어떤 규칙을 따르는지 명확히 아는 것이 중요하다

### 심화 예제: 상품 설명을 내림차순으로 정렬하되, 설명이 없는 상품(`NULL` )은 빨리 확인할 수 있게 맨 앞으로 보내주세요

- 모두 같은 동작을 한다
  - `select product_id, name, description, description is null from products order by description desc;`
  - `select product_id, name, description, description is null from products order by description is null desc, description desc;`
  - `select product_id, name, description from products order by (description is null) desc, description desc;`
