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