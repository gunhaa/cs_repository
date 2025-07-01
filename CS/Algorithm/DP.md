# Dynamic Programming

> https://www.youtube.com/watch?v=GtqHli8HIqk&t=488s
> 세부 수행은 작은 문제를 Memory(cache)를 이용한 점화식 풀이에 가깝다
> 이전의 값을 재활용 한다

- dp를 memo라고 생각해도 된다
- dp가 의심된다면, 직접 n=4 정도까지 그려보며 규칙을 찾아보는 것이 좋고, 대부분의 규칙은 피보나치 수열과 유사하게 나온다

## Optimization problem

- 문제를 해결하는 최적의 답(optimal solution)을 찾아야 하는 문제
- optimal solution은 하나 이상일 수 있다
- maximum 혹은 minimum value를 가지는 solution을 찾는 문제들이 주를 이룬다
- DP는 optimization problem을 해결하는 전략 중 하나이다
  - 특히, subproblem(s)의 optimal solution(s)를 활용해서 problem의 optimal solution을 찾는다
  - 겹치는(overlapping) subproblems는 한번만 계산하고 그 결과를 저장한 뒤 재사용한다


## 수행방법

- 탑다운 방식으로 만든다면 Recursive call을 통해 부분의 합을 계산하지않고 dp를 사용해서 문제 해결 가능
- 모든 계산을하며, memo(cahce)값을 기록하며 진행한다
- 최대,최소의 경우 memo와 값 판정을 하여 최대,최소 값 판정 연산이 더 이상 필요없다면 call 이 나오지 않도록 조절한다
- 중복된 계산을 줄이는 것이 포인트이다

```java
package baekjoon.silver._2579;
import java.io.*;
import java.util.*;

public class Main {
    /* s3
    https://www.acmicpc.net/problem/2579
    계단 오르기
    시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
    1 초	128 MB	231458	81901	59063	34.662%
    문제
    계단 오르기 게임은 계단 아래 시작점부터 계단 꼭대기에 위치한 도착점까지 가는 게임이다.
    <그림 1>과 같이 각각의 계단에는 일정한 점수가 쓰여 있는데 계단을 밟으면 그 계단에 쓰여 있는 점수를 얻게 된다.

    <그림 1>

    예를 들어 <그림 2>와 같이 시작점에서부터 첫 번째, 두 번째, 네 번째, 여섯 번째 계단을 밟아 도착점에 도달하면 총 점수는 10 + 20 + 25 + 20 = 75점이 된다.

    <그림 2>

    계단 오르는 데는 다음과 같은 규칙이 있다.

    계단은 한 번에 한 계단씩 또는 두 계단씩 오를 수 있다. 즉, 한 계단을 밟으면서 이어서 다음 계단이나, 다음 다음 계단으로 오를 수 있다.
    연속된 세 개의 계단을 모두 밟아서는 안 된다. 단, 시작점은 계단에 포함되지 않는다.
    마지막 도착 계단은 반드시 밟아야 한다.
    따라서 첫 번째 계단을 밟고 이어 두 번째 계단이나, 세 번째 계단으로 오를 수 있다. 하지만, 첫 번째 계단을 밟고 이어 네 번째 계단으로 올라가거나,
    첫 번째, 두 번째, 세 번째 계단을 연속해서 모두 밟을 수는 없다.

    각 계단에 쓰여 있는 점수가 주어질 때 이 게임에서 얻을 수 있는 총 점수의 최댓값을 구하는 프로그램을 작성하시오.

    입력
    입력의 첫째 줄에 계단의 개수가 주어진다.

    둘째 줄부터 한 줄에 하나씩 제일 아래에 놓인 계단부터 순서대로 각 계단에 쓰여 있는 점수가 주어진다.
    계단의 개수는 300이하의 자연수이고, 계단에 쓰여 있는 점수는 10,000이하의 자연수이다.

    출력
    첫째 줄에 계단 오르기 게임에서 얻을 수 있는 총 점수의 최댓값을 출력한다.
    */

    static int iter;
    static int stairsLen;
    static int[] stairs;
    static int max = Integer.MIN_VALUE;
    static int [][] memo;

    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/main/java/baekjoon/silver/_2579/input"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        iter = Integer.parseInt(br.readLine());
        stairsLen = iter - 1;
        stairs = new int[301];
        memo = new int[301][3];
        for (int i = 0; i < iter; i++) {
            stairs[i] = Integer.parseInt(br.readLine());
        }

//        System.out.println(Arrays.toString(stairs));
//        System.out.println(stairsLen);
        // bottom up dp
        dpR(-1, 0, 0);
        bw.write(String.valueOf(max));
        bw.flush();
        bw.close();
    }

    //[10, 20, 15, 25, 10, 20]
    static void dpR(int start, int seq, int acc) {
        // 시작점을 제외하고, 이미 더 좋은 점수로 방문했다면 탐색할 필요 없음
        if (start != -1 && memo[start][seq] >= acc) {
            return;
        }

        // 메모에 현재까지 점수 저장 (더 큰 점수로만 갱신)
        if (start != -1) {
            memo[start][seq] = acc;
        }

        if (start == stairsLen) {
            max = Math.max(max, acc);
            return;
        }

        if (seq == 0 || seq == 1) {
            if (start + 1 <= stairsLen) {
                dpR(start + 1, seq + 1, acc + stairs[start + 1]);
            }
        }

        if(start + 2 <= stairsLen) {
            dpR(start + 2, 1, acc + stairs[start + 2]);
        }
    }
}
```