# Https 설정에 생긴 이슈 모음

## CI/CD에서 linux 권한 설정 문제
- ec2-user이 파일의 소유자라면 jenkins가 사용할 수 없다
- 소유자를 jenkins로 바꾸는 편이 명확하다
- 파일만 바꾸는 것이 아니고 -R 옵션을 사용해 재귀적으로 폴더의 권한까지 줘야 jenkins가 CP동작을 수행할 수 있다.

## spring boot docker image build 중 생긴 Connection confuse exception
```shell
#9 0.959 Downloading https://services.gradle.org/distributions/gradle-8.11.1-bin.zip
#9 1.641 
#9 1.643 Exception in thread "main" java.net.ConnectException: Connection refused
#9 1.646 	at java.base/sun.nio.ch.Net.pollConnect(Native Method)
#9 1.646 	at java.base/sun.nio.ch.Net.pollConnectNow(Net.java:672)
```
- 메모리때문에 생긴 단순 오류일 가능성이 있어 다시 시도해봤다(실패)
- jenkins 서비스 재시작 시도(살패)
- tmp 폴더 용량 분배(실패)
    - `sudo mount -o size=4G -t tmpfs tmpfs /tmp`
- EC2 인스턴스 재부팅(성공)
    - `free` 명령어로 남은 메모리 용량을 찾아보니, jenkins가 한번 빌드될때 메모리에 무언가를 cache시키는데, 한번 빌드 되면 이후 빌드부터는 cache로 인해 용량이 부족해서 해당 증상이 발생하는 것으로 추측된다

## application.yml 설정 문제

- yaml파일의 들여쓰기는 \t , \n을 구분한다
- \t 로 \n과 같은 칸을 이동하더라도, 이는 파싱할때 문제를 일으켜 정상적으로 인식되지 않는다
- 주의해야 한다


## OAuth2 로그인을 하더라도 Cookie 미지급 오류
- application.yml 설정 https로 변경 후 빌드 - 실패
- cors 설정 변경, spring security cors 설정 변경 - 실패
- 브라우저 콘솔창에 해당 메시지가 나오고 리다이렉트 되고 있었다

![images](images/OAuth2NaverLoginError.png)

- CSP spring security 설정 변경 - 실패

### X-Forwarded-Proto 헤더 설정/쿠키 설정 변경/iptables 설정 변경(실패)
- iptables 규칙으로 443port를 7777port로 라우팅 시키는데, OAuth2의 요청은 443port로 들어오지만, protocol을 spring boot가 인식하지 못한다는 생각이 들어서 설정을 바꿔봤다
- X-Forwarded-Proto를 설정해서 Spring Boot가 이를 신뢰하도록 ForwardedHeaderFilter를 활성화해서 실행시키는 방법이다.
- X-Forwarded-Proto 헤더 설정
    - 클라이언트가 원래 요청을 보낼 때 사용한 프로토콜(HTTP 또는 HTTPS)을 나타내는 HTTP 헤더
- Spring Security에서 ForwardedHeaderFilter를 활성화해 Spring이 HTTPS 요청으로 인식하도록 설정했다

```java![](https://velog.velcdn.com/images/gunhaa/post/e43690fd-19cb-4eb5-a885-ef21973000d7/image.png)

@Bean
public FilterRegistrationBean<ForwardedHeaderFilter> forwardedHeaderFilter() {
    FilterRegistrationBean<ForwardedHeaderFilter> bean = new FilterRegistrationBean<>();
    bean.setFilter(new ForwardedHeaderFilter());
    return bean;
}
```
```yaml
# application.yaml
server:
  port: 7777
  forward-headers-strategy: framework
```

- Spring Boot가 HTTPS를 신뢰하도록 SameSite=None과 Secure 옵션을 추가한다.

```java
// Spring Boot가 HTTPS 요청으로 인식하도록 설정
http.requiresChannel(channel ->
        channel.anyRequest().requiresSecure()
);
```

- iptables 규칙 수정
    - iptables에서 443 → 7777 포트로 단순히 포워딩만 하고 있는 것을 DNAT와 MASQUERADE를 사용해 HTTPS 트래픽을 더 명확하게 처리한다.
```bash
# 기존 규칙 삭제
sudo iptables -t nat -D PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 443
sudo iptables -t nat -D PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 7777

# HTTP를 HTTPS로 리디렉트
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 127.0.0.1:443

# HTTPS 요청을 Spring Boot의 7777 포트로 전달
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to-destination 127.0.0.1:7777
sudo iptables -t nat -A POSTROUTING -p tcp --dport 7777 -j MASQUERADE
```
- 설정 후에도 쿠키를 못 받아와 실패
- 설정이 미흡한 부분이 있어 추가 조정이 필요할 것으로 판단된다
- 진행 중 다른 방식으로 선회하여 최종적으로 작동 여부를 확인하지 못했다

## spring boot를 443 port에서 실행(성공)
- 의외로 해결 방법은 간단했다
- 443 포트에서 Spring Boot를 직접 실행하니 문제가 해결되었다

### 기존 구조 (443 → 7777 포트 포워딩)

- 클라이언트 → 443(HTTPS) → iptables(7777 포트로 포워딩) → Spring Boot
- Spring Boot는 7777 포트에서 HTTP로 실행 중이므로, OAuth2 로그인 과정에서 SameSite=None; Secure 쿠키가 정상적으로 지급되지 않음
- 브라우저는 HTTPS에서 Secure 쿠키를 요구하지만, Spring Boot는 요청을 HTTP로 인식하여 Secure 옵션이 빠진 쿠키를 반환


### 원인 및 결론

- iptables의 포트 포워딩이 프로토콜까지 전달하는 것이 아니라 단순히 포트만 변경하는 역할을 하는 것으로 보인다.
- 따라서 Spring Boot는 클라이언트 요청이 원래 HTTPS였는지를 인식하지 못하고, HTTP 요청으로 판단하여 Secure 옵션이 빠진 쿠키를 내려보낸 것으로 추측된다
- HTTP 요청에는 프로토콜 정보가 포함되지 않으므로, Spring Boot 입장에서 HTTPS 여부를 알 수 없었다
- 서버는 단순히 요청에 응답할 뿐이므로, 앞으로 프로토콜을 다룰 때 더욱 신중해야 한다