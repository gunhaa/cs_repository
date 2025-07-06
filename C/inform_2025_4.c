#include <stdio.h>

typedef struct student {
    char* name;
    int score[3];
} Student;

int dec(int enc) {
    // 자리수가 A5와 일치하는 부분이있다면, 그것을 sum에 누적시켜 더한다
    // 직접 비트를 만든후 and 연산을 해봐야 알 수 있다
    // score [1010 0000, 1010 0101, 1101 1011 // 1010 0000, 1110 1101, 1000 0001]
    // enc & 1010 0101 를 직접해서 모든 값 더하는게 빠름
    // and 연산 결과
    // 1010 0000 , 1010 0101, 1000 0001 , 1010 0000, 1010 0101, 1000 0001
    // 10x16 + 0x1 , 10x16 + 5x1 , 8x16 + 1x1 , 10x16 + 1x0, 10x16, 1x5 , 8x16, 1x1
    // 160 + 165 + 129 + 160+165+129

    // 908
    return enc & 0xA5;
}

int sum(Student* p) {
    return dec(p->score[0]) + dec(p->score[1]) + dec(p->score[2]);
}

int main() {
    Student s[2] = {"Kim", {0xA0, 0xA5, 0xDB}, "Lee", {0xA0, 0xED, 0x81}};
    Student* p = s;
    int result = 0;
    printf("%d\n", p);

    for (int i=0; i<2; i++) {
        // & 연산은 같은 비트만 가져온다
        result += sum(&s[i]);
    }

    printf("%d", result);
    return 0;
}