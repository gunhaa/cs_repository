
# 웹 브라우저를 통해 요청을 보냈을때 돌아오기 까지의 과정

1. 클라이언트가 HTTP 요청을 보냄
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

2. DNS 도메인에 대해 IP 질의 후, IP로 연결

3. 리버스 프록시를 통한 로드 밸런싱된 서버로 요청 전달

4. DispatcherServlet이 요청을 처리할 적절한 컨트롤러로 전달(어노테이션 매핑 이용)

5. 컨트롤러에서 ViewResolver를 통해 논리적 뷰 이름을 실제 뷰 파일로 변환

6. DispatcherServlet이 모델에 있는 데이터(컨트롤러의 로직 실행)를 뷰에 주입

7. 템플릿 엔진(View)이 모델 데이터를 기반으로 결과를 렌더링

    - "렌더링(Rendering)"은 "데이터를 사용해 최종 결과물을 생성하는 과정"을 의미한다. 

8. 렌더링된 HTML이 클라이언트에 반환(DispatcherServlet이 이를 최종적으로 전달한다)
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
## 리버스 프록시란?

- 클라이언트의 요청이 실제 서버(원본 서버)로 바로 전달되지 않고, 반대로 프록시 서버를 거쳐 전달되기 때문에 붙여졌다.
- 일반적인 정방향 프록시(Forward Proxy)와는 동작의 초점이 반대라는 점에서 "리버스"라는 이름이 붙은 것이다. 이를 이해하려면 일반 프록시와 비교해보는 것이 도움이 된다.
- 정방향 프록시 : 클라이언트의 요청을 대신 처리하는 프록시
- 역방향 프록시 : 서버의 요청을 대신 처리하는 프록시
