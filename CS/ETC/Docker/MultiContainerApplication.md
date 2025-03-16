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

```Dockerfile
FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 80

CMD ["node" , "app.js"]
```

- 백엔드 이미지 빌드
    - `docker build -t goals-node .`
- 백엔드 컨테이너 실행
    - `docker run --name goals-backend -d --rm -p 80:80 goals-node`
    - 해당 방식으로 실행시키면 db에 접근을 못한다
    - 서버측 코드에서 연결 도커 컨테이너끼리 연결시켜야 한다. `host.docker.internal`
    - front와 통신을위해 public 옵션(`-p`)으로 포트를 열어야 한다

## frontend

```Dockerfile
# node에 의존한다
FROM node

# 다른 컨테이너이기에 backend와 충돌하지 않는다
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm" , "start"]
```

-  build
    - `docker build -t goals-react .`  
- run
    - `docker run --rm --name goals-frontend -p 3000:3000 -it goals-react`
    - -it가 없으면 자동 종료된다, -d면 자동 종료되는 메커니즘이 react에 있음


## network

- 이전의 방식과 다르게 Docker network를 이용한 컨테이너 구성
    - `docker network create goals-net`
    - `docker run --name mongodb --rm -d --network goals-net mongo`
    - `docker run --name goals-backend --rm -d --network goals-net goals-node(사용X)`
        - db 연결 부분을 db 컨테이너 이름(mongodb)로 바꿔야 해당 코드로 실행 가능하다
        - 당연히 빌드 다시 해야함
    - `docker run --name goals-frontend --rm -d --network goals-net goals-react`
        - App.js의 설정을 일부 바꿔야 사용 가능하다
        - 백엔드 컨테이너 이름으로 설정 부분을 바꿔야한다
        - 당연히 빌드 다시 해야함
        - React의 경우 브라우저에서 실행되기 때문에 브라우저가 이해할 수 있는 코드로 바꾸어야 한다(localhost)
        - 즉, network 옵션은 브라우저에서 실행되는 react에는 필요 없다
            - `docker run --name goals-frontend --rm -p 3000:3000 -it goals-react`
        - backend는 browser에서 작동되는 리액트와 통신하기 위해 80번 포트에서 열어야 한다
            - `docker run --name goals-backend --rm -d -p 80:80 --network goals-net goals-node`


## Volume

### DB
- container가 사라지면 없어지는 db의 데이터를 위해 volume을 사용해야 한다
    - mongodb는 `data/db` volume을 저장한다
    - `docker run --name mongodb -v data:/data/db --rm -d --network goals-net mongo`
    - 해당 커맨드는 data라는 볼륨을 호스트머신 어딘가에 docker가 만들고, 이를 mongo의 /data/db와 연결시킨 후 그 곳의 데이터를 호스트머신 어딘가로 명명된 data로 저장하는 것이다
    - ENV를 통해 id,pw를 넣을 수 있다
        - backend app.js를 수정해 id,pw를 넣어주어야 한다
        - `?authSource=admin` 쿼리스트링을 추가해야 한다
        - `docker run --name mongodb -v data:/data/db --rm -d --network goals-net -e MONGO_INITDB_ROOT_USERNAME=gunha -e MONGO_INITDB_ROOT_PASSWORD=secret mongo`

### Backend
- Container가 사라지면 logs도 같이 사라지기 때문에 Volume을 사용하여 로그를 저장하고, 최신 소스코드로 dev환경을 유지하려고 한다
    - 볼륨 logs 를 만들어(호스트 머신 어딘가), 도커 컨테이너의 /app/logs와 연결시킨다 
    - 현재 dev 폴더와 /app폴더를 매칭시켜 변경 사항을 즉시 확인할 수 있도록 한다
        - 이 경우, windows에선 특별한 설정이 필요함 이전 참고 (노트북에 설정해놨음 데스크톱은 X)
        - 익명 볼륨으로 docker container안에 node_modules 폴더를 미리 넣어, 복사가 되지 않도록 한다(바인딩 마운트시 필요)
    - dev :`docker run --name goals-backend --rm -d -p 80:80 -v /mnt/C\workspace\git\Kubernetes\6-multi-01-starting-setup\backend:/app -v logs:/app/logs -v /app/node_modules --network goals-net goals-node`
    - live : `docker run --name goals-backend --rm -d -p 80:80 -v logs:/app/logs --network goals-net goals-node`
- env를 넣어 동적으로 db id/pw를 설정할 수 있다
    - `docker run --name goals-backend --rm -d -p 80:80 -v logs:/app/logs -e MONGODB_USERNAME=gunha -e MONGODB_PASSWORD=secret --network goals-net goals-node`
    - `process.env.{값}` 으로 접근 할 수있으며, Dockerfile에 정의되어 있어야 사용 가능하다