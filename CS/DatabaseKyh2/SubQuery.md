# SubQuery

- 데이터에 질문을 던지다보면 JOIN만으로는 한 번에 대답하기 어려운, 여러 단계의 사고를 거쳐야 하는 문제들을 만나게 된다
- 예를 들어, '우리 쇼핑몰에서 판매하는 상품들의 평균 가격보다 비싼 상품은 무엇이 있을까?'
  - SQL을 통해 이 질문에 답하기 위해서는 두 단계로 나눌 수 밖에없다

## 스칼라Scalar 서브쿼리

> Scalar는 수학과 물리학에서 온 단어로 '단 하나의 값'을 의미한다

- 단일 컬럼, 단일 행 결과 값을 반환하는 서브쿼리이다
  - 결과가 '하나의 값'이기 때문에 단일 행 비교 연산자(=, >, <, >=, <=, <>)를 함께 사용할 수 있다

```sql
-- order_id가 1인 사람과 같은 곳에 사는 사람을 찾아주세요
select
	u.address
from orders o
join users u on o.user_id = u.user_id
where o.order_id = 1;

select name, address
from users
where address = '서울시 강남구';

-- 하나의 쿼리로 2단계 쿼리와 같은 동작을 한다
select name, address
from users
where address = (select
					u.address
				from orders o
				join users u on o.user_id = u.user_id
				where o.order_id = 1);
```

- 실행 흐름
  1. 괄호 안의 서브쿼리가 먼저 실행되어 단일 값 '서울시 강남구'를 반환한다
  2. 메인 쿼리는 `where address = '서울시 강남구'`와 동일한 형태로 바뀐다
  3. 최종적으로 메인쿼리가 실행되어 우리에게 원하는 결과를 보여준다. 결과는 당연히 2단계로 나누어 실행했을 때와 동일하다
- 이처럼 서브쿼리를 사용하면 여러 번의 쿼리를 하나로 합쳐 코드를 간결하게 만들고, 애플리케이션과 데이터베이스 간의 통신 횟수를 줄여 이점을 얻을 수 있다

## 다중 행 서브쿼리

- '전자기기' 카테고리에 속한 모든 상품들을 주문한 주문 내역을 전부 보고 싶다
  - 해당 쿼리는 scalar subquery로 해결할 수 없다
  - 다중 행 서브쿼리를 사용해 해결할 수 있다
    - in, any, all 연산자, min,max 서브쿼리 + 단일 행 비교연산자 사용

```sql
-- 전자기기 카테고리에 속한 모든 상품들을 주문한 주문 내역을 전부 보고 싶다
select product_id from products where category = '전자기기'
order by product_id;

select * from orders
where product_id in (1,2,3,6);

select * from orders
where product_id in (select product_id
					 from products
					 where category = '전자기기');
```

## 다중 컬럼 서브쿼리

- 우리 쇼핑몰의 고객 '네이트(user_id=2)'가 한 주문(order_id=3)이 있다. 이 주문과 동일한 고객이면서 주문 처리 상태(status)도 같은 모든 주문을 찾기
  - 두개의 조건을 만족시킬려면 다중 컬럼 서브쿼리를 사용해야 한다

```sql

-- 우리 쇼핑몰의 고객 '네이트(user_id=2)'가 한 주문(order_id=3)이 있다. 이 주문과 동일한 고객이면서 주문 처리 상태(status)도 같은 모든 주문을 찾기
select user_id, status from orders where order_id = 3;

select * from orders where (user_id, status) = (2, 'SHIPPED');

select * from orders where (user_id, status) = (select user_id, status
												from orders
												where order_id = 3);
```

- `=`을 사용하기 위해서는 단일 행 서브쿼리와 마찬가지로 서브쿼리의 결과가 반드시 하나의 행이여야 한다
- 결과가 여러행일 경우 `in`을 사용해야 한다

## WHERE문 상관 Correlated 서브쿼리

- `각 상품별로 자신이 속한 카테고리의 평균 가격 이상의 상품들을 조회`
  - 해당 쿼리에 답을 위해서는 상관 서브쿼리가 필요하다
    - 자신이 속한 바로 그 카테고리의 평균 가격과 비교해야한다
- 상관 서브쿼리는 이름 그대로 메인쿼리와 서브쿼리가 서로 '연관'관계를 맺고 동작하는 서브쿼리이다
  - 서브쿼리가 독립적으로 실행될 수 없고, 메인쿼리의 값을 참조하여 실행되는 것이 특징이다
- 상관 서브쿼리의 동작 방식은 기존 서브쿼리와 완전히 다르다
  - 비상관 서브쿼리(Non-correlated): 서브쿼리가 단 한 번 실행된 후, 그 결과를 메인쿼리가 사용한다
  - 상관 서브쿼리(Correlated):
    1. 메인 쿼리가 먼저 한 행을 읽는다
    2. 읽혀진 행의 값을 서브쿼리에 전달하여, 서브쿼리가 실행된다
    3. 서브쿼리 결과를 이용해 메인쿼리의 where 조건을 판단한다
    4. 메인쿼리의 다음 행을 읽고, 2~3 과정을 반복한다

```sql
-- 각 상품별로 자신이 속한 카테고리의 평균 가격 이상의 상품들을 조회

-- 해당 쿼리가 카테고리마다 다르게 필요하다
select avg(price) from products where category = '전자기기';

select *
from products p1
where
	price >= (select avg(p2.price)
			  from products p2
			  where p2.category = p1.category);

-- 메인쿼리 실행에 따라 서브쿼리가 동적으로 바뀌고, 메인쿼리의 진행동안 반복 된다
select *
from products p1
where
	price >= (select avg(p2.price)
			  from products p2
        -- 해당 방식의 쿼리 처럼 여러번 동작한다
			  where p2.category = '전자기기');
```

- 메인 쿼리의 행수만큼 서브쿼리가 실행된다
  - 메인 쿼리의 행수가 많다면 굉장히 느릴 수 있으니 조심스럽게 사용해야한다

### 상관 쿼리 사용시 성능 이슈를 대비한 EXISTS 사용 고려

- in을 사용하면 대부분의 경우 결과를 직관적으로 얻을 수 있다
- 하지만 실무에서 이 방식이 항상 최선은 아니다
- 이 방식은 orders 테이블이 매우 클 경우, 즉 주문량이 수백만 수천만 건에 달하면 성능 문제를 일으킬 수 있다
- orders를 조회하는 서브쿼리가 반환하는 지금까지 주문한 product_id 목록 전체를 메모리에 올린 뒤 메인 쿼리의 각 행과 비교해야 하기 때문이다
- 이럴 때 EXISTS를 사용하면 효율적으로 쿼리를 실행할 수 있다
- EXISTS는 서브쿼리가 반환하는 결과값 자체에는 관심이없고, 오직 서브쿼리의 결과로 행이 하나라도 존재하는지 여부만 체크한다
- EXISTS 연산은
  - 서브쿼리 결과 행이 1개 이상이면 TRUE
  - 서브쿼리 결과 행이 0개면 FALSE
  - EXISTS는 서브쿼리가 결과를 반환하는지 여부(Existence)만 확인한다

```sql
select product_id, name, price
from products p
-- orders가 백만개여도 상관이 없다, 첫 record를 확인하는 순간 true로 반환하게되어 자원을 아낄 수 있다
where exists (
	select 1
	from orders o
	where o.product_id = p.product_id
);
```

- 쿼리 실행 흐름
  1. 메인 쿼리가 products 테이블의 첫 번째 행인 '프리미엄 게이밍 마우스(p.product_id = 1)'을 읽는다
  2. 이 p.product_id 값을 가지고 서브쿼리가 실행된다 `select 1 from orders o where o.product_id = 1`
  3. orders 테이블에는 product_id가 1인 주문이 3개 존재한다. 데이터 베이스는 조건을 만족하는 첫 번째 레코드를 찾자마자 더 이상 테이블을 탐색하지 않고 서브쿼리가 결과를 반환할 수 있다고 판단한다
  4. EXISTS 는 TRUE가 된다
  5. WHERE TRUE 조건이 충족되었으므로 '프리미엄 게이밍 마우스'는 최종 결과에 포함된다
  6. p.product_id = 2,3,4... 같은 내용이 반복된다
  - EXISTS 가 FALSE가 된다면 최종 결과에서 제외된다

### 상관 서브쿼리의 성능

- 상관 서브쿼리는 복잡한 로직을 직관적으로 표현할 수 있게 해주지만, 성능에 주의해야 한다
- 메인쿼리의 행 수만큼 서브쿼리가 반복실행될 수 있기 때문에 메인쿼리가 다루는 데이터 양이 많아지면 쿼리 전체의 성능이 급격히 저하될 수 있다
- 많은 경우 상관 서브쿼리는 JOIN(특히 LEFT JOIN, Group by)으로 동일한 결과를 얻도록 재 작성될 수 있다
  - 데이터 옵티마이저가 join을 더 효율적으로 처리하는 경우가 많다
  - 그럼에도 불구하고 exists는 데이터가 있는지 '확인만하고 넘어가는' 특성 때문에 in이나 join보다 훨씬 효율적으로 동작하는 상황도 많다
  - 요즘 옵티마이저가 성능이 많이 좋아져서 상관 서브쿼리로 작성해놔도 알아서 JOIN이나 효율적인 동작으로 바꾸는 일도 많다
- 결론적으로 상관 서브쿼리는 성능 이슈를 인지하고, JOIN으로 표현하기 너무 복잡하거나 EXISTS를 통해 더 효율적인 실행이 가능할때 적절히 사용하는 것이 중요하다

## SELECT 서브쿼리

- SELECT절 안으로 서브쿼리를 가져와 하나의 컬럼처럼 사용할 수 있다
  - SELECT절 안에서는 단일 값(하나의 행, 하나의 컬럼)을 반환하는 스칼라 서브쿼리를 사용해야 한다

### 비상관 SELECT 서브쿼리

- `select name, price, (select avg(price) from products) as avg_price from products`
- 쿼리 실행 흐름
  1. 데이터베이스는 메인 쿼리를 실행하기 전에, SELECT 절의 스칼라 서브쿼리를 단 한 번 먼저 실행한다
  2. 데이터베이스는 이 계산된 값을 기억해둔다
  3. 메인쿼리가 실행된다
  4. products 테이블의 각 행을 가져올때마다 `avg_price` 컬럼에 그대로 추가한다
- 이렇게 서브쿼리가 외부 쿼리의 컬럼을 참조하지 않아 독립적으로 실행될 수 있는 경우를 비상관 서브쿼리라고 한다
  - 서브쿼리가 먼저 한 번 ㄴ실행되고, 그 결과가 메인 쿼리의 모든 행에 재사용되는 방식이다

### 상관 SELECT 서브쿼리

- 비상관 서브쿼리는 유용하지만 SELECT 절의 스칼라 서브쿼리의 진정한 강력함은 메인쿼리와 각 행이 상호작용할 때 드러난다
- 서브쿼리의 중요한 특성은 바깥쪽 메인쿼리의 각 행마다 개별적으로 반복적으로 실행될 수 있다는 점이다
  - 서브쿼리가 메인쿼리의 컬럼 값을 참조하는 관계를 가질때 이를 상관 서브쿼리라고 부른다

```sql
SELECT
  p.product_id,
  p.name,
  p.price,
  (SELECT COUNT(*) FROM orders o WHERE o.product_id = p.product_id) AS
order_count
FROM
  products p;
```

- 쿼리 실행 흐름
  1. 메인 쿼리가 products 테이블의 첫 번째 레코드를 읽는다
  2. order_count를 계산하기 위해 스칼라 서브쿼리가 실행되고, 첫 번째 레코드의 id가 전달된다
  3. 이 서브쿼리는 레코드 id를 이용해 orders테이블에서 주문을 세어 3이라는 단일 값을 반환한다
  4. 레코드에 반환 값이 기록된다
  5. 이 과정을 products 테이블의 모든 레코드에대해 반복한다

#### 성능 이슈

- 스칼라 서브쿼리는 JOIN으로 표현하기 복잡한 로직을 직관적으로 표현해주지만 주의가 필요하다
- 모든 연산을 한번씩 하는 만큼 성능의 문제가 있다
  - 만약 products테이블에 100만개의 상품이 있다면 주문 횟수를 위해 count(\*)쿼리가 100만 번이나 실행되는 셈이고, 이는 DB에 엄청난 부하를 줄 수 있다
- 위의 문제 상황의 경우 left join과 group by를 통해서 해결할 수 있으며 대부분의 db optimizer가 join을 더 효율적으로 처리하여 성능이 더 좋다

```sql
-- JOIN으로 해결하는 방법
SELECT p.product_id, p.name, p.price, COUNT(o.order_id) AS order_count
FROM products p
LEFT JOIN orders o ON p.product_id = o.product_id
GROUP BY p.product_id, p.name, p.price;
-- 해당 방법은 쿼리가 한번 나가며, select절 상관 서브쿼리의 경우 레코드의 갯수만큼 쿼리가 나간다
```

## 테이블(FROM절) 서브쿼리

- 마치 하나의 독립된 가상 테이블처럼 사용되기 때문에 테이블 서브쿼리라고 부른다
  - 쿼리 내에서 인라인으로 즉석에서 정의되는 뷰와 같다고해서 인라인 뷰라고도 부른다

```sql
-- 각 상품 카테고리별로 가장 비싼 상품을 조회
select category, max(price) as max_price from products group by category;
-- name도 넣고싶다면?

select p.product_id, p.name, p.category, cmp.max_price
from products p
-- cmp라는 임시테이블을 메모리에 생성해서 inner join 한다
join (
	select category, max(price) as max_price
	from products
	group by category) as cmp
on p.category = cmp.category and p.price = cmp.max_price;
```

## 서브쿼리 vs JOIN

- 어떤 문제는 서브쿼리/JOIN 두 가지 방법 모두로 풀 수 있다
  - 이럴 경우 어떤 것을 선택해야 할까? 성능과 가독성 측면에서 둘은 어떤 차이가 있을까?

```sql
-- 서울에 거주하는 모든 고객들의 주문 목록 조회
-- 서브쿼리 이용
select *
from orders o
where o.user_id in (select user_id from users where address like "서울%");

-- join 이용
select *
from orders o
join users u on u.user_id = o.user_id
where u.address like "서울%";
```

### 성능 vs 가독성

- JOIN구문은 옵티마이저에게 더 많은 정보를 제공한다
- 서브쿼리는 비효율을 야기한다
- 하지만 요즘 옵티마이저는 매우 똑똑해져서 간단한 쿼리는 더 효율적인 JOIN문으로 바꿔서 처리해준다
  - 이런 최적화는 항상 가능한 것이 아니기에 쿼리 실행 계획을 확인하는 것이 좋다
- 일반적으로 성능은 JOIN이 더 좋지만, 가독성은 서브쿼리가 더 좋다

#### 그래서 뭘 써야할까?

1. JOIN을 우선적으로 고려하기

   - 일반적으로 성능 우위와 범용성을 고려할때 JOIN을 사용하는 것이 좋은 출발이다

2. JOIN으로 표현하기 너무 복잡하거나, 서브쿼리의 가독성이 훨씬 좋다면 서브쿼리를 사용

   - 성능이 아주 중요한 쿼리가 아니라면 동료가 이해하기 쉬운 코드를 작성하는 것이 장기적으로 더 가치있을 수 있다. 특히 인라인 뷰를 사용해야만 깔끔하게 풀리는 문제는 서브쿼리가 정답이다

3. EXISTS를 활용하라

   - IN 서브쿼리의 대안으로, EXISTS라는 서브쿼리 연산자도 있다. EXISTS는 서브쿼리의 결과값이 존재하는지 여부만 체크하기 때문에, 특정 상황에서 더 효율적으로 동작하기도 한다

4. 성능이 의심될 때는 반드시 측정하라
   - 가장 중요한 원칙이다. 추측하지 말고, EXPLAIN과 같은 도구를 사용해 데이터 베이스가 어떻게 쿼리를 실행하는지 계획을 분석하고, 실제 실행 시간을 측정하여 더 나은 방법을 선택해야한다

- JOIN과 서브쿼리는 대립하는 기술이 아니라, 데이터라는 재료를 요리하는 두 가지 필수도구다. 각각의 장단점을 이해하고 상황에 맞게 꺼내 사용할 수 있어야 한다.