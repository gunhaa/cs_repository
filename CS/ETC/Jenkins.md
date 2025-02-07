# AWS EC2 인스턴스에서 젠킨스 설치하기


## AWS EC2 인스턴스 로그인 후 진행

```bash
# 기존 스크립트 (필요한 패키지 설치 및 Jenkins 추가)
sudo yum update -y

# Jenkins 패키지 추가
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins.io/redhat/jenkins.repo && sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key

# Java, Git, Docker 설치
sudo yum install -y java-11-amazon-corretto jenkins git docker 


# 기존 EC2에 설치된 Jenkins 중단 (필요 시)
sudo service jenkins stop || true  # Jenkins 서비스가 없을 경우 무시
sudo yum remove -y jenkins || true # Jenkins 패키지 제거

# Jenkins Docker 컨테이너 실행
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts


# 초기 비밀번호 확인 명령어 출력
echo "Jenkins is now running in a Docker container."
echo "To get the initial admin password, run: docker logs jenkins | grep 'Please use the following password'"

```
<<<수정전

---

수정후>>>

```bash

# 자바17 설치 (자바 설치가 되어있지 않으면 젠킨스가 설치가 되지 않는다)
sudo yum install java-17-amazon-corretto

# wget을 통해 설치 파일을 다운로드 한다
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

# 젠킨스 설치 key import
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# 젠킨스 패키지 설치
sudo yum install jenkins -y

# 젠킨스 설치확인
rpm -qa | grep jenkins

# /etc/sysconfig/jenkins 파일에 포트를 추가
sudo nano /etc/sysconfig/jenkins
# 추가 내용
HTTP_PORT=8080

#재시작
sudo systemctl restart jenkins

# 젠킨스 시작
sudo service jenkins start

# 젠킨스 프로세스 확인
ps -ef | grep jenkins

# 실행 확인
sudo systemctl status jenkins

# 관리자 비밀번호 확인
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Jenkins 웹 인터페이스 접속
http://<EC2 퍼블릭 IP>:8080

```

## Docker로 실행 방법

```bash
# 시스템 업데이트
sudo yum update -y

# Java, Git, Docker 설치 (Jenkins 실행을 위한 기본 패키지 설치)
sudo yum install -y java-1.8.0-amazon-corretto git docker

# Jenkins Docker 이미지 Pull
sudo docker pull jenkins/jenkins:lts

# 기존 Jenkins 서비스 중단 (서비스가 없으면 무시)
sudo service jenkins stop || true

# 기존 Jenkins 패키지 제거
sudo yum remove -y jenkins || true

# Jenkins Docker 컨테이너 실행
sudo docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts

# Jenkins 초기 관리자 비밀번호 확인
docker logs jenkins | grep 'Please use the following password'

# Jenkins 웹 인터페이스 접속
http://<EC2 퍼블릭 IP>:8080


```

## 이후 순서
- 관리자 비밀번호 확인한 것을 이용해 관리자 콘솔 로그인
- 추천 플러그인 모두 설치
- 관리자 계정/비밀번호 입력 
- 다음으로 계속 눌러서 관리자 콘솔로 이동

## 제일 먼저 할일 : git과 연결하기

- 좌측의 Jenkins credential > System > Global credential > Add credential 로 이동
- 해당 카테고리에서 Git을 등록 해야한다.(Username with password)
- Jenkins에 github 권한 부여하기 
    - github 프로필 클릭 후 Settings
    - Developer settings 들어가기
    - Personal access tokens
    - Tokens(classic)
    - note : `jenkins` / repo 권한만 부여
    - 토큰 값을 복사한다.
- Jenkins 콘솔에서
    - USERNAME : github id
    - PASSWORD : 방금 얻은 토큰
    - ID : 방금 입력한 것에 대한 ID 부여 (gittest)
    - 생성 완료
- `https://github.com/frontalnh/temp` 예제 github 저장소, clone 권장
- Jenkinsfile 작성


- docker 사용을 위해서 plugin을 jenkins에 설치해야한다.
- jenkins plugin manager-> available plugins -> Docker , Docker Pipeline 설치
- jenkins에서 도커를 사용하기위해 AWS EC2 인스턴스에서 `groupadd docker` , `sudo usermod -aG docker jenkins` 를 입력해야한다

```Jenkinsfile
// 파이프 라인의 시작
pipeline {
    // 스테이지 별로 다른 거
    // 어떤 노예를 쓸 것인가
    agent any

    //pipeline이 몇분 주기로 가져올 것인가 -> cron syntax
    triggers {
        pollSCM('*/3 * * * *')
    }

    //pipeline안에서 쓸 환경변수를 입혀주는 것
    //EC2 콘솔에서 등록해주어야 한다.
    environment {
      // AWS access key라고 생각하면된다.
      // AWS 명령어를 쓸 수 있도록
      // 시스템 환경변수로 들어간다.
      // AWS IAM(직원들에게 id발급해줄때 쓰는 콘솔)항목에 들어가서 jenkins 사용자를 만든다. (iam-액세스관리-사용자)
      // 기존 정책 직접 연결 - 모든 권한 (실습 중이라서)
      // 만든 계정을 클릭 후 엑세스 키 만들기로 이동
      // AWS 컴퓨팅 서비스에서 실행되는 애플리케이션 선택
      // 설명 태그값 jenkins
      // 액세스 키 ID / 비밀 액세스 키 
      // 젠킨스 콘솔로 이동
      // Add credential 이동
      // secret text 설정 - secret(액세스 키) / ID : awsAccessKeyId 입력
      // Add credential 이동
      // secret text 설정 - secret(비밀 액세스 키) / ID : awsSecretAccessKey 입력
      // 해당 스크립트와 매핑시킨다.

      AWS_ACCESS_KEY_ID = credentials('awsAccessKeyId')
      AWS_SECRET_ACCESS_KEY = credentials('awsSecretAccessKey')
      AWS_DEFAULT_REGION = 'ap-northeast-2'
      HOME = '.' // Avoid npm root owned
    }

    // 
    stages {
        // 레포지토리를 다운로드 받음
        stage('Prepare') {
            agent any
            
            steps {
                echo 'Clonning Repository'

                git url: 'https://github.com/gunhaa/temp.git',
                    branch: 'main',
                    // git과 연결될때 사용한 것의 id를 입력하면 된다.
                    credentialsId: 'gittest'
            }

            post {
                // If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
                // 보내는 섹션으로, 메일도 보내고 슬랙도 보내는 등 많은 동작을 할 수 있다.
                success {
                    echo 'Successfully pull Repository'
                }

                always {
                  echo "i tried..."
                }

                cleanup {
                  echo "after all other post condition"
                }
            }
        }

        
        stage('Only for production'){
          when {
            // 이 브랜치가 prod이고,
            branch 'production'
                              // app_env가 prod이면, stage를 실행해라 라는 스크립트
            environment name: 'APP_ENV', value: 'prod'
            anyof {
              environment name: 'DEPLOY_TO', value: 'production'
              environment name: 'DEPLOY_TO', value: 'staging'
            }
          }
        }
        
        // aws s3 에 파일을 올림
        stage('Deploy Frontend') {
          steps {
            echo 'Deploying Frontend'
            // 프론트엔드 디렉토리의 정적파일들을 S3 에 올림, 이 전에 반드시 EC2 instance profile 을 등록해야함.
            // 현재 폴더 website안에 있는 파일들을 s3로 옮긴다.
            // s3가 없는 상태이므로, s3를 만들어야 한다.
            // 아마존 콘솔 s3 이동
            // 버킷만들기 - 이름 : 아무거나(전 세계에서 사용해서 겹친다) - 스킵 - 퍼블릭 액세스 차단해제(과금 안되려면 나중에 삭제해야 한다.) 
            // 실제 prod라면 해당 위치에서 프론트엔드 배포를 한다.(lint 등)
            dir ('./website'){
                sh '''
                aws s3 sync ./ s3://gunhatest
                '''
            }
          }

          post {
              // If Maven was able to run the tests, even if some of the test
              // failed, record the test results and archive the jar file.
              success {
                  echo 'Successfully Cloned Repository'
                  // 성공 시 메일 보내기
                  // 메일을 보내기 위해서
                  // Jenkins 콘솔로이동 -> Jenkins 관리 -> System -> Extended E-mail Notification에 입력 or E-mail로 알려줌의 SMTP 서버에서 `smtp.gmail.com` 입력 -> 고급 -> Use SMTP Authentication -> 사용자명/비밀번호 입력(구글)
                  mail  to: 'wh8299@gmail.com',
                        subject: "Deploy Frontend Success",
                        body: "Successfully deployed frontend!"

              }

              failure {
                  echo 'I failed :('

                  mail  to: 'wh8299@gmail.com',
                        subject: "Failed Pipelinee",
                        body: "Something is wrong with deploy frontend"
              }
          }
        }
        
        stage('Lint Backend') {
            // Docker plugin and Docker Pipeline 두개를 깔아야 사용가능!
            agent {
              // 도커를 설치해서 노드 설치
              // 이후 린팅
              docker {
                image 'node:latest'
              }
            }
            
            steps {
              dir ('./server'){
                  // Install necessary Node.js dependencies
                  // Run linting to check for code quality and style issues
                  sh '''
                  npm install&&
                  npm run lint
                  '''
              }
            }
        }
        
        stage('Test Backend') {
          agent {
            docker {
              image 'node:latest'
            }
          }
          steps {
            echo 'Test Backend'

            dir ('./server'){
              // 테스트코드 실행
                sh '''
                npm install
                npm run test
                '''
            }
          }
        }
        
        stage('Bulid Backend') {
          agent any
          steps {
            echo 'Build Backend'

            dir ('./server'){
                sh """
                docker build . -t server --build-arg env=${PROD}
                """
            }
          }

          post {
            // 배포하다 실패하면 여기서 중단시켜야해서, 중단시키는 방법이다.
            failure {
              error 'This pipeline stops here...'
            }
          }
        }
        
        stage('Deploy Backend') {
          agent any

          steps {
            echo 'Build Backend'

            dir ('./server'){
              //docker rm -f $(docker ps -aq) 도커 컨테이너가 있다면 모두 종료시킨다.
                sh '''
                docker run -p 80:80 -d server
                '''
            }
          }

          post {
            success {
              mail  to: 'wh8299@gmail.com',
                    subject: "Deploy Success",
                    body: "Successfully deployed!"
                  
            }
          }
        }
    }
}

```
## Jenkins bitlibrary 스크립트

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


## 이후

- jenkins 콘솔에서 `새로운 아이템` 으로 이동
- Configure에서 다음 항목을 체크한다
    - Github project : url에 git 주소(.git 삭제)
    - Poll SCM 