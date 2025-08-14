## 웹 브라우저를 통해 요청을 보냈을때 돌아오기 까지의 과정

1. DNS에 도메인의 IP 질의한다.
    - DNS에 항상 질의하지 않는다.
    - 브라우저 캐시파일을 탐색한다.
    - windwos기준 가장 먼저 hosts파일을 찾는다.
    - 과거 DNS기록을 Cache해 놓은 DNS Cache를 찾는다. (운영체제, 네트워크,ISP 등의 DNS Cache)
    - 위 과정에서 찾지 못하면 DNS에 질의한다.(설정에 따라서 PC에서 직접 할수도있고, 공유기 설정에 따라 DNS포워딩 기능을 사용해서 질의 후 PC에 전달해 줄 수도 있다.)
        - DNS포워딩은 직접 DNS요청을 처리하지 않고 공유기를 통해 전달하는 것이다.
        - 하는 이유 : DNS캐싱 / 네트워크 보호 (직접 적인 DNS요청 노출 제거) / DNS 설정 통일
2. 서버의 설정에 따라 GSLB/CDN을 통해 서버가 클라이언트에게 적절한 IP를 부여한다.

    - 클라이언트가 DNS에 질의할 때, 도메인에 대한 요청을 처리하는 DNS 서버는 클라이언트의 위치, 서버 상태, 네트워크 부하 등을 기반으로 최적의 서버 IP를 반환한다.
    - 클라이언트가 도메인 example.com을 요청하면, DNS 질의 과정에서 GSLB(Global Server Load Balancing)를 통해 가까운 데이터 센터의 IP를 반환한다.(CDN을 사용하는 경우만 질의를 한다)
    - CDN(GSLB의 한 종류)을 사용하는 경우, 정적 리소스(CSS, JS, 이미지 등)가 캐시된 서버의 IP를 반환한다.
    - 즉 접속할때마다 GSLB 로직에 따라서 IP가 달라질 수 있다.
    - 그럼 세션이 유지되는 중에 서버가 죽어서 다른 곳으로 연결 되는 경우는 어떻게 됨?
        - 연결을 유지하기 위해 여러가지 방법을 사용한다
            - 세션 스티키니스 : 클라이언트가 처음 연결한 서버에 지속적으로 요청을 보낼 수 있도록 하는 방법
            - 세션 복제 : 여러 서버가 동일한 세션 정보를 공유하고, 세션이 이동되더라도 데이터를 잃지 않도록 하는 방식이다(ex.Redis를 이용한 세션 정보 공유)

3. IP가 반환되면 이를 이용해 TCP연결(3way handshake)을 통해 연결한다.

3. TCP 연결이 된다면 클라이언트가 HTTP Request를 서버에 보낸다.
```
// 요청 라인
GET /welcome HTTP/1.1

// 헤더
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Upgrade-Insecure-Requests: 1 // HTTPS로 업그레이드 요청
```

3. 리버스 프록시가 요청을 수신하여 적절한 서버로 요청을 전달한다.

    - 리버스 프록시가 설정한 로드 밸런싱 알고리즘에 따라 서버가 정해진다.

4. DispatcherServlet이 요청을 처리할 적절한 컨트롤러로 전달(어노테이션 매핑 이용)

5. 컨트롤러에서 ViewResolver를 통해 논리적 뷰 이름을 실제 뷰 파일로 변환

6. DispatcherServlet이 모델에 있는 데이터(컨트롤러의 로직 실행)를 뷰에 주입

7. 템플릿 엔진(View)이 모델 데이터를 기반으로 결과를 렌더링

    - "렌더링(Rendering)"은 "데이터를 사용해 최종 결과물을 생성하는 과정"을 의미한다. 

8. 렌더링된 HTML이 클라이언트에 반환(DispatcherServlet이 이를 최종적으로 전달한다)

9. 클라이언트에 Http Response를 보낸다.
```
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Length: 126
Date: Sat, 23 Nov 2024 12:00:00 GMT
Connection: keep-alive

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Welcome</title>
</head>
<body>
    <h1>Welcome to Example.com!</h1>
</body>
</html>
```
### 리버스 프록시란?

- 클라이언트의 요청이 실제 서버(원본 서버)로 바로 전달되지 않고, 반대로 프록시 서버를 거쳐 전달되기 때문에 붙여졌다.
- 일반적인 정방향 프록시(Forward Proxy)와는 동작의 초점이 반대라는 점에서 "리버스"라는 이름이 붙은 것이다. 이를 이해하려면 일반 프록시와 비교해보는 것이 도움이 된다.
- 정방향 프록시 : 클라이언트의 요청을 대신 처리하는 프록시
- 역방향 프록시 : 서버의 요청을 대신 처리하는 프록시

#### 대표 알고리즘
- Round Robin (라운드 로빈)
    - 요청을 순서대로 서버에 분배한다.
- Least Connections (최소 연결 수 방식)
    - 현재 연결 수가 가장 적은 서버로 요청을 전달한다.
- IP Hash
    - 클라이언트의 IP 주소를 해싱하여 특정 서버에 매핑한다.
- RANDOM