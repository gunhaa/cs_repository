# CI/CD
- Docker를 통해 SpringBoot - MySQL 컨테이너 올리기
- Jenkins를 통해 CI/CD를 진행
    - github webhook을 이용한 prod branch만 build한다.
- `내도메인.한국` 에서 도메인 이름 발급
    - http://bitlibrary.kro.kr/
- AWS EC2 free tier에서 서버 상시 유지
- 배포에 사용하는 스택 `Spring boot` , `MySQL` , `Jenkins` , `AWS` , `DNS` , `DOCKER` 

## 한계 & 생각해야 하는것

- AWS EC2 프리티어의 경우 램1GB, hdd 30GB 라서 자원이 제한된다
- Jenkins - Docker(SpringBoot, MySQL) 을 띄우기위해서는 램이 4~8gb이 필요할 것 같다
    - 우선은 JVM의 성능을 제한하고 , MYSQL로 띄운다
    - 너무 성능이 안나올 경우 AWS에는 H2로 띄운다
    - 혹은 aws rds로 분리시킨다
    - Nginx, Redis는 자원이 제한되어 로컬환경에서만 사용한다
- 자원이 부족할 경우 github action도 고려
- 우선은 부족한 자원을 최대한 활용해 aws프리티어를 사용해 띄우고, 차후 개인 라즈베리파이 서버로 변경 예정

## 생긴 문제

- 예상대로 1GB램을 가지고는, 젠킨스가 build하는 순간에 노드가 멈춤(램 부족)
- Swap을 이용한 가상메모리 방식으로 해결
```shell
# 1. 스왑 파일 생성
# 스왑 파일은 2GB(128MB x 16 = 2,048MB)이다.
# bs는 블록 크기이고 count는 블록 수이다.
# 지정한 블록 크기는 인스턴스에서 사용 가능한 메모리보다 작아야 한다.
# 그렇지 않으면 memory exhausted 오류가 발생한다.
$ sudo dd if=/dev/zero of=/swapfile bs=128M count=16
$ sudo chmod 600 /swapfile
# 스왑 파일에 대한 읽기 및 쓰기 권한을 업데이트
$ sudo mkswap /swapfile
# Linux 스왑 영역을 설정
$ sudo swapon /swapfile
# 스왑 공간에 스왑 파일을 추가하여 스왑 파일을 즉시 사용할 수 있도록 만든다
$ sudo swapon -s
# 절차가 성공했는지 확인
$ sudo vi /etc/fstab
# /etc/fstab 파일을 편집하여 부팅 시 스왑 파일을 활성화
$ /swapfile swap swap defaults 0 0
```
- 차후 라즈베리파이5를 구매해서 사설 웹 서버를 만드는 것으로 해결 예정

### Docker Volume 문제

```shell
docker-compose down -v // 모든 docker container의 volume을 삭제함 -> 컨테이너와 docker 내부에있는 캐시를 삭제함
docker-compose up --build // docker contanier가 새로 생성 및 초기화
```

docker volumn을 삭제하지 않으면 db비밀번호를 바꿔도 비밀번호가 유지되어 비밀번호 변경 후 다시 올릴때 문제가 생길수 있으니 주의해야한다.(db비밀번호 바꿀 생각이라면 jenkins script에 추가 고려해야함)


## Jenkins 스크립트

```jenkins
pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/gunhaa/bitlibrary.git'
    }

    stages {
        stage('Checkout') {
            steps {
                // GitHub에서 코드 가져오기 (prod 브랜치)
                git url: REPO_URL, branch: 'prod'
            }
        }
        
        stage('Create application.yml') {
            steps {
                script {
                    // application.yml 파일 생성
                    writeFile file: 'src/main/resources/application.yml', text:
"""
server:
  port: 7777
spring:
  profiles:
    active: local
  thymeleaf:
    cache: false
#  mysql 사용시
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 
    url: jdbc:mysql://mysql-container:3306/bitlibrary
  jpa:
    hibernate:
      ddl-auto: create
    properties:
      hibernate:
        format_sql: true
        # Querydsl query
        use_sql_comments: true
  security:
    oauth2:
      client:
        registration:
          naver:
            client-name: naver
            client-id: 
            client-secret: 
            redirect-uri: http://localhost:8080/login/oauth2/code/naver
            authorization-grant-type: authorization_code
            scope: name,email
          google:
            client-name: google
            client-id: 
            client-secret: 
            redirect-uri: http://localhost:8080/login/oauth2/code/google
            authorization-grant-type: authorization_code
            scope: profile,email
        provider:
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token-uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user-name-attribute: response
  jwt:
    secret: 
"""
                }
            }
        }

        stage('Stop Existing Containers') {
            steps {
                script {
                    // 실행 중인 모든 컨테이너 종료
                    sh 'docker-compose down'
                }
            }
        }

        stage('Build and Start Containers') {
            steps {
                script {
                    // Docker Compose로 컨테이너 빌드 및 실행
                    sh 'docker-compose up --build -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment succeeded.'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}


```