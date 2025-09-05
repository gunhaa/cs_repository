# Route와 Service

```javascript

// .. kong service spec
{
    {
        "host": "google.com",
        "id": "bd380f99-659d-415e-b0e7-72ea05df3218",
        "name": "google-service",
        "path": "/v1",
        "port": 80,
        "protocol": "http"
    }
}

// .. kong route spec
{
    "hosts": [
        "naver.com",
        "naver.us"
    ],
        "id": "56c4566c-14cc-4132-9011-4139fcbbe50a",
        "name": "naver-route",
        "paths": [
        "/v1",
        "/v2"
    ],
        "service": {
        "id": "bd380f99-659d-415e-b0e7-72ea05df3218"
    }
}
```

- service의 host는 실제 목적지 서버의 주소(도메인 또는 IP)를 의미한다
- route의 hosts의 host들은 domain을 뜻하는게 아닌, HTTP HEADER의 host를 뜻한다
  - 일반적인 브라우저의 정상적인 HTTP 요청이라면 Host: Domain이 자동적으로 붙어서 들어온다
  - hosts는 실제 존재하는 도메인이다
  - 그럼 kong을 제대로 사용할려면 kong admin api를 이용해 등록도 하고, 도메인도 사서 그곳의 ip를 kong apigateway가 있는곳으로 맞춰야 한다
- route의 paths 들은 일반적인 설정인 strip_path: true인 경우 route로 인식되어 경로를 찾는 시점에 service의 host + path가 합쳐질때, route의 path는 제거된다
- 즉, route는 정말로 보이는 것만을 체크하는 것이고 service는 실제 라우팅처리를 하는것이라고 생각하면 된다
- 즉, 내부 처리를 통해 두가지를 일치시키는게 베스트

| 구분               | 역할                              | 기준                                          | 목적                            |
| :----------------- | :-------------------------------- | :-------------------------------------------- | :------------------------------ |
| `Route`의 `hosts`  | 매칭 규칙 (Matching Rule)         | 클라이언트가 보낸 요청의 `Host` 헤더 값       | "어떤 요청을 받아들일 것인가?"  |
| `Service`의 `host` | 목적지 주소 (Destination Address) | 백엔드 서비스의 실제 도메인 이름 또는 IP 주소 | "그 요청을 어디로 보낼 것인가?" |
