
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