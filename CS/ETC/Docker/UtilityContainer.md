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
    - `docker run -it -v 현재경로:/app node-util npm init`