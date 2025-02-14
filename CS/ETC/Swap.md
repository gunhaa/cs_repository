# Swap 메모리 

> 부족한 메모리(RAM)대신 보조기억장치를 이용하는 방법

## 변경 방법
- 2G -> 10G 로 변경
```shell
# 현재 스왑 사용중지
sudo swapoff -a
# 스왑 생성(10gb)
# 일반적으로 1m블록을 많이사용
sudo dd if=/dev/zero of=/swapfile bs=1M count=10240

# 스왑 파일에 대한 읽기 및 쓰기 권한을 업데이트
$ sudo chmod 600 /swapfile

# Linux 스왑 영역을 설정
$ sudo mkswap /swapfile

# 스왑 공간에 스왑 파일을 추가하여 스왑 파일을 즉시 사용할 수 있도록 만든다
$ sudo swapon /swapfile

# 절차가 성공했는지 확인
$ sudo swapon -s
```