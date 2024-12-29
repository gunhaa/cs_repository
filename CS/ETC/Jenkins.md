# AWS EC2 인스턴스에서 젠킨스 설치하기


## AWS EC2 인스턴스 로그인 후 진행

```bash
# 기존 스크립트 (필요한 패키지 설치 및 Jenkins 추가)
sudo yum update -y

# Jenkins 패키지 추가
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins.io/redhat/jenkins.repo && sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key

# Java, Git, Docker 설치
sudo yum install -y java-1.8.0-amazon-corretto jenkins git docker 


# 기존 EC2에 설치된 Jenkins 중단 (필요 시)
sudo service jenkins stop || true  # Jenkins 서비스가 없을 경우 무시
sudo yum remove -y jenkins || true # Jenkins 패키지 제거

# Jenkins Docker 컨테이너 실행
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts


# 초기 비밀번호 확인 명령어 출력
echo "Jenkins is now running in a Docker container."
echo "To get the initial admin password, run: docker logs jenkins | grep 'Please use the following password'"

```


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
- 해당 카테고리에서 Git을 등록 해야한다.
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
