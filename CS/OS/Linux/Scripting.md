# Scripting

- 스크립트를 통해 프로그래밍과 같이 특정 동작을 할 수 있다.
- 만드는 과정은 다음과 같다
    - 파일에 스크립트를 넣고 저장한다.
    - `chmod` 를 이용해 권한을 부여한다.(executable 이어야 실행이 가능하다.)
    -  사용자가 작성한 스크립트를 셸이 제대로 실행할 수 있는지 확인한다.

## script 예제

> 파일 이름 : hi
```bash
#!/bin/bash
#my first script
echo "hello $USER"
echo "Today is $(date)"
echo "last ran hi at $(date)" >> hi.log
```

- 1줄은 shebang이라고 불리며 bash를 이용한 프로그램이라고 시스템에 안내한다.
- 2줄은 !과 연속적으로 사용되지 않을 경우 평범한 주석이다.
- 3,4 줄은 실행될 스크립트가 들어간다.
- 실행 시키는 방법(같은 폴더): bash hi
    - 다른 폴더에서 bash hi는 실행되지 않고, 정확한 경로가 필요하다.
    - 어디서든 실행시킬수 있게 하기 위해선 PATH가 필요하다

## PATH

- printenv | grep PATH 혹은 echo $PATH 로 확인할 수 있다.
```bash
gunha@oracle:~/script$ printenv | grep PATH
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
gunha@oracle:~/script$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```
- PATH 는 :를 seperator로 디렉토리 목록으로 나뉘어져있다.(즉, 여러 디렉토리 목록일 뿐이다.)

### ls 명령어가 수행되는 방법

```bash
gunha@oracle:~/script$ which ls
/usr/bin/ls
gunha@oracle:~/script$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
# ls명령어의 위치는 /usr/bin/ls에 있다.
# ls를 입력받으면, linux는 PATH들을 차례대로 탐색한다.
# /usr/local/sbin 을 찾고, 없으면
# /usr/local/bin 을 찾고, 없으면
# /usr/sbin 을 찾고, 없으면
# usr/bin 을 찾아 발견하고 ls를 출력한다.
```


## PATH를 추가시키는 방법

```bash
gunha@oracle:~$ cat .profile
# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
        . "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi
```
- 일부 linux 배포판(Ubuntu 등)에서는 `~` 에 bin 폴더를 추가시킬 경우 자동으로 PATH에 등록시킨다.
- `~`에서 .profile을 검색해서 알 수 있다.
- `gunha@oracle:~$ source .profile` 을 이용해 추가 시킬 수 있다
    - source 파일명 형식으로 사용하며, 주로 셸 스크립트나 설정 파일을 읽어 실행한다.
        - 파일 내의 모든 명령어를 현재 셸에서 한 줄씩 실행한다.
        - 새로운 프로세스를 생성하지 않고, 현재 셸의 환경에 직접 영향을 미친다.
- 수동 추가 방법
    - `nano .bashrc`
    - `PATH="$HOME/bin:$PATH` 를 맨 밑에 추가한다.
    - 이후 `source .bashrc` 실행

## 권한을 추가시키는 방법

```bash
gunha@oracle:~/bin$ ls -l
total 8
-rw-rw-r-- 1 gunha gunha 112 Jan  1 09:49 hi
-rw-rw-r-- 1 gunha gunha  44 Jan  1 09:49 hi.log

gunha@oracle:~/bin$ chmod 755 hi

gunha@oracle:~/bin$ ls -l
total 8
-rwxr-xr-x 1 gunha gunha 112 Jan  1 09:49 hi
-rw-rw-r-- 1 gunha gunha  44 Jan  1 09:49 hi.log
```

- chmod를 이용해서 권한을 관리할 수 있다. 스크립트의 경우는 x가 반드시 필요하다.

## Shebang

```bash
gunha@oracle:~/bin$ cat pyhi
print("hello there from Python")

gunha@oracle:~/bin$ python3 pyhi
hello there from Python
```
의 경우 잘 작동한다. 하지만
```bash
gunha@oracle:~/bin$ bash pyhi
pyhi: line 1: syntax error near unexpected token `"hello there from Python"'
pyhi: line 1: `print("hello there from Python")'
```
작동이 잘 되지 않는다. <BR>
하지만 shebang을 이용하면 어떤 것을 사용하여 실행할지 정할 수 있다.
```bash
gunha@oracle:~/bin$ chmod 755 pyhi

gunha@oracle:~/bin$ cat pyhi
#!/usr/bin/python3
print("hello there from Python")

gunha@oracle:~/bin$ pyhi
hello there from Python
```

## 날씨 프로그램 예제
> wttr.in api 이용

- ex) 서울의 날씨
    - `curl wttr.in/Seoul`

```bash
#!/bin/bash

# echo "first value is $1"
# echo "second value is $2"

case $1 in
-h | --help)
        echo "WELCOME TO WEATHER HELP"
        echo "-3 for next 3 days of weather"
        ;;
-3)
        echo "YOU PROVIDED -3"
        curl "wttr.in"
        ;;
-l | -location)
        curl "wttr.in/$2"
        ;;
*)
        echo "ANY OTHER VALUE"
        curl "wttr.in?m1"
        ;;
esac

#curl "wttr.in/$1"
```
- 해당 방식으로 스크립트를 이용할 수 있다.
- 구문의 마무리는 `;;`
- 인자를 받는 방식은 `$숫자`
- 구문의 시작과 끝은 `case` 와 `esac` 처럼 대칭으로 이루어짐
### curl
- URL을 제공하면 HTTP 요청을 한 다음 우리에게 응답을 표시한다.
