# cat

- Concatenate files and print one the standard output
- 파일의 내용을 출력만하는 명령어이다.(파일을 생성하는 명령어가 아니다.)
- 2개 이상의 파일이 인자로 전달되면 파일을 연결시켜 출력한다.

# tac

- concatenate and print files in revese
- cat을 뒤집은 명령어로, 파일의 내용을 역으로 출력한다.

# rev

- reverse lines characterwise
- 각 줄의 문자를 뒤집는다
- ex) reds -> sder

# less

- opposite of more
- cat과 같지만, 출력이 되지않는다.
- man ${명령} 으로 검색했을때, less navigation을 사용해서 열린 것이다.
- less navigation의 명령어는 다음과 같다.
    - `space , f` : next page
    - `b` : previous page
    - `Enter , Down Arrow` : scroll by one line
    - `/` : search, type forward
    - `q` : quit
- 여러번 검색할때는 검색한 곳 이후부터만 검색이 진행되기 때문에, 이 전의 것을 검색하고 싶다면 `/` 가 아닌 `?` 를 사용해야 한다.
# head

- 파일 위쪽의 n줄을 읽는다(default 10)

# tail

- 파일 아래쪽의 n줄을 읽는다(default 10)
- `-f` 라는 옵션을 사용해 파일의 변화를 listen할 수 있다.
- 이를 이용해 systemlog를 추적해서 db,server등의 로그를 얻어 낼 수 있다.

# wc 

- print newline, word, and byte counts for each file
- 줄수 / 단어수(공백문자 포함) / 바이트 를 출력한다.
- 파일의 정보를 출력하는 것이지만, 옵션을 활용해서 다양한 패턴 분석을 할 수 있다.
 
 # sort

 - sort lines of text files
 - 다양한 옵션을 통해 다양한 정렬을 할 수 있다.
 - 출력만 할 뿐, 파일을 수정하지 않는다.
