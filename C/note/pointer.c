#include <stdio.h>

int main(void){
    int score = 20;
    printf(">>score의 주소 : %p \n" , &score);
    int *p_score= &score;
    

    printf(">>score의 값 + %d\n" , score);
    printf(">>score의 주소 + %p\n" , p_score);


// 주소 연산자 &:

// 역할: 변수의 메모리 주소를 반환합니다.
// 사용 예: &variable은 variable의 주소를 반환합니다.

// 간접 참조 연산자 *:

// 역할: 포인터가 가리키는 메모리 위치의 값을 반환합니다.
// 사용 예: *pointer는 pointer가 가리키는 메모리 위치의 값을 반환합니다.
    char *s = "GUNHA";
    printf("%c\n", *s);
    printf("%c\n", *(s+1));

}