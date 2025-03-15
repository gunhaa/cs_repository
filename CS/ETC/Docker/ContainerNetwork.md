# Docker network
- Docker의 통신 방식은 3가지가 있다
    - 외부와 통신(HTTP 등)
    - 내부 로컬 머신과 통신
    - 실행중인 컨테이너와 통신

## 외부와 통신
- 특별한 설정 없이 잘 작동한다
- node axios를 통한 통신

## 로컬 머신과 통신 방법

- `host.docker.internal` 이라는 특별한 이름으로 localhost를 대체할 수 있다

```javascript
mongoose.connect(
  'mongodb://host.docker.internal:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
```

## 컨테이너와 통신

- 두 가지 방법이 있다
    - 컨테이너의 IP를 확인해 IP를 이용한 연결
    - 네트워크를 구성해, 컨테이너의 이름을 IP와 매핑시키는 방법

### IP를 이용한 연결
```json
//  docker container inspect mongodb 
// IPAddress 127.17.0.2 로 연결 시킬 수 있다
...
"Networks": {
     "bridge": {
         "IPAMConfig": null,
         "Links": null,
         "Aliases": null,
         "MacAddress": "02:42:ac:11:00:02",
         "DriverOpts": null,
         "NetworkID": "c84c6b8e610ec069f74bba9ea1b3fb9a4df1259132379e9e0bd0f7fd58059770",
         "EndpointID": "252328d304fd76ef2bdce29b71c77b9d5a176b174a49b6d8777d7b06856d9f1e",
         "Gateway": "172.17.0.1",
         "IPAddress": "172.17.0.2",
         "IPPrefixLen": 16,
         "IPv6Gateway": "",
         "GlobalIPv6Address": "",
         "GlobalIPv6PrefixLen": 0,
         "DNSNames": null
     }
 }
```

```javascript
mongoose.connect(
  'mongodb://172.17.0.2:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
```

### Docker-network를 이용한 연결

- 컨테이너 이름:포트번호를 넣으면 된다
- 이름이 IP 주소로 자동 변환된다
- 같은 네트워크에 있다면 자동 변환이 이루어진다

- 네트워크 생성
    - `docker network create favorites-net`
- docker run 에서 옵션으로 --network my_network 를 넣으면 네트워크에 참여할 수 있다.
    - `docker run -d --name mongodb --network favorites-net mongo`
    - mongodb의 경우 -p 옵션이 없는 것은 외부에서 접근할 필요가 없어서 그런 것이다
    - `docker run --name favorites --network favorites-net -d --rm -p 3000:3000 favorites-node`

```javascript
mongoose.connect(
  'mongodb://mongodb:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
```