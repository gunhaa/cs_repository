"use strict";
/*

문제 설명
Finn은 요즘 수학공부에 빠져 있습니다. 수학 공부를 하던 Finn은 자연수 n을 연속한 자연수들로 표현 하는 방법이 여러개라는 사실을 알게 되었습니다. 예를들어 15는 다음과 같이 4가지로 표현 할 수 있습니다.

1 + 2 + 3 + 4 + 5 = 15
4 + 5 + 6 = 15
7 + 8 = 15
15 = 15
자연수 n이 매개변수로 주어질 때, 연속된 자연수들로 n을 표현하는 방법의 수를 return하는 solution를 완성해주세요.

제한사항
n은 10,000 이하의 자연수 입니다.
입출력 예
n	result
15	4
입출력 예 설명
입출력 예#1
문제의 예시와 같습니다.

*/
// 시간 초과 -> O(n^2) 
const solution_num_over = (n) => {
    let count = 0;
    for (let i = 1; i < n + 1; i++) {
        let sum = 0;
        for (let j = i; j < n + 1; j++) {
            sum += j;
            if (sum === n) {
                count++;
            }
            else if (sum > n) {
                break;
            }
        }
    }
    return count;
};
// 사용 알고리즘 : 투포인터 
// 대표 예제 : 특정한 합을 가지는 연속 수열 찾기
const solution_num_twopointer = (n) => {
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    if (arr.length === 1)
        return 1;
    let count = 0;
    let p1 = 0;
    let p2 = 0;
    let sum = 0;
    while (p2 < n) {
        sum += arr[p2];
        while (sum > n) {
            sum -= arr[p1];
            p1++;
        }
        if (sum === n)
            count++;
        p2++;
    }
    return count;
};
