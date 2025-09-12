# 수업 중 사용한 SQL

```sql
-- 김영한 SQL 입문편
create database my_shop;

use my_shop;

show databases;

show tables;

create table sample (
	product_id INT primary key,
	name varchar(100),
	price INT,
	stock_quantity INT,
	release_date DATE
);

desc sample;

drop table sample;

drop database my_shop;

insert into sample (product_id, name, price, stock_quantity, release_date)
values (1, '프리미엄 청바지', 59900, 100, '2025-06-11');

select * from sample;

update sample 
set price = 40000
where product_id = 1; 

delete from sample
where product_id =1;

-- 데이터 관리

-- DDL

create table customers (
	customer_id int auto_increment primary key,
	name varchar(50) not null,
	email varchar(100) not null unique,
	password varchar(255) not null,
	address varchar(255) not null,
	join_date datetime default current_timestamp
);

create table products (
	product_id int auto_increment primary key,
	name varchar(100) not null,
	description text,
	price int not null,
	stock_quantity int not null default 0
);

create table orders (
	order_id int auto_increment primary key,
	customer_id int not null,
	product_id int not null,
	quantity int not null,
	order_date datetime default current_timestamp,
	status varchar(20) not null default '주문접수',
	
	constraint fk_orders_customers foreign key (customer_id) references customers(customer_id),
	constraint fk_orders_products foreign key (product_id) references products(product_id)
);

-- drop table orders;
-- SHOW TABLE STATUS WHERE Name='customers';

alter table customers
add column point int not null default 0;

desc customers;

alter table customers
modify column address varchar(500) not null;

desc customers;

alter table customers
drop column point;

desc customers;

-- 외래키 제약 조건 무시
set foreign_key_checks = 0;

-- 데이터가 없더라도, 모든 데이터를 삭제하는 작업이기에 문제가 발생할 수 있어
-- 외래키가 있으면 사용되지 않는다
truncate table products;

-- 외래키 제약 조건 활성
set foreign_key_checks = 1;
-- set을 통해 config를 바꾸는 것은 db connection이 유지되는 동안만 유효하다
-- 연결이 끊기면 설정이 사라져, 다시 접속하는 경우 설정을 다시 해야 한다

-- DML

-- 컬럼명을 넣지 않을 경우 모든 컬럼명을 다 넣어야한다
insert into customers values (null, '강감찬', 'kang@example.com', 'hashed_password_123', '서울시 관악구', '2025-06-11 10:30:00');
insert into customers values (null, '이순신', 'lee@example.com', 'hashed_password_123', '서울시 관악구', '2025-06-12 10:30:00');
select * from customers;

insert into customers (name, email, password, address) values ('세종대왕', 'sejong@example.com', 'hashed_password_456', '서울시 종로구');

insert into products (name, price, stock_quantity) values ('베이직 반팔 티셔츠', 19900, 200);
select * from products;
insert into products (name, price, stock_quantity) values ('초록색 긴팔 티셔츠', 30000, 50);

insert into products (name, price, stock_quantity) values
('검정 양말', 5000, 100),
('갈색 양말', 5000, 150),
('흰색 양말', 5000, 200);

select * from products where product_id = 1;

update products set price = 9800, stock_quantity = 580 where product_id = 1;

-- SQL 안전 업데이트 모드
-- 안전 업데이트 모드에서는 pk, unique key, idx col 값만 condition으로 받는다
update products set price = 990; -- where product_id = 1;을 실수로 생략
-- 안전 업데이트 모드에선 사용이 안되는 쿼리이다
select @@sql_safe_updates; -- mysql에서 1은 true, 0은 false
-- set sql_safe_updates = 1 로 변경 가능
set sql_safe_updates = 1;

select * from products where product_id = 1;
delete from products where product_id = 1;
select * from products;

-- 안전 업데이트 모드는 delete에서도 적용 된다
delete from products;

select * from products;

set foreign_key_checks = 0; -- 비활성화
truncate table products;
truncate table customers;
truncate table orders;
set foreign_key_checks = 1;

-- not null 제약 조건 위반
insert into customers (email, password, address) values ('noname@example', 'password123', '서울시 마포구');

insert into customers (name, email, password, address) values ('강감찬', 'kang@example', 'password123', '서울시 마포구');

-- unique 제약조건 위반
insert into customers (name, email, password, address) values ('홍길동', 'kang@example', 'password123', '서울시 마포구');

select * from customers;

-- foreign key 제약 조건
-- orders 테이블은 customers 테이블과 products 테이블의 자식 테이블이다

insert into products (name, price, stock_quantity) values ('베이직 반팔 티셔츠', 19900, 200);
select * from products;

insert into orders (customer_id, product_id, quantity) values (1,1,1);
select * from orders;

-- foreign key 제약 조건 위반
-- 없는 고객이 상품을 주문
insert into orders (customer_id, product_id, quantity) values (999,1,1);
select * from products where product_id = 1;

-- foreign key 제약 조건이 막아준다
-- orders를 지운 후, 삭제를 해야 삭제가 가능하다
delete from products where product_id = 1;

-- orders 삭제 후 products 삭제
delete from orders where order_id = 1;
delete from products where product_id = 1;
select * from orders;
select * from products;

-- 문제와 풀이

create database my_test;
use my_test;

create table members (
	id int primary key,
	name varchar(50) not null,
	join_date date 
);

desc members;

insert into members (id, name, join_date) values (1, '션', '2025-01-10');
insert into members (id, name, join_date) values (2, '네이트', '2025-02-15');
select * from members;

update members set name = '네이트2' where id = 2;
delete from members where id = 1;

create table products (
	product_id int auto_increment primary key,
	product_name varchar(100) not null,
	product_code varchar(20) unique,
	price int not null,
	stock_count int not null default 0
);

desc products;

create table customers (
	customer_id int auto_increment primary key,
	name varchar(50) not null
);

create table orders (
	order_id int auto_increment primary key,
	customer_id int not null,
	order_date datetime default CURRENT_TIMESTAMP,
	
	constraint fk_orders_customers foreign key (customer_id) references customers (customer_id)
);

insert into customers (name) values ('홍길동');
select * from customers;
insert into orders (customer_id) values (1);
select * from orders;

insert into orders (customer_id) values (999);
insert into customers (customer_id) values (2);

-- 조회와 정렬
use my_shop;
select database();

set foreign_key_checks = 0; -- 비활성화
truncate table products;
truncate table customers;
truncate table orders;
set foreign_key_checks = 1;

INSERT INTO customers (name, email, password, address, join_date) VALUES
('이순신', 'yisunsin@example.com', 'password123', '서울특별시 중구 세종대로',
'2023-05-01'),
('세종대왕', 'sejong@example.com', 'password456', '서울특별시 종로구 사직로',
'2024-05-01'),
('장영실', 'youngsil@example.com', 'password789', '부산광역시 동래구 복천동',
'2025-05-01');

INSERT INTO products (name, description, price, stock_quantity) VALUES
('갤럭시', '최신 AI 기능이 탑재된 고성능 스마트폰', 10000, 55),
('LG 그램', '초경량 디자인과 강력한 성능을 자랑하는 노트북', 20000, 35),
('아이폰', '직관적인 사용자 경험을 제공하는 스마트폰', 5000, 55),
('에어팟', '편리한 사용성의 무선 이어폰', 3000, 110),
('보급형 스마트폰', NULL, 5000, 100);

INSERT INTO orders (customer_id, product_id, quantity) VALUES
(1, 1, 1), -- 이순신 고객이 갤럭시 1개 주문
(2, 2, 1), -- 세종대왕 고객이 LG 그램 1개 주문
(3, 3, 1), -- 장영실 고객이 아이폰 1개 주문
(1, 4, 2), -- 이순신 고객이 에어팟 2개 추가 주문
(2, 2, 1); -- 세종대왕 고객이 LG 그램 1개 주문(추가 주문)

select * from customers;

select
	name as 이름,
	email as ```진짜 이메일```
from customers;

select * from customers where email = 'yisunsin@example.com';
select * from products where price >= 5000 and stock_quantity >= 50;
select * from products where price >= 20000 or stock_quantity >= 100;
select * from products where price != 20000;
select * from products where price <> 20000;

-- 두 쿼리는 같은 것을 검색한다
select * from products where price >= 5000 and price <= 15000;
select * from products where price between 5000 and 15000;

-- 두 쿼리는 같은 것을 검색한다
select * from products where price < 5000 or price > 15000;
select * from products where price not between 5000 and 15000;

-- 두 쿼리는 같은 것을 검색한다
select * from products where name = '갤럭시' or name = '아이폰' or name = '에어팟';
select * from products where name in ('갤럭시', '아이폰', '에어팟');

-- 두 쿼리는 같은 것을 검색한다
select * from products where name != '갤럭시' and name != '아이폰' and name != '에어팟';
select * from products where name not in ('갤럭시', '아이폰', '에어팟');

-- sejong이 들어간 이메일 찾기
select * from customers where email = 'sejong';
select * from customers where email like 'sejong%';

select * from customers where email like '%@example.com';
select * from customers where address like '%특별%';
select * from customers where name like '이_신';

select * from customers where address not like '서울특별시%';

-- order by

select * from customers order by join_date desc;
select * from products order by price desc;

-- 재고수량이 많은 순서대로 정렬, 재고 수량이 같다면 그 상품들끼리는 가격이 낮은 순서대로 정렬
select * from products order by stock_quantity desc, price asc;

-- 개수 제한
select * from products order by price desc limit 2;

-- 페이징 처리
select * from products;
select * from products limit 0,2;
select * from products limit 2,2;
select * from products limit 4,2;
-- limit offset, 페이지당_게시물수
-- offset = (페이지번호 - 1) * 페이지당_게시물수

-- 한번이라도 주문한 고객의 id 리스트
select distinct customer_id from orders;
select * from orders;

select customer_id, product_id from orders order by customer_id, product_id;

-- 고객 상품의 유일한 조합 검색
select distinct customer_id, product_id from orders order by customer_id, product_id;


/*
 NULL - 알 수 없는 값
 NULL은 빈 상자가 아닌, 상자가 있는지 조차 모른다는 표시이다
 price = 0, 숫자 0이라는 값
 description = '' 글자가 없는 값이 있다 (두 쉼표 사용)
 NULL 값이 있는지 자체를 모른다
 따라서 어떤 값 = NULL이라는 비교연산은 항상 알 수 없음(UNKNOWN) 이라는 결과를 반환한다
 NULL = NULL 조차도 true가 아닌 unknown이다
 비교는 양쪽이 다 값을 가질 때만 참 거짓을 결정할 수 있다
 where 절은 조건의 결과가 true인 행만 반환하므로, 알 수 없음(unknown)으로 판별된 행은 결과에 포함시키지 않는다
 이런 문제를 해결하기 위해 SQL은 IS NULL이라는 특별한 키워드를 제공한다

 NULL의 정렬
 MySQL의 NULL 정렬 규칙
 MySQL은 NULL을 가장 작은 값으로 취급한다
 Oracle은 NULL을 가장 큰 값으로 취급한다
 내가 사용하는 DB가 어떤 규칙을 따르는지 명확히 아는 것이 중요하다
 */

select * from products where description = NULL;
select * from products where description is null;
select * from products order by description asc;
select * from products order by description desc;

/* 
 상품 설명을 내림차순으로 정렬하되, 설명이 없는 상품(`NULL` )은
  빨리 확인할 수 있게 맨 앞으로 보내주세요
*/
select product_id, name, description, description is null from products order by description desc;
select product_id, name, description, description is null from products order by description is null desc, description desc;
select product_id, name, description from products order by (description is null) desc, description desc;

-- 문제와 풀이

select * from products;
select name as 상품명, price as 판매가 from products;

select * from customers where name = '장영실';

select * from products where price >= 10000 and stock_quantity < 50;

select * from products where product_id in (2,3,4); 

select * from customers where address like '서울특별시%';

select * from products where description is null;

select * from products order by price desc;

select * from products order by price, stock_quantity desc;

select * from customers order by join_date desc limit 2;

select distinct customer_id, product_id from orders;

select name as `상품 이름`, stock_quantity as `남은 수량` from products where price > 3000 and stock_quantity <= 100 order by stock_quantity desc limit 3;

-- Section 6. 데이터 가공

select name, price, stock_quantity, price * stock_quantity as total_stock_value from products;
select name, price, price + 3000 as 배송비_포함가격 from products;
select name, price, price - 1000 as discount_price from products;

-- String 함수
-- 보고서 화면에서 이름과 이메일 합치기
select name, email from customers;
select concat(name, '(', email, ')') as `이름(이메일)` from customers;
select concat_ws('---', name, email, address) from customers;
select email, upper(email) as upper_email from customers;
-- 한글은 UTF-8 문자셋 사용시 3바이트
select name, char_length(name) as char_length, length(name) as byte_length from customers;

-- NULL 함수
select name, description from products;
select name, ifnull(description, '상품 설명 없음') from products;
-- ifnull과 같은 동작을 하지만 더 유연하다
-- 짧은 설명이 있으면 그것을 쓰고, 없으면 긴 설명을 쓰고, 둘다 없으면 설명 없음을 표시하고 싶을 수 있다
-- coalesce(short_description, long_description, '설명 없음');
select name, coalesce(description, '상품 설명 없음') from products;

-- 다양한 함수들
-- 필요할 때마다 검색해서 사용

-- 문제와 풀이

select name, price, price*0.85 as sale_price from products;

select concat_ws(' - ', name, address) from customers;

select name, coalesce(description, name) as product_display_info from products;

select name, description, coalesce(description, name, '정보없음') as display_text from products;

select email, substring_index(email, '@', 1) as user_id, char_length(substring_index(email, '@', 1)) as id_length from customers;



-- Section 7. 집계와 그룹핑

CREATE TABLE order_stat (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
	customer_name VARCHAR(50),
	category VARCHAR(50),
	product_name VARCHAR(100),
	price INT,
	quantity INT,
	order_date DATE
);

INSERT INTO order_stat (customer_name, category, product_name, price,
quantity, order_date) VALUES
('이순신', '전자기기', '프리미엄 기계식 키보드', 150000, 1, '2025-05-10'),
('세종대왕', '도서', 'SQL 마스터링', 35000, 2, '2025-05-10'),
('신사임당', '가구', '인체공학 사무용 의자', 250000, 1, '2025-05-11'),
('이순신', '전자기기', '고성능 게이밍 마우스', 80000, 1, '2025-05-12'),
('세종대왕', '전자기기', '4K 모니터', 450000, 1, '2025-05-12'),
('장영실', '도서', '파이썬 데이터 분석', 40000, 3, '2025-05-13'),
('이순신', '문구', '고급 만년필 세트', 200000, 1, '2025-05-14'),
('세종대왕', '가구', '높이조절 스탠딩 데스크', 320000, 1, '2025-05-15'),
('신사임당', '전자기기', '노이즈캔슬링 블루투스 이어폰', 180000, 1, '2025-05-15'),
('장영실', '전자기기', '보조배터리 20000mAh', 50000, 2, '2025-05-16'),
('홍길동', NULL, 'USB-C 허브', 65000, 1, '2025-05-17'); -- 카테고리가 NULL인 데이터 추가

select * from order_stat;

-- row의 숫자를 센다
select count(*) from order_stat;
select count(*) from dual;
-- null이 뺴고 계산된다
select count(category) from order_stat;

select count(*) as `전체 주문 건수`, count(category) as `카테고리 등록 건수` from order_stat;

-- sum()과 avg()는 계산과정에서 null 값을 자동으로 제외한다
select sum(price * quantity) as `총 매출액`, avg(price * quantity) as `평균 주문 금액` from order_stat;

select sum(quantity) as `총 판매 수량`, avg(quantity) as `주문당 평균 수량` from order_stat;
select max(price) as 최고가, min(price) as 최저가 from order_stat;

select min(order_date) as `최초 주문일`, max(order_date) as `최근 주문일` from order_stat;

-- 쇼핑몰에 주문한 사람
-- 중복 제거가 필요
-- distinct를 한후 count를 센다
-- unique 고객은 5명이다
select count(customer_name), count(distinct customer_name) from order_stat;

-- 카테고리별 주문 건수
-- 카테고리 별로 매출액
-- 그룹으로 묶기

-- 이렇게하면 null을 카운트 못한다
select category, count(category) as `카테고리별 주문 건수` from order_stat group by category;

select category, count(*) as `카테고리별 주문 건수` from order_stat group by category;

select customer_name, count(*) as `주문 횟수` from order_stat group by customer_name;

select customer_name, count(*) as `총 주문 횟수`, sum(quantity) as `총 구매 수량`, sum(price * quantity) as `총 구매 금액` from order_stat group by customer_name order by `총 구매 금액` desc;

-- '는 문자열로 인식하고, `는 컬럼으로 인식해 주의해야한다
-- '를 order by 절에 넣으면, 문자열에 대한 정렬이 이루어져 제대로 된 정렬이 안된다

select customer_name, category, sum(price * quantity) as `카테고리별 구매 금액` from order_stat group by customer_name, category order by customer_name, `카테고리별 구매 금액` desc;

/*
Group by를 사용할 때 Select 절에는 group by에 사용된 컬럼과 집계함수만 사용할 수 있다
데이터베이스는 모호한 요청을 허용하지 않는다
*/
select category, count(*) from order_stat group by category;

-- 그룹된 카테고리의 product_name이 모두 다르기에, SQL이 적절한 자료 집합을 반환할 수 없다
select category, product_name, count(*) from order_stat group by category;

-- 그룹된 것의 컬럼을 구하고싶다면, 기준이 있다면 구할 수 있다
select category, min(product_name), max(quantity), count(*) from order_stat group by category;

select category, sum(price*quantity) as total_sales from order_stat group by category;

-- having절 alias의 사용은 정식 스펙은 아니지만, mysql에서는 사용 가능
select category, sum(price*quantity) as total_sales from order_stat group by category having total_sales >= 500000;
select customer_name, count(*) as order_count from order_stat group by customer_name having count(*) >= 3;

-- 가격 10만원이상, 카테고리에서 2개 이상 팔린 카테고리 이름
select category as premium_order_count from order_stat where price >= 100000 group by category having count(*) >= 2;

/*
2025년 5월 14일 이전에 들어온 주문들 중에서(WHERE), 고객별로 그룹화하여(GROUP BY), 주문 건수가 2회 이
상인 고객을 찾아서(HAVING), 해당 고객의 이름과 총 구매 금액을 조회하고(SELECT), 총 구매 금액을 기준으로 내
림차순 정렬해라(ORDER BY) 그리고 하나의 데이터만 출력해라
*/
select customer_name, sum(price*quantity) as total_purchase -- 5단계
from
	order_stat -- 1단게
where 
	order_date < '2025-05-14' -- 2단계
group by
	customer_name -- 3단계
having 
	count(*) >= 2 -- 4단계
order by
	total_purchase desc -- 6단계
limit 1; -- 7단계


select count(*) as `총 주문 건수`, count(category) as `카테고리 보유 건수` from order_stat;

select sum(price*quantity) as `총 매출액`, avg(price*quantity), max(price) as `최댓값`, min(price) as `최솟값` from order_stat;

select category, sum(quantity) as `카테고리별 총 판매 수량`, sum(price*quantity) as `카테고리별 총 매출액` from order_stat group by category order by `카테고리별 총 매출액` desc;

select * from order_stat;
select customer_name, count(*) as `총 주문 횟수`, sum(quantity) as `총 구매 수량` from order_stat group by customer_name order by `총 주문 횟수` desc, `총 구매 수량` desc;

select customer_name, sum(price) as `총 구매 금액` from order_stat group by customer_name having `총 구매 금액` >= 400000 order by `총 구매 금액` desc;

```