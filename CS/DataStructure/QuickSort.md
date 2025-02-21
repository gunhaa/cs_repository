# Quick Sort

- ‘찰스 앤터니 리처드 호어(Charles Antony Richard Hoare)’가 개발한 정렬 알고리즘
- 퀵 정렬은 불안정 정렬 에 속하며, 다른 원소와의 비교만으로 정렬을 수행하는 비교 정렬 에 속한다.
- 분할 정복 알고리즘의 하나로, 평균적으로 매우 빠른 수행 속도를 자랑하는 정렬 방법. 병합 정렬(merge sort)과 달리 퀵 정렬은 리스트를 비균등하게 분할한다.
- 평균적으로 좋은 성능을 보여 필드에서 많이 사용한다.

### 분할 알고리즘
- 문제를 작은 2개의 문제로 분리하고 각각을 해결한 다음, 결과를 모아서 원래의 문제를 해결하는 전략이다.
- 분할 정복 방법은 대개 순환 호출을 이용하여 구현한다.

### 진행 방법

1. 피벗 선택: 주어진 배열에서 pivot을 선택한다. 일반적으로 배열의 첫 번째 원소, 마지막 원소, 혹은 중간 원소를 선택할 수 있다. 예를 들어, 배열이 [3, 6, 8, 10, 1, 2, 1]이라면, pivot으로 3을 선택한다고 가정하자.

2. 분할: 배열을 pivot을 기준으로 두 개의 부분으로 나눈다. pivot보다 작은 원소는 왼쪽, 큰 원소는 오른쪽으로 이동한다. 이 과정을 진행하면 다음과 같은 배열이 된다
초기 배열: [3, 6, 8, 10, 1, 2, 1] pivot은 3
분할 후 배열: [1, 2, 3, 10, 6, 8, 1] 여기서 1과 2는 pivot보다 작고, 10, 6, 8은 pivot보다 크다.

3. 재귀 호출: 이제 pivot의 위치(인덱스)를 기준으로 왼쪽 부분 배열 [1, 2]와 오른쪽 부분 배열 [10, 6, 8]에 대해 각각 퀵정렬을 재귀적으로 호출한다.
 왼쪽 부분 [1, 2]는 이미 정렬되어 있으므로 재귀 호출을 통해 그대로 유지된다.
 오른쪽 부분 [10, 6, 8]에서 pivot으로 10을 선택하고, 다시 분할하면 [6, 8, 10]이 된다.

4. 합치기: 모든 재귀 호출이 끝나면 정렬된 왼쪽 부분 [1, 2], pivot 3, 정렬된 오른쪽 부분 [6, 8, 10]을 합쳐 최종적으로 정렬된 배열을 만든다.

- 최종 배열은 [1, 2, 3, 6, 8, 10]가 된다.
- 이렇게 퀵정렬은 pivot을 기준으로 배열을 분할하고 재귀적으로 정렬하는 방식으로 작동한다.

### QuickSort
```
const quickSort = (list : number[]) => {

    qSort(0, list.length-1, list);
    
    console.log(list);
}

const qSort = (p : number, r : number, list : number[])=>{
    console.log(`qsort`);
    if( p < r ){
        // 분할
        let q = partition(p,r, list);

        // 왼쪽 정렬
        qSort(p , q-1, list);
        // 오른쪽 정렬
        qSort(q+1 , r, list);
    
    }

}

const partition = (p : number , r : number, list : number[]) => {
    console.log(`partition`);
    let x : number = list[r];
    let i = p-1;

    let temp;

    for(let j=p; j<=r-1; j++){
        if(list[j] <= x){
            i++;
            temp = list[i];
            list[i]=list[j];
            list[j]=temp;

            // [list[i], list[j]] = [list[j], list[i]];

        }
    }

    temp = list[i+1];
    list[i+1]=list[r];
    list[r]= temp;

    // [list[i+1], list[r]] = [list[r], list[i+1]];

    return i+1;
}


quickSort([4,1,2,5,11,21,3,7,9]);
```