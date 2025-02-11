# bitlibrary 목표와 결과

## 목표
- Spring, MyBatis, JSP, Oracle, JavaScript -> Spring Boot, JPA, MySQL, Thymeleaf, JavaScript, TypeScript 마이그레이션
- CI/CD 파이프라인을 구축
- DNS 구매 후 , Docker, AWS EC2 인스턴스를 이용한 배포
- 특정 규모의 트래픽(TPS 1000~)을 견딜 수 있는 안정적인 시스템을 구축(MySQL Replication, nginx, redis를 이용한 부하분산)
- 테스트 코드로 견고한 앱 구축
- RESTful한 api로 마이그레이션


## 결과
- Spring Boot, JPA, MySQL, Thymeleaf, JavaScript 로 마이그레이션
- Jenkins를 활용해 github prod branch에 webhook을 통한 CI/CD 파이프라인 구축
- DNS 구매(bitlibrary.kro.kr)
- AWS EC2를 통한 배포
- AWS EC2의 자원이 부족해 nginx, redis, MySQL Replication 미완성
    - 자원이 부족해 nginx를 대신해 iptables를 이용한 포트라우팅
    - CloudFlare를 활용한 https 라우팅
    - 차후 라즈베리파이를 구매해 홈 서버 구축 예정
- 트래픽을 견디는 캐싱(redis)은 로컬에서 진행
- JUnit5를 활용한 테스트코드 작성
- Restful한 api 작성
