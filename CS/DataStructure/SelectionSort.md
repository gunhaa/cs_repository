# Selection Sort

> https://velog.io/@gunhaa/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0TS-Selection-Sort


![img](images/selectionSort1.gif)

- 전체 리스트에서 가장 작은 요소를 찾아 첫 번째 자리로 옮기고, 그 다음 작은 요소를 찾아 두 번째 자리로 옮기는 정렬 방식이다.
- 시간 복잡도 : $O(n^2)$
- 장점 : 데이터 교환 횟수가 적다
- 단점 : 시간 복잡도가 커서 비효율적이다.
- 특징 : 교환은 적지만, 모든 요소를 반복적으로 비교해야 하기 때문에 느리다.
- 사용처 
   - 작은 데이터 세트 : 비효율성이 노출되지 않기 때문에 사용된다.
   - 선택 정렬은 제자리정렬이기 때문에 추가적으로 메모리를 거의 사용하지 않는다. 그래서 메모리가 중요한 시스템에서 사용한다.

### class SelectionSort

```


// 중복된 값은 없음

const selelctionSort1 = (list: number[]) => {


    for (let i = 0; i < list.length; i++) {
        let min = Infinity;

        for (let j = i; j < list.length; j++) {

            let tempMin: number = Infinity;

            tempMin = list[j] > list[j + 1] ? list[j + 1] : list[j];

            min = min > tempMin ? tempMin : min;

        }

        console.log(`리스트에 들어가는 최소값 : ${min}`);
        let tempMinIndex = list.indexOf(min);
        let tempChangeValue = list[i];

        list[i] = min;
        list[tempMinIndex] = tempChangeValue;


    }

    console.log(list.join("-"));
}

const selelctionSort2 = (list: number[]) => {
    console.log("---sort2 실행----")

    for (let i = 0; i < list.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < list.length; j++) {

            if (list[j] < list[minIndex]) {

                minIndex = j;

            }

        }

        if (minIndex !== i) {

            [list[i], list[minIndex]] = [list[minIndex], list[i]];

        }

    }

    console.log(list.join("-"));
}


selelctionSort1([12, 15, 11, 7, 3, 21, 5]);
selelctionSort2([12, 15, 11, 7, 3, 21, 5]);

```