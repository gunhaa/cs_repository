## CertBot을 이용한 HTTPS 인증서 재 갱신

1. 현재 인증서 확인

```plaintext
[ec2-user@ip-***-***-***-*** ~]$ sudo certbot certificates
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: bitlibrary.kro.kr
    Serial Number: 55ef29906a6e72a2ec4ad6e10cb1d715aba
    Key Type: ECDSA
    Domains: bitlibrary.kro.kr
    Expiry Date: 2025-08-04 02:06:06+00:00 (INVALID: EXPIRED)
    Certificate Path: /etc/letsencrypt/live/bitlibrary.kro.kr/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/bitlibrary.kro.kr/privkey.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

2. 재갱신

```plaintext
[ec2-user@~***-***-***-*** ~]$ sudo certbot certificates
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: bitlibrary.kro.kr
    Serial Number: 55ef29906a6e72a2ec4ad6e10cb1d715aba
    Key Type: ECDSA
    Domains: bitlibrary.kro.kr
    Expiry Date: 2025-08-04 02:06:06+00:00 (INVALID: EXPIRED)
    Certificate Path: /etc/letsencrypt/live/bitlibrary.kro.kr/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/bitlibrary.kro.kr/privkey.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

3. keystore.p12 파일 교체

```plaintext
[ec2-user@ip-***-***-***-*** validation]$ pwd
/home/ec2-user/validation
[ec2-user@ip-***-***-***-*** validation]$ sudo openssl pkcs12 -export \
-in /etc/letsencrypt/live/bitlibrary.kro.kr/fullchain.pem \
-inkey /etc/letsencrypt/live/bitlibrary.kro.kr/privkey.pem \
-out keystore.p12 \
-name tomcat \
-passout pass:비밀번호
```

4. Jenkins를 이용한 재 빌드
5. 성공
