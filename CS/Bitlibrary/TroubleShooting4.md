# Https 설정에 생긴 문제들

## linux 권한 설정 문제
- ec2-user이 파일의 소유자라면 jenkins가 사용할 수 없다
- 소유자를 jenkins로 바꾸는 편이 명확하다
- 파일만 바꾸는 것이 아니고 -R 옵션을 사용해 재귀적으로 폴더의 권한까지 줘야 jenkins가 파일 CP동작을 수행할 수 있다.

## spring boot docker image build 중 생긴 Connection confuse exception
```shell
#9 0.959 Downloading https://services.gradle.org/distributions/gradle-8.11.1-bin.zip
#9 1.641 
#9 1.643 Exception in thread "main" java.net.ConnectException: Connection refused
#9 1.646 	at java.base/sun.nio.ch.Net.pollConnect(Native Method)
#9 1.646 	at java.base/sun.nio.ch.Net.pollConnectNow(Net.java:672)
```
- 메모리때문에 생긴 단순 오류일 가능성이 있어 다시 시도해봤다(실패)