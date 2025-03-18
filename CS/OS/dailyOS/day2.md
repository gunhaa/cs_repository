# day2

```assembly
; hello-os
; TAB=4

		ORG		0x7c00			; 메모리 내 어디에 로딩되는가(origin, 시작점)
								; 실행 시 PC의 메모리 내 어디에 로딩되는 지를 어셈블러에게 가르쳐주기 위한 명령
								; 10진수=>31744(0x7c00) 를 사용한다
; 이하는 표준 FAT12 포맷 플로피디스크를 위한 서술

JMP		entry ; JMP 0x7c50과 같다, 어셈블리어에서 레이블은 단지 숫자에 불과하다
DB		0x90
DB 		"LoopyIPL" ; 부트섹터의 이름
DW 		512 ; 1섹터의 크기(바이트 단위, 512)
DB 		1 ; 클러스터의 크기(1섹터)
DW 		1 ; 예약된 섹터의 수
DB 		2 ; 디스크의 FAT 테이블 수
DW 		224 ; 루트 디렉토리 엔트리의 수(보통은 224엔트리)
DW 		2880 ; 디스크의 총 섹터 수(2880임, 플로피 디스크)
DB 		0xf0 ; 미디어 타입(0xf0으로 해야함, 1.44mb 플로피디스크)
DW 		9 ; 하나의 FAT 테이블의 섹터 수(9섹터로 해야함)
DW 		18 ; 1트랙에 몇 섹터가 있는가(18로 해야함)
DW 		2 ; 헤드의 수(2로 해야함)
DD 		0 ; 파티션을 사용하지 않으므로 이곳은 반드시 0
DD 		2880 ; 이 드라이브의 크기를 한번 더 씀
DB 		0,0,0x29 ; 볼륨 ID가 포함된 부트 섹터임을 표시하는 마커
DD 		0xffffffff ; 볼륨의 시리얼 번호
DB 		"Loopy-OS    " ; 디스크의 이름
DB 		"FAT12    " ; 포맷의 이름
RESB 	18 ; 18바이트 남겨둠

; 프로그램 본체

entry:
		MOV		AX, 0			; 레지스터 초기화
		MOV		SS,AX
		MOV		SP,0x7c00
		MOV		DS,AX
		MOV		ES,AX

		MOV		SI,msg			; msg는 0x4c74라서 해당 명령은 SI에 0x7c74를 넣는 것이다
putloop:
		MOV		AL,[SI]			; []기호는 어셈블리어에서 메모리를 뜻한다
								; CPU의 기억용량은 모든 레지스터와 세그먼트 레지스터를 합쳐도 44byte밖에 안된다
								; CPU가 기계어를 실행할 떄는 메모리로부터 1명령씩 읽어들여 차례로 실행한다
								; 레지스터는 계산을 할 수 있고, 메모리는 많이 있으니 많이 넣을 수 있다
		ADD		SI, 1			;  SI에 1을 더한다
		CMP		AL,0
		JE		fin
		MOV		AH, 0x0e		; 한 문자 표시 기능
		MOV		BX, 15			; 컬러코드
		INT		0x10			; 비디오 BIOS 호출
		JMP		putloop
fin:
		HLT					; CPU를 정지시킴
		JMP		fin			; 무한 루프

msg:
		DB		0x0a, 0x0a		; 줄바꿈 2개
		DB		"Loopy, hello world"
		DB		0x0a			; 줄 바꿈
		DB		0

		RESB	0x7dfe-$			; 지정 메모리 위치까지 0으로 채움

		DB		0x55, 0xaa

; 부트 섹터 이외의 부분에 기술
; 현재는 미사용 코드
;		DB		0xf0, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00
;		RESB	4600
;		DB		0xf0, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00
;		RESB	1469432
```

- JMP 명령은 C언어의 goto이다
- entry: 는 레이블 선언이며, JMP명령이 이동할 곳을 지정할 때 사용된다
- MOV는 가장 많이 쓰이는 명령으로, 대입을 의미한다
    - MOV AX, 0 은 AX =0; 이라는 대입문이다

- CPU에는 레지스터라는 기억회로가 있는데, 기계어의 변수라고 할 수 있다
- 대표적인 레지스터는 다음 8가지가 있다
```plaintext
AX : accumulator - 누적 연산기
CX : counter - 수를 세는 기계
DX : data - 데이터
BX : base - 기초,기점
SP : stack pointer - 스택용 포인터
BP : base pointer - 베이스용 포인터
SI : source index - 읽기 인덱스
DI : destination index - 쓰기 인덱스
```
- 16비트 레지스터(2바이트)로, 16자리 2진수를 기억할 수 있다
- 8비트의 레지스터도 8개 있다
    - AX레지스터의 0-7 의 8비트 부분을 AL, 8-15비트 부분을 AH라고 한다
    - eg. AX 레지스터 HL 저장 => E2(AH), 1F(AL)
```plaintext
AL : accumulator low 
CL : counter low
DL : data low
BL : base low
AH : accumulator high
CH : counter high
DH : data high
BH : base high
```
- 32비트용 레지스터는 이름이 다르다(EAX, ECX, EDX, EBX, ESP, EBP, ESI, EDI : 이곳의 E는 extend를 뜻한다)
    - EAX의 하위 16비트가 AX이다, 상위 16비트는 이름이 없으며 레지스터 번호도 없다
    - 즉 EAX를 16비트 2개로 나누어 사용하는 것은 가능하지만, 간단하게 사용 할 수 있는 것은 하위 비트 뿐이다
    - 상위 비트를 사용하고 싶다면 상위 16비트를 하위로 내리는 방법 밖에 없다
- 세그먼트 레지스터는 16비트이다(ES, CS, SS, DS, FS, GS)
    - 메모리 영역을 가르키는 레지스터이다
- MOV BYTE [678], 123 => 메모리 678에 123을 기억시키는 명령
    - 123에 어딘가의 기억소자 8개를 on과 off로 표시한 전기 신호를 기억하는 것이다(byte라 8개)
- MOV WORD [678], 123 => 메모리 678과 679가 반응한다(16비트)
    - 123이 16비트(2바이트)의 수치로 해석되어 0000000001111011중 01111011이 678, 00000000이 679에 저장된다
- DWORD를 사용하면 4바이트를 사용하는 것이다
- 메모리 번지를 지정할떄는 BYTE[SI], WORD[BX] 등으로 사용할 수 있다
    - SI에 987이 들어있다면 BYTE[987]로 해석된다
- MOV AL, BYTE[SI] => 메모리 SI의 1바이트의 내용을 AL에 넣어라
- MOV명령은 비트수가 같은 것끼리밖에 대입할 수 없는 규칙이 있다
    - AL에 대입하는 이상 BYTE외에는 있을 수 없으므로 이것을 생략할 수 있어서 MOV AL,[SI]가 되는 것이다
- ADD 명령은 덧셈 명령이다
    - ADD SI, 1 은 C언어의 SI = SI + 1과 같다
- CMP 명령(Compare)은 비교 명령이다
    - if문의 일부이다 eg.if(a==3)
    - 즉 CMP AL,0 은 AL과 0을 비교하라는 의미이다
- JE 명령은 조건 점프 명령이다
    - 비교 명령 결과에 따라서 점프하기도하고 안하기도 하는 것이다
    - JE의 경우 비교 결과가 같으면 점프하라는 명령이다
```assembly
CMP AL,0
JE fin
```
- 위 코드는 if(AL==0) {goto fin;} 과 같은 의미이다
- INT 명령은 인터럽트 호출 명령이다
    - PC에는 BIOS(Basic Input Output System)가 있으며, INT명령은 BIOS 함수 호출을 가능하도록 한다
    - INT 0x10 의 경우 16번 함수를 호출한다(비디오카드 제어)
    - BIOS함수의 경우 PC 제조사가 준비해준 것이다
```assembly
; BIOS 문자표시는 레지스터에 값을 넣은 후 INT 0x10을 호출하면 1문자가 출력되게 된다
; 사용법 예시
MOV AH, 0x0e ; 한 문자 표시
MOV BX, 15 ; 컬러
INT 0x10 ; 비디오 BIOS 호출
```
- HLT 명령(halt, 정지시킨다)은 잘 사용되지 않는 명령이다
    - CPU를 정지시킨다
    - 정확히는 완전히 정지가 아닌, 대기상태로 만든다
    - 이때 외부의 변화(키보드, 마우스 등)가 있다면 CPU는 계속해서 프로그램을 실행한다
- ORG 명령이 0x7c00인 이유
    - 다른 값을 넣으면 움직이지 않는다
    - 메모리 전체를 마음대로 사용할 수 없다
    - 제일 처음 부분(0)은 BIOS 자체가 들어있어서 사용하면 BIOS가 오작동을 일으킨다
    - 0xf0000 부근에는 BIOS 자체가 들어 있어서 이곳도 사용할 수 없다
    - 이외에도 사용하지 않으면 안되는 영역이 여기저기 있어 OS 제작자는 메모리 위치도 신경을 써야 한다
    - 기본적인 메모리 맵이 정해져있어서(IBM이 정함) 이를 올바르게 사용해야한다
    - 부트섹터의 기본 할당 공간은(0x00007c00 ~ 0x00007dff) 로 정해져 있어, 이 위치를 사용한 것이다


## Makefile
- 똑똑한 배치 파일이다
- 확장자가 없는 Makefile을 만든후 텍스트 에디터로 편집한다
- make.exe를 호출해 실행 시킬 수 있다
- make.bat 파일
```Makefile
LoopyOS : LoopyOS.nas Makefile
    ..\z_tools\nask.exe LoopyOS.nas LoopyOS.bin LoopyOS.lst

LoopyOS.img : LoopyOS.bin Makefile
    ..\z_tools\edimg.exe imgin:..\z_tools\fdimg0at.tek \
        wbinimg src:LoopyOS.bin len:512 from:0 to:0 imgout:LoopyOS.img
```
- 탭 문자로 로직을 구분한다
    - make -r LoopyOS.bin으로 호출 가능
    - make -r LoopyOS.img으로 한번에 모두 호출 가능