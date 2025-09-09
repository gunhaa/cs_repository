# 함수 응용

## 매개 변수 전달 기법

- Call by value
- Call by Reference
  - C언어에서는 참조형을 포인터로 구현
    - 포인터는 C언어에서 변수이다(변경 가능)
    - 변경 가능해서 사고가 날 수 있다
  - 참조는 대상의 접근에 대한 방법론이다(참조자)
- 인수, 매개변수, 파라미터, 아규먼트 등은 모두 같은말이다
- 매개변수는 Stack영역 사용
  - 절반만 맞는 말이다
    - 32bit 시스템은 Stack영역을 사용했지만, 64bit시스템에선 CPU의 register를 사용한다
  - 매개변수 오른쪽 값부터 처리한다(C++에서 중요함)
    - Stack이든 Register든 마찬가지이다

```C
#include <stdio.h>

void TestFunc(int a, int b)
{
	int c = 20;
	a = 10;
    
}

int main(int argc, char* argv[])
{
	int data = 1;
	TestFunc(5, 10);
	// TestFunc의 disassemble
    // 00007FF6B37617FB  mov         edx,0Ah  
    // 00007FF6B3761800  mov         ecx,5  
    // 레지스터 값 64bit에서 edx = rdx, ecx = rcx, 파라미터가 레지스터로 넘어간다
    // RCX = 0000000000000005 RDX = 000000000000000A 
    return 0;
}
```

```C
#include <stdio.h>

// 전형적인 Call by value
int Add1(int a, int b) {
    int c = 0;
    c = a + b;
    // return c와 과정, 결과를 일시적으로 register에 저장해놓는다
    // 이것이 return의 행동이다
    // eax레지스터는 주로 반환값 용도로 사용된다
    // eax, dword ptr[c]
    return c;
}

int main()
{
    int data = 0;
    data = Add1(3 , 4);
    return 0;
}
```

```C
#include <stdio.h>

// Call by Reference
// 왜 이렇게 할까?
// 메모리 고민이 필요할 때
// 특히 배열을 사용할 때 많이 사용한다
int Add1(int* a, int* b) {
    return *a + *b;
}

int main()
{
    int x = 3, y = 4;
    printf("%d\n", Add1(&x , &y));
    return 0;
}
```

## Stack frame과 지역변수 주소 반환 문제

- 피호출 함수의 지역변수는 함수의 반환과 함께 모두 소멸
  - Stack 메모리는 소멸 후에도 이전에 사용했던 지역변수는 메모리에 그대로 남아있다
  - 이 메모리의 주소를 반환하고 재사용한다면 쓰레기값을 사용하는 심각한 문제가 발생한다
    - Stack의 크기 1MB는 커졌다, 줄었다를 반복하기에 값이 잘 나올 가능성도 있다
    - 하지만 우연히 잘 나온다고 그대로 사용하면 안된다, 그 스택프레임이 재사용 된 후 그 메모리를 사용하면 전혀 다른 값이 나온다
- 소멸된 메모리 영역의 주소를 호출자 함수에게 반환하고 접근하는 것은 매우 심각한 오류

```C
#include <stdio.h>

int* TestFunc(void) {
    int nData = 10;
    return &nData;
}

int main(void)
{
    int* pnResult = NULL;
    pnResult = TestFunc();

    //이 경우는 10 이 잘 반환된다
    //하지만 다른 함수 호출 등 스택프레임을 재사용할 일이 있다면, 전혀 다른 값이 나온다
    //지역변수 포인터의 반환은 절대 있어서는 안된다
    printf("%d", *pnResult);
    return 0;
}
```

## Call by reference와 메모리 동적 할당 이슈

- Callee가 메모리를 동적 할당한 후 반환하는 구조는 문제의 여지가 있음
  - 할당하는 곳과 메모리 반환하는 곳의 위치가 다를 때
  - Pointer는 가리키기만 할 뿐, 크기에 대한 안내가 전혀 없다
  - 문서를 정말 잘 적어야한다(잘 안될 경우 메모리 Leak 발생)
  - Java같은 경우 생성만하고, 해제 코드가 필요없다(Garbage Collection 사용)
  - GC를 C에서 구현해서 사용할 수도 있다
- 메모리 해제에 대한 확실한 안내 필요
- 할당된 메모리 크기 전달 문제 고려

## 재귀 호출

- 함수 코드 내부에서 다시 자신을 호출하는 것
- 반복문과 Stack 자료구조를 합친 것
  - recursive call은 stack/for로 표현 가능하다
- 비선형 자료구조에서 매우 중요하게 활용
  - 데이터가 나무(트리)나 그물(그래프)처럼 복잡하게 얽혀있을 때, 그 구조를 탐색하고 처리하는 데 재귀 호출이 매우 자연스럽고 효율적인 방법
  - dfs()에서 미로를 탈출하기 위해서 사용, 막혔을 시 뒤로 감음
- 함수 호출 오버헤드는 감수
- 논리 오류 발생 시 StackOverFlow 발생

## 가변 길이 입력에 의한 Stack Frame 손상

```C
void GetString(void)
{
    char szBuffer[8] = { 0 };
    int nData = 0x11223344;
    // 보안 결함이 있는 함수
    // 8글자 입력시, 바로 옆의 nData가 오염된다
    // 널 종료문자 \0 = 0x00이 덮어씌워지는 것이다
    // 11223300으로 출력됨
    gets(szBuffer);
    printf("%s, %08X\n", szBuffer, nData);
    return;
}
int main(void) 
{
    GetString();
    return 0;
}
```
