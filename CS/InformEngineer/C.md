# C

## 출력 예상

```C
#include <stdio.h>
char Data[5] = {'B', 'A', 'D', 'E'};
char c;
 
int main(){
    int i, temp, temp2;
 
    c = 'C';
    printf("%d\n", Data[3]-Data[1]);
 
    for(i=0;i<5;++i){
        if(Data[i]>c)
            break;
    }
 
    temp = Data[i];
    Data[i] = c;
    i++;
 
    for(;i<5;++i){
        temp2 = Data[i];
        Data[i] = temp;
        temp = temp2;
    }
 
    for(i=0;i<5;i++){
        printf("%c", Data[i]);
    }
}
```

<details>
  <summary>정답</summary>
  E-A의 정수값, 아스키코드끼리 빼면되니까 4
  BACDE
</details>


```C
#include <stdio.h>
#include <stdlib.h>
 
void set(int** arr, int* data, int rows, int cols) {
    for (int i = 0; i < rows * cols; ++i) {
        arr[((i + 1) / rows) % rows][(i + 1) % cols] = data[i];
    }
}
 
int main() {
    int rows = 3, cols = 3, sum = 0;
    int data[] = {5, 2, 7, 4, 1, 8, 3, 6, 9}; 
    int** arr;
    arr = (int**) malloc(sizeof(int*) * rows);
    for (int i = 0; i < cols; i++) {
        arr[i] = (int*) malloc(sizeof(int) * cols);
    }
 
    set(arr, data, rows, cols);
 
    for (int i = 0; i < rows * cols; i++) {
        sum += arr[i / rows][i % cols] * (i % 2 == 0 ? 1 : -1);
    }
 
    for(int i=0; i<rows; i++) {
        free(arr[i]);
    }
    free(arr);
 
    printf("%d", sum);
}
```

<details>
  <summary>정답</summary>
</details>

```C
#include <stdio.h>   
#include <stdlib.h>  
 
typedef struct Data {
    int value;
    struct Data *next;
} Data;
 
Data* insert(Data* head, int value) {
    Data* new_node = (Data*)malloc(sizeof(Data));
    new_node->value = value;
    new_node->next = head;
    return new_node;
}
 
Data* reconnect(Data* head, int value) {
    if (head == NULL || head->value == value) return head;
    Data *prev = NULL, *curr = head;
    while (curr != NULL && curr->value != value) {
        prev = curr;
        curr = curr->next;
    }
 
    if (curr != NULL && prev != NULL) {
        prev->next = curr->next;
        curr->next = head;
        head = curr;
    }
    return head;
}
 
int main() {
 
    Data *head = NULL, *curr;
    for (int i = 1; i <= 5; i++)
        head = insert(head, i);
    head = reconnect(head, 3);
    for (curr = head; curr != NULL; curr = curr->next)
        printf("%d", curr->value);
    return 0; 
}
```

<details>
  <summary>정답</summary>
</details>