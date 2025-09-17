# Case

- CASE문은 데이터 자체를 동적으로 가공하고 새로운 의미를 부여하는 데이터에 옷을 입히는 기술이다
- IF-THEN-ELSE처럼 동작하며 특정 조건에 따라 다른 값을 출력하게 만드는 SQL의 강력한 조건부 로직 도구이다
- 문제 상황: `상품 목록을 조회하는데 그냥 가격만 보여주지 말고, 가격대에 따라 '고가', '중가', '저가'같은 알아보기 쉬운 등급을 옆에 함께 표시하고 싶다.`
  - 데이터베이스에서 원본 데이터를 가져온 후 어플리케이션 코드에서 if-else로 처리할수도 있다
  - 하지만 CASE문을 사용하면 간단한 보고서나 데이터 분석을 할 때, 쿼리 하나만으로 원하는 최종 결과물을 바로 얻을 수 있어 매우 편리하다

## Case문의 두가지 종류

### 단순 CASE 문

- 단순 CASE문은 특정 하나의 컬럼이나 표현식의 값에 따라 결과를 다르게하고 싶을 때 사용한다
```sql
CASE 비교대상_컬럼_또는_표현식
    WHEN 값1 THEN 결과1
    WHEN 값2 THEN 결과2
    ...
    ELSE 그_외의_경우_결과
END as 별칭
```
- 비교대상_컬럼_또는_표현식: WHEN절에서 비교할 대상이 되는 컬럼 또는 표현식이다
- WHEN 값 THEN 결과: 비교대상과 값이 같을 경우 결과를 반환한다
- ELSE 결과: 위에 명시된 WHEN 조건들 중 어느 것 하나도 참이 아닐 경우, ELSE 뒤의 결과를 반환한다
  - ELSE를 생략했는데 모든 조건이 거짓이면 NULL이 반환된다
- 실행 순서: 단순 CASE문도 위에서 아래 순서대로 조건을 평가하며, 가장 먼저 일치하는 WHEN절을 만나는 순간 THEN의 결과를 반환하고 즉시 평가를 종료한다

#### WHEN 절의 순서

- CASE문은 위에서부터 아래로 순차적으로 평가하며, 가장 먼저 참이 되는 조건을 만나는 순간 실행을 멈춘다
  - 조건을 잘못 배치하면 예상과 다른 결과가 나올 수 있다

### 검색 CASE문

- 검색 `CASE` 문은 단순 `CASE` 문처럼 하나의 특정 값을 비교하는 대신, 각 `WHEN` 절에 독립적인 조건식을 사용하여 복잡한 논리를 구현할 때 사용한다
- WHEN절의 순서가 매우 중요하며, 잘못 배치하면 의도와 다른 결과가 나올 수 있다
  - 범위가 좁고 구체적인 조건을 더 넓고 포괄적인 조건보다 먼저 배치해야한다
- CASE문은 SELECT 절 뿐만 아니라 ORDER BY, GROUP BY, WHERE 절에도 사용 가능하며 데이터의 표현, 정렬, 그룹화 등 다양한 로직에 활용될 수 있다

## CASE문 그룹핑

- 데이터를 원하는 기준으로 분류하고, 분류된 그룹별로 통계를 내는 실용적인 기술
- 문제 상황: `고객들을 출생 연대에 따라 '1990년생', '1980년생', '그 이전 출생'으로 분류하고 각 그룹에 고객이 총 몇명씩 있는지 알고싶다`
  - 이 문제를 해결하기 위해서는 CASE문을 이용해 각 고객에게 라벨을 붙여서 그룹핑한다
  - 그 이후 라벨을 기준으로 GROUP BY 하고, Count()함수를 이용해 각 라벨에 속한 고객 수를 센다
```sql
select 
	-- group by 절에서 사용했던 것은 select절에서 사용할 수 있기에 해당 컬럼을 사용 가능하다
	case 
		when year(birth_date) >= 1990 then '1990년대생'
		when year(birth_date) >= 1980 then '1980년대생'
		else '그 이전 출생'
	end as birth_decade,
	count(*) as customer_count
from users
group by
-- 원칙적으론 불가능하지만 
-- (mysql은)select 절의 컬럼인 birth_decade를 이용해서도 가능하다
	case 
		when year(birth_date) >= 1990 then '1990년대생'
		when year(birth_date) >= 1980 then '1980년대생'
		else '그 이전 출생'
	end;
```

## 조건부 집계

- CASE문이 집계함수 안으로 들어가는 활용법
  - 이 기법을 조건부 집계라고 한다
- 문제상황: `하나의 쿼리로, 전체 주문 건수와 함께 결제완료, 배송, 주문대기 상태의 주문이 각각 몇 건인지 별도의 컬럼으로 나누어 보고 싶다`
  - 피벗 테이블로 만들고 싶다는 의미이다
    - 피벗 테이블: 데이터를 회전(pivot)시켜 분석할 수 있는 기능
```sql
-- UNION 사용

select 'Total' as category, count(*) as total_orders from orders
union all
select status as category, count(*)
from orders
group by status;

-- pivot 테이블로 변경

-- 이 방법은 심각한 성능 문제가 있다
-- 테이블을 총 4번이나 읽어온다
select 
	(select count(*) from orders) as total_orders,
	(select count(*) from orders where status ='COMPLETED') as completed_count,
	(select count(*) from orders where status ='SHIPPED') as shipped_count,
	(select count(*) from orders where status ='PENDING') as pending_count

-- 문제를 해결하기 위해 CASE문을 집계함수에 넣는 조건부 집계 기법이 필요하다
```

### CASE문을 이용한 조건부 집게
- 두 가지 방법으로 모두 가능하고, 차이가 없다
  - 하지만 SUM 방식이 더 직관적이기에, 이를 이용한 예제로 작성
1. COUNT(CASE ...)
2. SUM(CASE ...)
```sql
select 
	count(*) as total_orders,
	sum(case when status = 'COMPLETED' then 1 else 0 end) as completed_count,
	sum(case when status = 'SHIPPED' then 1 else 0 end) as shipped_count,
	sum(case when status = 'PENDING' then 1 else 0 end) as pending_count
from orders;
```
- 이 방식은 orders를 가져온뒤 레코드를 CASE문에 넣어 돌리기에 여러번 검색되지 않아 더 효율적이다

### 조건부 집계 예제2

```sql
-- `products` 테이블의 상품들을 재고 수량( `stock_quantity` )에 따라 그룹화하여 각 그룹에 속한 상품의 수를 세어보아라.
-- 재고가 50개 이상이면 '재고 충분'
-- 20개 이상 50개 미만이면 '재고 보통'
-- 20개 미만이면 '재고 부족'
-- `stock_level` 과 `product_count` 라는 컬럼명으로 결과를 출력해야 한다.

select 
	case
		when stock_quantity >= 50 then '재고 충분'
		when stock_quantity >= 20 then '재고 보통'
		else '재고 부족'		
	end as stock_level,
	count(*) as product_count
from products
group by 	
	case
		when stock_quantity >= 50 then '재고 충분'
		when stock_quantity >= 20 then '재고 보통'
		else '재고 부족'		
	end
-- mysql 특징상(현대 DB 사용 가능)
-- product_count로도 groupby가 가능하다
```