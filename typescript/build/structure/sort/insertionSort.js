"use strict";
const insertionSort = (list) => {
    // 1부터 시작하여 배열의 길이만큼 반복 (0번째 요소는 이미 정렬된 상태)
    for (let i = 1; i < list.length; i++) {
        let loc = i - 1; // 현재 삽입할 아이템의 위치를 찾기 위한 변수
        let newItem = list[i]; // 현재 비교할 새로운 아이템 설정
        // loc가 0 이상이고 newItem이 list[loc]보다 작을 때 반복
        while (loc >= 0 && newItem < list[loc]) {
            list[loc + 1] = list[loc]; // 요소를 오른쪽으로 이동
            loc--; // 이전 요소로 이동
        }
        list[loc + 1] = newItem; // newItem을 적절한 위치에 삽입
    }
    console.log(list.join(`-`)); // 정렬된 리스트를 하이픈으로 연결하여 출력
};
// 함수 호출
insertionSort([3, 12, 2, 1, 15, 8]);
