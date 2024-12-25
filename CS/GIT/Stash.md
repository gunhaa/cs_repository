# 스태시 `git stash`

![stash](images/stash1.png)

> 아직 마무리하지 않은 작업을 스택에 잠시 저장할 수 있도록 하는 명령어이다. 이를 통해 아직 완료하지 않은 일을 commit하지 않고 나중에 다시 꺼내와 마무리할 수 있다.

- git stash 명령을 사용하면 워킹 디렉토리에서 수정한 파일들만 저장한다.
- stash란 아래에 해당하는 파일들을 보관해두는 장소 이다.
    - Modified이면서 Tracked 상태인 파일
      - Tracked 상태인 파일을 수정한 경우
      - Tracked: 과거에 이미 commit하여 스냅샷에 넣어진 관리 대상 상태의 파일
    - Staging Area에 있는 파일(Staged 상태의 파일)
        - git add 명령을 실행한 경우
        - Staged 상태로 만들려면 git add 명령을 실행해야 한다.
        - git add는 파일을 새로 추적할 때도 사용하고 수정한 파일을 Staged 상태로 만들 때도 사용한다.