# 고급 집계 함수

## GROUP BY를 이용한 GROUPING SET

```sql
SELECT
  BRAND,
  SEGMENT,
  SUM(QUANTITY)
FROM SALES
GROUP BY BRAND, SEGMENT
UNION ALL
SELECT
  BRAND,
  NULL,
  SUM(QUANTITY)
FROM SALES
GROUP BY BRAND
UNION ALL
SELECT
  NULL,
  SEGMENT,
  SUM(QUANTITY)
FROM SALES
GROUP BY SEGMENT
UNION ALL
SELECT
  NULL,
  NULL,
  SUM(QUANTITY)
FROM
  SALES;
```

- 결과

| BRAND | SEGMENT | SUM(QUANTITY) | 설명 |
| :--- | :--- | :--- | :--- |
| 삼성 | 스마트폰 | 150 | (BRAND, SEGMENT) 그룹핑 |
| 삼성 | 노트북 | 50 | (BRAND, SEGMENT) 그룹핑 |
| Apple | 스마트폰 | 80 | (BRAND, SEGMENT) 그룹핑 |
| Apple | 태블릿 | 70 | (BRAND, SEGMENT) 그룹핑 |
| LG | TV | 120 | (BRAND, SEGMENT) 그룹핑 |
| 삼성 | NULL | 150 | (BRAND) 그룹핑 - 삼성 브랜드 총합 |
| Apple | NULL | 150 | (BRAND) 그룹핑 - Apple 브랜드 총합 |
| LG | NULL | 120 | (BRAND) 그룹핑 - LG 브랜드 총합 |
| NULL | 스마트폰 | 180 | (SEGMENT) 그룹핑 - 스마트폰 세그먼트 총합 |
| NULL | 노트북 | 50 | (SEGMENT) 그룹핑 - 노트북 세그먼트 총합 |
| NULL | 태블릿 | 70 | (SEGMENT) 그룹핑 - 태블릿 세그먼트 총합 |
| NULL | TV | 120 | (SEGMENT) 그룹핑 - TV 세그먼트 총합 |
| NULL | NULL | 420 | () 그룹핑 - 전체 총합 |


- GROUPING SET을 GROUP BY 로도 구현이 가능하지만 문제가 있다
  1. 동일한 테이블을 4번이나 읽는다
  2. SQL문이 너무 길어진다
- 그래서 사용하는것이 GROUPING SET 이다
- 즉, GROUPING SET은 UNION ALL을 여러개 사용한 GROUP BY와 같은 결과를 도출한다

## GROUPING SET

- GROUPING SET 절을 이용하면 한번에 다양한 기준의 컬럼 조합으로 집계를 구할 수 있다
- 아래 sql은 위 groupby/unionall을 사용한 sql과 같은 동작을 한다

```sql
SELECT
  BRAND,
  SEGMENT,
  SUM(QUANTITY)
FROM
  SALES
GROUP BY
GROUPING SETS
(
  (BRAND, SEGMENT),
  (BRAND),
  (SEGMENT),
  ()
);
```
- 결과

| BRAND | SEGMENT | SUM(QUANTITY) | 설명 |
| :--- | :--- | :--- | :--- |
| 삼성 | 스마트폰 | 150 | (BRAND, SEGMENT) 그룹핑 |
| 삼성 | 노트북 | 50 | (BRAND, SEGMENT) 그룹핑 |
| Apple | 스마트폰 | 80 | (BRAND, SEGMENT) 그룹핑 |
| Apple | 태블릿 | 70 | (BRAND, SEGMENT) 그룹핑 |
| LG | TV | 120 | (BRAND, SEGMENT) 그룹핑 |
| 삼성 | NULL | 150 | (BRAND) 그룹핑 - 삼성 브랜드 총합 |
| Apple | NULL | 150 | (BRAND) 그룹핑 - Apple 브랜드 총합 |
| LG | NULL | 120 | (BRAND) 그룹핑 - LG 브랜드 총합 |
| NULL | 스마트폰 | 180 | (SEGMENT) 그룹핑 - 스마트폰 세그먼트 총합 |
| NULL | 노트북 | 50 | (SEGMENT) 그룹핑 - 노트북 세그먼트 총합 |
| NULL | 태블릿 | 70 | (SEGMENT) 그룹핑 - 태블릿 세그먼트 총합 |
| NULL | TV | 120 | (SEGMENT) 그룹핑 - TV 세그먼트 총합 |
| NULL | NULL | 420 | () 그룹핑 - 전체 총합 |

## ROLL UP

- 지정된 GROUPING 컬럼의 소계를 생성하는데 사용된다
- 간단한 문법으로 다양한 소계를 출력할 수 있다
- 순서에 의미가 있다(오른쪽부터 순차 제거 후 결과 출력)

```sql
SELECT
  C1, C2, C3,
  집계함수(C4)
FROM
  TABLE_NAME
GROUP BY
  ROLLUP(C1, C2, C3);
-- 해당 SQL은 같은 결과를 출력한다
  GROUPING SETS (
    (C1, C2, C3),
    (C1, C2),
    (C1),
    ()
  )
```

| C1 | C2 | C3 | 집계함수(C4) | 설명 |
| :--- | :--- | :--- | :--- | :--- |
| 삼성 | 스마트폰 | 2024 | 100 | (C1, C2, C3) 그룹핑 |
| 삼성 | 스마트폰 | 2025 | 120 | (C1, C2, C3) 그룹핑 |
| 삼성 | 노트북 | 2024 | 50 | (C1, C2, C3) 그룹핑 |
| Apple | 스마트폰 | 2024 | 80 | (C1, C2, C3) 그룹핑 |
| Apple | 태블릿 | 2025 | 70 | (C1, C2, C3) 그룹핑 |
| 삼성 | 스마트폰 | NULL | 220 | (C1, C2) 소계 |
| 삼성 | 노트북 | NULL | 50 | (C1, C2) 소계 |
| Apple | 스마트폰 | NULL | 80 | (C1, C2) 소계 |
| Apple | 태블릿 | NULL | 70 | (C1, C2) 소계 |
| 삼성 | NULL | NULL | 270 | (C1) 소계 |
| Apple | NULL | NULL | 150 | (C1) 소계 |
| NULL | NULL | NULL | 420 | () 전체 총계 |


## CUBE
 
- 지정된 GROUPING 컬럼의 다차원 소계를 생성하는데 사용된다
- 지정 순서의 의미가없다(모든 조합을 출력)
  - 인자가 2개라면 2*2 = 4
  - 인자가 3개라면 3*3 = 9

```sql
SELECT 
  C1, C2, C3,
  집계함수(C4)
FROM 
  TABLE_NAME
GROUP BY
  CUBE (C1, C2, C3);
-- 해당 SQL은 같은 결과를 출력한다
  GROUPING SETS (
    (C1, C2, C3),
    (C1, C2),
    (C1, C3),
    (C2, C3),
    (C1),
    (C2),
    (C3),
    ()
  )
```

- 결과

| C1 | C2 | C3 | 집계함수(C4) | 설명 |
| :--- | :--- | :--- | :--- | :--- |
| 삼성 | 스마트폰 | 2024 | 100 | (C1, C2, C3) 그룹핑 |
| 삼성 | 스마트폰 | 2025 | 120 | (C1, C2, C3) 그룹핑 |
| 삼성 | 노트북 | 2024 | 50 | (C1, C2, C3) 그룹핑 |
| Apple | 스마트폰 | 2024 | 80 | (C1, C2, C3) 그룹핑 |
| Apple | 태블릿 | 2025 | 70 | (C1, C2, C3) 그룹핑 |
| 삼성 | 스마트폰 | NULL | 220 | (C1, C2) 소계 |
| 삼성 | 노트북 | NULL | 50 | (C1, C2) 소계 |
| Apple | 스마트폰 | NULL | 80 | (C1, C2) 소계 |
| Apple | 태블릿 | NULL | 70 | (C1, C2) 소계 |
| 삼성 | NULL | 2024 | 150 | (C1, C3) 소계 |
| 삼성 | NULL | 2025 | 120 | (C1, C3) 소계 |
| Apple | NULL | 2024 | 80 | (C1, C3) 소계 |
| Apple | NULL | 2025 | 70 | (C1, C3) 소계 |
| NULL | 스마트폰 | 2024 | 180 | (C2, C3) 소계 |
| NULL | 스마트폰 | 2025 | 120 | (C2, C3) 소계 |
| NULL | 노트북 | 2024 | 50 | (C2, C3) 소계 |
| NULL | 태블릿 | 2025 | 70 | (C2, C3) 소계 |
| 삼성 | NULL | NULL | 270 | (C1) 소계 |
| Apple | NULL | NULL | 150 | (C1) 소계 |
| NULL | 스마트폰 | NULL | 300 | (C2) 소계 |
| NULL | 노트북 | NULL | 50 | (C2) 소계 |
| NULL | 태블릿 | NULL | 70 | (C2) 소계 |
| NULL | NULL | 2024 | 230 | (C3) 소계 |
| NULL | NULL | 2025 | 190 | (C3) 소계 |
| NULL | NULL | NULL | 420 | () 전체 총계 |