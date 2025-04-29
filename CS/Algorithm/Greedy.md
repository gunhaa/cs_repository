# Greedy 

> 266가지 문제로 정복하는 코딩 인터뷰(https://www.yes24.com/Product/Goods/103768603)

- 그리디 알고리즘은 해법을 단계적으로 계산한다
    - 각 단계마다 지역적으로 최적의 결정을 내리며, 이 결정은 절대 변경되지 않는다
- 그리디 알고리즘은 늘 최적의 해법을 생성하는 것은 아니다
```plaintext
1,3,6,12,24,30 펜스를 사용하여 48펜스를 주는 경우
그리디 알고리즘을 사용한다면 30, 12, 6 3개의 동전을 사용한다
하지만 최적 값은 24펜스 2개이다
```
- 이와 같이 일반적인 형태의 동전 교환 문제는 NP-난해(hard)문제이다.
- 하지만 일부 동전 교환문제는 그리디 알고리즘으로 풀 수 있다
    - 동전의 단위가 {1, r, r^2, r^3 ..} 인 경우 이다

## 그리디 알고리즘의 핵심
- 각 단계에서 가장 최선의 선택을 한 뒤, `절대로` 선택을 변경하지 않는다
- 그리디 알고리즘을 재귀적으로 추상화 한 뒤, 성능 향상을 위해 반복문을 써서 구현하면 쉬운 경우가 많다
- 그리디 방법이 최적 해법을 찾지 못하더라도, 최적 알고리즘을 찾는 통찰력 또는 휴리스틱에 대한 힌트가 될 수 있다
    - 문제 구조를 단순화해서 볼 수 있게 해주고
    - 최적해에 가까운 패턴이나 기준을 찾을 힌트를 주기도 한다
- 때로는 어떤 그리디 알고리즘을 선택해야 올바른지 명확하지 않은 경우도 있다

## 예제 문제

```java
public class Main {
        /* https://www.acmicpc.net/problem/1931
    회의실 배정
    시간 제한	메모리 제한
         2 초	128 MB
    문제
    한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다.
    각 회의 I에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의가 겹치지 않게 하면서 회의실을 사용할 수 있는 회의의 최대 개수를 찾아보자.
    단, 회의는 한번 시작하면 중간에 중단될 수 없으며 한 회의가 끝나는 것과 동시에 다음 회의가 시작될 수 있다.
    회의의 시작시간과 끝나는 시간이 같을 수도 있다. 이 경우에는 시작하자마자 끝나는 것으로 생각하면 된다.

    입력
    첫째 줄에 회의의 수 N(1 ≤ N ≤ 100,000)이 주어진다.
    둘째 줄부터 N+1 줄까지 각 회의의 정보가 주어지는데 이것은 공백을 사이에 두고 회의의 시작시간과 끝나는 시간이 주어진다.
    시작 시간과 끝나는 시간은 2^31-1보다 작거나 같은 자연수 또는 0이다.

    출력
    첫째 줄에 최대 사용할 수 있는 회의의 최대 개수를 출력한다.
    */

    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/main/java/baekjoon/gold/_1931/input"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int answer = 0;
        int count = Integer.parseInt(br.readLine());
        List<long[]> meetingList = new ArrayList<>();
        for (int i=0; i<count; i++){
            StringTokenizer st = new StringTokenizer(br.readLine());
            long h = Long.parseLong(st.nextToken());
            long m = Long.parseLong(st.nextToken());
            meetingList.add(new long[]{h,m});
        }


        meetingList.sort((a, b) -> {
            if (a[1] == b[1]){
                return Long.compare(a[0], b[0]);
            }
            return Long.compare(a[1], b[1]);
        });

        long lastFinish = -1;
        for (long[] meeting : meetingList) {
            if(lastFinish > meeting[0]){
                continue;
            }

            lastFinish = meeting[1];
            answer++;
        }

        System.out.println(answer);
    }
}
```
