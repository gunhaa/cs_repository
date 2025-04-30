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
- 완전 탐색+그리디
    - N의 값이 작기 때문에 모든 경우의 수를 탐색하며
    - 가장 최적의 수가 될 수 있는 경우의 알고리즘을 만들어 탐색한다(그리디)
```java
package baekjoon.platinum._1047;

import java.io.*;
import java.util.*;

public class Main2 {

    /* https://www.acmicpc.net/problem/1047
    울타리
    시간 제한	메모리 제한
         2 초	128 MB
    문제
    은진이의 집 앞에는 많은 나무가 심어져 있는 아름다운 정원이 있다.

    최근에 새로운 법이 제정되었다. 이 법은 모든 정원은 울타리로 둘러쌓여야 한다는 법이다.
    울타리는 반드시 변이 축에 평행한 직사각형 모양이어야 한다. 모든 나무는 울타리의 안에 있거나, 울타리의 경계에 접해 있어야 한다.

    이러한 새로운 법을 듣게된 은진이는 마음이 아팠다.
    안타깝게도, 은진이는 울타리를 만들 나무를 살 돈이 없다. 따라서, 은진이는 정원에 심어져있는 나무를 조금 잘라 울타리를 만드는 방법밖에 없다.

    각 나무가 심어져 있는 (x, y)위치와, 나무를 베었을 때, 만들 수 있는 울타리의 길이가 주어진다.

    은진이는 나무를 매우 사랑하기 때문에, 나무를 되도록이면 조금만 나무를 벌목하려고 한다.
     은진이가 새로운 법을 지키기 위해 잘라야 하는 나무 개수의 최솟값을 구하는 프로그램을 작성하시오.

    가로 세로의 길이 중 하나가 0이어도 직사각형이며, 모두 0이어도 직사각형이다.

    입력
    첫째 줄에 N이 주어진다. N은 2보다 크거나 같고, 40보다 작거나 같은 자연수이다.
    둘째 줄부터 N개의 줄에 각 나무가 심어져 있는 위치와 그 나무로 만들 수 있는 울타리의 길이가 순서대로 주어진다.
    모든 값은 1,000,000보다 작거나 같은 자연수이다. 모든 나무의 x좌표는 같지 않고, y좌표도 같지 않다.

    출력
    첫째 줄에 문제의 정답을 출력한다.
    */
    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/main/java/baekjoon/platinum/_1047/input"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());

        List<Wood> woodList = new ArrayList<>();

        // stdin 나무 리스트 생성
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int x = Integer.parseInt(st.nextToken());
            int y = Integer.parseInt(st.nextToken());
            int woodLength = Integer.parseInt(st.nextToken());
            woodList.add(new Wood(x, y, woodLength));
        }

        List<Wood> insideWoodList = new ArrayList<>();
        List<Wood> outsideWoodList = new ArrayList<>();

        // 모든 사각형의 경우의 수를 구한다(N=40)
        for (int i = 0; i < woodList.size(); i++) {
            for (int j = i; j < woodList.size(); j++) {
                for (int k = 0; k < woodList.size(); k++) {
                    for (int l = k; l < woodList.size(); l++) {
                        insideWoodList.clear();
                        outsideWoodList.clear();

                        int x1 = woodList.get(i).x;
                        int x2 = woodList.get(j).x;
                        int y1 = woodList.get(k).y;
                        int y2 = woodList.get(l).y;

                        int minX = Math.min(x1,x2);
                        int maxX = Math.max(x1,x2);
                        int minY = Math.min(y1,y2);
                        int maxY = Math.max(y1,y2);

                        // 울타리의 필요 나무 갯수를 구한다
                        int needWoods = ((maxX - minX) + (maxY - minY)) * 2;

                        // 바깥 나무들의 위치를 구한다
                        for (int m = 0; m < woodList.size(); m++) {
                            Wood wood = woodList.get(m);
                            if (wood.x < minX || wood.x > maxX || wood.y < minY || wood.y > maxY) {
                                outsideWoodList.add(wood);
                            } else {
                                insideWoodList.add(wood);
                            }
                        }

                        // 외부의 나무는 반드시 다 소모한다
                        int count = 0;
                        int acc = 0;
                        for (Wood wood : outsideWoodList) {
                            count++;
                            acc += wood.length;
                        }
                        
                        if(acc >= needWoods){
                            // 최소값 갱신
                            min = Math.min(min, count);
                            continue;
                        }
                        // 내림차순 정렬
                        Collections.sort(insideWoodList);
                        System.out.println(insideWoodList);
                        // 안됬다면 추가 진행
                        for (int m = 0; m < insideWoodList.size(); m++) {
                            Wood wood = insideWoodList.get(m);
                            count++;
                            acc += wood.length;
                            if(acc >= needWoods){
                                // 최소값 갱신
                                min = Math.min(min, count);
                                break;
                            }
                        }
                    }
                }
            }
        }
        System.out.println(min);
    }

    static int min = Integer.MAX_VALUE;

    static class Wood implements Comparable<Wood>{
        int x;
        int y;
        int length;

        Wood(int x, int y, int getWoods) {
            this.x = x;
            this.y = y;
            this.length = getWoods;
        }

        @Override
        public int compareTo(Wood o) {
            return Integer.compare(o.length, this.length);
        }
    }
}
```