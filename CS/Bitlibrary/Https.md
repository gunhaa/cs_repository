# bitlibrary https 전환

- OAuth2 구글로그인을 하기위해서는 페이지가 https처리가 되어야 허가를 내준다
- 보안상 http를 이용한 접속이 브라우저에서 권장되지 않는다.
- 요즘 사이트들은 https방식을 이용하지 않는 사이트가 없다
- 등등의 이유로 인해서 https프로토콜을 프로젝트에 적용시키기로 하였다

## 적용시키는 방법

- cloudflare를 통한 프록시 라우팅
    - 발급받은 kro.kr 도메인의 네임서버가 한국에만 존재해서 cloudflare에서 도메인으로 잡히지 않아 서비스를 이용할 수 없어서 실패
- nginx를 통한 라우팅과 https처리
    - 해당 방식은 가능할 것 같으나, 안 그래도 메모리가 부족한 ec2라서 기각
- lets encrypt를 사용해 springboot에서 직접 인증서 처리를 구현하기로 함

## lets encrypt로 springboot 인증서 처리

- 이를 실행하기 위해서는 크게 3가지가 필요하다.
    - 인증 받은 PKCS12(Jenkins의 application.yml에 필요한 설정 넣기)
    - Docker가 빌드할때 서버의 인증 파일을 복사해와 springboot resource폴더에 넣고 이미지 빌드(Dockerfile 수정)
    - 80번포트, 443번 포트를 열고 springboot가 켜진 포트로 라우팅
