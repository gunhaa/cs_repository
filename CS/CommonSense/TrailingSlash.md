# Trailing slash

@PathVariable 전략들을 알아보다가 trailing slash 관련 전략이 나와 정리하게 되었다.

## Trailing slash란?
URL의 끝에 붙이는 슬래시(/)를 트레일링 슬래시(trailing slash)라고 부른다.
트레일링 슬래시를 URL 끝에 붙이는 것은 해당 URL 리소스가 디렉토리(directory)임을 의미한다. 이를 붙이지 않은 것은 해당 URL 리소스가 파일(file)임을 의미한다.

## Trailing slash에 따른 서버의 기본 동작(static resource의 경우)
- https://www.google.com/example 과 같이 파일을 나타낼 경우 서버는 trailing slash가 없는 URL을 파일로 간주한다
  1. 해당 이름의 파일이 존재하는지를 먼저 확인한다.
  2. 없을 경우, 해당 이름의 디렉토리를 확인한다.
  3. 디렉토리가 있으면, 그 안의 기본 파일(기본값은 index.html)을 확인한다.

- https://www.google.com/example/ 과 같이 디렉토리를 나타낼 경우 서버는 trailing slash가 있는 URL을 디렉토리로 간주한다
  1. 해당 이름의 디렉토리를 확인한다.
   2. 디렉토리가 있으면, 그 안의 기본 파일(기본값은 index.html)을 확인한다.

 출처 : https://djkeh.github.io/articles/Why-do-we-put-slash-at-the-end-of-URL-kor/

- Controller로 들어가는 요청은 개발자의 설정에 따라서 달라진다.

## 다른 웹사이트들 보면 파일이 아니라도 /를 끝에 안 붙이는 경우가 있던데?
 HTTP 스펙상 Request에 경로를 생략할 수는 없다. 별다른 경로가 없는 웹사이트 메인에 접속하는 경우에도 HTTP Request는 GET / HTTP/1.1과 같이 루트를 의미하는 / 경로가 반드시 포함된다. 이 점을 고려해볼 때, https://www.naver.com은 온전한 URL이 아니다. 온전한 URL 요청이 아니므로, https://www.naver.com 요청을 보내면 서버에서 https://www.naver.com/과 같이 Redirection 하는 게 아니라, 애당초 요청을 보낼 수 없었어야 한다.

 https://www.naver.com를 입력하면, 웹 브라우저가 여기에 /를 붙여서 https://www.naver.com/ 으로 요청을 발송한다. 실제로 헤더를 분석해 보면 무슨 일이 있었는지 알 수 있다.
```
GET / HTTP/1.1
Host: www.naver.com
```