# InterNetworking

- layer 3, 4에서 통신하는 방법
- L3의 IP address가 L2 MAC address로 바꾸는 protocol arp
- L3 router가 구성원에게 ip를 할당하는 DHCP protocol
  - L4 transport layer에서 port routing을 통해 많은 인원에게 ip를 할당하는 방법(subnet)

## Addresses and subnets

> 용어를 사람의 배경에 따라 정말 다르게 사용하기 떄문에 용어의 쓰임을 크게 이해해야한다

- def subnet
  - (a narrow sense) A subnet is separated from other subnets by a router or routers
  - (a wide sense) Can multiple routers be in the same subnet
    - It is possible to use a second Wi-Fi router as a range extender to your existing network
    - It is also very possible to create only one network name between the two Wi-Fi routers so your network devices will connect to whichever router has the stronger signal
- def gateway
  - (a narrow sense) .. a gateway router (of an Ethernet network) ... A gateway is
an L3 router that an Ethernet network to another network
  - (a wide sense) A gateway is a device that connect any network to another
- def DNS SERVER
  - A device knows the IP address of a DNS server
  - A DNS server resolves the IP address given a domain name and a host name
  - A DNS server located inside or outside the subnet can work but it may cause
unnecessary delay
- def ARP , the mac address resoulution protocol (MAC)
  - Q] How can devices know the MAC address of the other device on the same
Ethernet, when it only knows the IP address of the other device?
  - A] The ARP enables devices to find the MAC address

## DHCP 

> two quick-fix techniques for the lack of IPv4 addresses -> DHCP/NAT/port forwarding

- IPv4는 2^32개의 ip밖에 사용이 불가해 부족함을 극복할 기술이 필요하다(DHCP/NAT/port forwarding)
- IPv4 할당에는 2가지 방법이 있다
  - static IP address: manual assignment of IP address along with subnet mask,
gateway address, DNS server address
  - dynamic IP address
- Dynamic Host Configuration Protocol (DHCP)
  - A DHCP server has a pool of addresses that it assigns when neededs
  - When a device is attached to the network and it is set to use a dynamic IP
address, it sends a DHCP request
  - The server allocates an address from the pool with expiration time
  - The devices sends a request to renew the lease on the IP address
  - DHCP를 이용해 유동적으로 ip를 할당하기에, 다른 사람이 사용했던 ip를 사용할 수 있다

## NAT Network Address Transalation/Translator

- NAT
  - Network addresses quickly ran out.
  - A new addressing scheme of IPv6 requires new version of the Internet Protocol.
  - a quick fix to reuse IP addresses:
    1. DHCP: static vs. dynamic IP addresses
    2. NAT: public vs. private IP addresses(public은 중복 불가능한 인터넷의 ip, private는 중복 가능한 내부망의 ip를 뜻한다)
  - NAT의 경우 할당 ip가 부족해질 수 있는 것을 transport layer의 port routing을 통해서 해결 할 수 있다
- home routers(예시)
  - A home router usually implement a NAT.
  - It has a set of IP addresses, called Private Addresses, which are also used by
many other home networks.
  - The trick is for a NAT device to use the port numbers of the transport protocol
