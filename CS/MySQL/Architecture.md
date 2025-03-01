# MySQL 아키텍쳐

## MySQL 전체 구조
![images1](images/mysql_architecture_1.png)

![images2](images/mysql_architecture_2.png)

![images3](images/mysql_architecture_3.png)


- MySQL은 사용 RDBMS와 같이 대부분의 프로그래밍 언어로부터 접근 방법을 모두 지원한다
- MySQL 서버는 크게 MySQL 엔진과 스토리지 엔진으로 구분할 수 있다
    - 이 둘을 합쳐 MySQL 또는 MySQL이라고 표현한다
### MySQL 엔진

- 클라이언트로부터 접속 및 쿼리 요청을 처리하는 커넥션 핸들러와, SQL parser & 전처리기, 쿼리의 최적화된 실행을 위한 옵티마이저가 중심을 이룬다
- 또한 MySQL은 표준 SQL(ANSI SQL)을 지원하기 때문에 표준 문법에 따라 작성된 쿼리는 타 DBMS와 호환되어 실행될 수 있다
- 전처리된 쿼리문은 SQL문과는 다소 차이가 있다. 쿼리 전처리는 SQL 문장이 실제로 실행되기 전에 수행되는 일련의 처리 과정으로, 쿼리의 최적화 및 구조 분석을 포함한다
    - java의 .class 파일과 유사하게 전처리된다고 생각하면 된다

### 스토리지 엔진

- 요청된 SQL 문장을 분석하거나 최적화하는 등 DBS의 두뇌에 해당하는 처리를 한다.
- 실제 데이터를 디스크 스토리지에 저장하거나 디스크 스토리지로부터 데이터를 읽어오는 부분은 스토리지 엔진이 전담한다
- MySQL서버에서 MySQL 엔진은 하나지만 스토리지엔진은 여러개를 동시에 사용할 수 있다
- 테이블이 사용할 스토리지 엔진을 지정하면 이후 해당 테이블의 모든 읽기, 변경 작업은 정의된 스토리지 엔진이 처리한다
```sql
CREATE TABLE test_table (fd1 INT, fd2 INT) ENGINE=INNODB;
```

- 스토리지 엔진은 mysql엔진에서 파싱되어 전처리된 쿼리문을 실행시키는 하드웨어적인 일만 수행한다

