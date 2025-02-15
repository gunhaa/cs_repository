# Wireshark 패킷 분석

> 와이어샤크는 대표적인 패킷 캡처 프로그램이다.


## TCP 분석

- 3-way-handshake로 연결한다
- port번호를 직접 관리하는 계층이다

### 3-way-handshake
![handshake1](images/3-way-handshake-1.png)
![handshake2](images/3-way-handshake-2.png)
![handshake3](images/3-way-handshake-3.png)
![handshake4](images/3-way-handshake-4.png)
![handshake5](images/3-way-handshake-5.png)
![handshake6](images/3-way-handshake-6.png)
- 해당 handshake 과정의 구성
    1. 192.168.0.1이 10.10.10.1 에게 연결 요청을 보내는 패킷
    2. 10.10.10.1이 192.168.0.1에게 확인 응답을 보내는 패킷
    3. 192.168.0.1이 10.10.10.1 에게 확인 응답을 보내는 패킷

1. 192.168.0.1이 10.10.10.1 에게 연결 요청을 보내는 패킷 분석
    - 송신지 포트번호 49589(동적 포트번호), 목적지 포트번호 80
    - SYN bit(시작시 1, 0x002)
    - 실제 순서 번호 3588415412
2. 10.10.10.1이 192.168.0.1에게 확인 응답을 보내는 패킷
    - 송신지 포트번호 80, 목적지포트번호 49859
    - flags 0x012로 SYN,ACK flag가 활성화 된 것을 확인할 수 있다
    - 실제 순서 번호 697411256
3. 192.168.0.1이 10.10.10.1 에게 확인 응답을 보내는 패킷
    - 송신지 포트번호 49589, 목적지 80
    - flags 0x010 으로 ACK만 활성화
    - 실제 순서 번호 3588415413(첫번째 요청 이후로 순서를 알린다)

- TCP의 특징은 순서가 있는 연결(전송 순서 보장)이라 순서가 중요하기에 데이터의 순서 보장과 패킷 재전송이 필요한 경우 이를 기준으로 데이터를 처리한다(순서 번호는 각 데이터의 위치 추적을 위한 중요한 정보이다)

### TCP connection close

