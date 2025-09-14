# 함수 고급이론

- 함수 호출 연산자 `함수형(...arguments)`를 통해 함수를 호출할 수 있다

## 함수 포인터

- 함수의 이름(상수)을 저장할 수 있는 포인터
  - 함수의 이름은 그 자체가 함수 형이며, 함수호출 연산자의 피연산자가 될 수 있다
- 함수호출 연산자의 피연산자가 될 수 있음
- `반환 자료형(호출 규칙 *변수명(매개변수))` 형식으로 선언
  - 호출 규칙은 생략이 가능하다(기본 형식이 있기 때문)

```C
int GetMax(int a, int b, int c)
{
    int nMax = a;
    if (b > nMax) nMax = b;
    if (c > nMax) nMax = c;
    return nMax;
}

int main(void)
{
    // 포인터를 이용해 함수를 저장할 수 있다
      // __fastcall 생략
    int(*pfGetMax)(int, int, int) = GetMax;

    // 두 값은 같다
    printf("GetMax: %p\n", GetMax);
    printf("pfGetMax: %p\n", pfGetMax);

    printf("MAX: %d\n", GetMax(1, 3, 2));
    printf("MAX: %d\n", pfGetMax(1, 3, 2));
    return 0;
}
```

### 함수 호출 규칙

- 32비트 호출 규칙
  - \_\_cdecl(C언어 기본)
    - 호출자에서 스택 포인터를 되돌림
  - \_\_stdcall
    - 피호출자에서 스택 포인터를 되돌림
  - \_\_fastcall
    - 함수 호출 속도를 증가하기 위해 매개변수를 register에 집어넣는 방법
  - stack메모리의 포인터를 되돌리는 것을 호출자 함수에서 하냐, 피호출자 함수에서 하냐의 차이
- 64비트 호출 규칙
  - \_\_fastcall

## Call back

- 함수가 호출하는 것이 아니라 호출되는 구조
- 함수의 이름(주소)를 라이브러리나 프레임워크에 전달하면 그 내부에서 호출되는 구조
- C에서는 함수 포인터로 표현한다
  - 파라미터로 함수 포인터를 넘긴다
- 호출 시점과 횟수를 정확히 특정하기 어려운 경우가 많다

### JS와 비교

- JS에서는 함수도 1급 객체라서 다른 함수에 인자로 전달하거나 변수에 할당할 수 있다
  - JS는 포인터를 넘기는게 아니라 객체 참조를 넘기는 것이다
  - 비슷한 동작을하지만, C와는 다르게 함수의 위치만 담은게 아니라 프로퍼티, 클로저 환경, 프로토타입 체인 등 여러 메타데이터를 포함한다
- C는 함수가 객체는 아니지만, 함수 포인터를 통해 비슷한 효과를 낼 수 있다
  - 즉, "함수를 인자로 넘긴다" → 사실은 "함수의 주소(포인터)를 넘긴다"

## Lookup 테이블과 사용

- 함수 포인터와 Lookup테이블을 이용해 switch/if문 판정을 하지 않고 O(1)접근이 가능한 로직으로 성능 개선을 할 수 있다

```C
#include <stdio.h>

// 명령 상수 정의
enum Action {
    ATTACK,
    MOVE,
    SLEEP,
    ACTION_COUNT
};

// 각 동작 함수
void attack(void) {
    printf("공격!\n");
}

void move(void) {
    printf("이동!\n");
}

void sleep_action(void) {
    printf("잠자기...\n");
}

int main(void) {
    int commands[] = { ATTACK, SLEEP, MOVE, ATTACK, SLEEP };
    // Lookup 테이블 사용 전
    for (int i = 0; i < sizeof(commands) / sizeof(commands[0]); i++) {
        int cmd = commands[i];
        switch (cmd) {
            case ATTACK:
                attack();
                break;
            case MOVE:
                move();
                break;
            case SLEEP:
                sleep_action();
                break;
            default:
                printf("알 수 없는 명령어: %d\n", cmd);
                break;
        }
    }

    // Lookup 테이블 사용 후
    
    void (*actions[ACTION_COUNT])(void) = { attack, move, sleep_action };

    for (int i = 0; i < sizeof(commands) / sizeof(commands[0]); i++) {
        int cmd = commands[i];
        if (cmd >= 0 && cmd < ACTION_COUNT) {
            actions[cmd]();  // O(1) 접근
        } else {
            printf("알 수 없는 명령어: %d\n", cmd);
        }
    }

    return 0;
}
```