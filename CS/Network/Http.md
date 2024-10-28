# HTTP(HyperText Transfer Protocol)

> Port:80 Transport layer Protocol : TCP

> HTTP는 TCP 위에서 동작하는 응용 계층 프로토콜이다. 따라서 HTTP 요청은 TCP 방식의 일종이라고 할 수 있다

> 웹 서버에 웹페이지를 요청(request)하고 웹서버는 응답(reply)을 한다.

> HyperText Markup Language (HTML)을 사용하여 정보를 전달한다.

> 데이터가 텍스트로 전달되기 때문에 보안에 취약하다.

![http2](images/http2.png)

# HTTPS(HyperText Transfer Protocol Secure)

> Port:443 Transport layer Protocol : TCP

> 암호화를 사용한 Http 프로토콜 

> 웹 서버에 웹페이지를 요청(request)하고 웹서버는 응답(reply)을 한다.

> HyperText Markup Language (HTML)을 사용하여 정보를 전달한다.

> 데이터가 암호화되어 전달되기 때문에 보안에 좋다.

## Https의 연결과정(핸드쉐이크 과정)


1. HTTPS 통신이 시작될 때, 클라이언트와 서버는 TLS 핸드셰이크 과정을 통해 서로의 신원을 확인하고, 세션 키를 생성하여 통신을 시작한다. 이 과정에는 다음 단계가 포함된다:
2. 클라이언트가 서버에 연결 요청
3. 서버가 인증서(공개 키 포함)를 클라이언트에 전송
4. 클라이언트가 인증서를 검증한 후, 세션 키 생성
5. 클라이언트와 서버가 세션 키를 교환하여 암호화된 연결 설정

![http1](images/http1.png)


