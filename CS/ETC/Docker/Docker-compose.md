# docker-compose
- `docker build` 와 `docker run` 을 대체할 수 있는 도구
- 다수의 명령을 단 하나의 구성 파일로 가진다
- 오케스트레이션 명령 셋이다
- docker-compose는 Dockerfile을 대체하지 않는다
- 이미지나 컨테이너를 대체하지 않는다
- 다수의 호스트에서 다중 컨테이너를 관리하는데는 적합하지 않다
- Service(container)를 관리한다
    - service는 published port/environment var/ volumes/ network 를 가진다
- yaml, yml로 작성한다
- `docker-compose up` 으로 실행시킨다(빌드, 실행)
    - `-d` 옵션으로 detach모드 실행 가능
- `docker-compose down` 으로 모두 제거 가능
    - 이 경우 볼륨은 그대로 남아있다
    - 볼륨도 지우고 싶다면 `-v` 옵션 을 추가시키면 된다 => `docker-compose down -v`
## 예제

- yaml은 공백2칸으로 종속성을 표기한다

```yaml
# docker compose의 version
# docker compose의 기능에 영향을 미친다
version: "3.8"
services:
  # 기본적으로 docker-compose의 service는 --rm -d 가 기본 설정으로 붙는다
  # docker가 이름을 기억하지만, 컨테이너 이름은 다른 것이된다
  # 코드내에서는 올바르게 들어가서 걱정 할 필요 없다
  mongodb:
    container_name: mongodb
    # 사용하려는 이미지 이름
    image: 'mongo'
    volumes:
      - data:/data/db
    # environment:
      # 2가지 모두 가능
      # MONGO_INITDB_ROOT_USERNAME: max
      # MONGO_INITDB_ROOT_PASSWORD: secret
      # - MONGO_INITDB_ROOT_USERNAME=max
    # environment:
    #   - MONGO_INITDB_ROOT_USERNAME=max
    #   - MONGO_INITDB_ROOT_PASSWORD=secret
    # 파일 사용
    env_file:
      - ./env/mongo.env
    # 없다면, 도커가 생성하는 기본 네트워크에 소속된다
    # networks:
    #   - goals-net
  backend:
    container_name: backend
    # Dockerfile의 경로
    # build: ./backend
    # 같은 동작을 한다, 세부 설정 가능
    build: 
      context: ./backend
      dockerfile: Dockerfile
    # args 삽입 가능
    # args: something
    #  some-arg: value
    ports:
      - '80:80'
    volumes:
      - logs:/app/logs 
      # 바인딩 마운트, docker-compose의 위치로 사용 가능, 데스크톱 환경 비활성
      #- ./backend:/app
      # - /app/node_modules 
    # environment:
    #   - MONGO_USERNAME=max
    #   - MONGO_PASSWORD=secret
    env_file:
      - ./env/backend.env
    # docker-compose에만 있는 명령
    # 의존성이 있는 컨테이너(순서 정하기)
    # 백엔드는 db가 실행 된 후 실행되어야 하기 때문
    depends_on:
      - mongodb
  frontend:
    container_name: frontend
    # 이미지가 변경되지 않는다면 그대로 사용, 변경된다면 재 빌드
    build: ./frontend
    ports:
      - '3000:3000'
    # 바인딩 마운트
    # volumes:
    #   - ./frontend/src:/app/src
    # -it flag는 개방향 표준 입력을 위한 -와 입력 플래그의 조합
    # 해당 2옵션은 -it와 같은 효과가 있다
    stdin_open: true
    tty: true
    # 의존성 설정
    # 백엔드가 먼저 실행되어야 한다
    depends_on:
      - backend
# 명명된 볼륨을 위해 반드시 필요하다
volumes:
  data:
  logs:
```
- 이유는 모르겠지만, env를 설정하면 mongodb에서 root secret/ max secret 두 가지가 env로 들어가게 되고 max secret로그인을 시도하면 오류가 발생한다
    - 이유 찾아야 함..
- db설정 오류가 한번 잘못됬으면 이미지, 볼륨을 모두 지우고 다시 시도해야한다
- `docker-compose up --build` 를 사용하면 빌드를 강제할 수 있다
    - `--build` 옵션이 없다면 기존의 이미지를 재사용한다