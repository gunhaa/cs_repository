# Kong을 도커를 이용해 세팅하는 방법

## 세팅 해야 하는 것

1. Database: Kong 은 서비스, 라우팅, 각종 인증, 플러그인들의 사용 정보를 위해서 Database가 필요하다. Kong에서는 PostgreSQL, Cassandra 중 선택할 수 있다
2. Kong API Gateway: Kong API Gateway 는 클라이언트 요청을 받아 들이고, 서비스로 라우팅 하는 핵심 역할을 수행한다

## 세팅

> prologue project에 대한 세팅

1. Docker network 설정

- `docker network create prologue-net`

2. postgre 설치

```plaintext
docker run -d --name kong-database \
               --network=prologue-net \
               -p 5432:5432 \
               -e "POSTGRES_USER=kong" \
               -e "POSTGRES_DB=kong" \
               -e "POSTGRES_PASSWORD=kong" \
               postgres:9.6
```

- 테스트
  - `docker exec -it kong-database /bin/bash`
  - `psql -U kong`

3. db 초기화

- migrations 명령어를 통해 db를 초기화할 수 있다
- KONG_PG_HOST를 통해 db 이름을 넣어 연결할 수 있다
- 포트번호 입력없으면 기본포트 5432를 잘 찾고, 변경된다면 KONG_PG_PORT env를 추가해야한다
- 임시 kong 컨테이너를 생성 후 명령어가 끝나면 컨테이너를 삭제시킨다(--rm)

```plaintext
docker run --rm \
     --network=prologue-net \
     -e "KONG_DATABASE=postgres" \
     -e "KONG_PG_HOST=kong-database" \
     -e "KONG_PG_USER=kong" \
     -e "KONG_PG_PASSWORD=kong" \
     kong:latest kong migrations bootstrap
```

4. kong 실행하기

```plaintext
docker run -d --name kong `
     --network=prologue-net `
     -e "KONG_DATABASE=postgres" `
     -e "KONG_PG_HOST=kong-database" `
     -e "KONG_PG_USER=kong" `
     -e "KONG_PG_PASSWORD=kong" `
     -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" `
     -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" `
     -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" `
     -e "KONG_PROXY_ERROR_LOG=/dev/stderr" `
     -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" `
     -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" `
     -p 8000:8000 `
     -p 8443:8443 `
     -p 127.0.0.1:8001:8001 `
     -p 127.0.0.1:8444:8444 `
     kong:latest
```

### Docker-compose로 관리

```plaintext
# docker-compose.yml

version: '3.8'

services:
  # 2. postgre 설치
  kong-database:
    image: postgres:9.6
    container_name: kong-database
    networks:
      - prologue-net
    environment:
      POSTGRES_USER: kong
      POSTGRES_DB: kong
      POSTGRES_PASSWORD: kong
    ports:
      - "5432:5432"
    # DB가 완전히 준비되었는지 확인하는 헬스체크 추가
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U kong"]
      interval: 5s
      timeout: 5s
      retries: 5

  # 3. db 초기화 (마이그레이션)
  kong-migrations:
    image: kong:latest
    command: "kong migrations bootstrap"
    networks:
      - prologue-net
    environment:
      KONG_DATABASE: postgres
      KONG_PG_HOST: kong-database
      KONG_PG_USER: kong
      KONG_PG_PASSWORD: kong
    # kong-database 서비스가 healthy 상태가 된 후에 실행되도록 설정
    depends_on:
      kong-database:
        condition: service_healthy
    restart: on-failure # 실패 시 재시도

  # 4. kong 실행하기
  kong:
    image: kong:latest
    container_name: kong
    networks:
      - prologue-net
    environment:
      KONG_DATABASE: postgres
      KONG_PG_HOST: kong-database
      KONG_PG_USER: kong
      KONG_PG_PASSWORD: kong
      KONG_PROXY_ACCESS_LOG: /dev/stdout
      KONG_ADMIN_ACCESS_LOG: /dev/stdout
      KONG_PROXY_ERROR_LOG: /dev/stderr
      KONG_ADMIN_ERROR_LOG: /dev/stderr
      KONG_ADMIN_LISTEN: 0.0.0.0:8001, 0.0.0.0:8444 ssl
    ports:
      - "8000:8000"
      - "8443:8443"
      - "127.0.0.1:8001:8001"
      - "127.0.0.1:8444:8444"
    # kong-migrations 작업이 성공적으로 완료된 후에 실행되도록 설정
    depends_on:
      kong-migrations:
        condition: service_completed_successfully

# 1. Docker network 설정
networks:
  prologue-net:
    driver: bridge
```

- docker-compose up -d

### Admin API를 이용한 Service/Router 등록

- 오픈소스 버전에서는 workspace가 사용 불가
  - `curl http://localhost:8001/services` 로 리스트 가져올 수 있음

## Kong이 제공하는 port 알아보기
- kong 은 몇가지 endpoint를 위한 port를 제공한다.
- 8000: Kong 는 HTTP 요청을 리슨한다. 그리고 서비스로 업스트림을 수행한다.
- 8443: HTTPS에 대한 리슨을 수행한다. 이는 :8000과 유사하다, HTTPS만 오직 받아 들인다. 이는 설정에서 off시킬 수 있다.
- 8001: Admin API를 위해서 리슨한다.
- 8444: Admin API를 HTTPS로 리슨한다.