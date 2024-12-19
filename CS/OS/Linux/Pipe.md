# 파이프

- pipe character( | )를 이용해서 두개의 커멘드를 사용하는것
- `command1 | command2` 의 경우 command1의 표준출력을 command2의 표준입력으로 사용한다.

- `date | rev` 를 사용해보면 어떤느낌 인지 바로 알 수있다.
    - 결과 : `4202 TSK 81:71:21 91 ceD uhT`

- 많이 사용하는 예시 `ls /usr/bin | less`
    - bin의 파일 갯수 세는 파이프라인 작성법
    - `ls /usr/bin -1 | wc -l`

## 리다이렉션 vs 파이프
- 둘 다 표준스트림을 이용하고 상호작용을 한다는 점은 같다.
- 리다이렉션 : `>` 를 이용해 표준출력을 특정 파일로 출력하게 된다.
    - 파일이 필요하다.
    - `ls -l /usr/bin > list.txt`
- 파이프 : 두 명령어를 연결한다.
    - 이 과정은 파일이 필요없다.
    - `ls -l /usr/bin | less`

## tr

> translate or delete characters

> sed가 더 복잡하긴 하지만 수정하기 더 편한 명령어이다.

