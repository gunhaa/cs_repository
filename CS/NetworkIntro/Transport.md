# Transport layer

- trans + port를 위한 layer이다(port routing)
  1. the end-to-end delivery of information across the Internet
  2. the delivery between an application process in a source and a process in a
destination through ports.
  3. delivery of a packet from a source port to a destination port by using IP
addresses and port numbers
- Key phrase: handshake between ports
  - 3-way handshake to establish a connection
  - 4-way handskake to close a connection
- Two protocols for transport services
  1. User Datagram Protocol (UDP): connectionless delivery of a datagram. not
reliable.
  2. Transmission Control Protocol (TCP): connection-oriented delivery of a
sequence of segments/packets. reliable.

## L4: transport layer

- the Transmission Control Protocol: delivery of TCP segments by possibly
multiplexing, error control, congestion control, flow control, etc.
- A TCP segment contains the information on the source port number, the
destination port number, etc.
- A TCP segment is encapsulated into an IP packet.
- much more reliable

### 3 way handshake - 4 way off