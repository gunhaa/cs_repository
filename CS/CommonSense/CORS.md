# CORS란 무엇인가?

> CORS(Cross-Origin Resource Sharing)는 웹 애플리케이션이 다른 도메인, 프로토콜 또는 포트에서 리소스에 접근할 수 있도록 허용하는 보안 기능이다. 기본적으로 웹 브라우저는 보안상의 이유로 서로 다른 출처에서의 요청을 제한하는데, CORS는 이를 관리하고 제어하는 메커니즘이다.

## 왜 CORS가 필요한가?

> 기본적으로 브라우저(매우중요)는 서로 다른 출처 간의 요청을 차단하여 XSS(교차 사이트 스크립팅) 공격을 방지한다. CORS는 이를 우회할 수 있는 방법을 제공한다.


## CORS 설정 예시

> CORS는 받은 요청을 허용할지 말지에 대한 서버가 요청을 받을때 기본설정이다. 

```javascript

const express = require('express');
const cors = require('cors');
const app = express();

// CORS 설정
app.use(cors({
    origin: 'https://example-client.com', // 허용할 출처
    methods: 'GET,POST,PUT,DELETE', // 허용할 메서드
    allowedHeaders: 'Content-Type,Authorization', // 허용할 헤더
    credentials: true // 인증 정보 허용
}));

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello, CORS!' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

```

### 예시

front가 localhost:8080/insert로 서버에 요청을 보내면 <br>
Orgin은 http://localhost:8080 / protocol: http /domain : localhost/port : 8080 이 된다.