# bitlibrary https 전환

- OAuth2 구글로그인을 하기위해서는 페이지가 https처리가 되어야 허가를 내준다
- 보안상 http를 이용한 접속이 브라우저에서 권장되지 않는다.
- 요즘 사이트들은 https방식을 이용하지 않는 사이트가 없다
- 등등의 이유로 인해서 https프로토콜을 프로젝트에 적용시키기로 하였다

## 적용시키는 방법

- cloudflare를 통한 프록시 라우팅
    - 발급받은 kro.kr 도메인의 네임서버가 한국에만 존재해서 cloudflare에서 도메인으로 잡히지 않아 서비스를 이용할 수 없어서 실패
- nginx를 통한 라우팅과 https처리
    - 해당 방식은 쉬우나, 메모리가 부족하기도 하고 직접 다 해보고 싶어서 기각
- 설정을 직접 다 해 보는 것이 더 도움이 될 것 같아 lets encrypt를 사용해 springboot에서 직접 인증서 처리를 구현하기로 함

## lets encrypt로 springboot 인증서 처리

- 이를 실행하기 위해서는 크게 3가지가 필요하다.
    - 인증 받은 PKCS12(Jenkins의 application.yml에 필요한 설정 넣기)
    - Docker가 빌드할때 서버의 인증 파일을 복사해와 springboot resource폴더에 넣고 이미지 빌드(Dockerfile 수정)
    - 80번포트, 443번 포트를 열고 springboot가 켜진 포트로 라우팅

### aws ec2에서 인증서 발급받기
```shell
# yum 업데이트
sudo yum update -y

# certbot 설치
sudo yum install certbot -y

# 해당 방식은 80번 포트에서 도메인 인증을 진행하므로 iptables의 80->7777라우팅 기능을 제거한 후 진행해야 한다.
[ec2-user@ip-172-31-10-107 ~]$ sudo iptables -t nat -L -n -v
Chain PREROUTING (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
71982 3940K DOCKER     all  --  *      *       0.0.0.0/0            0.0.0.0/0            ADDRTYPE match dst-type LOCAL
   60  2761 REDIRECT   tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:443 redir ports 7777
 2190  116K REDIRECT   tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:80 redir ports 7777

Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         

Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
    0     0 DOCKER     all  --  *      *       0.0.0.0/0           !127.0.0.0/8          ADDRTYPE match dst-type LOCAL

Chain POSTROUTING (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
    8   484 MASQUERADE  all  --  *      !br-1f2138a52076  172.21.0.0/16        0.0.0.0/0           
  316 19367 MASQUERADE  all  --  *      !docker0  172.17.0.0/16        0.0.0.0/0           
    0     0 MASQUERADE  tcp  --  *      *       172.21.0.2           172.21.0.2           tcp dpt:3306
    0     0 MASQUERADE  tcp  --  *      *       172.21.0.3           172.21.0.3           tcp dpt:7777

Chain DOCKER (2 references)
 pkts bytes target     prot opt in     out     source               destination         
    0     0 RETURN     all  --  br-1f2138a52076 *       0.0.0.0/0            0.0.0.0/0           
    0     0 RETURN     all  --  docker0 *       0.0.0.0/0            0.0.0.0/0           
    0     0 DNAT       tcp  --  !br-1f2138a52076 *       0.0.0.0/0            0.0.0.0/0            tcp dpt:3306 to:172.21.0.2:3306
  127  6252 DNAT       tcp  --  !br-1f2138a52076 *       0.0.0.0/0            0.0.0.0/0            tcp dpt:7777 to:172.21.0.3:7777
[ec2-user@ip-172-31-10-107 ~]$ sudo iptables -t nat -D PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 7777

# 인증서 발급 진행
sudo certbot certonly --standalone

# 결과
Please enter the domain name(s) you would like on your certificate (comma and/or
space separated) (Enter 'c' to cancel): bitlibrary.kro.kr
Requesting a certificate for bitlibrary.kro.kr

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/bitlibrary.kro.kr/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/bitlibrary.kro.kr/privkey.pem
This certificate expires on 2025-05-13.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


```

- standalone인증 방식은 bitlibrary.kro.kr이 외부에서 접근 가능해야 certbot이 정상적으로 인증을 진행하고 인증서를 발급받을 수 있다.
- live 폴더는 접근 권한을 요구하기때문에 chmod로 권한을 부여하거나 우회하는 방법으로 접근해야 한다.

```shell
# pem이 있는 곳으로 이동 후 스프링부트에서 인식가능한 PKCS로 변경
# 입력 후 비밀번호 설정해야한다.
sudo openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out keystore.p12 -name tomcat -CAfile chain.pem -caname root
```

### Jenkins stage를 통해 서버내의 keystore.p12 가져오기/application.yml 설정 추가

```shell

# copy stage 추가
        stage('Copy Keystore') {
            steps {
                sh 'cp /home/ec2-user/validation/keystore.p12 src/main/resources/'
            }
        }
        

# yml 설정 추가
        stage('Create application.yml') {
            steps {
                script {
                    writeFile file: 'src/main/resources/application.yml', text:
"""
server:
  port: 7777
  ssl:
	key-store: classpath:keystore.p12
	key-store-type: PKCS12
	key-store-password: 비밀번호
    ..
```
- 보안적으로 더 좋게 개선할 여지가 분명히 존재