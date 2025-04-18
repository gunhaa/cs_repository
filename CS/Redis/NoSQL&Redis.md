# 빅데이터 저장 및 분석을 위한 NoSQL & Redis

- https://www.yes24.com/Product/Goods/71131862

## Redis
- Remote Dictionary Server
- 주요 자료구조는 Sorted set/ set / Hash/ List/ String(K:V)
    - Hash와 String이 다른 점
    - String의 경우
    ```shell
    SET user:1 "Alice"
    SET user:1:age "30"
    ```
    - Hash의 경우
    ```shell
    HSET user:1 name "Alice"
    HSET user:1 age "30"
    ```
    - 해당 예에서 처럼, Hash는 일종의 테이블의 행과 같다

