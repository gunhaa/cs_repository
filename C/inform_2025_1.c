#include <stdio.h>

char Data[5] = {'B', 'A', 'D', 'E'};
char c;

int main()
{
    int i, temp, temp2;

    c = 'C';
    for (i = 0; i < 5; ++i)
    {
        if (Data[i] > c)
            break;
        // printf("%d\n", i);
    }

    // printf("%d\n", Data[3]-Data[1]);
    // i = 2이며, 'D'임
    // 즉, temp = 'D'
    temp = Data[i];

    // 여기서 Data는 {B A C E 0}
    Data[i] = c;

    // printf("%d", temp2);
    // i를 2로 사용하고, 이 라인 이후 3으로 진행
    i++;

    // for loop에서 i++, ++i는 의미가없다
    // for loop는 sequence로 실행되기 때문에
    for (; i < 5; ++i)
    {
        // i = 3, 4에 대해서 3개의 연산을 수행한다
        temp2 = Data[i];
        Data[i] = temp;
        temp = temp2;
        // i = 3 인 경우
        // temp2 = 'E'
        // Data[3] = 'D'
        // temp = 'E'

        // i = 4 인 경우
        // temp2 = 0
        // Data[4] = 'E'
        // temp = 0

        // 결국 Data = {B, A, C, D, E}
    }

    return 0;
}