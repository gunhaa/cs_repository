# Application Layer

- 네트워크 어플리케이션은 클라이언트 프로세스와 서버 프로세스간의 통신이다
  - 이 통신은 OSI 7 layer를 통해 이루어진다
- Buffer를 이용해 네트워크 속도 차이를 조율한다(TCP)
  - 컴퓨터에 존재하는 모든 버퍼는 속도차이를 완충시키고 논리적인 진행을 위한 장소이다
  - 버퍼는 “시간을 공간으로 푸는 구조”
  - 속도 차이에 대한 “자동 조율(responsibility)”은 TCP의 역할
  - 하지만 application layer에서도 버퍼 크기나 송수신 방식(Blocking/Non-blocking, Async I/O 등)을 조정해서 ‘간접적’으로 제어할 수 있다
- 프로세스와 컴퓨터 네트워크 사이의 인터페이스는 socket을 사용한다
  - socket은 os kernel을 통해 버퍼, 변수를 가진 TCP 통신을 만들어내고 이를 이용해 통신한다
    - socket은 다른 transport layer의 protocol도 존재하지만, 일반적으로 tcp/udp socket을 의미한다
    ```C
    // domain: IPv4 or IPv6 / type: socket_stream(tcp), sock_dgram(udp)/ protocol: 일반적으로 도메인, 타입에 따른 자동 선택(TCP/UDP), 확장성을 위해
    int sock = socket(domain, type, protocol);
    ```
  - 어플리케이션 개발자는 socket의 application layer에 관한 모든 통제권을 갖지만, socket의 transport layer에 대한 통제권은 거의 갖지 못한다
  - transport layer에 관한 어플리케이션 개발자의 통제는 transport protocol의 선택, 최대 버퍼와 최대 세그먼트 크기 같은 매개변수 설정 뿐이다
  - 즉, socket은 application process와 transport protocol의 interface이다
- transport layer는 application에게 신뢰적 데이터 전송/처리율/시간/보안을 제공할 수 있다
  - 신뢰적 데이터 전송: 데이터의 정확도 관리, 100% 혹은 일정 수준 이하(UDP)
  - 처리율: 통신을 위해 서로의 속도를 맞춰야한다(r bps)
    - application은 r bps를 요구 할 수 있고, transport protocol은 r bps임을 보장한다
  - 시간: 특정 시간 내(e.g. 100ms)에 도착하는 것을 보장한다
  - 보안: HTTP의 암호화 HTTPS는 transport layer의 역할이다
    - HTTPS연결은 서버는 평소엔 인증서와 개인키를 “보관”만 하고 있다가, 클라이언트가 연결을 시도할 때 그 socket에 TLS(암호화 계층)를 입히면서 인증서를 사용해 보안 세션을 협상(Handshake)하는 구조이다
```plaintext
TLS, Transport Layer Security의 동작(HTTPS)

Client                              Server
------------------------------------------------------------
socket/connect()              ->    bind/listen/accept()
ClientHello                   ->    
                               <-   ServerHello + Certificate + (ServerKeyExchange)
검증(CA, 도메인, 유효성)
ClientKeyExchange (비밀정보 전송: 서버 공개키로 암호화)
                               <-   (서버는 개인키로 복호화)
세션키 생성 (양쪽 동일: 서로의 random + premaster_secret 조합)
ChangeCipherSpec (이제부터 암호화 통신 시작 신호)
Finished (핸드셰이크 무결성 검증)
                               <-   ChangeCipherSpec + Finished
===== TLS Handshake 완료 =====
HTTPS 요청/응답 (대칭키로 암호화된 채널)
```

```C
// HTTPS server implements
#include <openssl/ssl.h>
#include <openssl/err.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

int main() {
    SSL_library_init();
    SSL_load_error_strings();

    const SSL_METHOD *method = TLS_server_method();
    SSL_CTX *ctx = SSL_CTX_new(method);

    // 인증서와 개인키 로드
    SSL_CTX_use_certificate_file(ctx, "server.crt", SSL_FILETYPE_PEM);
    SSL_CTX_use_PrivateKey_file(ctx, "server.key", SSL_FILETYPE_PEM);

    int sock = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(4433);
    addr.sin_addr.s_addr = INADDR_ANY;

    bind(sock, (struct sockaddr*)&addr, sizeof(addr));
    listen(sock, 1);

    printf("HTTPS-like TLS server running on 4433...\n");

    while (1) {
        int client = accept(sock, NULL, NULL);
        SSL *ssl = SSL_new(ctx);
        SSL_set_fd(ssl, client);

        if (SSL_accept(ssl) <= 0) {
            ERR_print_errors_fp(stderr);
        } else {
            const char *response =
                "HTTP/1.1 200 OK\r\n"
                "Content-Length: 5\r\n\r\nHello";
            SSL_write(ssl, response, strlen(response));
        }

        SSL_shutdown(ssl);
        SSL_free(ssl);
        close(client);
    }

    close(sock);
    SSL_CTX_free(ctx);
}
```

## HTTP Protocol

- 현대 웹의 중심이며, RFC 1945, 7230, 7540에 정의되어 있다
- HTTP는 두 가지 프로그램으로 구현된다(client, server)
  - client와 server는 http메시지를 교환하여 통신한다
- HTTP는 TCP를 전송 프로토콜로 사용한다
  - HTTP는 TCP socket 위에서 “문자열 형태의 요청/응답 메시지”를 주고받는 규약이다
- Header를 통홰서 HTTP Server, Client의 동작을 정하지만, 이는 규약이며 요청일 뿐이다
  - 예를 들어 `Connnection: keep-alive`를 사용해도 server가 규약을 잘 구현하지 않았다면 socket이 keep-alive되지 못하고 닫힐 수 있다
  - 스프링은 HTTP의 기본 규약(RFC 7230 등)에 맞춰 소켓 열기/닫기, keep-alive 처리, thread 관리, connection timeout 같은 걸 직접 안 해도 되게 만들어진 “서버 추상화 프레임워크”이다
    - 실제 동작은 기본적으로 Tomcat(Servlet Container)이 수행한다
- HTTP는 stateless인데 keep-alive가 존재 해도 되는가? 그냥 소켓만 다시 안만들고 유지시키고, context자체는 전혀 없는 stateless 통신하는 것인가?
  - TCP는 stateful(상태 기반) 연결 프로토콜이다
  - HTTP는 TCP 위에서 돌아가는 stateless(무상태)애플리케이션 프로토콜이다
  - 즉, Keep-Alive는 TCP 연결(stateful)을 유지하는 것이지, HTTP의 “stateless” 특성을 바꾸는 건 아니다
  - TCP는 “연결형(connected)” 프로토콜이며, 연결이 열리면 양쪽 OS의 커널은 연결 상태를 계속 추적(state) 한다
  - HTTP의 “stateless”는 TCP의 연결 유지 여부와는 별개로, 요청(request)과 응답(response)이 서로 독립적이라는 의미이다
- websocket은 연결이 지속된 tcp통신일뿐이다
  - 특별한 시그널을 줘서 양쪽이 둘다 websocket이 구현이 되어있다면 연결시킨다
  - WebSocket의 본질: “HTTP 위에서 시작된 지속형 TCP 스트림”이다
  - 즉, 처음에는 HTTP 요청으로 시작해서 이후 특정 시그널(Handshake 요청/응답) 을 주고받은 뒤, 같은 TCP 소켓을 유지한 채 HTTP 프로토콜을 WebSocket 프로토콜로 전환(Upgrade) 하는 구조이다

### TCP Buffer

- TCP Buffer는
  1) 애플리케이션의 데이터 생산 속도와 네트워크의 실제 전송 속도 차이를 “완충”하기 위한 큐
  2) 아직 ACK 받지 못한 데이터를 재전송하기 위한 저장소라서CP 구조상 필수이다
- 네트워크 연결 속도에 따른 천천히를 알아서 조절하는 주체가 TCP이고, 그 TCP가 조절하는 동안 데이터가 잠시 머무는 곳이 TCP Buffer이다

### HTTP Caching

### HTTP/2

- 2015년에 표준화된 HTTP/2[RFC7540]는 1997년 표준화된 HTTP/1.1이후 새로운 첫 번째 HTTP 버전이다
- HTTP/2의 주요 목표는 하나의 TCP 연결상에서 멀티플렉싱 요청/응답 지연시간을 줄이는데 있다
  - 이전 HTTP/1.1의 경우는 웹 페이지에서 여러 객체가 필요할 경우(index.html, index.css, image1 ..)그 갯수 만큼의 TCP Connection, 즉 여러 socket이 필요했다(병렬 불가, 직렬적으로만 가능)
  - 하지만 HTTP/2에서는 이 오버헤드를 극복하기위해서 HTTP/2에서는 하나의 TCP 연결 위에서 여러 개의 스트림(stream)을 동시에 주고받는 멀티플렉싱을 지원한다
    - Multiplexing: 여러개의 입력을 하나의 출력으로 만들어주는 기능
    - 각 stream은 독립된 요청/응답 쌍이며, 단일 연결(TCP socket)을 공유한다
    - 즉, 하나의 TCP 연결에서 여러 요청의 데이터 프레임(frame)이 섞여 stream형태로 전송되며, 수신 측(브라우저)은 각 프레임에 포함된 Stream ID를 기준으로 데이터를 다시 조립하여 원래의 요청별 응답을 복원한다
    - 이로 인해 socket을 만드는 시간을 절약하고, tcp handshake 낭비를 덜하게되며 서버 측에서는 이로 인해 서버는 하나의 연결 위에서 여러 요청을 동시에 처리할 수 있어 병렬 응답이 가능하며, TCP 연결 생성 오버헤드가 줄어든다
  - HTTP/2의 멀티플렉싱(데이터의 통합)은 브라우저가 진행하며, 개발자는 개입할 수 없다
- 요청 우선순위화, 서버 푸시, HTTP Header의 효율적인 압출을 제공한다

## DNS, domain name service

- DNS는 인터넷의 디렉터리 서비스이다
- 53번 port udp protocol을 사용하여 통신한다 
  - gethostbyname()은 UNIX/POSIX 계열 시스템에서 도메인 이름(Hostname)을 IP 주소로 변환(Resolve)하는 함수이며, 이를 이용하여 application은 DNS를 블랙박스처럼 사용한다
- 사람의 식별 방법은 이름보다 주민 등록 번호가 좋은 것처럼, 인터넷 호스트도 식별할 수 있는 방법이 필요하다
  - host name(호스트 이름)을 식별자로 사용한다 e.g. google.co.kr, naver.com
  - host name을 사용한다면 기억하기 쉬워 사용자들이 좋아한다
  - 하지만 host name은 인터넷에 host 위치에 대한 정보를 제공하지 않는다
- 즉, 사람은 기억하기 쉬운 host name identifier를 좋아하지만, router는 고정 길이의 계층 구조를 가진 IP주소를 좋아한다
  - 이런 선호 차이를 절충하기 위해 host name을 ip주소로 변환해주는 디렉터리 서비스가 필요하다
  - 이것이 인터넷 DNS의 주요 임무이다
- DNS는 DNS server의 계층구조로 구현된 분산 데이터베이스이며, host가 분산 데이터베이스로 질의하도록 허락하는 application layer protocol이다
  - root DNS server에서 시작되는 분산 데이터베이스 시스템이며, 전 세계에 1000개이상의 root server 인스턴스가 있다(진짜 root server는 13개 존재하며, 다른 root들은 이 13개의 복제이다)
- DNS는 anycast를 사용해 client의 요청을 처리한다
  1. DNS 루트/캐시/공용 DNS 서버들은 Anycast IP를 사용해 전 세계 여러 위치에 동일한 서버 인스턴스를 운영한다
  2. 클라이언트가 DNS 서버 주소로 요청을 보내면 BGP 라우팅 규칙에 따라 가장 가까운(최단 경로) Anycast DNS 서버로 패킷이 전달된다
  3. 사용자는 동일한 IP 주소로 요청하지만, 실제 응답은 지리적으로 가장 인접한 DNS 서버 인스턴스에서 처리된다

### Anycast

- Anycast는 같은 IP 주소를 여러 서버 인스턴스가 공유하는 네트워크 메커니즘이며, DNS는 이에 최적화된 서비스이다
  - client가 DNS 질의를 할 때, 라우터는 네트워크 상에서 가장 짧은 AS-path 또는 지리적으로 가장 가까운 POP(Point of Presence) 를 선택해 패킷을 전달한다
  - 사용자 입장에서는 하나의 IP로 요청했지만, 실제로는 가장 가까운 서버에서 응답을 받으므로 지연(latency)이 줄어들고, 특정 서버가 장애를 일으켜도 자동으로 다른 인스턴스로 라우팅되는 고가용성이 확보된다
- Anycast가 중요한 이유는 단순히 DNS 때문이 아니라, 전 세계적으로 분산 운영되는 서비스들의 핵심 성능·안정성·보안을 책임지는 네트워크 기반 기술이기 때문이다
  - 성능 최적화를 위해 가장 많이 사용하는 CDN이 Anycast를 이용한 대표적인 기술이다
  - Anycast = 글로벌 접속 지점 선택 기술
  - CDN(Content Distribution Network) = 근접 서버에서 데이터 제공 기술
- anycast는 BGP 라우팅 규칙에 따라 '네트워크 경로상 가장 짧고 안정적인 경로'를 선택할 뿐이지 최적화된 라우팅 방법이 아니다
  - 글로벌 규모 서비스의 경우 DNS는 최적화된 라우팅을 위해 GSLB(Global Server Load Balancing)를 사용한다
  - 글로벌 규모 서비스의 경우 Authoritative DNS는 GSLB 정책 엔진과 연동하여 지역/부하/장애/정책 기반으로 적절한 서버 IP를 반환할 수 있다
- DNS 질의 흐름
  1. 클라이언트 → Local DNS(Resolver) 로 질의
  2. 캐시가 없으면 Authoritative DNS 로 재귀 요청
  3. Authoritative DNS + GSLB 엔진이 정책 기반으로 최적 IP 선택
  4. Local DNS가 응답을 사용자에게 반환 후 TTL 동안 캐시

### CDN, Content Distribution Network | Content Delivery Network

- 인터넷 비디오 스트리밍 서비스(e.g. youtube)가 스트리밍 서비스를 어떻게 끊김 없이 제공할 수 있을까?
  - 가장 단순한 방법은 단일한 거대 데이터 센터를 구축하고 모든 비디오 자료를 데이터 센터에 저장한 뒤 전 세계 사용자에게 비디오 스트림을 데이터 센터로부터 직접 전송하는 것이다
    - 하지만 이 방법에는 세 가지 중대한 문제가 있다
    1. client가 데이터 센터로부터 먼 곳에 있을 경우 속도에 대한 문제가 발생한다. 링크들 중 하나라도 비디오 소비율보다 낮은 전송 용량을 가진다면 종단 간 처리율이 낮아진다면 사용자는 짜증스러운 화면 정지 현상을 겪게된다
    2. 인기 있는 비디오의 경우 같은 통신 링크를 통해 여러 번 반복적으로 전송될 것이다. 이 경우 네트워크 대역폭의 낭비는 물론이고 인터넷 비디오 회사는 ISP에게 동일한 bit를 전송하는 것에 대해 중복 비용을 지불하는 결과를 초래한다
    3. 단일 데이터 센터를 구축할 경우 한 번의 장애로 전체 서비스가 중단될 수 있는 위험이 있다
- 이러한 문제를 해결하기 위해 비디오 스트리밍 회사는 CDN을 사용한다
  - CDN은 다수의 지점에 분산된 서버를 운용하며, 데이터의 복사본을 분산 서버에 저장한다
  - 사업자가 소유해 같인 운영하는 사설 CDN일 수도 있고, CDN 사업을 하는 third-party CDN일 수도 있다
  - CDN은 각 클러스터마다 모든 비디오의 복사분을 유지할 필요가 없다
    - 어떤 데이터는 특정 클러스터에서만 인기있을 수 있다
    - 그래서 CDN은 push방식이 아닌 pull방식을 사용한다