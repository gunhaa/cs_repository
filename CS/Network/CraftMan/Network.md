# Network란?

- 왜 필요할까
    - 디버그에 도움이 된다
    - 왜 오류가 생겼는지 이해 할 수 있다.
- 컴퓨터끼리 소통을 하는 방법
    1. 케이블을 연결 시킨다
    2. 전자기파로 연결 시킨다.
    3. 허브로 연결 시킨다.
- 허브는 무엇인가?
    1. 허브 사진
        
        ![image.png](images/network1.webp)
        
    2. 허브는 케이블을 연결시켜서 컴퓨터끼리 소통을 가능하게 한다.
    3. 허브의 문제점? 
        1. 정보가 모든 컴퓨터에 전달 된다.
        2. 정보 충돌이 일어날 수 있다.(A와 B가 동시에 보내면 충돌이 일어나서 문제가 생김)
    4. 정보 충돌 해결방법
        1. 더미 정보를 보낸 후, 충돌이 일어나지 않았다면 진짜 정보를 보낸다.(CSMA/CD Collision Detection)
        2. 그래서 네트워크가 느리다.
    5. 모든 정보 전달 해결방법
        1. 정보를 보내는 사람과 받는 사람을 적어서 보낸다.(MAC주소 Medium Access Control)
            1. MAC ⇒ 네트워크 인터페이스 카드에 각인된 물리적 주소. 네트워크 인터페이스 카드는 네트워크에 연결되는 디바이스 들에 존재한다. (ex 컴퓨터 블루투스 핸드폰)
            2. MAC 주소 (6bytes,48 bits)
            fe:1b:63:84:45:e6 (16진법 표기)
            254 : 27 : 99 : 132 : 69 : 233 (10진법 표기0~255, 약 280조개의 mac주소가 존재한다.)
            첫3 바이트(IEEE에서 기업이나 단체에 할당 해 준다. 그러므로 첫 3바이트를 알면 어떤 기업이나 단체의 MAC주소인지 알 수 있다.) 뒤 3바이트는 차례대로 기업이나 단체에서 할당한다.
            bit는 0 1//의 2진수를 표기함
            3. 구조
            
            ![image.png](images/network2.webp)
            
        2. 자기의 정보가 아니라면 버림(MAC 주소 이용)
- 프레임
    1. ‘프레임 형식으로 정보를 보낸다.’
    2. 프레임의 구조(소스 MAC주소는 보내는 사람의 MAC 주소임)
        
        ![image.png](images/network3.webp)
        
        많이 사용하는 ETHERNET FRAME의 구조
        
        ![image.png](images/network4.webp)
        
    3. 이 ETHERNET FRAME을 이용해서 통신한다.
- 스위치
    1. 허브가 기능이 별로여서, 이제는 switch를 사용한다
    2. 공유기가 대표적인 스위치이다.
    3. 허브와 다르게 MAC 주소가 저장되어 있어서 모두에게 보내지 않고 정확하게 정보를 보낸다.
    4. 충돌이 일어나지 않는다.
    5. 케이블이 2개가 있어서, 데이터를 보내는 케이블과 데이터를 받는 케이블이 따로 있다.
- 라우터
    1. 라우터란?
    
    ![image.png](images/network5.webp)
    
    1. WAN (wide area network) 를 사용하는 방법
        
        ![image.png](images/network6.webp)
        
        1. WAN에는 인트라넷, 인터넷이 있다
        2. 라우터와 라우터간에는 MAC 주소를 사용하지 않는다.
        
        ![image.png](images/network7.webp)
        
        ![image.png](images/network8.webp)
        
        c. 대신 IP 주소를 사용한다.
        
    2. 라우터와 스위치의 차이점

        라우터(Router)와 스위치(Switch)는 네트워크 장비지만, 하는 역할과 동작 방식이 다르다.  

        ### 1. 기능 차이  

        |  구분  |  라우터(Router)  |  스위치(Switch)  |
        |--------|----------------|----------------|
        | **역할** | 네트워크 간 데이터 전송 (L3) | 네트워크 내 데이터 전송 (L2) |
        | **동작 계층** | 3계층 (네트워크 계층) | 2계층 (데이터 링크 계층) |
        | **사용되는 주소** | IP 주소 | MAC 주소 |
        | **데이터 전달 방식** | 목적지 IP를 보고 최적 경로 결정 후 패킷 전달 | MAC 주소 기반으로 프레임을 해당 포트로 전송 |
        | **주요 기능** | LAN과 WAN 연결, 인터넷 연결, 다른 네트워크 간 통신 | 같은 네트워크 내 장치 간 통신 최적화 |

        ### 2. 왜 나눠졌을까?  

        네트워크를 효과적으로 관리하려면 역할을 분리하는 것이 필요하다.  

        - **스위치가 먼저 등장**  
        초창기에는 네트워크 장비가 단순한 허브(Hub)였는데, 네트워크 트래픽이 증가하면서 데이터를 목적지까지 정확하게 보내는 스위치가 발전함.  
        - **라우터의 등장**  
        기업이나 기관에서 여러 개의 네트워크를 운영하면서, 서로 다른 네트워크 간 통신이 필요해졌고, 이를 위해 라우터가 등장함.  

        즉, **스위치는 같은 네트워크 안에서 효율적인 데이터 전송을, 라우터는 네트워크 간 데이터를 전달하는 역할을 맡으면서 최적화된 장비로 발전한 것**이다.  

        ### 3. 요즘은 경계가 모호해지는 중  

        최근에는 L3 스위치처럼 라우터 기능을 포함한 고급 스위치도 많다. 하지만 **대규모 네트워크에서는 여전히 역할을 분리하는 것이 효율적**이므로 라우터와 스위치는 나뉘어 사용된다.


    
- 프레임과 패킷
    1. 라우팅을 통해 정보를 보내기 위해서 패킷을 사용한다.
    IP 패킷의 구조
        
        ![image.png](images/network9.webp)
        
        ![image.png](images/network10.webp)
        
        ![image.png](images/network11.webp)
        
- 라우팅
    
    ![image.png](images/network12.webp)
    
    ![image.png](images/network13.webp)
    
    ![image.png](images/network14.webp)
    
    ![image.png](images/network15.webp)
    
- ARP PACKET
    
    ![image.png](images/network16.webp)
    
    ![image.png](images/network17.webp)
    
    이를 통해 라우터의 MAC주소를 알아낼 수 있다. ARP에서는 MAC 주소를 모르고 IP는 알고있는 상태이다.
    
    ![image.png](images/network18.webp)
    
    네트워크 설계 과정에서 컴퓨터는 이미 라우터의 ip주소를 알고있다.
    
    ![image.png](images/network19.webp)
    
    전체에게 물어본다. 찾는 ip주소와 자기의 ip주소가 일치하면 대답을 한다.
    
    ![image.png](images/network20.webp)
    
    ![image.png](images/network21.webp)
    
    ![image.png](images/network22.webp)
    
    ![image.png](images/network23.webp)
    
- Ethernet ARP PACKET 심화
    
    ![image.png](images/network24.webp)
    
    ![image.png](images/network25.webp)
    
    SFD는 data의 시작지점을 알려준다.
    SFD는 **10101011**이라는 고유한 패턴을 가지며, 이 패턴은 프리엠블의 끝을 나타내고, 실제 데이터 프레임의 시작을 알리는 신호입니다.
    
    PREAMBLE은 이더넷 프레임의 **프리엠블(PREAMBLE)**은 데이터 전송을 시작하기 전에 네트워크의 송신 장치와 수신 장치 간의 동기화를 맞추기 위해 사용되는 비트 시퀀스입니다. 이는 이더넷 프레임의 가장 앞부분에 위치하며, 네트워크 장치가 전송 신호를 인식하고 준비할 수 있도록 도와줍니다.
    
    ![image.png](images/network26.webp)
    
    ![image.png](images/network27.webp)
    
    ![image.png](images/network28.webp)
    
    ![image.png](images/network29.webp)
    
    그림 보면 이해될듯..
    
- IPv4 구조 정리
    
    ![image.png](images/network30.webp)
    
    ![image.png](images/network31.webp)
    
    ![image.png](images/network32.webp)
    
    ![image.png](images/network33.webp)
    
    ![image.png](images/network34.webp)
    
    이 구조로 연락을 주고받는다.. 하지만 문제가 많다. 신뢰성부터 시작해서 기타등등
    
- 라우터와 라우터 간의 소통
    
    ![image.png](images/network35.webp)
    
    ![image.png](images/network36.webp)
    
    ![image.png](images/network37.webp)
    
    **라우팅 테이블**은 IP 주소와 관련된 네트워크 경로 정보를 저장하는 데이터 구조로, IP 패킷이 목적지까지 효율적으로 전달될 수 있도록 도와줍니다. 하지만 라우팅 테이블은 IP 주소와 MAC 주소의 매핑을 포함하지 않습니다. 이러한 매핑은 **ARP(Address Resolution Protocol)**에서 처리됩니다.
    
    ### **라우팅 테이블의 역할**
    
    라우팅 테이블은 다음과 같은 정보를 포함합니다:
    
    1. **목적지 네트워크(대상 IP 주소)**:
        - 라우팅 테이블의 각 항목은 특정 목적지 IP 주소 범위를 나타냅니다. 이 범위는 특정 네트워크나 서브넷을 정의합니다.
    2. **네트워크 인터페이스(출력 인터페이스)**:
        - IP 패킷을 해당 목적지 네트워크로 전달하기 위해 사용하는 네트워크 인터페이스입니다. 라우터가 패킷을 전송할 물리적 또는 가상 인터페이스를 지정합니다.
    3. **다음 홉(Next Hop)**:
        - 목적지 네트워크까지 패킷을 전달하기 위해 패킷이 전송될 다음 라우터의 IP 주소입니다. 이 주소는 패킷이 현재 라우터를 거쳐서 다음 라우터로 이동하는 경로를 정의합니다.
    4. **라우팅 메트릭(Routing Metric)**:
        - 특정 경로의 비용 또는 우선순위를 나타냅니다. 이는 네트워크 성능, 대역폭, 지연 시간 등과 같은 요소를 기반으로 설정됩니다.
    5. **라우팅 프로토콜 정보**:
        - 라우팅 테이블은 다양한 라우팅 프로토콜(BGP, OSPF, RIP 등)에 의해 업데이트됩니다. 각 프로토콜은 라우팅 테이블을 동적으로 변경하여 네트워크의 변화에 적응합니다.
    
    ### **라우팅 테이블의 예**
    
    라우팅 테이블의 항목은 다음과 같이 나타낼 수 있습니다
    
    ```lua
    lua코드 복사
    | 목적지 네트워크    | 넥스트 홉 IP 주소 | 출력 인터페이스 | 메트릭 |
    |--------------------|-------------------|-----------------|--------|
    | 192.168.1.0/24     | 192.168.0.1       | eth0            | 10     |
    | 10.0.0.0/8         | 10.1.1.1          | eth1            | 20     |
    | 0.0.0.0/0          | 192.168.0.254     | eth0            | 1      |
    
    ```
    
    - **목적지 네트워크**: 전송할 패킷의 대상 네트워크 주소와 서브넷 마스크입니다.
    - **넥스트 홉 IP 주소**: 패킷이 다음에 전송될 라우터의 IP 주소입니다.
    - **출력 인터페이스**: 패킷이 전송될 네트워크 인터페이스입니다.
    - **메트릭**: 경로의 비용을 나타내며, 더 낮은 값일수록 우선순위가 높습니다.
- Point to Point 프레임
    
    ![image.png](images/network38.webp)
    
    라우터와 라우터간의 정보 전달 방법(ppp프레임) 이다.
    
    정보를 감싸서 보낸다.
    
    ppp는 앞뒤에 다른 데이터를 넣어서 감싸는거지?
    
    ### ChatGPT의 말:
    
    ChatGPT
    
    네, 맞습니다. **PPP (Point-to-Point Protocol)**는 네트워크 계층에서 데이터 링크 계층으로 데이터를 전송하기 위한 프로토콜입니다. PPP는 데이터를 전송할 때, 데이터를 **프레임**으로 감싸서 패킷의 구조를 정의합니다. 이를 통해 데이터의 신뢰성을 높이고, 다양한 네트워크 프로토콜을 지원할 수 있습니다.
    
    ![image.png](images/network39.webp)
    
    ![image.png](images/network40.webp)
    
    데이터가 감싸지고 (PPP이용) , 라우터 테이블을 이용해서 목적지 까지 보낸다
    
- 결론
    
    ![image.png](images/network41.webp)
    
    ![image.png](images/network42.webp)