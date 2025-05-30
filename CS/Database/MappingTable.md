# 매핑 테이블

- 두 개 이상의 엔터티 간의 다대다(M:N) 관계를 연결하거나 설명하는 중간 테이블
- 이 관계를 설명하는 테이블은 일반적으로 "매핑 테이블(Mapping Table)" 또는 상황에 따라 "Join Table", "Bridge Table", "Bundle 구성 테이블" 등으로 불린다

## 예시

- 상품 A,B가 있는 테이블에 A,B를 합친 상품 C를 출시한 경우
- 면접시 질문이 처음에 잘못 이해했더라도 당황하지 말것..
  - 차라리 틀리더라도 생각한대로 말하기
  - 눈치봐서 맞추기 불가능하니 생각대로 말하기

### 기존 테이블

| id  | name | price |
| --- | ---- | ----- |
| 1   | A    | 1000  |
| 2   | B    | 2000  |

- A+B라는 관계를 설명하기 위해 테이블을 추가해야한다

```sql
CREATE TABLE Product (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  price INT
);

CREATE TABLE ProductBundle (
  bundle_id INT,         -- 묶음 상품 (예: C)
  item_id INT,           -- 구성 상품 (예: A, B)
  quantity INT DEFAULT 1,
  PRIMARY KEY (bundle_id, item_id),
  FOREIGN KEY (bundle_id) REFERENCES Product(id),
  FOREIGN KEY (item_id) REFERENCES Product(id)
);
```

## Product

| id  | name | price         |
| --- | ---- | ------------- |
| 1   | A    | 1000          |
| 2   | B    | 2000          |
| 3   | C    | 2700 -- A + B |

## ProductBundle

| bundle_id | item_id | quantity |
| --------- | ------- | -------- |
| 3         | 1       | 1        |
| 3         | 2       | 1        |
