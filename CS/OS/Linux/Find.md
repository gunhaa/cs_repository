# 찾기

## locate

> 설치해야 되는 경우가 있음

> `sudo apt install mlocate` 입력

- 미리 DB를 생성하고 그 곳에서 파일의 위치를 찾아온다.
- 기존에 인덱싱된 데이터베이스를 찾는 것과 같다.
- db를 사용하는 것이라 삭제해도 db에 그대로 남아있다.
- `-e` 옵션을 사용해서 실제 존재하는 파일인지 체크해줄 필요가 있다.
    - 수동으로 최신화 시키고 싶다면 `updatedb` 를 통해 가능하다.

## find

- find 명령어는 인덱싱하는 것이 아닌, 연관된 워킹 디렉토리를 검색한다.
- 그래서 느리지만, 할 수 있는 것이 많다.
- `find | wc -l` 처럼 파이프라인으로 연결 시켜서 파일 갯수를 구할 수 있다.

### finding by type

- `find -type d` 디렉토리까지 찾는다.
- `find -type f` 파일까지 찾는다.

### finding by name

- `find ~/Desktop -name "*.txt"` 로 찾을 수 있다. ""로 검색한다는 사실이 중요하다.
- -name 은 대소문자를 구별한다. 
- -iname 을 사용하면 대소문자를 구별하지 않고 다 찾는다.
- `find ~ -name "chick"` 해당 명령어는 정확히 chick만을 검색한다.
- `find ~ -name "*chick*"` 이렇게 작성해야 chick이 들어간 모든 것을 찾는다.
- `find ~ -name "*[0-9]*"` 숫자를 포함한 모든 것을 찾는다.
- `*` 는 와일드카드로, 어떤 문자든 0개 이상을 의미한다.
- `[13579]` 는 문자 클래스로, 1, 3, 5, 7, 9 중 하나의 문자가 파일 이름에 포함된 경우를 찾는다.
따라서, `*[13579]*` 는 파일 이름에 1, 3, 5, 7, 9 중 하나 이상의 숫자가 포함된 파일을 검색한다.

### finding by size

- `find -size +1G` 로 1G 이상인 것을 찾을 수 있다.
- `find -size -50M` 으로 50M 이하인 것을 찾을 수 있다.
- `find -size 20k` 로 정확히 20kb인 것을 찾을 수 있다.

### finding by user

- `find -user <USER>` 로 특정 사용자가 가지고 있는 파일을 찾을 수 있다.

## Timestamp

- `mtime` 은 modification time으로 파일 내용 수정 날짜를 나타낸다.
    - `ls -l` 로 확인할 수 있다.
    - 이름을 바꾸는 행위 등은 파일 내용이 수정 된 것이 아니라 바뀌지 않는다.
- `ctime` 은 change time으로 파일 변경 시간을 나타낸다.
    - `ls -lc` 로 확인 할 수 있다.
    - `mtime` 의 변화에 같이 변화하지만, 역은 성립하지 않는다. 
    - 리네임, mv, 권한 변경 등에 모두 바뀐다.
- `atime` 은 accesss time으로 마지막 파일 접근 시간을 나타낸다.
    - `ls -lu` 로 확인할 수 있다
    - 마지막으로 파일에 접근한 시간을 출력한다.

## 시간을 기반으로 한 find

- `find --mmin +30` 30분 전에 수정한 파일들을 찾는다.
- `find --cmin -30` 30분 애내로 파일 변경한 것을 찾는다(리네임, mv, 권한 등)
- `find --amin 30` 30분에 접근한 파일을 찾는다.

## 논리연산자와 find

> `-and` , `-or` , `-not` 과 함께 사용할 수 있다.

-  `find -ctime -3 -not -name "*.txt"` 처럼 사용할 수 있다. 묵시적으로 `-and` 를 사용도 하였다.

## 유저 정의 find


- `find -exec command {} ;` 로 사용할 수 있다.
- {} 안에 command에 대한 경로를 넣으면 된다
- find로 찾은 모든 것들에 대해 명령을 수행한다.
- `-exec` 옵션 말고 `-ok` 를 넣는다면 각 파일에 대한 실행을 물어본다
- 많은 파일 삭제 등 다양한 일을 할 수 있지만, 조심스럽게 사용해야 한다.
- `find -empty | ls -l` 는 동작하지 않는다.(ls는 표준 입력을 허용하지 않는다.)
- `find -empty -exec ls -l '{}' ';'` 로 사용할 수 있다.

## xargs

- find와 같이 가장 많이 사용된다.
- `find -empty | xargs ls -l` 를 하게되면, ls에 표준입력으로 넣을 수 있다. 
- `echo hello world | mkdir ` 를 하게 되면 명령이 실행되지 않는다. mkdir은 표준입력을 받지 않기 때문이다.
- `echo hello world | xargs mkdir` 를 하게되면 생각했던대로 생성된다.

## 예제 

```plaintext
No one has touched these case files in years, or at least no one should have touched these files, but sadly some corrupt detective recently tampered with one of the files.

Sometime today he changed a single case from "closed" to "open" to spite an enemy of his.   

Find the one case that has been modified more recently than the yesterday.txt file.

Watch the exercise intro video if you're confused!

You may need to read the man pages to find the correct command.
```

- `find -newer yesterday.txt` 로 찾을 수 있다.