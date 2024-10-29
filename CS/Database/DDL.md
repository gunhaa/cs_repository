
# 데이터 정의 (DDL, Data Definition Language)

> DDL은 데이터베이스의 구조를 정의하고 수정하는 데 사용되는 명령어들이다. 주로 테이블과 같은 데이터베이스 객체의 생성, 변경, 삭제를 담당한다.

## 주요 명령어

- CREATE: 새로운 데이터베이스 또는 테이블을 생성한다

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
```

- ALTER: 기존 데이터베이스 객체의 구조를 변경한다

```sql
ALTER TABLE users ADD COLUMN age INT;
```

- DROP: 데이터베이스 객체를 삭제한다
```sql
DROP TABLE users;
```


# 데이터 조작 (DML, Data Manipulation Language)

> DML은 데이터베이스에 저장된 데이터를 조작하는 데 사용되는 명령어들이다. 데이터의 추가, 수정, 삭제, 조회를 포함한다.

## 주요 명령어

- SELECT: 데이터를 조회한다.

```sql
SELECT * FROM users;
```

- INSERT: 새로운 데이터를 추가한다.
```sql
INSERT INTO users (id, name, email) VALUES (1, 'Alice', 'alice@example.com');
```

- UPDATE: 기존 데이터를 수정한다.

```sql
UPDATE users SET email = 'alice_new@example.com' WHERE id = 1;
```

- DELETE: 데이터를 삭제한다.
```sql
DELETE FROM users WHERE id = 1;
```



# 데이터 제어 (DCL, Data Control Language)

> DCL은 데이터베이스의 접근 권한과 관련된 명령어들이다. 데이터베이스 사용자와 관련된 권한을 관리한다.

## 주요 명령어

- GRANT: 특정 사용자에게 데이터베이스 객체에 대한 권한을 부여한다.

```sql
GRANT SELECT ON users TO user1;

```

- REVOKE: 특정 사용자에게 부여된 권한을 회수한다.

```sql
REVOKE SELECT ON users FROM user1;
```

# 트랜잭션 제어 (TCL, Transaction Control Language)

> TCL은 데이터베이스의 트랜잭션을 관리하는 명령어들이다. 트랜잭션의 상태를 제어하고 일관성을 유지하는 데 사용된다.

## 주요 명령어

- COMMIT: 현재 트랜잭션의 변경 사항을 데이터베이스에 영구적으로 저장한다.

```sql
COMMIT;
```

- ROLLBACK: 현재 트랜잭션의 변경 사항을 취소하고 이전 상태로 되돌린다.

```sql
ROLLBACK;
```

- SAVEPOINT: 트랜잭션 내에서 특정 시점으로 되돌릴 수 있는 지점을 설정한다.

```sql
SAVEPOINT savepoint_name;
```