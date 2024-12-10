# 삭제, 복사, 이동

## rm <filename>

- 휴지통에가는 중간과정 없이 바로 삭제된다.
- 컴퓨터 심장부로 직접 통하는 길과 같다.

### -d (directory)

- remove empty directory
- 빈 폴더에만 사용 가능하다.

### -r (recursive)

- remove directories and their contents recursively
- 재귀적으로 폴더안의 모든 파일을 삭제한다.

### -i 

- prompt before every removal

## mv (filename) (directory)

- move files
- 파일 이름은 여러개를 넣을 수 있다.
- 디렉토리도 가능하다.(하위 요소도 모두 이동함)
- rename기능도 존재함(mv (current) (newname) )
- 즉, 다른 이름을 넣으면, rename 시킨다.

### 그럼 같은 이름이 있으면 어떻게됨? 파일/디렉토리로
> Linux에서 파일,디렉토리 더라도 같은 곳에서 같은 이름을 가질 수 없다.

## cp (file) (directory+name)

- copy files and directories

### -r (recursive)

- copy directories and their contents recursively
- 재귀적으로 폴더안의 모든 파일을 복사한다.