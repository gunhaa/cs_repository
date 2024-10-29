# SQL


> 데이터베이스 시스템에서 자료를 처리하는 용도로 사용되는 구조적 데이터 질의 언어

> SQL (Structured Query Language)이란 데이터베이스와 소통하기 위한 언어이다. SQL을 통해서 데이터베이스 내 저장된 데이터를 읽고, 쓰고, 삭제하는 것이 가능하다. 

## 특징

- SQL은 어느 데이터베이스에서나 기본으로 제공하기 때문에 배워두면 여러 곳에서 쓸데가 많다. 다만, NoSQL 계열에서는 SQL 문을 사용하지 않는다.

- SQL의 특징은 탐욕스럽다(Greedy)는 것이다. SQL은 가능한 넓은 범위에 걸쳐 작업하려 한다. 따라서 WHERE절이나 LIMIT 구문을 생략하면 SELECT의 경우 끝도 없이 출력하는 레코드열을 보게 될 것이고 UPDATE와 DELETE의 경우 광역 변조(파괴)가 일어난다. 또한 대부분의 DBMS에서는 트랜잭션 BEGIN을 먼저 걸고 작업하지 않는 한 작업을 취소(UNDO)할 수 없다. 다시 말해 BEGIN을 입력하지 않고 DELETE from table; 을 입력한 경우 ROLLBACK 명령을 입력해도 소용이 없다. 가장 치명적인 오타로 WHERE절 입력 직전에 따옴표를 닫는다는 게 바로 옆의 세미콜론을 잘못 쳐서 오타를 낸 경우. 이 경우 앞의 명령어를 모든 레코드에 대해 수행해서 테이블을 파괴해 버린 뒤에 뒤쪽 명령어를 '문법 오류'로 출력한다.

- SQL을 입력할 때에는 절대 함부로 엔터 키를 눌러선 안 된다. 특히 WHERE절 앞뒤를 매우 꼼꼼하게 살펴야 하고 WHERE절이 없는 쿼리는 무조건 틀렸다고 간주해야 한다. SQL은 기본값이 rm -rf /라고 생각하는 게 편하다.

## SQL이 데이터를 정의/조작/제어, 트랜잭션 제어 하는 방법

> 데이터 정의 (DDL, Data Definition Language)

> 데이터 조작 (DML, Data Manipulation Language)

> 데이터 제어 (DCL, Data Control Language)

> 트랜잭션 제어 (TCL, Transaction Control Language)