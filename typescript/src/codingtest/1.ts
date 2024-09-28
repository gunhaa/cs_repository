//연속 펄스 부분 수열의 합

// 어떤 수열의 연속 부분 수열에 같은 길이의 펄스 수열을 각 원소끼리 곱하여 연속 펄스 부분 수열을 만들려 합니다. 펄스 수열이란 [1, -1, 1, -1 …] 또는 [-1, 1, -1, 1 …] 과 같이 1 또는 -1로 시작하면서 1과 -1이 번갈아 나오는 수열입니다.
// 예를 들어 수열 [2, 3, -6, 1, 3, -1, 2, 4]의 연속 부분 수열 [3, -6, 1]에 펄스 수열 [1, -1, 1]을 곱하면 연속 펄스 부분수열은 [3, 6, 1]이 됩니다. 또 다른 예시로 연속 부분 수열 [3, -1, 2, 4]에 펄스 수열 [-1, 1, -1, 1]을 곱하면 연속 펄스 부분수열은 [-3, -1, -2, 4]이 됩니다.
// 정수 수열 sequence가 매개변수로 주어질 때, 연속 펄스 부분 수열의 합 중 가장 큰 것을 return 하도록 solution 함수를 완성해주세요.

function solution14(sequence: number[]) {

    let searchMax: number[] = [];



    for (let i = 0; i < sequence.length; i++) {
        for (let j = 0; j < sequence.length; j++) {

            let tempArr: number[] = sequence.slice(i, j + 1);

            // case 1. 1부터 시작하는 펄스수열

            // case 2. -1 부터 시작하는 펄스수열
            search(tempArr);
        }
    }


    function search(arr: number[]) {
        let sum1 = 0;
        let sum2 = 0;
        for (let i = 0; i < arr.length; i++) {
            if (i % 2 === 0) {

                sum1 += arr[i];

            } else {

                sum1 += arr[i] * (-1);
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (i % 2 === 0) {

                sum2 += arr[i] * (-1);

            } else {
                sum2 += arr[i];
            }
        }

        if (sum1 > sum2) {

            searchMax.push(sum1);

        } else {

            searchMax.push(sum2);

        }

    }

    //const maxNumber = Math.max(...searchMax);

    const maxNumber = searchMax.reduce((a, b): number => {
        return a > b ? a : b;
    });

    return maxNumber;
}

function solution13(sequence: number[]) {

    let temp1 = (function (seq) {

        let tempArr: number[] = [];

        for (let i = 0; i < seq.length; i++) {
            if (i % 2 == 0) {
                tempArr.push(seq[i] * (-1));
            } else {
                tempArr.push(seq[i]);
            }
        }

        return tempArr;

    })(sequence);

    let temp2 = (function (seq) {

        let tempArr: number[] = [];

        for (let i = 0; i < seq.length; i++) {
            if (i % 2 == 1) {
                tempArr.push(seq[i] * (-1));
            } else {
                tempArr.push(seq[i]);
            }
        }

        return tempArr;

    })(sequence);

    let maxSum1 = -Infinity;
    let maxSum2 = -Infinity;

    for (let i = 0; i < temp1.length; i++) {

        let sum1 = 0;
        let sum2 = 0;
        for (let j = i; j < temp1.length; j++) {

            sum1 += temp1[j];
            sum2 += temp2[j];


            if (sum1 > maxSum1) {
                maxSum1 = sum1;
            }
            if (sum2 > maxSum2) {
                maxSum2 = sum2;
            }


        }
    }


    return Math.max(maxSum1, maxSum2);
}

function solution12(sequence: number[]) {

    let pulse1 = [];
    let pulse2 = [];
    // 1. 시퀀스를 펄스 수열을 곱한 두개로 만든다.
    for (let i = 0; i < sequence.length; i++) {
        if (i % 2 == 0) {
            pulse1.push(i);
        } else {
            pulse1.push(-i);
        }
    }

    for (let i = 0; i < sequence.length; i++) {
        if (i % 2 == 0) {
            pulse2.push(-i);
        } else {
            pulse2.push(i);
        }
    }


    let temp1 = sequence.map((item, index) => {
        return item * pulse1[index];
    });

    let temp2 = sequence.map((item, index) => {
        return item * pulse2[index];
    });

    // 2. 수열들의 최대 값을 구한다.

    let maxnum1 = -Infinity;
    let maxnum2 = -Infinity;

    let max1: number = 0;
    let max2: number = 0;
    for (let i = 0; i < temp1.length; i++) {
        max1 += temp1[i];
        if (max1 > maxnum1) {
            maxnum1 = max1;
        }
    }

    for (let i = 0; i < temp2.length; i++) {
        max2 += temp1[i];
        if (max2 > maxnum2) {
            maxnum2 = max2;
        }
    }

    // 3. 비교한다.

}

function solution11(sequence: number[]) {

    let pulse1 = [];
    let pulse2 = [];
    // 1. 시퀀스를 펄스 수열을 곱한 두개로 만든다.
    for (let i = 0; i < sequence.length; i++) {
        if (i % 2 == 0) {
            pulse1.push(1);
        } else {
            pulse1.push(-1);
        }
    }

    for (let i = 0; i < sequence.length; i++) {
        if (i % 2 == 0) {
            pulse2.push(-1);
        } else {
            pulse2.push(1);
        }
    }

    let temp1 = sequence.map((item, index) => {
        return item * pulse1[index];
    });

    let temp2 = sequence.map((item, index) => {
        return item * pulse2[index];
    });

    let max1 = -Infinity;
    let max2 = -Infinity;

    let now1 = 0;
    let now2 = 0;

    for (let i = 0; i < temp1.length; i++) {
                        // 지금 값,여태까지 누적합중 최대
        now1 = Math.max(temp1[i], now1+temp1[i]);

        max1 = Math.max(now1, max1);

    }
    // if (now1 > max1) {
    //     max1 = now1;
    // } else {
    //     now1 = max1;
    // }

    for (let i = 0; i < temp2.length; i++) {
        now2 = Math.max(temp2[i], now2+temp2[i]);

        max2 = Math.max(now2, max2);
    }

    return Math.max(max1, max2);
}
