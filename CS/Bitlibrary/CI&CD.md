# CI/CD
- Docker를 통해 SpringBoot - MySQL 컨테이너 올리기
- Jenkins를 통해 CI/CD를 진행
    - github webhook을 이용한 prod branch만 build한다.
- `내도메인.한국` 에서 도메인 이름 발급
    - `http://bitlibrary.kro.kr/`
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
