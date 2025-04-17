# Redis

> https://www.youtube.com/watch?v=mPB2CZiAkKM

> [우아한테크세미나] 191121 우아한레디스 by 강대명님

## Redis란?
- Redis는 In-memory Data Store
- 분산 환경에서 사용할 수 있는 컬렉션이라고 생각하면 된다
- Sorted set/ set / Hash/ List/ String(K:V)가 존재한다
    - Sorted set(랭킹), String을 가장 많이 사용한다
    - sorted set의 순서를 결정하는 것은 score이며, score는 double형이라 js와 문제가 발생할 수 있어 조심해야한다
- prefix를 붙여 데이터를 저장하곤 한다
- 하나의 컬렉션에서 만개 이하의 데이터로 관리하는 것을 권장한다
- TTL을 걸 수있지만 하나의 컬렉션 단위로 걸 수 있다(데이터마다 TTL 불가능)

## Redis 운영
- **메모리 관리를 잘하자**
- **O(N)관련 명령어 주의**
- Replication

### 메모리 관리
- 인메모리 저장소이기 떄문에 Physical Memory 이상을 사용하면 문제가 발생한다
    - Swap이 있다면, Swap 사용으로 해당메모리 swap 마다 늦어진다
- Maxmemory를 설정하더라도 이보다 더 사용할 가능성이 크다
    - MaxMemory를 넘어가면 레디스가 내용을 제거하고 메모리를 확보해서 쓸 수 있게 되는 것
- Redis는 jemalloc을 사용한다
    - C 언어의 기본 malloc, free 함수 대신 사용하는 메모리 할당 라이브러리
    - 멀티스레드 환경에서 성능이 우수하고, 메모리 파편화를 줄이는 데 효과적
    - jemalloc이기 때문에 redis는 자신의 메모리 사용량을 모른다
        - OS에 페이지 단위로 할당 되기 때문에(4096, 4KB) 실제 사용량은 4097byte라면 8192, 8KB가 할당된다
        - OS는 그럼 1바이트라도 요청하면 4096byte(1page)가 할당 되기 때문
- read가 많은 서비스는 문제 없지만, write가 많은 서비스는 문제가 생길 수 있음(메모리를 2배 이상 사용할수도 있다)
    - 그래서 작은 단위 여러개를 쓰는게 더 효율적임
- Redis는 메모리 파편화가 발생할 수 있다
    - 다양한 사이즈를 가지는 데이터보다는 유사한 크기의 데이터를 가지는 경우가 유리하다
    - 3.x 버전의 경우 사용 메모리는 2gb로 보고 되지만 11gb의 rss를 사용하는 경우 자주 발생
        - Resident Set Size: 프로세스가 실제로 물리적 메모리에서 사용하고 있는 공간
#### 메모리를 줄이기 위한 설정
- Collection 잘 고르기
    - Hash -> HashTable을 한개 더 사용한다
    - Sorted Set -> Skiplist와 HashTable을 이용한다
    - Set -> HashTable 사용한다
    - 해당 자료구조들은 메모리를 많이 사용한다
- Ziplist를 이용하자
    - In memory이기 때문에 적당한 사이즈까지는 다 찾더라도 빠르기 때문에 사용가능
    - 많이 넣으면 원래의 자료구조로 바뀌어서 똑같아짐
### O(N)관련 명령어 주의
- Redis는 single threaded
    - Redis가 동시에 여러개의 명령을 처리할 수 없다(단 1개 처리 가능)
    - 단순한 get/set의 경우 초당 10만 TPS 이상 가능(CPU속도에 영향을 받는다)
- 위험한 O(N)명령
    - KEYS(모든 KEY 순회)
        - scan명령으로 대체 가능(짧게 여러번 돌림, scan 명령 사이사이에 get set을 실행시킴)
    - FLUSHALL, FLUSHDB (데이터 날리기)
    - Delete Collections (Collection 삭제, 수백만개의 데이터 삭제는 1-2초 걸림)
    - Get All Collection(가장 주의, 몇 만개씩의 데이터 가져오기)
        - 모든 item을 가져와야할때..
            - 일부만 가져오기(Sorted set)
            - 큰 Collection을 작은 여러개의 Collection으로 나누어 저장
            - 하나당 몇천개 안쪽으로 저장하는게 좋음

### redis.conf 권장 설정
- Maxclient 설정 50000
- RDB/AOF 설정 off
- commands disable
    - keys
- 전체 장애의 90% 이상이 keys와 save설정(n분안에 데이터가 바뀌면 dumb하는 옵션)시 발생
- 적절한 ziplist 설정