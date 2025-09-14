# 전처리기 Preprocessor

- **컴파일 전에 선행 처리를 위한 문법
  - 헤더 포함
    - \#include
  - 조건부 컴파일
  - 심볼릭 상수 정의
  - 매크로 정의
- \# 기호로 시작한다
- \#pargma를 통한 고급 기능이있으며, 리버싱 등에 사용한다

## \#include

- 헤더 파일(선언 코드가 들어있는 파일)을 소스코드에 합쳐주는 기능
- <>로 포함 시 컴파일러가 정의하고 있는 시스템 헤더파일들 중 검색
- ""로 포함 시 현재 경로에서 파일 검색

## \#define

- 형한정어 const처럼 심볼릭 상수를 정의할 수 있는 전처리기
- 정의한 상수는 컴파일 전에 적용되어 소스코드를 치환

### 매크로

- \#define 전처리기로 정의
- 함수처럼 보이지만 함수가 아님
- 함수 호출에 의한 오버헤드가 없음
  - Call, Stack 메모리 복사의 오버헤드
- 컴파일러 최적화에 따라 사용빈도가 현저히 줄어듦
  - 예전에는 최적화를 위해 사용했지만, 요즘은 컴파일러가 좋아져서 간단한 함수의 경우 컴파일러가 매크로처럼 최적화를 해준다
  - 요즘은 필요한 경우에만 쓰는게 좋다

## 조건부 컴파일

- 상수 정의 여부에 따라 실제 컴파일 되는 코드가 달라지도록 구성하는 것이 목적
- \#ifdef, \#else, \#endif로 구성
- Debug/Release 빌드 선택
- 문자열(MBCS, Unicode) 선택

```C
#ifdef _DEBUG
    #define MODEMESSAGE "Debug mode"
#else
    #define MODEMESSAGE "Releases mode"
int main(void)
{
    puts(MODEMESSAGE);
    return 0;
}
```