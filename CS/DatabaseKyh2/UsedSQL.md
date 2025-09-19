# 수업중 사용한 SQL

```sql
-- 김영한 실전 데이터베이스 기본편

-- 데이터베이스가 존재하지 않으면 생성
create database if not exists my_shop2;
use my_shop2;

-- 테이블이 존재하면 삭제 (실습을 위해 초기화)
drop table if exists orders;
drop table if exists users;
drop table if exists products;
drop table if exists employees;
drop table if exists sizes;
drop table if exists colors;

-- 고객 테이블 생성
create table users (
	user_id bigint auto_increment,
	name varchar(255) not null,
	email varchar(255) not null unique,
	address varchar(255),
	birth_date date,
	created_at datetime default current_timestamp,
	primary key (user_id)
);

-- 상품 테이블 생성
create table products (
	product_id bigint auto_increment,
	name varchar(255) not null,
	category varchar(100),
	price int not null,
	stock_quantity int not null,
	primary key(product_id)
);

-- 주문 테이블 생성
create table orders (
	order_id bigint auto_increment,
	user_id bigint not null,
	product_id bigint not null,
	order_date datetime default current_timestamp,
	quantity int not null,
	status varchar(50) default 'PENDING',
	primary key (order_id),
	
	constraint fk_orders_users foreign key (user_id) references users(user_id),
	constraint fk_orders_products foreign key (product_id) references products(product_id)
);

-- 직원 테이블 생성 (self join 실습용)
create table employees (
	employee_id bigint auto_increment,
	name varchar(255) not null,
	manager_id bigint,
	primary key (employee_id),
	foreign key (manager_id) references employees(employee_id)
);

-- 사이즈 테이블(cross join 실습용)
create table sizes (
	size varchar(10) primary key
);

-- 색상 테이블(cross join 실습용)
create table colors(
	color varchar(20) primary key
);

-- 고객 데이터 입력
INSERT INTO users(name, email, address, birth_date) VALUES
('션', 'sean@example.com', '서울시 강남구', '1990-01-15'),
('네이트', 'nate@example.com', '경기도 성남시', '1988-05-22'),
('세종대왕', 'sejong@example.com', '서울시 종로구', '1397-05-15'),
('이순신', 'sunsin@example.com', '전라남도 여수시', '1545-04-28'),
('마리 퀴리', 'marie@example.com', '서울시 강남구', '1867-11-07'),
('레오나르도 다빈치', 'vinci@example.com', '이탈리아 피렌체', '1452-04-15');
-- 상품 데이터 입력
INSERT INTO products(name, category, price, stock_quantity) VALUES
('프리미엄 게이밍 마우스', '전자기기', 75000, 50),
('기계식 키보드', '전자기기', 120000, 30),
('4K UHD 모니터', '전자기기', 350000, 20),
('관계형 데이터베이스 입문', '도서', 28000, 100),
('고급 가죽 지갑', '패션', 150000, 15),
('스마트 워치', '전자기기', 280000, 40);
-- 주문 데이터 입력
INSERT INTO orders(user_id, product_id, quantity, status, order_date) VALUES
(1, 1, 1, 'COMPLETED', '2025-06-10 10:00:00'),
(1, 4, 2, 'COMPLETED', '2025-06-10 10:05:00'),
(2, 2, 1, 'SHIPPED', '2025-06-11 14:20:00'),
(3, 4, 1, 'COMPLETED', '2025-06-12 09:00:00'),
(4, 3, 1, 'PENDING', '2025-06-15 11:30:00'),
(5, 1, 1, 'COMPLETED', '2025-06-16 18:00:00'),
(2, 1, 2, 'SHIPPED', '2025-06-17 12:00:00');
-- 직원 데이터 입력
INSERT INTO employees(employee_id, name, manager_id) VALUES
(1, '김회장', NULL),
(2, '박사장', 1),
(3, '이부장', 2),
(4, '최과장', 3),
(5, '정대리', 4),
(6, '홍사원', 4);
-- 사이즈 데이터 입력
INSERT INTO sizes(size) VALUES
('S'), ('M'), ('L'), ('XL');
-- 색상 데이터 입력
INSERT INTO colors(color) VALUES
('Red'), ('Blue'), ('Black');

select * from users;
select * from products;
select * from orders;

select from orders;

-- Inner join
-- 중복된 컬럼은 어느 테이블의 것을 사용하는지 명시해야함
-- 하지만 햇갈릴 수 있기 떄문에 테이블명(별칭)을 반드시 적는 것이 좋다
select orders.order_id, users.name, orders.order_date from orders inner join users on orders.user_id = users.user_id;

-- 방향 확인
select 
 	orders.order_id,
 	orders.order_date,
 	orders.user_id as orders_user_id,
 	users.user_id as users_user_id,
 	users.name
 from orders
 inner join users on orders.user_id = users.user_id
 order by orders.order_id;

select * from users;
select 
 	orders.order_id,
 	orders.order_date,
 	orders.user_id as orders_user_id,
 	users.user_id as users_user_id,
 	users.name
 from users
 inner join orders on users.user_id = orders.user_id
 order by orders.order_id;

-- inner join 문제와 풀이

select * from products;
select * from orders;
select 
	o.order_id,
	p.name,
	o.quantity
from orders o
inner join products p
on o.product_id  = p.product_id 
order by o.order_id;

select * from products;
select * from orders;
select * from users;

select 
	o.order_id,
	u.name as user_name,
	p.name as product_name,
	o.order_date
from orders o
inner join users u on u.user_id = o.user_id
inner join products p on p.product_id = o.product_id
where o.status = 'SHIPPED';

select
	u.name as user_name,
	sum(p.price*o.quantity) as total_purchase_amount
from users u
inner join orders o on u.user_id = o.user_id
inner join products p on p.product_id = o.product_id
group by u.name
order by total_purchase_amount desc; 
-- order by `total_purchase_amout` desc; 

-- left join으로 한 번도 주문하지 않은 고객 찾기

select 
-- 	distinct(u.name) as distinct_name,
	u.user_id,
	u.name,
	o.user_id,
	o.order_id
from users u
left join orders o on u.user_id = o.user_id;

-- left join으로 단 한번도 팔리지 않은 상품 찾기

select 
	*
from products p
left join orders o on o.product_id = p.product_id
where o.order_id is null;

-- right join 으로 단 한번도 팔리지 않은 상품 찾기

select
	*
from orders o  
right join products p on o.product_id = p.product_id
where o.order_id  is null;

-- 자식/부모 , 부모/자식 조인


-- 자식 -> 부모 조인
SELECT
	o.order_id,
	o.product_id,
	o.user_id AS orders_user_id,
	u.user_id AS users_user_id,
	u.name,
	u.email
FROM
	orders o
JOIN
	users u ON o.user_id = u.user_id
WHERE
	o.user_id = 1;

-- 부모 -> 자식 조인
SELECT
	u.user_id AS users_user_id,
	u.name,
	u.email,
	o.order_id,
	o.product_id,
	o.user_id AS orders_user_id
FROM
	users u
JOIN
	orders o ON u.user_id = o.user_id
WHERE
	u.user_id = 1;

select * from orders;

-- 자식 -> 부모 조인
SELECT
	o.order_id,
	o.product_id,
	o.user_id AS orders_user_id,
	u.user_id AS users_user_id,
	u.name,
	u.email
FROM
	orders o
JOIN
	users u ON o.user_id = u.user_id;

-- 부모 -> 자식 조인
SELECT
	u.user_id AS users_user_id,
	u.name,
	u.email,
	o.order_id,
	o.product_id,
	o.user_id AS orders_user_id
FROM
	users u
JOIN
	orders o ON u.user_id = o.user_id
ORDER BY users_user_id;

-- 자식 -> 부모 조인
SELECT
	o.order_id,
	o.product_id,
	o.user_id AS orders_user_id,
	u.user_id AS users_user_id,
	u.name,
	u.email
FROM
	orders o
JOIN
	users u ON o.user_id = u.user_id;


-- 부모 -> 자식 조인
SELECT
	u.user_id AS users_user_id,
	u.name,
	u.email,
	o.order_id,
	o.product_id,
	o.user_id AS orders_user_id
FROM
	users u
JOIN
	orders o ON u.user_id = o.user_id
ORDER BY users_user_id;


-- self join

select * from employees;

select 
	e1.employee_id,
	e1.name,
	e1.manager_id,
	e2.name as `매니저 이름`
from
	employees e1
left join employees e2 on e1.manager_id = e2.employee_id;
-- join employees e2 on e1.manager_id = e2.employee_id;


-- cross join
-- 짝이나 관계가 없는 두 집단을 가지고 가능한 모든 조합을 만들어 내야할 경우 사용 한다

select 
	concat('기본티셔츠-', c.color, '-', s.size) as product_name,
	s.size,
	c.color
from 
	colors c
cross join sizes s;


create table product_options (
	option_id bigint auto_increment,
	product_name varchar(255) not null,
	size varchar(10) not null,
	color varchar(10) not null,
	primary key (option_id)
);


insert into product_options (product_name , size , color)
select 
	concat('기본티셔츠-', c.color, '-', s.size) as product_name,
	s.size,
	c.color
from 
	colors c
cross join sizes s;

select * from product_options;

-- 오늘 우리가 해결해야 할 최종 미션은 다음과 같다.
-- "2025년 6월에 '서울'에 거주하는 고객이 주문한 모든 내역에 대해,`고객 이름` , `고객 이메일` , `주문 날짜` , `주문한 상품명` ,
-- `상품 가격` , `주문 수량` 을 포함하는 상세 보고서를 최신 주문 순으로 작성하라."


-- join 문제와 풀이

select * from products;
select * from orders;

select 
	p.name,
	p.price
from 
	products p
left join orders o on p.product_id = o.product_id
where p.category = '전자기기'
and o.product_id is null;


select * from users;

select 
	*
from users u
left join orders o on u.user_id=o.user_id;

select 
	u.name,
	count(o.user_id) as order_count
-- 	count(u.name) as order_count
from users u
left join orders o on u.user_id=o.user_id
group by u.user_id, u.name
order by u.name;


select 
	u.name,
	u.email
from 
	orders o
right join users u on u.user_id = o.user_id
where o.order_id is null;

select * from products;
select * from orders;
select 
	u.name as user_name,
	p.name as product_name
from
	users u
left join orders o on u.user_id = o.user_id
left join products p on o.product_id = p.product_id
order by u.name, p.name;


select 
	e.employee_id,
	e.name,
	e.manager_id,
	m.name as manager_name
from 
	employees e
join employees m on e.manager_id = m.employee_id
where m.name = '최과장';

create table material (
	options varchar(20) primary key
);

select * from material;
insert into material (options) values ('Cotton');
insert into material (options) values ('Silk');
select * from material;


select 
	concat('기본티셔츠 - ', s.size, '-', c.color, '-', m.options ) as product_full_name,
	s.size,
	c.color,
	m.options
from 
	sizes s
cross join colors c
cross join material m;


select
	u.name as customer_name,
	p.name as product_name,
	o.order_date,
	o.quantity
from 
	users u
left join
	orders o on u.user_id = o.user_id
left join
	products p on o.product_id = p.product_id
where u.name = '네이트'
order by o.order_date desc;



select 
	u.name as customer_name,
	sum(p.price * o.quantity) as total_spent 
from 
	orders o
join
	users u on o.user_id = u.user_id
join
	products p on o.product_id = p.product_id
where
	u.address like '서울%'
group by
	u.user_id
order by
	total_spent desc;

-- Section 4. SubQuery


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


-- 전자기기 카테고리에 속한 모든 상품들을 주문한 주문 내역을 전부 보고 싶다

select product_id from products where category = '전자기기'
order by product_id;

select * from orders
where product_id in (1,2,3,6);

select * from orders
where product_id in (select product_id 
					 from products 
					 where category = '전자기기');

-- 전자기기 카테고리의 가장 저렴한 상품보다 비싼 상품 찾기

-- ANY, ALL은 MIN,MAX 집계함수가 더 직관적이다

select price from products where category = '전자기기';

select name, price from products where price > ANY(select price from products where category = '전자기기');
select name, price from products where price > (select min(price) from products where category = '전자기기');

-- 전자기기 카테고리에서 가장 비싼 상품보다 더 비싼 상품 찾기(결과 없음)
select name, price from products where price > ALL(select price from products where category = '전자기기');
select name, price from products where price > (select max(price) from products where category = '전자기기');


-- 우리 쇼핑몰의 고객 '네이트(user_id=2)'가 한 주문(order_id=3)이 있다
-- 이 주문과 동일한 고객이면서 주문 처리 상태(status)도 같은 모든 주문을 찾아보자

select user_id, status from orders where order_id = 3;

select * from orders where (user_id, status) = (2, 'SHIPPED');

select * from orders where (user_id, status) = (select user_id, status
												from orders 
												where order_id = 3);


-- 각 고객별로 최초 주문한 주문ID, 사용자ID, 사용자 이름, 제품 이름, 주문 날짜를 조회

select user_id, min(order_date)
from orders
group by user_id;

select o.order_id, u.user_id, u.name, p.name, o.order_date
from orders o
join users u on o.user_id = u.user_id
join products p on o.product_id = p.product_id
where (o.user_id, o.order_date) in (select user_id, min(order_date)
									from orders
									group by user_id);

-- 각 상품별로 자신이 속한 카테고리의 평균 가격 이상의 상품들을 조회

select * from products;

-- 해당 쿼리가 카테고리마다 다르게 필요하다
select avg(price) from products where category = '전자기기';

select *
from products p1
where
	price >= (select avg(p2.price)
			  from products p2
			  where p2.category = p1.category);



-- 한번이라도 주문된 상품의 id, 이름, 가격 조회
select product_id, name, price from products;

select distinct product_id from orders;

select product_id, name, price
from products
where product_id in (select distinct product_id from orders);

-- in을 사용하면 대부분의 경우 결과를 직관적으로 얻을 수 있다
-- 하지만 실무에서 이 방식이 항상 최선은 아니다
-- 이 방식은 orders 테이블이 매우 클 경우, 즉 주문량이 수백만 수천만 건에 달하면 성능 문제를 일으킬 수 있다
-- orders를 조회하는 서브쿼리가 반환하는 지금까지 주문한 product_id 목록 전체를 메모리에 올린 뒤 
-- 메인 쿼리의 각 행과 비교해야 하기 때문이다
-- 이럴 때 EXISTS를 사용하면 효율적으로 쿼리를 실행할 수 있다
-- EXISTS는 서브쿼리가 반환하는 결과값 자체에는 관심이없고, 
-- 오직 서브쿼리의 결과로 행이 하나라도 존재하는지 여부만 체크한다

select * from products;

select product_id, name, price
from products p
-- orders가 백만개여도 상관이 없다, 첫 record를 확인하는 순간 true로 반환하게되어 자원을 아낄 수 있다
where exists (
	select 1
	from orders o
	where o.product_id = p.product_id
);

-- 비상관 서브쿼리

select avg(price) from products;

select name, price, (select avg(price) from products) as avg_price from products;

select p.product_id, p.name, p.price, (
select count(*) from orders o where o.product_id = p.product_id
) as order_count
from products p;

-- 각 상품 카테고리별로 가장 비싼 상품을 조회
select category, max(price) as max_price from products group by category;

-- name도 넣고싶다면?
select * from products where category = '전자기기';

select p.product_id, p.name, p.category, cmp.max_price 
from products p 
-- cmp라는 임시테이블을 메모리에 생성해서 inner join 한다
join (
	select category, max(price) as max_price 
	from products 
	group by category) as cmp
on p.category = cmp.category and p.price = cmp.max_price;

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

-- 문제와 풀이

select product_id, name, price
from products
where price = (
	select max(price)
	from products
);

select * from orders;

select order_id, user_id, order_date
from orders
where product_id = (
	select product_id
	from orders
	where order_id = 1
) and order_id <> 1;

select u.name, (select count(*) from orders o where o.user_id = u.user_id) as 총주문횟수
from users u
order by u.user_id;

-- 섹션5 UNION

-- retired_users 테이블 생성
CREATE TABLE retired_users (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    retired_date DATE NOT NULL
 );

-- 탈퇴 고객 데이터 입력
INSERT INTO retired_users (id, name, email, retired_date) VALUES
 (1, '션', 'sean@example.com', '2024-12-31'),
 (7, '아이작 뉴턴', 'newton@example.com', '2025-01-10');

select * from users;

select name, email, created_at from users 
union
select name, email, retired_date from retired_users;

-- 문제와 풀이
select name as `이름`, email as `이메일`
from users
union
select name, email
from retired_users;

select * from orders;

select distinct u.name as `고객명`, u.email as `이메일`
from orders o
join products p on o.product_id = p.product_id
join users u on u.user_id = o.user_id
where p.category = '전자기기'
union all
select distinct u.name, u.email
from orders o
join users u on o.user_id = u.user_id
where o.quantity >= 2;


select * from users;
select * from orders;

select u.created_at as `이벤트 날짜`, '고객 가입' as `이벤트 종류`, u.name as `상세 내용`
from users u
union all
select order_date, '상품 주문', p.name
from orders o
join products p on p.product_id = o.product_id
order by `이벤트 날짜` desc;

select * from users;
select * from employees;

select name as `이름`, '직원' as `역할`, CONCAT(name, '@my-shop.com') as `이메일`
from employees
union all
select name, '고객', email from users
order by `이름`;

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

-- 조건별 집계
select * from orders;
select status, count(*) from orders group by status;

-- 하나의 쿼리로, 전체 주문 건수와 함께 결제완료, 배송, 주문대기 상태의 주문이 각각 몇 건인지 별도의 컬럼으로 나누어 보고 싶다

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
	(select count(*) from orders where status ='PENDING') as pending_count;

-- 문제를 해결하기 위해 CASE문을 집계함수에 넣는 조건부 집계 기법이 필요하다

-- 1. COUNT(CASE ...)

-- 2. SUM(CASE ...)
select 
	count(*) as total_orders,
	sum(case when status = 'COMPLETED' then 1 else 0 end) as completed_count,
	sum(case when status = 'SHIPPED' then 1 else 0 end) as shipped_count,
	sum(case when status = 'PENDING' then 1 else 0 end) as pending_count
from orders;

-- 상품 카테고리별로, 상태별 주문 건수를 집계하라

select 
	p.category,
	count(*) as total_orders,
	sum(case when status = 'COMPLETED' then 1 else 0 end) as completed_count,
	sum(case when status = 'SHIPPED' then 1 else 0 end) as shipped_count,
	sum(case when status = 'PENDING' then 1 else 0 end) as pending_count
from orders o
join products p on o.product_id = p.product_id
group by p.category;

-- 문제와 풀이

-- 1
select 
	name,
	category,
	(case category
		when '전자기기' then 'Electronics'
		when '도서' then 'Books'
		when '패션' then 'Fashion'
		else 'unknown'
	end) as category_english
from products;

-- 2

select
	order_id,
	quantity,
	case
		when quantity >= 2 then '다량 주문'
		when quantity = 1 then '단일 주문'
		else 'unknown'
	end as order_type
from
	orders
order by
	order_type;

-- 3

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
	;

-- 4

select * from orders;
select * from products;

select 
	u.name,
	count(u.user_id) as total_orders,
	sum(case when p.category = '전자기기' then 1 else 0 end) as electronics_orders,
	sum(case when p.category = '도서' then 1 else 0 end) as book_orders,
	sum(case when p.category = '패션' then 1 else 0 end) as fashion_orders
from 
	users u
left join orders o on u.user_id = o.user_id
left join products p on o.product_id = p.product_id 
group by u.user_id;

-- Section 7 View

create view v_category_order_status as
select 
	p.category,
	count(*) as total_orders,
	sum(case when status = 'COMPLETED' then 1 else 0 end) as completed_count,
	sum(case when status = 'SHIPPED' then 1 else 0 end) as shipped_count,
	sum(case when status = 'PENDING' then 1 else 0 end) as pending_count
from orders o
join products p on o.product_id = p.product_id
group by p.category;

select * from v_category_order_status;

-- 테이블처럼 사용 가능하다
select category, total_orders from v_category_order_status;
select * from v_category_order_status where category = '전자기기';

-- 뷰 수정
ALTER VIEW v_category_order_status AS
	SELECT
	p.category,
	SUM(p.price * o.quantity) AS total_sales, -- 매출액 컬럼 추가!
	COUNT(*) AS total_orders,
	SUM(CASE WHEN o.status = 'COMPLETED' THEN 1 ELSE 0 END) AS
	completed_count,
	SUM(CASE WHEN o.status = 'SHIPPED' THEN 1 ELSE 0 END) AS shipped_count,
	SUM(CASE WHEN o.status = 'PENDING' THEN 1 ELSE 0 END) AS pending_count
FROM
	orders o
JOIN
	products p ON o.product_id = p.product_id
GROUP BY
p.category;

SELECT * FROM v_category_order_status;

-- 문제와 풀이

-- 1

select 
	user_id,
	name as '고객명',
	email as '이메일'
from
	users;

create view v_customer_email_list as
select 
	user_id,
	name as '고객명',
	email as '이메일'
from
	users;

select * from v_customer_email_list;

-- 2

select
	o.order_id,
	u.name as '고객명',
	p.name as '상품명',
	o.quantity as '주문수량',
	o.status as '주문상태'
from orders o 
join products p 
	on o.product_id = p.product_id 
join users u 
	on o.user_id = u.user_id;

create view v_order_summary as
select
	o.order_id,
	u.name as '고객명',
	p.name as '상품명',
	o.quantity as '주문수량',
	o.status as '주문상태'
from orders o 
join products p 
	on o.product_id = p.product_id 
join users u 
	on o.user_id = u.user_id;

select * from v_order_summary;

-- 3

select
	p.category,
	count(o.order_id) as total_orders,
	sum(price*quantity) as total_sales
from
	orders o
join products p
	on o.product_id = p.product_id
where 
	p.category = '전자기기'
group by 
	p.category;


create view v_electronics_sales_status as
select
	p.category,
	count(o.order_id) as total_orders,
	sum(price*quantity) as total_sales
from
	orders o
join products p
	on o.product_id = p.product_id
where 
	p.category = '전자기기'
group by 
	p.category;

select * from v_electronics_sales_status;

-- 4
select
	p.category,
	count(o.order_id) as total_orders,
	sum(p.price*o.quantity) as total_sales,
	avg(p.price*o.quantity) as average_order_value
from
	orders o
join products p
	on o.product_id = p.product_id
where 
	p.category = '전자기기'
group by 
	p.category;

alter view v_electronics_sales_status as
select
	p.category,
	count(o.order_id) as total_orders,
	sum(p.price*o.quantity) as total_sales,
	avg(p.price*o.quantity) as average_order_value
from
	orders o
join products p
	on o.product_id = p.product_id
where 
	p.category = '전자기기'
group by 
	p.category;

select * from v_electronics_sales_status;

-- Section 8 Index

-- 판매자 테이블 생성
CREATE TABLE sellers (
	seller_id INT PRIMARY KEY AUTO_INCREMENT,
	seller_name VARCHAR(100) UNIQUE NOT NULL,
	registered_date DATE NOT NULL
);

-- 상품 테이블 생성
CREATE TABLE items (
	item_id INT PRIMARY KEY AUTO_INCREMENT,
	seller_id INT NOT NULL,
	item_name VARCHAR(255) NOT NULL,
	category VARCHAR(100) NOT NULL,
	price INT NOT NULL,
	stock_quantity INT NOT NULL,
	registered_date DATE NOT NULL,
	is_active BOOLEAN NOT NULL,	
	CONSTRAINT fk_items_sellers FOREIGN KEY (seller_id) REFERENCES sellers(seller_id)
);

-- 판매자 데이터 입력
INSERT INTO sellers (seller_id, seller_name, registered_date) VALUES
(1, '행복쇼핑', '2020-01-15'),
(2, '스마트상점', '2021-03-22'),
(3, '글로벌셀러', '2019-11-01'),
(4, '에코마켓', '2022-07-10'),
(5, '베스트딜', '2020-05-30'),
(6, '패션리더', '2023-01-05'),
(7, '리빙스타', '2021-09-12'),
(8, '테크월드', '2022-04-18'),
(9, '북스토리', '2020-08-25'),
(10, '헬스앤뷰티', '2023-03-01');

-- 상품 데이터 입력
INSERT INTO items (item_id, seller_id, item_name, category, price,
stock_quantity, registered_date, is_active) VALUES
(1, 1, '무선 기계식 키보드', '전자기기', 120000, 100, '2022-01-20', TRUE),
(2, 1, '4K UHD 모니터', '전자기기', 450000, 50, '2022-02-15', TRUE),
(3, 2, '프리미엄 게이밍 마우스', '전자기기', 80000, 200, '2021-11-10', TRUE),
(4, 3, '관계형 데이터베이스 입문', '도서', 30000, 500, '2020-05-01', TRUE),
(5, 4, '친환경 세제', '생활용품', 15000, 300, '2023-08-01', FALSE),
(6, 5, '고급 가죽 지갑', '패션', 70000, 120, '2022-06-25', TRUE),
(7, 1, '스마트 워치', '전자기기', 250000, 80, '2023-03-10', TRUE),
(8, 6, '캐시미어 스웨터', '패션', 95000, 70, '2023-10-05', FALSE),
(9, 7, '아로마 디퓨저', '생활용품', 40000, 150, '2022-09-01', TRUE),
(10, 8, '게이밍 노트북', '전자기기', 1500000, 30, '2023-01-30', TRUE),
(11, 9, 'SQL 마스터 가이드', '도서', 35000, 400, '2021-04-12', TRUE),
(12, 10, '유기농 비누 세트', '헬스/뷰티', 20000, 250, '2023-02-20', FALSE),
(13, 1, '노이즈 캔슬링 헤드폰', '전자기기', 300000, 90, '2023-07-01', TRUE),
(14, 2, '인체공학 키보드', '전자기기', 90000, 110, '2022-05-05', TRUE),
(15, 3, '파이썬 프로그래밍 가이드', '도서', 28000, 600, '2021-01-01', FALSE),
(16, 4, '재활용 쇼핑백', '생활용품', 5000, 1000, '2023-09-15', TRUE),
(17, 5, '빈티지 가죽 백팩', '패션', 180000, 60, '2022-08-01', TRUE),
(18, 6, '여름용 린넨 셔츠', '패션', 45000, 180, '2023-04-20', TRUE),
(19, 7, '친환경 주방 세트', '생활용품', 60000, 130, '2022-10-10', FALSE),
(20, 8, '고성능 그래픽 카드', '전자기기', 800000, 40, '2023-06-01', TRUE),
(21, 9, '어린이를 위한 그림책', '도서', 18000, 700, '2022-03-01', TRUE),
(22, 10, '천연 에센셜 오일', '헬스/뷰티', 25000, 200, '2023-05-10', TRUE),
(23, 1, '휴대용 빔 프로젝터', '전자기기', 350000, 70, '2023-02-01', TRUE),
(24, 2, '게이밍 의자', '전자기기', 200000, 90, '2022-07-20', TRUE),
(25, 3, '세계사 탐험', '도서', 22000, 350, '2021-02-28', FALSE);

select * from sellers;
select * from items;

-- create index 
create index idx_items_item_name on items(item_name);
show index from items;
show index from sellers;
select * from sellers;

drop index idx_items_item_name on items;

explain select * from items where item_name = '게이밍 노트북';
select * from items where item_name = '게이밍 노트북';

create index idx_items_item_name on items(item_name);
show index from items;
explain select * from items where item_name = '게이밍 노트북';

select * from items where price between 50000 and 100000;
explain select * from items where price between 50000 and 100000;

create index idx_items_price on items(price);
explain select * from items where price between 50000 and 100000;



select * from items where item_name like '게이밍%';
explain select * from items where item_name like '게이밍%';


explain select * from items order by stock_quantity;

select * from items where price between 50000 and 100000
order by price;

explain select * from items where price between 50000 and 100000
order by price;

explain select * from items where price between 50000 and 100000
order by price desc;

drop index idx_items_price on items;
-- 생략하면 asc가 되고, 지정하면 desc로 인덱스를 만들 수 있다
create index idx_items_price_desc on items(price desc);

-- Section 9 인덱스2

-- 예상 rows가 5이기에(5/25) 20%여서 인덱스를 사용한다
select * from items where price between 50000 and 100000;
explain select * from items where price between 50000 and 100000;

-- 예상 rows가 25이기에(25/25) 비효율적이라고 판단해 풀 테이블 스캔을 사용한다
select * from items where price between 1000 and 200000;
explain select * from items where price between 1000 and 200000;

explain select item_id, price, item_name from items where price between 50000 and 100000;

-- mysql의 index에는 기본적으로 rowid, pk(item_id)가 포함된다
explain select item_id, price from items where price between 50000 and 100000;


drop index idx_items_price on items;

-- 새로운 인덱스를 생성해 커버링 인덱스 생성(price, item_name)
create index idx_items_price_name on items(price,item_name);
explain select item_id, price, item_name from items where price between 50000 and 100000;
select * from items;
explain select item_id, price, item_name from items where item_name = '스마트 워치';

show index from items;

drop index idx_items_price_name on items;

-- 복합 인덱스 생성, 순서가 굉장히 중요하다
create index idx_items_category_price on items(category,price);

-- 복합 인덱스 사용 성공 예제 1
select * from items where category = '전자기기';
explain select * from items where category = '전자기기';

select * from items where category = '전자기기' and price = 120000;
explain select * from items where category = '전자기기' and price = 120000;
-- 순서를 바꿔도 인덱스는 똑같이 사용된다
explain select * from items where price = 120000 and category = '전자기기';


-- 아래쿼리는 category, price idx를 활용할 수 없다
-- 인덱스 왼쪽 접두어 규칙 때문에 사용 불가하다
select * from items where price =80000;
explain select * from items where price = 80000;

create index idx_items_category_price on items(category,price);

-- 인덱스를 타긴탔으나, filtered가 10%밖에 되지 않는다
-- 복합 인덱스에 범위 조건이 사용된다면, 이후에는 idx가 사용될 수 없다고 생각하는게 좋다
-- 패션 이후의 price는 정렬이 되어있지 않은 상태라, (인덱스 안에서) 조회해야 한다
-- 인덱스 안에서 조회하는 것은 그나마 효율적이긴 하지만, 최선의 전략은 아니다
select * from items where category >= '패션' and price = 20000;
explain select * from items where category >= '패션' and price = 20000;

-- = 조건을 먼저 처리할 수 있도록 처리해야 한다
-- 장애가 날 경우, 우선 서비스가 돌아가게 해야한다(임시 방편 인덱스 생성)
create index idx_items_price_category_temp on items (price, category);

select * from items where category = '패션';

drop index idx_items_price_category_temp on items;

explain select * from items where category >= '패션' and price = 20000;
show index from items;

-- in절로 변경
select * from items where category in ('패션', '헬스/뷰티') and price = 20000;
explain select * from items where category in ('패션', '헬스/뷰티') and price = 20000;

-- 문제와 풀이
-- 인덱스를 생성해 쿼리 개선
show index from items;

select * from items
where category = '전자기기' and is_active = true;

select * from items
where category = '전자기기' and is_active = true
order by stock_quantity desc;

select * from items
where stock_quantity < 90 and category = '전자기기' and is_active = true;

select * from items
where stock_quantity < 90 and category = '전자기기' and is_active = true
order by stock_quantity desc;

create index idx_solution_items on items(category, is_active, stock_quantity);
```