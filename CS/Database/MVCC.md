# MVCC

- MVCC(Multi Version Concurrency Control)은 현대 데이터베이스 관리 시스템에서 높은 동시성을 구현하기 위해 사용되는 핵심 기술이다
- 전통적인 Lock 방식이 "하나의 데이터를 한 번에 한 명만 수정할 수 있도록 잠그는" 방식이라면, MVCC는 "데이터를 수정할 때마다 그 데이터의 새로운 버전을 만드는" 방식을 사용한다
- 이 접근법의 목표는 읽기 작업과 쓰기 작업이 서로를 Blocking하지 않도록 분리하는 것이다

## Undo Log와 Snapshot

- MVCC의 읽기와 쓰기 작업이 분리될 수 있는 이유는 Undo log와 데이터 Snapshot의 개념 덕분이다
- MVCC에서 레코드의 trx_id를 보고, 현재 트랜잭션의 스냅샷에 비춰 그 변경이 커밋됐는지 아닌지를 판단하고 그에 맞는 데이터 버전을 구성한다

1. 데이터 수정 (쓰기) 시 동작

   - tx A가 id=1 row의 name을 '황건하'에서 '루피'로 변경시
   - DBMS는 기존 '황건하'를 바로 덮어쓰지 않는다
   - 대신, 변경 전 데이터인 '황건하'를 Undo Log라는 별도의 공간에 복사한다. 이 로그에는 어떤 tx가 데이터를 변경했는지(tx A의 trx_id)와 같은 정보도 포함된다
     - 쓰기 시에는 원본 데이터를 Undo Log에 백업한 뒤, 새로운 값으로 덮어쓴다

2. 데이터 조회 (읽기)시 동작

   - tx A가 아직 COMMIT하지 않은 상태에서, tx B가 id=1행을 읽으려고 할 경우
   - 이 결과는 tx 격리수준에 따라 다르다
     - SERIALIZABLE && REPEATABLE_READ && READ_COMMITED: Undo Log를 활용해 tx 시작 지점의 데이터 버전을 재구성한다
     - READ_UNCOMMITED: '루피'를 직접 읽는다(이를 Dirty Read라고 한다)

## MVCC와 Locking Read

- MVCC의 Reapeatable Read는 효율적이지만, 때로는 데이터를 읽어서 수정을 위해 잠가야 할 때도 있다
  - 이런 경우 `select ... for update`와 같은 Locking Read를 사용한다
- 일관된 읽기(Consistent Read): 일반적인 select문, mvcc의 원칙에 따라 tx시작 시점의 스냅 샷을 읽으며, Lock을 사용하지 않는다
- Locking Read: `select ... for update`, `select ... for share`
  - MVCC 스냅샷을 사용하지 않으며, 가장 최신 데이터를 읽고 데이터에 Lock을 건다
- 위의 이유로 `for update`구문 사용시 팬텀리드가 발생할 수 있다
  - 이는 DBMS의 오류가 아닌, 개발자가 "스냅샷의 일관성을  포기하고 최신 데이터를 사용하겠다"고 명시적으로 요청된 동작이다

## MVCC의 장점과 단점

### 장점

- 읽기는 쓰기를 막지않고, 쓰기는 읽기를 막지 않는다
- 높은 동시성: 읽기 작업이 Lock 대기 없이 바로 수행되므로, 동시성이 필요할때 좋은 성능을 발휘한다
- Lock 경합 감소: 데이터 수정 시에만 아주 짧게 lock을 사용하므로 deadlock의 발생가능성이 줄어든다
- read Consistency: 각 트랜잭션은 자신이 시작한 시점의 일관된 snapshot을 보게되며, 다른 트랜잭션의 중간 작업 결과를 읽는 문제(dirty read)를 방지한다

### 단점
- Undo Log 관리 비용: 이전 버전의 데이터를 계속 유지해야 하므로 undo Log를 위한 추가적인 저장 공간이 필요하며 DBMS는 필요없는 Undo Log를 주기적으로 정리해야하는 부가 작업을 수행해야한다
- 복잡성: 다양한 버전의 데이터를 관리해야 하므로 DBMS 내부 로직이 복잡해진다