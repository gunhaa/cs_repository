
# Docker 주요 명령어

- `docker run ${Image id | Image tag}`
    - 이미지를 이용해 새로운 컨테이너를 만든다
    - 기본적으로 attached 모드가 디폴트이다
    - `-d` 옵션을 통해 detached 모드로 실행 가능하다
    - attached 모드에서는 server에서 출력되는 값을 콘솔에서 수신한다.
- `docker start ${Container id | Container name}`
    - 컨테이너를 시작 한다
    - 기본적으로 detached가 디폴트이다
    - `-a` 옵션을 통해 attached mode로 시작 할 수 있다
    - `docker attach ${container name}` 으로 attached 할 수 있다
- `docker ps`
    - 실행중인 컨테이너의 상태를 출력한다
    - `-a` 옵션으로 전체 상태를 출력 할 수 있다
- `docker logs ${container name}` 
    - 컨테이너의 로그를 확인 할 수 있다
    - attached mode일때 콘솔에 출력됬던 로그
    - `-f` follow 옵션을 사용해 컨테이너와 연결 시킬 수 있다