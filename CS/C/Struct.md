# 구조체

- 여러 자료형을 모아 새로운 하나의 형식으로 기술(선언)
- 배열은 같은 것이 모인 것이며 구조체는 서로 다른 것들이 모인 것으로 이해 할 수 있음(인덱스는 없다)
- 구조체는 하나의 새로운 사용자 정의 형식으로 작동
- 구조체를 이루는 요소를 멤버라고 부름
- 구조체 변수를 통해 개별 요소에 접근할 떄는 멤버 접근 연산자를 사용
  - . , ->
- 구조체 변수(혹은 인스턴스)선언 시 초깃값을 기술할 때는 반드시 멤버 선언 순서에 맞춰야함
- typedef 선언을 동반하는 것이 일반적
- 왜 잘 알아야하는가?
  - 결국 S/W는 자동화, 전산화를 위한 것이다
  - DB를 사용하기 위해 필요하다
  - 단위 데이터 기술을 위해 사용한다
- java의 class와 같다

```C
struct USERDATA 
{
    int nAge;
    char szName[32];
    char szPhone[32];
};

// 해당 방식으로 표현하면 struct를 생략 가능하다
typedef struct USERDATA 
{
    int nAge;
    char szName[32];
    char szPhone[32];
} USERDATA;

int main(void)
{
    struct USERDATA user = {0, "", ""};

    user.nAge = 10;

    strcpy_s(user.szName, sizeof(user.szName), "Hoon");
    strcpy_s(user.szPhone, sizeof(user.szPhone), "010-1234-5678");

    printf("%d살, %s, %s\n", user.nAge, user.szName, user.szPhone);

    return 0;
}
```

## 구조체 관리

- 구조체도 배열 선언 가능
- malloc() 함수로 동적 선언해 관리하는 경우도 일반적
- 구조체에 대한 포인터 변수 선언 시 멤버 접근 연산자가 달라짐
- 함수 반환형이나 매개변수로 사용 가능
  - 포인터 변수(call by reference)로 사용

```C
struct USERDATA 
{
    int nAge;
    char szName[32];
    char szPhone[32];
};

void GetUserData(USERDATA *pUser)
{
    USERDATA user = { 0 };
    strcpy_s(pUser->szName, sizeof(pUser->szName), "Hoon");
    strcpy_s(pUser->szPhone, sizeof(pUser->szPhone), "010-1234-5678");

    return;
}

int main(void)
{
    
    USERDATA* pUser = NULL;

    // malloc의 반환형은 void*이다(포인터지만, 어떤 포인터인지는 모름)
    // 그래서 강제 형변환이 필요한 것이다
    // 구조체 멤버 정의로 메모리를 잡기 때문에(sizeof)
    // 더 많이 잡힐수도 있다
    pUser = (USERDATA*)malloc(sizeof(USERDATA));

    pUser->nAge = 10;
    // 해당 방식으로 포인터를 넘겨서 사용하는 것이 맞는 방법이다 call by Reference
    // 불필요한 복사가 발생하는 call by value를 사용할 필요가 없다
    GetUserData(&pUser);
    // strcpy_s(pUser->szName, sizeof(pUser->szName), "Hoon");
    // strcpy_s(pUser->szPhone, sizeof(pUser->szPhone), "010-1234-5678");

    printf("%d살, %s, %s\n", pUser->nAge, pUser->szName, pUser->szPhone);
    free(pUser);
    return 0;
}
```

## 공용체

- 한 대상에 대해 여러 해석 방법(자료형)을 부여하는 문법
  - 32비트 정수에 대해 int, short[2], char[4]으로 해석 가능

```C
// 공용체 기본 문법
typedef union _IP_ADDR
{
  int nAddress;
  short awData[2];
  unsigned char addr[4];
} IP_ADDR;

int main(void)
{
  IP_ADDR Data = { 0 };
  Data.nAddress = 0x41424344;
  // 이 경우 44 43 42 41 순으로 저장된다(리틀 엔디안)
}
```

## 구조체 멤버 맞춤

- 구조체를 이루는 멤버의 메모리 공간은 관리 편의를 위해 완전히 연접하지 않고 일정 단위로 메모리를 구성
- 완벽히 연접해야 할 경우 전처리기를 이용해 설정 변경

```C
// 패딩 제거
#pragma pack(push, 1)
typedef struct USERDATA {
  char ch;
  int nAge;
  char szName[5];
} USERDATA;
// 패딩 복구
#pragma pack(pop)

int main(void)
{
  USERDATA user = { 'A', 10, "Hoon"};
  int data = 0x11223344;
  // #pragma를 이용한 전처리가 없다면, 1+4+5 = 10 의 size가 아닌 16이 나오게된다
  // 컴파일러가 CPU 접근 효율을 위해 메모리를 사용하지 않는 공간(padding)을 넣기 떄문이고, #pragma 살정을 통해 바꿀 수 있다
  printf("%d\n", sizeof(USERDATA));
  return 0;
}
```