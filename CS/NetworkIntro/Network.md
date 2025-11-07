# Network layer (L3)

- IP packet를 이용해 데이터를 옮기는 L3 Network layer
  - packet들이 route되어 옮겨진다
- 우리가 “Wi-Fi 공유기(router)”라고 부르는 장치는 실제로는 라우팅 기능 + 스위칭 기능 + 무선 AP 기능이 통합된 제품이다
  - 대부분의 가정용 공유기는 ISP 모뎀에 의해 하나의 네트워크로 묶여 있으므로, 실질적으로는 L2 스위치 + 무선 브리지 역할만 수행하는 경우가 많다.
  - 즉, 내부 통신은 라우팅이 아니라 스위칭으로 이루어진다.
  - 외부(인터넷)로 나갈 때만 NAT(Network Address Translation) 과 함께 L3 기능이 수행된다.
- route에는 2가지 방식이 있다

| 구분                       | 설명                      | 대표 프로토콜                           | 목표                               |
| ------------------------ | ----------------------- | --------------------------------- | -------------------------------- |
| **Intra-domain Routing** | 같은 조직(AS) 내부의 라우터 간 라우팅 | OSPF, RIP, IS-IS, EIGRP           | **Shortest Path (최단 경로)**        |
| **Inter-domain Routing** | 서로 다른 조직(AS) 간 라우팅      | BGP (Border Gateway Protocol) | **Policy-based Routing (정책 기반)** |

- AS: Autonomous System, 하나의 관리자가 통제하는 라우터들의 집합

## BGP (Border Gateway Protocol)

- Ethernet의 Gateway에서 외부로 패킷을 옮겨야 할 때 사용되는 프로토콜이다
- BGP는 “외부 네트워크(다른 AS)”로 패킷을 보낼 때 사용하는 Inter-domain Routing Protocol이다.
- 각 AS(자율 시스템)는 BGP를 통해 “내가 알고 있는 목적지 네트워크(prefix)”와 “그 네트워크까지 가는 경로(AS Path)”를 서로 광고(Advertisement) 한다
- BGP는 거리 기반이 아닌 정책 기반(policy-based) 경로 선택을 한다
- BGP는 부지런하지 않으며(실시간이 아니며), 시간에 따른 Batch로(혹은 Event기반) 정보를 받는다
- 즉, BGP는 실제로 목적지까지 패킷을 보내보는 게 아니라, 각 AS가 광고한 경로 정보(Attribute)를 비교하여
가장 적절한 경로를 미리 선택한다
  - 정책이 바뀌는 경우를 대비해, 테이블에는 만료시간이 존재하며 시간이 지난 정보는 사용하지 않는다