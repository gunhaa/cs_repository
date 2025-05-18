# libuv

  ![images](images/eventloop1.png)
- libuv는 비동기 작업이 필요한 경우 내부적으로 ULT를 사용해 OS 커널에 작업을 위임하고, 작업이 완료되면 그 결과를 event queue에 넣어 event loop가 콜백을 실행하도록 한다.
    -  libuv는 KLT를 사용하며, 커널 수준의 I/O가 필요한 경우에는 해당 스레드를 통해 커널에 작업을 요청하고 완료를 기다린다
    - libuv는 C/C++로 Kerner level 스레드 풀을 만든다
    - 즉, libuv는 C계열 언어를 사용해 구현한 비동기 I/O와 스레드 기반 작업 처리 수단이다

## nodejs의 워커 스레드

- 기본값: 4개(최소 1개, 최대 128개)
    - 이는 Node.js가 시작될 때 libuv의 UV_THREADPOOL_SIZE가 기본값으로 4로 설정되어 있기 때문이다

```bash
UV_THREADPOOL_SIZE=8 node app.js
```