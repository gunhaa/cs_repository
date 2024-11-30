# WSL

- WSL1 : Windows 커널과 Linux 커널 간에 가교 역할을 하는 하이퍼바이저 기술을 사용한다. 이 버전은 Linux 바이너리를 Windows에서 직접 실행하도록 지원하지만 파일 시스템 성능이 덜 우수하다는 단점이 있다.

- WSL2 : Linux 커널을 Windows 시스템 위에 가상 머신 형태로 실행하는 방식이다. 이로 인해 파일 시스템 성능과 호환성이 향상되었으며, Docker와 같은 컨테이너 기술을 더 효율적으로 지원한다. Windows10, 버전 1903, 빌드 18362 이상에서만 사용 가능하다.

- WSL은 무료로 사용할 수 있으며, Microsoft Store에서 Linux 배포판 (예: Ubuntu, Debian)을 다운로드하여 설치할 수 있다.