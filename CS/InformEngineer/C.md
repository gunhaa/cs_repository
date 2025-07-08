# C

## 핵심

- C의 if판정은 0,1로 한다
  - 0은 false이며, 이외의 모든 값은 true이다
  - 이외의 모든 자료형도 if문으로 넣을 수 있으며, 추가적으로 0.0(double,float), NULL도 false로 취급한다(ptr도 판정 가능)
- 포인터는 변수의 주소를 저장하는 변수이다
  - int \*ptr; → ptr은 int형 변수의 주소를 저장하는 포인터다.
- 어떤 변수 앞에 &를 붙이면 그 변수의 메모리 주소를 얻는다.
- 포인터 앞에 \*를 붙이면, 그 주소에 저장된 값을 참조(접근)한다.
- int와 char 모두 메모리에 숫자(비트) 형태로 저장된다.
  - 즉, 실제로는 동일하게 숫자가 저장된다.
  - 차이는 해당 숫자를 어떻게 해석하고 처리하느냐에 따라 다르다는 점이다.
  - 자료형은 그 숫자를 해석하는 ‘규칙’ 또는 ‘문맥’ 역할을 한다.

```C
int a = 10;
int* ptr = &a;  // a의 주소를 ptr에 저장
printf("%d", *ptr); // a의 값인 10 출력
```

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
    35421
</details>

```C
#include <stdio.h>

typedef struct student {
    char* name;
    int score[3];
} Student;

int dec(int enc) {
    return enc & 0xA5;
}

int sum(Student* p) {
    return dec(p->score[0]) + dec(p->score[1]) + dec(p->score[2]);
}

int main() {
    Student s[2] = { "Kim", {0xA0, 0xA5, 0xDB}, "Lee", {0xA0, 0xED, 0x81} };
    Student* p = s;
    int result = 0;

    for (int i = 0; i < 2; i++) {
        result += sum(&s[i]);
    }
    printf("%d", result);
    return 0;
}
```

<details>
  <summary>정답</summary>
</details>
