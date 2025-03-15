# 멀티 컨테이너 어플리케이션

- 데이터베이스(mongodb)
- 백엔드(nodejs REST API)
- 프론트엔드(React SPA)

## db

- `docker run --name mongodb -d --rm -p 27017:27017 mongo`
    - `-p` 옵션 사용시 로컬에서 직접 접근 가능하다
        - localhost:27017 등으로 접근 가능
    - `-p` 옵션이 없다면 Docker network 내에서만 접근이 가능하다

## backend

- 백엔드 이미지 빌드
    - `docker build -t goals-node .`
- 백엔드 컨테이너 실행
    - `docker run --name goals-backend -d --rm -p 80:80 goals-node`
    - 해당 방식으로 실행시키면 db에 접근을 못한다
    - 서버측 코드에서 연결 도커 컨테이너끼리 연결시켜야 한다. `host.docker.internal`
    - front와 통신을위해 public 옵션으로 포트를 열어야 한다