"use strict";
/*
문제 설명
괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다. 예를 들어

"()()" 또는 "(())()" 는 올바른 괄호입니다.
")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
'(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고, 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.

제한사항
문자열 s의 길이 : 100,000 이하의 자연수
문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.
*/
function solution(s) {
    let stack = [];
    for (let item of s) {
        if (item === "(") {
            stack.push("(");
        }
        else if (item === ")") {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        }
    }
    console.log(`stack.len : ${stack.length}`);
    return stack.length === 0;
}
// 시간 초과
function solutionTimeOut(s) {
    let arr = s.split("");
    let len = arr.length;
    let count = 0;
    while (arr.length !== 0) {
        if (arr.indexOf("(") >= 0) {
            let index = arr.indexOf("(");
            arr.splice(index, 1);
            if (arr.indexOf(")") >= index) {
                let index2 = arr.indexOf(")");
                arr.splice(index2, 1);
                count++;
                count++;
            }
            else {
                break;
            }
        }
    }
    if (len === count) {
        return true;
    }
    else {
        return false;
    }
}
solution("()()");
console.log(solution("()()"));
console.log(solution("(())()"));
console.log(solution(")()("));
console.log(solution("(()("));
