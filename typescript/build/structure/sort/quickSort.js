"use strict";
const quickSort = (list) => {
    qSort(0, list.length - 1, list);
    console.log(list);
};
const qSort = (p, r, list) => {
    console.log(`qsort`);
    if (p < r) {
        // 분할
        let q = partition(p, r, list);
        // 왼쪽 정렬
        qSort(p, q - 1, list);
        // 오른쪽 정렬
        qSort(q + 1, r, list);
    }
};
const partition = (p, r, list) => {
    console.log(`partition`);
    let x = list[r];
    let i = p - 1;
    let temp;
    for (let j = p; j < r; j++) {
        if (list[j] <= x) {
            i++;
            // temp = list[i];
            // list[i]=list[j];
            // list[j]=temp; 
            [list[i], list[j]] = [list[j], list[i]];
        }
    }
    // temp = list[i+1];
    // list[i+1]=list[r];
    // list[r]= temp;
    [list[i + 1], list[r]] = [list[r], list[i + 1]];
    return i + 1;
};
quickSort([4, 1, 2, 5, 11, 21, 3, 7, 9]);
