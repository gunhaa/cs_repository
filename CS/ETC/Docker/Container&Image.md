# Container

- 어플리케이션, 웹사이트, 노드서버, 어플리케이션을 실행하는 전체 환경 등 무엇이든 포함하는 작은 패키지
    - The running "unit of software"

# Image

- 이미지는 컨테이너의 템플릿이자 청사진이다.
    - Templates/ Blueprints for containers
- 실제로 코드와 코드를 실행하는데 필요한 도구를 포함한다.
- 컨테이너가 실행되어 코드를 실행한다.

## Image use

- 이미 존재하는 이미지 사용
    - 팀원이 빌드해 놓은 이미지 사용
    - Docker hub에서 관리하는 이미지 사용(eg node)
```shell
# 공식 노드 사용, 바로 종료된다
docker run node

# 사용 중인 컨테이너 보기
docker ps -a

# interactive shell 모드 사용해서 실행
docker run -it node
```
    
- 해당 방법으로 다른 버전의 노드를 도커를 활용해 사용 할 수 있다.


```Dockerfile
# 베이스 이미지 위에 나의 이미지를 구축 할 수 있다.
# 코드에 필요한 운영체제 레이어
FROM node

# 작업 디렉토리 설정
# 이후 모든 후속 명령은 해당 폴더에서 실행된다 eg npm install
WORKDIR /app


# 해당 순서로 Dockerfile을 작성하게 되면 소스코드가 바뀌어도 npm install 과 package.json은 무력화되지 않기 때문에
# 최적화를 노려 볼 수 있다.
COPY package.json /app

RUN npm install


# 가장 많이 쓰는 명령 . .
# 현재 경로의 모든 파일(Dockerfile 제외) / 이미지 내부 경로 를 뜻한다
# Host file system, Image/ container file system
# 모든 컨테이너에는 로컬 머신의 파일시스템에서 완전히 분리된 자체 내부 파일 시스템이 있다.
# 도커 컨테이너 내부에 있다.
# 작업 디렉토리를 /app으로 설정했기에, /app을 뜻한다
COPY . /app
# COPY . .
# 두 커맨드는 같은 의미이다.

# 모든 명령은 이미지의 작업 디렉토리에서 실행된다(디폴트로 컨테이너 파일 시스템의 루트 폴더)
# RUN npm install

# 컨테이너의 포트 노출을 도커에게 알린다
# EXPOSE는 선택 사항이며, 중요한 것은 -p 옵션이다.
EXPOSE 80

# 서버 실행
# 이미지를 기반으로 컨테이너를 실행시킨다
CMD ["node", "server.js"]

# 컨테이너 실행
# docker run ${imageId}
# 컨테이너 정지
# docker stop ${imageId}
# 컨테이너 제거
# docker rm -f ${imageId}
# 80:80 매핑 후 실행
# -p 는 publish를 뜻한다
#      외부 포트 : 컨테이너 포트
# docker run -p 3000:80 ${imageId}

# 이미지는 읽기 전용이며, 변경 사항이 있으면 이미지를 다시 빌드해야 한다
# 이미지는 닫혀있다
# 이미지는 레이어이며, 레이어 기반 아키텍쳐를 사용한다

# Dockerfile의 명령어는, 레이어를 뜻한다
# Docker는 레이어들을 캐시한다
# 이 캐시를 이용할 수 있다면 이용하여, 이미지 생성 속도를 높인다.

# 하나의 레이어가 변경되면, 다른 모든 레이어가 다시 빌드된다.
# 도커는 npm install의 결과가 바뀌게 되었는지 알 수 없기 때문이다.
```


# 결론
- 이미지는 모든 설정 명령과 모든 코드가 포함된 공유 가능한 패키지이다.
- 컨테이너는 그러한 이미지의 구체적인 실행 인스턴스이다.
- 즉 우리는 이미지를 기반으로 하는 컨테이너를 실행하는 것이다.
- 이것이 핵심 기본 개념이며, 도커의 모든 것이다.
- 컨테이너는 실행 어플리케이션이 된다.
- Docker는 서버만 실행시키는 것이 아니고 코드로 작성된 프로그램을 실행 시킬 수 있다.