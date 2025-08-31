# 쓰레기 값

```C
#pragma warning(disable:4700)
#include <stdio.h>

int main(void)
{
    unsigned int acc;

    acc += 1;
    acc += 2;
    acc += 3;

    printf("Total: %u", acc);
}
```

- 지역 변수를 초기화 시키지 않고 해당 코드를 실행하면 3435973842이 나온다
  - visual studio 에서 디버그 모드 초기화 안된 지역변수에 cc cc cc cc 를 넣는다
  - 이 값은 3,435,973,836이고, 여기에 +6이 되어 나온 값이다

## Visual Studio의 쓰레기값

- 4가지가 존재 한다
- 0xcdcdcdcd
  - 0xcdcdcdcd 는 새로 메모리를 할당(malloc)을 받고 초기화를 하지 않은 상태의 값
- 0xcccccccc
  - 새로 지역 변수를 선언한 후 초기화를 하지 않은 상태의 값
  - 전역 변수는 초기화를 하지 않아도 첫 선언 당시 값은 0 이다
- 0xeefeeefe
  - 메모리를 할당(malloc)은 뒤 사용을 다 맞춘 후 해제(free)처리가 된 상태의 값
- 0xfdfdfdfd
  - 할당(malloc)된 메모리의 주변 값