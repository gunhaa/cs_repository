"use strict";
/*

문제 설명
수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

제한 조건
시험은 최대 10,000 문제로 구성되어있습니다.
문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.
입출력 예
answers	        return
[1,2,3,4,5]	    [1]
[1,3,2,4,2]	    [1,2,3]
입출력 예 설명
입출력 예 #1

수포자 1은 모든 문제를 맞혔습니다.
수포자 2는 모든 문제를 틀렸습니다.
수포자 3은 모든 문제를 틀렸습니다.
따라서 가장 문제를 많이 맞힌 사람은 수포자 1입니다.

입출력 예 #2

모든 사람이 2문제씩을 맞췄습니다.

*/
function solution_mockexam1(answers) {
    const pattern1 = "12345";
    const pattern2 = "21232425";
    const pattern3 = "3311224455";
    const len = answers.length;
    const people1 = Array.from({ length: len }, (_, index) => pattern1[index % pattern1.length]);
    const people2 = Array.from({ length: len }, (_, index) => pattern2[index % pattern2.length]);
    const people3 = Array.from({ length: len }, (_, index) => pattern3[index % pattern3.length]);
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    for (let i = 0; i < len; i++) {
        if (Number(people1[i]) === answers[i]) {
            count1++;
        }
        if (Number(people2[i]) === answers[i]) {
            count2++;
        }
        if (Number(people3[i]) === answers[i]) {
            count3++;
        }
    }
    const maxCount = Math.max(count1, count2, count3);
    const arr = [];
    const answer = [];
    arr.push({ student: 1, ct: count1 });
    arr.push({ student: 2, ct: count2 });
    arr.push({ student: 3, ct: count3 });
    arr.forEach(item => {
        if (item.ct === maxCount) {
            answer.push(item.student);
        }
    });
    console.log(answer);
    return answer;
}
function solution_mockexam2(answers) {
    var answer = [];
    var a1 = [1, 2, 3, 4, 5];
    var a2 = [2, 1, 2, 3, 2, 4, 2, 5];
    var a3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    var a1c = answers.filter((a, i) => a === a1[i % a1.length]).length;
    var a2c = answers.filter((a, i) => a === a2[i % a2.length]).length;
    var a3c = answers.filter((a, i) => a === a3[i % a3.length]).length;
    var max = Math.max(a1c, a2c, a3c);
    if (a1c === max) {
        answer.push(1);
    }
    ;
    if (a2c === max) {
        answer.push(2);
    }
    ;
    if (a3c === max) {
        answer.push(3);
    }
    ;
    return answer;
}
// solution([1,2,3,4,5]);
// solution([1,3,2,4,2]);
