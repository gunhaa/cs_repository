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
</details>