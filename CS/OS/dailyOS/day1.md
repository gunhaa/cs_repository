# OS 구조와 원리 

> 책을 보고 응용해 LoopyOS를 만들어보는 것이 목적

> https://github.com/gunhaa/LoopyOS

```assembly
; loopy-os
; TAB=4

; binary로 작성하기 어려워, 바이너리로 작성한 것을 코드로 작성하는 것이다
; 표준적인 FAT12 포맷 플로피 디스크를 위한 서술

DB 0xeb, 0x4e, 0x90
DB "LoopyIPL" ; 부트섹터의 이름
DW 512 ; 1섹터의 크기(바이트 단위, 512)
DB 1 ; 클러스터의 크기(1섹터)
DW 1 ; 예약된 섹터의 수
DB 2 ; 디스크의 FAT 테이블 수
DW 224 ; 루트 디렉토리 엔트리의 수(보통은 224엔트리)
DW 2880 ; 디스크의 총 섹터 수(2880임, 플로피 디스크)
DB 0xf0 ; 미디어 타입(0xf0으로 해야함)
DW 9 ; 하나의 FAT 테이블의 섹터 수(9섹터로 해야함)
DW 18 ; 1트랙에 몇 섹터가 있는가(18로 해야함)
DW 2 ; 헤드의 수(2로 해야함)
DD 0 ; 파티션을 사용하지 않으므로 이곳은 반드시 0
DD 2880 ; 이 드라이브의 크기를 한번 더 씀
DB 0,0,0x29 ; 잘 모르겠지만 이 값을 넣으면 좋다고함
DD 0xffffffff ; 아마 볼륨의 시리얼 번호
DB "Loopy-OS    " ; 디스크의 이름
DB "FAT12    " ; 포맷의 이름
RESB 18 ; 18바이트 남겨둠

; 프로그램 본체

DB 0xb8, 0x00, 0x00, 0x8e, 0xd0, 0xbc, 0x00, 0x7c
DB 0x8e, 0xd8, 0x8e, 0xc0, 0xbe, 0x74, 0x7c, 0x8a
DB 0x04, 0x83, 0xc6, 0x01, 0x3c, 0x00, 0x74, 0x09
DB 0xb4, 0x0e, 0xbb, 0x0f, 0x00, 0xcd, 0x10, 0xeb
DB 0xee, 0xf4, 0xeb, 0xfd

; 메시지 부분

DB 0x0a, 0x0a ; 줄바꿈 2개
DB "LoppyOS, hello world"
DB 0x0a ; 줄바꿈
DB 0

RESB 0x1fe-$ ; 0x001fe 까지를 0x00으로 채우는 명령
DB 0x55, 0xaa

; 이하는 부트섹터 이외의 부분에 기술
DB 0xf0, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00
RESB 4600
DB 0xf0, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00
RESB 1469432
```

- 직접 바이너리 에디터를 사용해 이미지 빌드 후, 이러면 인간이 코딩하기 어렵다는 것을 확인 한 후
- Nask(NASM의 최적화, 저자가 만든 어셈블러) 어셈블러를 이용해 어셈블리어를 바이너리로 변환 시킨다
- 배치 파일을 활용해 QEMU(가상환경)에서 OS를 구동시켜 볼 수 있다(원래는 플로피 디스크로 실행)

### run.bat
```bat
copy LoopyOS.img ..\z_tools\qemu\fdimage0.bin
..\z_tools\make.exe -C ..\z_tools\qemu
```
### install.bat
```bat
..\z_tools\imgtol.com w a: LoopyOS.img
```
