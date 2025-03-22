# 유틸리티 컨테이너

- 유틸리티 컨테이너는 공식 용어가 아니다
- 특정 환경만 포함하는 컨테이너를 의미한다(eg nodejs환경, php환경)
- PHP, Laravel, Nodejs 같은 환경으로 프로젝트를 시작하기 위해서는 그 툴이 호스트 머신에 설치되어야 한다
    - 이 문제를 해결하기 위한 것이 유틸리티 컨테이너이다

## 시작
- `docker run -it node` 로 시작할 수 있다
    - `-it` 옵션이 없다면 종료된다
- `docker run -it -d node`로 실행 시킬 수 있다
    - `-d`옵션으로 무한 대기가 된다
    - `docker exec -it ${컨테이너 이름} ${명령}`로 접근 가능, 명령 실행 가능 eg. docker exec container_name npm init
    - `docker run -it node npm init` 기본 동작 뒤 명령을 오버라이드 할 수 있다

```Dockerfile
# 경량 버전
FROM node:14-alpine

WORKDIR /app
```
- `docker build -t node-util .` 빌드
- 해당 컨테이너를 이용해 컨테이너에서 작업한 것을 폴더로 바인딩 마운트 시킨다
    - `docker run -it -v /mnt/C/workspace/git/Kubernetes/8-UtilityContainer-starting/Dockerfile:/app node-util npm init`
    - window의 경우 설정을 끝내야 공유가 가능하다

## ENTRYPOINT
```Dockerfile
...
ENTRYPOINT [ "npm" ]
...
```
- docker run  작성했던 설정들이 모두 들어가며, 끝에 엔트리 포인트가 들어간다
- CMD의 경우 작성했던 설정이 모두 날라가고, CMD값만 들어간다
- docker run -it -v /mnt/C/workspace/git/Kubernetes/8-UtilityContainer-starting/Dockerfile:/app mynpm init 로 실행가능
- docker run -it -v /mnt/C/workspace/git/Kubernetes/8-UtilityContainer-starting/Dockerfile:/app mynpm install express --save 로 응용가능

## docker-compose
- 하나의 컨테이너도 사용 가능하다
- 긴 명령은 매일 치기 어려우니, 쉽게 설정 할 수 있다
```Dockerfile
version: '3.8'
# 이 곳이 service라서 docker-compose run npm init 이 가능하다
services:
  npm:
    build: ./
    stdin_open: true
    tty: true
    volumes:
      - ./:/app
```
- docker-compose up 으로 실행, 문제 발생
    - docker-compose up은 docker-compose에 정의된 모든 명령을 실행시키는 거라 이후에 인자를 넣을 수 없다
        - docker-compose up init 불가능, entrypoint명령만 실행된다
    - docker-compose down으로 컨테이너를 전부 내릴 수 있음
- docker-compose run 로 실행시키면 단일 서비스를 실행 시킬 수 있다
    - docker-compose run npm init
    - run은 자동으로 제거 되지 않는다, 해결을 위해서는 docker-compose run --rm npm init 으로 --rm옵션을 붙여야 한다