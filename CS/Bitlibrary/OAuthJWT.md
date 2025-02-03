
# 세션 기반 회원 가입, OAuth2 JWT로 리팩토링

## 시나리오(jwtfilter)

1. access 토큰 확인
2. 있고 유효하다면 loginMember 변수에 jwt의 값을 넣는다.
3. 있는데 유효하지 않다면 refresh토큰을 통해 reissue를 시도한다
4. reissue가 실패하면 loginMember에는 아무 값이 들어가지 않고 "/"로 리다이렉트 시킨다
5. 유효하지 않은 jwt를 사용할 경우 토큰을 사용불가 시키고 넘긴다
6. 유효한 경우 filter request에 loginMember속성을 추가한다.
        
## 진행

1. OAuth2를 이용한 JWT로 구글, 네이버 로그인을 연동시킨다.

2. 로그인이 필요한 페이지가 있다면, 그 대신 로그인을 할 수 있는 메인 페이지로 이동 시킨다.

3. 메인 페이지에선 네이버/구글 로그인 버튼을 이용해 두 가지 OAuth2를 이용한 로그인을 진행할 수 있다.

## 서비스 로직

4. /oauth2/authorization/{naver | google} 으로 로그인 페이지를 연결시킨다.

5. 로그인 성공시 /login/oauth2/code/{naver | google}로 리다이렉트 시킨다.

6. 여기서 발급 받은 code를 이용해 Access토큰을 발급 받는다.

7. OAuth2LoginAuthenticationProvider를 스프링이 실행시키는데 이 객체는 DefaultOAuth2UserService 를 상속시킨 클래스를 실행시킨다.

8. DefaultOAuth2UserService를 상속한 클래스는 OAuth2User구현체를 반환해 이를 이용해서 Authentication이 Security Context에 저장되어 일시적 Session을 만든다. 

    - 해당 Service에서 로그인한 username(ex. naver YiKN_IuaBzIWFfY8pxQ 황건하)을 확인하고, username이 등록되지 않았다면 가입시킨다.

    - 로그인 성공 핸들러에서 access,refresh 토큰을 부여한다. 토큰은 username, email, role, expiredMs를 갖는다.

    - refresh토큰은 부여하고, db에 넣는다.

    - 여러 사용자의 다중 로그인을 허용한다

9. 로그인 이후 접근 권한이 필요한 경우 jwtfilter를 이용해 일시적인 세션을 만든다.


## 토큰 관리

- access토큰이 만료되면, 클라이언트는 refresh토큰을 제시해서 재발급 받을 수 있다.
      - access 토큰 만료는 403에러를 반환하고, access토큰 자체가 없다면 401을 반환한다
      - 403에러를 받으면 프론트측은 다시 /reissue로 다시 재발급을 요청한다.
- 재발급 될때는 /reissue 엔드포인트에서 refresh토큰과 함께 재발급하는 rotate방식을 사용하고, 기존의 
refresh토큰은 db에서 삭제하고 token블랙리스트에 올린다.
- access토큰은 현재 프로젝트에선 뷰 템플릿 방식을 쓰므로 react처럼 메모리에 넣는 방식을 채택할수는 없고, 일반 쿠키를 이용한다.
- refresh토큰의 경우는 httponly쿠키를 통해 보관한다.
- cron syntax를 통해 00시에 createdDate가 하루가 넘은것은 자동으로 삭제시킨다. (Refresh토큰, token블랙리스트 테이블)
- 관리자는 admin페이지에서 token 블랙리스트 테이블에 블랙리스트를 추가할 수 있다.(런타임에 보안을 유지할 수 있는 기능 추가)
- 해당 테이블은 주기적인 삭제가 되므로 로그를 남긴다.


## 로그아웃

- refresh token을 유효성 검사 후 유효하다면 이를 db에서 삭제시키고 블랙리스트에 등록한다 또한 서버에서 refresh 쿠키 삭제를 처리한다(Max-Age = 0) , 또한 js를 이용해 브라우저의 access토큰을 제거한다. 
