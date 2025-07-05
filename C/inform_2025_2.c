#include <stdio.h>
#include <stdlib.h> // malloc과 free를 사용하기 위해 포함

void set(int **arr, int *data, int rows, int cols)
{
    for (int i = 0; i < rows * cols; ++i)
    {
        // 기존 배열을 3x3 2차원 배열로 전환
        arr[((i + 1) / rows) % rows][(i + 1) % cols] = data[i];
    }
}

int main()
{

    printf("%d", sizeof(int *));

    int rows = 3, cols = 3, sum = 0;
    int data[] = {5, 2, 7, 4, 1, 8, 3, 6, 9};
    int **arr;
    arr = (int **)malloc(sizeof(int *) * rows);
    for (int i = 0; i < cols; i++)
    {
        arr[i] = (int *)malloc(sizeof(int) * cols);
    }

    set(arr, data, rows, cols);

    for (int i = 0; i < rows * cols; i++)
    {
        // 이중배열 저장되어있음
        // 5 2 7 
        // 4 1 8
        // 3 6 9
        // arr[012/ 345/ 678][0,1,2 반복]
        // 결국 짝수:4 홀수:5
        // -1
        sum += arr[i / rows][i % cols] * (i % 2 == 0 ? 1 : -1);
    }

    for(int i=0; i<rows; i++) {
        free(arr[i]);
    }
    free(arr);

    printf("%d", sum);
    return 0;
}