# Docker data

1. 어플리케이션(이미지)
    - readonly, 실행중인 어플리케이션의 코드는 바뀔 수 없다
2. Temporary App data
    - 임시 저장 파일로, 읽거나 쓸 수 있다
    - log file 등이 포함된다
3. Permanent App data
    - 파일에 저장하거나, 데이터 베이스에 저장해 컨테이너가 멈추거나 재시작 되어도 잃어버리지 않아야 하는 정보이다.
    - User accounts 등이 포함된다.


## temporary app data

- 컨테이너 내부에 특수 파일 시스템이 존재(격리된 파일 시스템)하고, 잠겨서 접근 할 수 없다.
- 호스트 폴더나 호스트 머신, 컨테이너에 대한 연결이 사라진다.

## Volume
> Managed By Docker
- 도커에 내장된 기능
- 컨테이너가 제거되어도 계속해서 유지되는 데이터
- 호스트 머신의 폴더이다
    - 호스트 컴퓨터에 장착된 하드 드라이브에 존재하여 사용가능하거나 컨테이너로 매핑되는 것
- 컨테이너 내부의 폴더를 호스트 머신 상의 컨테이너 외부 폴더에 연결 할 수 있다
- 폴더의 변경 사항은 다른 폴더에 반영된다
- 컨테이너에 볼륨을 추가하는 경우 해당 볼륨은 제거되지 않으며 컨테이너가 제거 되어도 해당 볼륨이 유지된다.
- 컨테이너는 볼륨에 데이터를 읽고 쓸 수 있다.
- 해당 명령으로 사용 할 수 있다.
- 볼륨에는 Anonymous volume, Named Volume이 있다
    - Anonymous의 경우 컨테이너가 종료되면 사라진다
    - named의 경우 컨테이너가 종료되도 유지 된다
- `docker volume ls` 로 확인 할 수 있다
- 도커 볼륨이 관리하는 폴더는 어딘가에 숨겨져 있으며, 호스트 머신에서 접근 할 수 없다.
- `docker run -d -p 3000:80 --rm --name feedback-app -v feedback:/app/feedback feedback-node:volumes`
```Dockerfile
# 해당 볼륨은 익명 볼륨이다
# 익명 볼륨은 컨테이너가 종료되면 사라진다
VOLUME ["/app/feedback"]
# Named Volume은 컨테이너가 종료되도 
# 영구적이거나 편집, 직접 볼 필요가 없는 데이터
# 호스트 머신 폴더에서 접근 할 필요가 없을 때
# 생성할때 named 볼륨을 넣어야한다
# docker build -t feedback-node:volumes .
# docker run -d -p 3000:80 --rm --name feedback-app -v feedback:/app/feedback feedback-node:volumes
# 해당 명령은 호스트 머신 어딘가에 컨테이너의 /app/feedback의 세부사항을 저장한다. feedback: 을 붙여야 도커가 이해할 수 있는 구문이 된다
# 컨테이너가 삭제되어도 삭제되지 않는다. 컨테이너가 생성될때마다 익명 볼륨이 생성되기 때문에 익명 볼륨일 경우 종료될때 삭제된다.
# volume을 동일한 옵션을 사용하면, 이전의 설정을 불러올 수 있다
# docker volume prune 으로 익명 볼륨을 제거 할 수 있다
```
## Bind Mount
> Managed by you
- docker 환경에서 개발을 할때 변경사항마다 이미지를 빌드하면 너무 불편해서 생긴 기능
- bind mount의 경우 로컬 머신 상의 경로를 알려준다.
- 이를 이용해 소스코드를 넣을 수 있다.
- 소스 코드를 실제 복사하는 것이아니고, binding mount 에서 복사한다.
- 터미널에서 설정 할 수 있다.
- `docker run -d -p 3000:80 --name feedback-app -v "feedback:/app/feedback" -v "/app/node_modules" -v "/c/workspace/git/Kubernetes/data-volumes-01-starting-setup:/app" feedback-node:volumes`
- 절대경로와 매핑시켜야한다
- docker - preference 에서 공유가 되고있는지 확인해야한다(최상위 폴더)
- 해당 옵션은 WSL2 기반일때는 사용이 불가능하다
    - WSL 2는 완전한 Linux 커널을 실행하며, Linux 환경에서 파일 시스템을 사용하는 방식으로 동작한다. 즉, WSL 2는 자체적으로 독립적인 가상 머신처럼 동작하며, Windows 파일 시스템과 Linux 파일 시스템 간의 직접적인 공유가 이루어지지 않는다.
    - WSL 2에서 Docker를 사용할 때 파일 공유가 필요하다면, /mnt/c 같은 디렉토리를 사용하여 Windows의 파일 시스템에 접근할 수 있다. 예를 들어, /mnt/c/Users/yourname/yourfolder 경로로 Windows의 파일을 접근할 수 있다.
    - Docker 컨테이너에서 Windows 파일 시스템에 접근하고자 할 때는 -v 또는 --mount 옵션을 사용하여 /mnt/c 이하의 경로를 마운트할 수 있다.
    - window wsl2 환경에서는 반드시 다음에서 지시하는 것을 해야 해당 방식으로 마운트 시킬 수 있다
    - https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly#ensure-volume-mounts-work
    - metadata를 이용해 권한문제를 해결하는 방식으로 해결하는 것 같음(추측)
- docker container에 넣을 때 원래 폴더의 node_modules를 유지시키는 방법은 -v 익명 볼륨 이용하는 것이다
    - 이 명령어는 익명볼륨 node_modules를 미리 app폴더에 넣어 npm에서 만든 node_modules를 넣도록하고, 바인드 마운트에서 파일을 공유할때 해당 폴더를 추가시키려는 목적이다.
- nodemon 사용
    - 윈도우에서 WSL2를 사용하는 경우, 리눅스 파일시스템에 파일이 따로 저장되는 것이기 때문에 nodemon을 사용할 수 없다.
    - nodemon은 파일 시스템의 변경을 파일 시스템의 이벤트를 통해 감지한다. 리눅스에서는 inotify와 같은 시스템을 사용해 파일 변경을 감지하고, 윈도우에서는 파일 시스템의 다른 방식으로 감지한다.
    - 그래서 윈도우의 파일 변경으로 linux 가상 파일시스템을 사용중인 docker에게 변화를 알릴 수 없다
