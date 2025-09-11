# SQL 실행 순서

- 고객별 총 구매 금액을 구하는데, 총 구매 금액이 40만원 이상인 고객만 보려고 한다.
```sql
SELECT
    customer_name,
    SUM(price * quantity) AS total_purchase
FROM
    order_stat
WHERE   
    total_purchase >= 400000 -- 여기! SELECT에서 만든 별칭을 사용했다.
GROUP BY
    customer_name;
-- 실행 결과
-- Error Code: 1054. Unknown column 'total_purchase' in 'where clause'
```

- 이 쿼리는 실행하면 오류가 발생한다.
  - `WHERE` 절에서 `total_purchase` 라는 컬럼을 찾을 수 없다는 내용의 오류다.
  - 왜일까?
    - `SELECT` 절에서 `AS` 를 이용해 `total_purchase` 라는 별칭까지 만들어줬는데, 바로 아래 `WHERE` 절에서 는 왜 알아듣지 못하는 걸까?
- 이 모든 의문은 우리가 코드를 작성하는 순서와 SQL이 실제로 쿼리를 처리하는 순서(논리적 실행 순서)가 다르기 때문에 발생한다

## SQL 쿼리의 논리적 실행 순서

- 우리가 코드를 작성하는 순서는 보통 `SELECT` `FROM` `WHERE` ... 이지만, 데이터베이스는 다음의 논리적 순서에
따라 쿼리를 해석하고 실행한다.
1. `FROM`: 가장 먼저 실행된다. 어떤 테이블에서 데이터를 가져올지 결정한다. SQL 여정의 출발점이다.
2. `WHERE`: `FROM` 에서 가져온 테이블의 '개별 행'을 필터링한다. `GROUP BY` 로 묶이기 전, 날 것 그대로의 데이터를 1차로 걸러내는 단계
3. `GROUP BY`: `WHERE` 절의 필터링을 통과한 행들을 기준으로 그룹을 형성한다.
4. `HAVING`: `GROUP BY` 를 통해 만들어진 '그룹'들을 필터링한다. `WHERE` 가 개인전이라면 `HAVING` 은 단체전이다. 집계 함수를 이용한 조건 필터링이 여기서 이루어진다.
5. `SELECT`: 드디어 `SELECT` 절이 실행된다. `HAVING` 절까지 통과한 최종 그룹들에 대해 우리가 보고자 하는 컬
럼을 선택하고,`SUM` ,`COUNT` 같은 집계 함수 계산, 별칭(`AS`) 부여 등이 모두 이 단계에서 이루어진다.
6. `ORDER BY`: `SELECT` 절에서 선택된 최종 결과 후보들을 지정된 순서로 정렬한다. `SELECT` 가 `ORDER BY` 보다 먼저 실행되기 때문에, `ORDER BY` 절에서는 `SELECT` 절에서 만든 별칭을 사용할 수 있다. (`ORDER BY total_purchase DESC` 와 같은 구문이 가능한 이유다.)
7. `LIMIT`: 정렬된 결과 중에서 최종적으로 사용자에게 반환할 행의 개수를 제한한다.

- 이 순서는 반드시 기억하자.
  - `1.FROM` → `2.WHERE` → `3.GROUP BY` → `4.HAVING` → `5.SELECT` → `6.ORDER BY` → `7.LIMIT`
- 이제 `WHERE` 절에서 `SELECT` 의 별칭을 쓸 수 없는 이유가 명확해진다. `WHERE` 절을 사용하는 시점에는 아직 `SELECT` 절이 실행되기 한참 전이라, `total_purchase` 같은 별칭은 세상에 존재하지도 않기 때문이다


## SQL의 논리적인 실행 순서와 물리적인 실행 순서

- SQL의 논리적 실행 순서에 맞추어 쿼리를 작성해야 의도한 결과를 정확히 얻을 수 있다
- 데이터베이스 엔진은 성능 최적화를 위해 내부적으로 이 순서를 재배열해 물리적 실행 순서를 결정한다
- 그러나 물리적 순서가 바뀌더라도 엔진은 동일한 결과를 보장하므로, 사용자는 논리적 실행 순서에 맞추어
쿼리를 작성하면 된다