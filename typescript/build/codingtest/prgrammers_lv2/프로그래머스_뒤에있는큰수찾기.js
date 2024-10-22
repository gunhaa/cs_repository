"use strict";
/*
문제 설명
정수로 이루어진 배열 numbers가 있습니다. 배열 의 각 원소들에 대해 자신보다 뒤에 있는 숫자 중에서 자신보다 크면서 가장 가까이 있는 수를 뒷 큰수라고 합니다.
정수 배열 numbers가 매개변수로 주어질 때, 모든 원소에 대한 뒷 큰수들을 차례로 담은 배열을 return 하도록 solution 함수를 완성해주세요. 단, 뒷 큰수가 존재하지 않는 원소는 -1을 담습니다.

제한사항
4 ≤ numbers의 길이 ≤ 1,000,000
1 ≤ numbers[i] ≤ 1,000,000
입출력 예

numbers	                result
[2, 3, 3, 5]	        [3, 5, 5, -1]
[9, 1, 5, 3, 6, 2]  	[-1, 5, 6, 6, -1, -1]
입출력 예 설명
입출력 예 #1
2의 뒷 큰수는 3입니다. 첫 번째 3의 뒷 큰수는 5입니다. 두 번째 3 또한 마찬가지입니다. 5는 뒷 큰수가 없으므로 -1입니다. 위 수들을 차례대로 배열에 담으면 [3, 5, 5, -1]이 됩니다.

입출력 예 #2
9는 뒷 큰수가 없으므로 -1입니다. 1의 뒷 큰수는 5이며, 5와 3의 뒷 큰수는 6입니다. 6과 2는 뒷 큰수가 없으므로 -1입니다. 위 수들을 차례대로 배열에 담으면 [-1, 5, 6, 6, -1, -1]이 됩니다.
*/
const solution_searchNumber = (numbers) => {
    let answer = new Array(numbers.length).fill(-1);
    let stack = [];
    for (let i = 0; i < numbers.length; i++) {
        // 현재 수가 스택의 인덱스 numbers보다 클 경우
        while (stack.length > 0 && numbers[i] > numbers[stack[stack.length - 1]]) {
            const index = stack.pop(); // 스택에서 인덱스 꺼내기
            answer[index] = numbers[i]; // 다음 큰 수로 업데이트
        }
        stack.push(i); // 현재 인덱스를 스택에 추가
    }
    console.log(answer);
};
const solution_searchNumber_fail = (numbers) => {
    let answer = [];
    //1. 다음 최대값이 있는 곳을 찾는다.
    // 1-1 현재 인덱스 값보다 큰 값이 없다면 -1을 반환한다. 다음인덱스로 넘어간다. 인덱스를 넘어갔다면 -1을 반환한다.
    // 1-3 현재 인덱스 값보다 큰 값을 찾는다.
    // 1-3-1 발견했다면 큰수 인덱스 -1까지의 값을 큰수로 넣는다.
    //1을 반복한다.
    let maxNum = 0;
    let maxIdx = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (maxIdx > i) {
            answer.push(maxNum);
        }
        else {
            maxNum = 0;
            const temp = numbers[i];
            const tempIdx = maxIdx;
            while (temp >= maxNum) {
                maxIdx++;
                console.log(maxIdx);
                if (maxIdx >= numbers.length) {
                    answer.push(-1);
                    maxIdx = tempIdx;
                    break;
                }
                maxNum = numbers[maxIdx];
            }
            if (i !== numbers.length) {
                answer.push(maxNum);
            }
        }
    }
    console.log(answer);
};
solution_searchNumber([2, 3, 3, 5]);
// solution_searchNumber([9, 1, 5, 3, 6, 2]);
