# Wifi

> “wireless Ethernet” for WLAN as Ethernet for LAN

> IEEE802.11 standards as Layer-1 and 2 protocols to be deployed in unlicensed bands(누구나 사용가능한 주파수대의 layer1, layer2 protocol)

> Wifi는 규격 이름이며 실제 장비는 AP(Access Point)라고 불린다

- Vision: Connecting everyone and everything, everywhere
- Wi-Fi는 IEEE 802.11 표준을 따르는 무선 LAN 기술이다
  - WLAN(wireless local network)을 이용한 기술이며, 다양한 주파수대를 사용한다
  - 높은 주파수일수록 더 고급 장비가 필요하다
  - 무선 주파수는 귀한 자원이며, 글로벌적으로 관리하는 기구가 존재한다(International Telecommunication Union, ITU)
  - CSMA/CA 기반의 매체 접근 방식
  - 유선 이더넷(802.3)과 마찬가지로 LAN 범위에서 동작하며, 그 위에 IP, TCP/UDP, HTTP 같은 상위 계층이 올라간다
- wifi는 Link layer의 기술이며, 다양한 버전(인터페이스)이 존재한다
- 협력을 통해 발전시킨 결과이며, 시장 지배성이 어느정도 확보되면 기술은 변하기 힘들고 인터페이스는 유지된다

## Wifi의 CSMA/CA

- wifi의 경우 무선 통신이기에 전파(파동)는 여러 파동이 겹칠 수 있다
  - 같은 주파수, 같은 위상 대역에서 신호가 겹치면 간섭이 발생해서 구분이 불가능해진다
  - 이를 극복하기 위해 CSMA/CA(carrier sensing multiple access, collision avoidance)를 사용한다
    - 이 방법은 각 송신자가 고유한 코드(확산 코드)를 사용해 한 주파수 대역을 동시에 사용하는 것이다
    - 무선에서 충돌을 미리 피하기 위해, 먼저 채널을 감지 (carrier Sense)
    - 비어 있으면 송신 
    - 충돌 예상 시 랜덤 지연 (Backoff)
  - 유선의 CSMA/CD(Collision Detection)과 달리, 무선은 충돌을 직접 감지하기 어렵기 때문에 “피하는(Avoidance)” 방식을 택한다
- 무선 통신은 “공유된 공간 매체(공기)” 를 쓰기 때문에 송신자 자신은 자기 신호 때문에 다른 신호를 감지하기 힘들다
  - 이와 반대로 유선에서는 유선(Ethernet)에서는 가능하다
    - 유선에서는 하나의 케이블에 여러 장치가 물려 있다
    - 송신한 신호가 선을 타고 흐르며 즉시 되돌아오거나, 왜곡되면 충돌 감지 가능하다(CSMA/CD)
  - 그러기에 감지하지 못하고 피하기(avoidance)위해 노력한다

### CA (Collision Avoidance) 방법

| 단계 | 이름                                      | 목적                                                                      |
| ---- | ----------------------------------------- | ------------------------------------------------------------------------- |
| 1    | Carrier Sense                             | 전송 중인지 감지                                                          |
| 2    | DIFS Wait                                 | 동시에 시작 방지(채널이 비면, 바로 보내지 않고 일정 시간(DIFS) 동안 대기) |
| 3    | Random Backoff                            | 충돌 확률 줄이기(DIFS 후에도, 무작위 대기 시간(Backoff time)추가)         |
| 4    | RTS(Request to Send) / CTS(Clear to Send) | 숨은 노드 간섭 방지(RTS=보내도 됨?, CTS=가능)                             |
| 5    | ACK                                       | 성공 여부 확인 및 재전송 판단(isSuccess)                                  |

## MIMO(Multiple Input Multiple Output)

- Wi-Fi 4부터 MIMO가 물리계층에 도입되었다
  - AP가 사용자의 upstream으로 request를 받을 때 사용자의 위치를 계산한 뒤, 송신 할 때 사용자의 위치를 파동의 위상 조정으로 빔을 형성(Beamforming)으로 단일 사용자에게 동시에 보내는 기술로 시작되었다(wifi4)
  - 여러 사용자에게 동시에 보내는 기술은 wifi5에 도입되었다(MU - MIMO, Multi User MIMO)
  - Uplink + Downlink MU-MIMO 를 모두 지원하여 AP와 여러 사용자가 양방향으로 동시에 통신할 수 있게 되었다(wifi6) 
    - 여기에 OFDMA (Orthogonal Frequency Division Multiple Access)가 결합되어, 하나의 채널을 여러 주파수 조각(RU)으로 나누어 사용자별로 병렬 전송이 가능해졌다
- 여러 안테나로 동시 송수신 → 속도 향상 / 공간 분리
- 세대별 Wifi MIMO

| 세대        | 표준     | 지원 형태                     | 설명                                                        |
| ----------- | -------- | ----------------------------- | ----------------------------------------------------------- |
| **Wi-Fi 4** | 802.11n  | **SU-MIMO (Single-User)**     | 1:1 통신에서 양방향 MIMO 사용 가능                          |
| **Wi-Fi 5** | 802.11ac | **MU-MIMO (Downlink only)**   | AP→여러 단말 동시 송신만 가능<br>단말→AP은 여전히 순차 전송 |
| **Wi-Fi 6** | 802.11ax | **Uplink + Downlink MU-MIMO** | AP와 여러 단말 간 **양방향** 동시 다중 통신 가능            |

### OFDMA(Orthogonal Frequency Division Multiple Access)

- Wi-Fi 6(802.11ax) 부터 도입된 기술로, 하나의 채널을 여러 주파수 단위(RU, Resource Unit) 로 분할해 여러 사용자가 동시에 통신할 수 있게 한다
- 각 사용자는 자신에게 할당된 주파수 조각만 사용하므로 충돌이 줄고, 대역폭 활용 효율이 높아진다
- CSMA/CA 방식의 순차 전송 한계를 극복해, 저지연·다중 사용자 병렬 통신을 가능하게 한다