# day3

> 32비트 모드 돌입과 C 언어 도입

- day2까지의 결과는 IPL(초기 프로그램 로더)이지만 프로그램을 로드하지 않았지만, 오늘은 프로그램을 로드 해본다


```asm
; 추가
; 디스크를 읽는다

		MOV		AX,0x0820
		MOV		ES,AX
		MOV		CH, 0			; 실린더 0
		MOV		DH, 0			; 헤드 0
                                ; 플로피 디스크의 경우 앞,뒤의 데이터가 다르다, 헤드0은 플로피 디스크의 위를 뜻한다
		MOV		CL, 2			; 섹터 2

		MOV		AH, 0x02		; AH=0x02 : 디스크 read
		MOV		AL, 1			; 1섹터
		MOV		BX,0
		MOV		DL, 0x00		; A드라이브
		INT		0x13			; 디스크 BIOS 호출
		JC		error           ; jump if carry, carry flag가 1이라면 error로 점프
```
## 캐리 플래그, 인터럽트
- 캐리 플래그란 1비트만을 기억할 수 있는 레지스터이다
    - 1비트밖에 기억하지 못하는 레지스터를 플래그라고 한다
    - 캐리 플래그는 캐리의 상태를 나타내기 위해 사용된다, 하지만 cpu의 플래그 중 캐리 플래그가 가장 다루기 쉬워 다른 용도에도 많이 사용된다, 이 경우에도 에러 유무의 보고에 사용되고 있다
    - INT 0x13 명령의 리턴값으로 carry flag(CF==0 || CF==1)를 받는다
        - INT명령어를 호출하면 현재 실핼중인 프로그램은 인터럽트 핸들러가 실행을 완료할때까지 대기한다
        - 인터럽트를 발생시키면 현대 운영체제 시스템은 최적화되어 다른 후순위 명령을 실행시킨후 완료되면 다시 돌아간다
        - BIOS의 기능을 호출(메모리 주소 이용)
- IPL의 경우 부트섹터는 C0-H0-S1(실린더0, 헤드0, 섹터1 - 메모리의 물리적 위치)
	- 다음섹터의 경우 C0-H0-S2가 된다
	- 1장의 디스크에는 80실린더가 있고, 헤드는2개, 하나의 실린더에는 18섹터가 있고 1섹터는 512바이트이다, 즉 디스크는 1440kb가 된다
## 버퍼 어드레스
- 메모리의 저장 위치를 나타내는 주소 값
- 1개의 레지스터로 저장하면 좋지만, BX만으로는 0~0xFFFF의 값 밖에 표현 할 수 없다(64KB)
- EBX레지스터를 사용하면 4GB까지 다룰 수 있다
- 하지만 BIOS가 설계된 시대에는 32비트 레지스터를 붙이는 것이 어려워, 세그먼트 레지스터라는 보조 레지스터를 이용해 메모리 주소를 저장하였다
- ES:BX라는 표현이 이것이며, MOV AL, [ES:BX] 와 같이 사용한다
	- 이 경우 메모리 번지는 ES x 16 + BX로 계산한다
	- 이 경우 ES에 0xffff , bx에 0xffff 를 넣어 1114095 byte, 즉 약 1mb의 메모리 번지를 지정할 수 있게 되었다
	- 예를 들어 ES=0x0820, BX=0 이라면 데이터가 로드되는 곳은 0x8200부터 0x83ff까지가 된다
	- 어떤 메모리라도 세그먼트 레지스터와 함께 번지를 지정하지 않으면 안된다는 규칙이 있다
		- 여태까지 MOV CX, [1234] 라고 사용한 것은 사실 MOV CX,[DS:1234]라는 의미이다(생략가능)

## 에러 처리

```asm
		MOV		AX,0x0820
		MOV		ES,AX
		MOV		CH, 0			; 실린더 0
		MOV		DH, 0			; 헤드 0
		MOV		CL, 2			; 섹터 2

		MOV		SI, 0			; 실패 회수를 세는 레지스터
retry:
		MOV		AH, 0x02		; AH=0x02 : 디스크 read
		MOV		AL, 1			; 1섹터
		MOV		BX,0
		MOV		DL, 0x00		; A드라이브
		INT		0x13			; 디스크 BIOS 호출
		JNC		fin			; 에러가 일어나지 않으면 fin에
		ADD		SI, 1			; SI에 1을 더한다
		CMP		SI, 5			; SI와 5를 비교
		JAE		error			; SI >= 5이면 error에
		MOV		AH,0x00
		MOV		DL, 0x00		; A드라이브
		INT		0x13			; 드라이브의 리셋
		JMP		retry
```
- INT 레지스터는 AH레지스터의 값을 보고 자신이 할일을 결정한다
	- INT 0x13에서 MOV AH,0x00의 상태로 INT를 호출해 초기화 시킨다
	- MOV AH,0x02 -> 읽기 등 여러가지 동작 존재
	- ****************INT 0x13같은 인터럽트 명령은 정해진 레지스터의 값을 읽어서 리턴값을 출력해 명령의 결과를 출력한다***************

## 18섹터까지 읽기

```asm
; 디스크를 읽는다

		MOV		AX,0x0820
		MOV		ES,AX
		MOV		CH, 0			; 실린더 0
		MOV		DH, 0			; 헤드 0
		MOV		CL, 2			; 섹터 2
readloop:
		MOV		SI, 0			; 실패 회수를 세는 레지스터
retry:
		MOV		AH, 0x02		; AH=0x02 : 디스크 read
		MOV		AL, 1			; 1섹터
		MOV		BX,0
		MOV		DL, 0x00		; A드라이브
		INT		0x13			; 디스크 BIOS 호출
		JNC		next			; 에러가 일어나지 않으면 next에
		ADD		SI, 1			; SI에 1을 더한다
		CMP		SI, 5			; SI와 5를 비교
		JAE		error			; SI >= 5 이면 error에
		MOV		AH,0x00
		MOV		DL, 0x00		; A드라이브
		INT		0x13			; 드라이브의 리셋
		JMP		retry
next:
		MOV		AX, ES			; 주소를 0x200 진행한다
		ADD		AX,0x0020
		MOV		ES, AX			; ADD ES, 0x020라고 하는 명령이 없기 때문에 이렇게 하고 있다
		ADD		CL, 1			; CL에 1을 더한다
		CMP		CL, 18			; CL와 18을 비교
		JBE		readloop		; CL <= 18 이라면 readloop에
```

- JBC 명령(jump if below or equal, 작거나 같으면 점프하라)
- 0x020 만큼 이동해야 한 섹터(512바이트)의 이동이다(세그먼트 레지스터, 512/16의 값, 32)


## OS 본체의 동작

```asm
; haribote-os
; TAB = 4

	ORG		0xc200    ; 이 프로그램이 로딩되는 위치
	MOV 	AL, 0x13   ; VGA 그래픽스 설정, 320x200x8bit
	MOV		AH, 0x00
	INT		0x10		; 비디오 BIOS 호출
fin:
	HLT
	JMP fin
```

## 이미지 파일
- 본래의 상태가 아닌 가짜 형식