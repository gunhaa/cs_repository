"use strict";
const bubbleSort = (list) => {
    let temp = 0;
    for (let last = list.length - 1; last >= 2; last--) {
        let swapped = false;
        for (let i = 0; i < last; i++) {
            if (list[i] > list[i + 1]) {
                console.log(`element 위치 변경 : ${list[i]} / ${list[i + 1]} `);
                // temp = list[i];
                // list[i] = list[i + 1];
                // list[i + 1] = temp;
                [list[i], list[i + 1]] = [list[i + 1], list[i]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    console.log(list.join("-"));
};
bubbleSort([21, 5, 22, 4, 15, 33]);
