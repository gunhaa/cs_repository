# getchar()로 설명하는 I/O

```C
//.. getcharSample.c
#include <stdio.h>

int main(void)
{
    // character도 결국 숫자, 범위의 차이이다
	char ch = 0;

	ch = getchar();

	// I/O Buffer에서 하나를 가져오는 함수
	// I/O Buffer는 Queue형태로 되어있어, 첫 입력값을 가져온다
	putchar(ch);
	putchar('Z');

	return 0;
}
```

- 해당 파일을 실행하게 되면 getcharSample이라는 process가 생성된다
  - process는 os에서 file interface를 통해 i/o를 할 수 있는 주체이다

## 위 코드가 실행될 때 일어나는 일

![images1](images/getchar1.png)

- 입/출력(I/O) 대부분의 장치는 Buffered I/O를 채택한다
  - Buffer라는 버퍼라는 메모리 공간을 두고 read/write를 한다
- 이 모든 과정이 매우 빨라서 우리 눈에는 바로 출력되는 것처럼 보이는 것이다
- getchar()/ putchar()
  - Buffered I/O
  - getchar() = "버퍼에서 하나씩 반환"
- \_getch() / \_getche()
  - Non-Buffered I/O
  - 키보드의 입력 자체에 대한 감지(intterrupt를 감지)
  - 위 그림과 완전히 다른 아키텍처를 사용한다
  - Driver와 OS를 거치지만, File interface와 buffer를 거치지 않고 바로 반환
  - 진행을 원하면 키를 누르세요.. 에 사용된다

### fgets() 함수의 동작

- 유닉스 계열 운영체제(리눅스, macOS 등)와 C 언어에서는 하드웨어 장치(키보드, 마우스 등)를 파일처럼 다룬다. 이를 파일 인터페이스(File Interface) 라고 한다
- fgets()는 file interface를 이용해 버퍼에서 가져온다(ex, getchar()의 경우 char를 가져온다)
- keyboard는 file interface를 이용해서 가져온다 이곳의 이름이 stdin이다
  - stdin (Standard Input): 표준 입력을 의미하는 파일 스트림이다. 기본적으로 키보드 입력에 연결되어 있다. 따라서 fgets() 함수의 stream 인자로 stdin을 전달하면, 파일이 아닌 키보드로부터 입력을 받게 된다
- stdout은 console이다
  - 기본적으로 콘솔(터미널 또는 명령 프롬프트 화면)에 연결되어 있다. printf(), puts()와 같은 함수들이 stdout을 통해 데이터를 출력한다.
