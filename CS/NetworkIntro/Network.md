# Network layer (L3)

- IP packet를 이용해 데이터를 옮기는 L3 Network layer
  - packet들이 route되어 옮겨진다
- 우리가 “Wi-Fi 공유기(router)”라고 부르는 장치는 실제로는 라우팅 기능 + 스위칭 기능 + 무선 AP 기능이 통합된 제품이다
  - 대부분의 가정용 공유기는 ISP 모뎀에 의해 하나의 네트워크로 묶여 있으므로, 실질적으로는 L2 스위치 + 무선 브리지 역할만 수행하는 경우가 많다.
  - 즉, 내부 통신은 라우팅이 아니라 스위칭으로 이루어진다.
  - 외부(인터넷)로 나갈 때만 NAT(Network Address Translation) 과 함께 L3 기능이 수행된다.
- route에는 two routing schema가 있다
  - two level로 분리한 이유는 scalability를 위해서이다(For a one-level shortest path routing to work, a node requires to send messages to every other node. → NOT scalable, level1 최단 경로 알고리즘 사용을 위해서는 전체 라우터를 알아야하며 시간 복잡도는 O(n^2)이기에, 최단 경로 라우팅이 사실상 불가능하다)

| 구분                       | 설명                      | 대표 프로토콜                           | 목표                               |
| ------------------------ | ----------------------- | --------------------------------- | -------------------------------- |
| **Intra-domain Routing** | 같은 조직(AS) 내부의 라우터 간 라우팅 | OSPF, RIP, IS-IS, EIGRP           | **Shortest Path (최단 경로)**        |
| **Inter-domain Routing** | 서로 다른 조직(AS) 간 라우팅      | BGP (Border Gateway Protocol) | **Policy-based Routing (정책 기반)** |

- AS: Autonomous System, 하나의 관리자가 통제하는 라우터들의 집합

## inter domain routing - BGP (Border Gateway Protocol) 

- Ethernet의 Gateway에서 외부로 패킷을 옮겨야 할 때 사용되는 프로토콜이다
- BGP는 “외부 네트워크(다른 AS)”로 패킷을 보낼 때 사용하는 Inter-domain Routing Protocol이다.
- 각 AS(자율 시스템)는 BGP를 통해 “내가 알고 있는 목적지 네트워크(prefix)”와 “그 네트워크까지 가는 경로(AS Path)”를 서로 광고(Advertisement) 한다
- BGP는 거리 기반이 아닌 정책 기반(policy-based) 경로 선택을 한다
- BGP는 부지런하지 않으며(실시간이 아니며), 시간에 따른 Batch로(혹은 Event기반) 정보를 받는다
- 즉, BGP는 실제로 목적지까지 패킷을 보내보는 게 아니라, 각 AS가 광고한 경로 정보(Attribute)를 비교하여
가장 적절한 경로를 미리 선택한다
  - 정책이 바뀌는 경우를 대비해, 테이블에는 만료시간이 존재하며 시간이 지난 정보는 사용하지 않는다

## intra domain routing - Shortest Path Routing

- intra domain에서 사용되는 것은 최단거리 알고리즘이다
- AS 내부에서 사용되는 라우팅 방법이다
- 이곳에서는 두 가지 알고리즘이 사용된다
  1. link state-based
  2. distance vector-based

- protocols that use these algorithms
  1. link sate algorithms: the OSPF, the IS-IS
  2. distance vector algorithms: the RIP, the RIPv2, the ICRP
  3. both: the EIGRP

### Link state를 위한 알고리즘 - Dijkstra's algorithm

- Link State Routing: 모든 라우터가 네트워크의 지도를 가지고, Dijkstra 알고리즘으로 최단 경로 트리를 만드는 방법
- 동작 단계

| 단계 | 이름                                 | 설명                                       |
| -- | ---------------------------------- | ---------------------------------------- |
| ①  | **Link State Advertisement (LSA)** | 각 라우터가 “내 이웃들과의 연결 정보”를 브로드캐스트함          |
| ②  | **Link State Database (LSDB)**     | 모든 라우터가 받은 LSA를 모아 전체 네트워크 맵(그래프) 생성 |
| ③  | **Shortest Path Calculation**      | Dijkstra 알고리즘으로 최단 경로 트리(SPF Tree) 계산    |
| ④  | **Routing Table 구성**               | 각 목적지까지의 최적 경로(next-hop) 정보를 테이블로 저장     |

- 가중치가 양의 정수일때만 사용 가능하다

```plaintext
pseudo code 

입력: 그래프 G(V, E), 시작노드 s
출력: s로부터 각 노드까지의 최단 거리 dist[]

1. 모든 노드 v에 대해 dist[v] ← ∞, visited[v] ← false
2. dist[s] ← 0   // 시작 노드는 거리 0
3. 반복 (모든 노드가 방문될 때까지)
    3-1. visited[v] = false 인 노드 중 dist[]가 가장 작은 노드 u 선택
    3-2. visited[u] ← true  // 선택된 노드를 확정
    3-3. u의 모든 인접 노드 v에 대해
         만약 dist[u] + cost(u, v) < dist[v] 이면
             dist[v] ← dist[u] + cost(u, v)
             prev[v] ← u   // 경로 추적용
4. dist[]와 prev[]를 이용해 최단경로 트리(SPF Tree) 구성
```

### Distance vector를 위한 알고리즘 - bellman-ford algorithm

- Distance vector Routing: Distance Vector Routing은 각 라우터가 네트워크 전체를 모르는 대신, “이웃으로부터 받은 거리 정보(distance vector)”만을 사용
- 동작 단계

| 단계 | 이름                           | 설명                                       |
| -- | ---------------------------- | ---------------------------------------- |
| ①  | **초기화 (Initialization)**     | 각 라우터는 자신과 직접 연결된 이웃의 거리만 알고 시작          |
| ②  | **Distance Vector Exchange** | 주기적으로 자신이 알고 있는 거리 테이블을 이웃에게 전송          |
| ③  | **Distance Update**          | 이웃이 보낸 거리 정보 기반으로 “내가 거쳐서 갈 때 더 짧은가?” 검사 |
| ④  | **Routing Table 생성**         | 각 목적지까지의 최단 거리와 다음 홉(next hop)을 저장       |

```plaintext
pseudo code

입력: 그래프 G(V, E), 시작노드 s
출력: s로부터 각 노드까지의 최단 거리 dist[]

1. 모든 노드 v에 대해 dist[v] ← ∞
2. dist[s] ← 0
3. (V - 1)번 반복
    모든 간선 (u, v)에 대해
        만약 dist[u] + cost(u, v) < dist[v] 이면
            dist[v] ← dist[u] + cost(u, v)
            prev[v] ← u
4. 추가로, 음수 사이클 존재 확인:
    모든 간선 (u, v)에 대해
        dist[u] + cost(u, v) < dist[v] 이면
            → 음수 사이클 존재
```

### 두 알고리즘 비교

| 구분      | Link State (OSPF) | Distance Vector (RIP)       |
| ------- | ----------------- | --------------------------- |
| 경로 계산   | 스스로 계산 (Dijkstra) | 이웃의 거리정보로 갱신 (Bellman-Ford) |
| 전송 정보   | 인접 링크 상태          | 목적지까지의 거리                   |
| 전파 방식   | Flooding (전체에 전송) | 주기적 브로드캐스트                  |
| 수렴 속도   | 빠름                | 느림 (루프 발생 가능)               |
| 예시 프로토콜 | OSPF, IS-IS       | RIP, RIPv2                  |

## ANYCAST, MULTICAST routing 

- 송신자가 데이터를 누구에게 보내는가?
- The unicast addressing method indicates that communication through a network
involves a unique sender (source) and a single receiver (destination).(1:1)
- The anycast addressing method forwards messages to a single device of a
specific group of devices.(가장 가까운 한명)
- Multicasting addresses messages for a specific group of devices in a network.(1:N, 특정 그룹의 receivers)
- The broadcast addressing method considers the communication through a
network that involves a single sender (source) and multiple receivers
(destinations). By default, the broadcast receivers are every device connected to
the same network as the sender.(1:N, 같은 네트워크의 모든 receivers)

## adhoc network

- 중앙 장비(Access Point) 없이 인접한 디바이스끼리 직접 통신하는 네트워크
- 자율적이고 임시적 구조로, 노드가 스스로 라우팅 경로를 형성
- 학부 수준에서는 단어의 의미와 단순한 인접 디바이스 간 통신 구조까지만 이해하면 충분