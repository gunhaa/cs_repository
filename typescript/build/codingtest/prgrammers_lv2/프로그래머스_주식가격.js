"use strict";
/*
초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.

제한사항
prices의 각 가격은 1 이상 10,000 이하인 자연수입니다.
prices의 길이는 2 이상 100,000 이하입니다.

입출력 예
prices      	return
[1, 2, 3, 2, 3]	[4, 3, 1, 1, 0]

입출력 예 설명
1초 시점의 ₩1은 끝까지 가격이 떨어지지 않았습니다.
2초 시점의 ₩2은 끝까지 가격이 떨어지지 않았습니다.
3초 시점의 ₩3은 1초뒤에 가격이 떨어집니다. 따라서 1초간 가격이 떨어지지 않은 것으로 봅니다.
4초 시점의 ₩2은 1초간 가격이 떨어지지 않았습니다.
5초 시점의 ₩3은 0초간 가격이 떨어지지 않았습니다.


*/
function solution_stock1(prices) {
    let answer = [];
    for (let i = 0; i < prices.length; i++) {
        let t = 0;
        for (let j = i + 1; j < prices.length; j++) {
            if (prices[i] > prices[j]) {
                t++;
                break;
            }
            else {
                t++;
            }
        }
        answer.push(t);
    }
    return answer;
}
function solution_stock2(prices) {
    const answer = new Array(prices.length).fill(0);
    const stack = []; // 스택을 사용하여 인덱스를 저장
    for (let i = 0; i < prices.length; i++) {
        // 스택이 비어있지 않고 현재 가격이 스택의 가장 위 인덱스 가격보다 작으면
        while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
            const idx = stack.pop(); // 인덱스를 꺼내고
            answer[idx] = i - idx; // 가격이 떨어지는 시간을 계산
        }
        stack.push(i); // 현재 인덱스를 스택에 추가
    }
    // 남아있는 인덱스는 가격이 떨어지지 않으므로, 전체 길이에서 인덱스를 빼서 계산
    while (stack.length > 0) {
        const idx = stack.pop();
        answer[idx] = prices.length - 1 - idx;
    }
    return answer;
}
// console.log(solution([1, 2, 3, 2, 3]));
