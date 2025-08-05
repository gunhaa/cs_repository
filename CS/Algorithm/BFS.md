# BFS

- BFS는 모든 경로의 비용(가중치)이 1로 동일할 때 사용하는 대표적인 알고리즘이다.
- 핵심 원리: 시작점부터 가까운 순서(레벨 순)로 주변을 탐색한다. 큐를 사용하여, 시작점에서 한 칸 떨어진 모든 지점을 본 후, 두 칸 떨어진 모든 지점을 보는 식으로 진행된다.
- 특징: 항상 최단 경로(가장 적은 수의 칸을 지나는 경로)를 찾는 것을 보장한다.
- 주요 용도: 미로 찾기, 소셜 네트워크에서 두 사람 사이의 최단 인맥 찾기 등

## 뼈대코드

```java
import java.util.LinkedList;
import java.util.Queue;

class Bfs {

    static class Point {
        int row, col; // row: 행, col: 열

        Point(int row, int col) {
            this.row = row;
            this.col = col;
        }
    }

    static int n, m;
    static boolean[][] visited;
    static int[][] graph;

    // 이동할 네 가지 방향 정의 (상, 하, 좌, 우)
    static int[] dRow = {-1, 1, 0, 0}; // 행(세로) 변화량
    static int[] dCol = {0, 0, -1, 1}; // 열(가로) 변화량

    public static void bfs(int startRow, int startCol) {
        Queue<Point> queue = new LinkedList<>();
        queue.add(new Point(startRow, startCol));
        visited[startRow][startCol] = true;

        while (!queue.isEmpty()) {
            Point current = queue.poll();
            int row = current.row;
            int col = current.col;

            for (int i = 0; i < 4; i++) {
                int nRow = row + dRow[i]; // 새로운 행 위치
                int nCol = col + dCol[i]; // 새로운 열 위치

                // 경계 검사
                if (nRow < 0 || nRow >= n || nCol < 0 || nCol >= m) {
                    continue;
                }
                
                if (!visited[nRow][nCol]) {
                    visited[nRow][nCol] = true;
                    queue.add(new Point(nRow, nCol));
                }
            }
        }
    }

    public static void main(String[] args) {
        n = 4; // 총 행의 수
        m = 5; // 총 열의 수
        graph = new int[n][m];
        visited = new boolean[n][m];

        bfs(0, 0); // 0행 0열에서 탐색 시작
    }
}
```

## 예제문제 (백준 5014 - 스타트링크)

```java
package baekjoon.silver._5014;

import java.util.*;
import java.io.*;

public class Main {
    /* s1
스타트링크 다국어
시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
1 초	256 MB	64815	22446	17213	34.579%
문제
강호는 코딩 교육을 하는 스타트업 스타트링크에 지원했다.
오늘은 강호의 면접날이다. 하지만, 늦잠을 잔 강호는 스타트링크가 있는 건물에 늦게 도착하고 말았다.

스타트링크는 총 F층으로 이루어진 고층 건물에 사무실이 있고, 스타트링크가 있는 곳의 위치는 G층이다.
강호가 지금 있는 곳은 S층이고, 이제 엘리베이터를 타고 G층으로 이동하려고 한다.

보통 엘리베이터에는 어떤 층으로 이동할 수 있는 버튼이 있지만, 강호가 탄 엘리베이터는 버튼이 2개밖에 없다.
U버튼은 위로 U층을 가는 버튼, D버튼은 아래로 D층을 가는 버튼이다.
(만약, U층 위, 또는 D층 아래에 해당하는 층이 없을 때는, 엘리베이터는 움직이지 않는다)

강호가 G층에 도착하려면, 버튼을 적어도 몇 번 눌러야 하는지 구하는 프로그램을 작성하시오.
만약, 엘리베이터를 이용해서 G층에 갈 수 없다면, "use the stairs"를 출력한다.

입력
첫째 줄에 F, S, G, U, D가 주어진다. (1 ≤ S, G ≤ F ≤ 1000000, 0 ≤ U, D ≤ 1000000) 건물은 1층부터 시작하고, 가장 높은 층은 F층이다.

출력
첫째 줄에 강호가 S층에서 G층으로 가기 위해 눌러야 하는 버튼의 수의 최솟값을 출력한다. 만약, 엘리베이터로 이동할 수 없을 때는 "use the stairs"를 출력한다.
    */
    static int F;
    static int S;
    static int G;
    static int U;
    static int D;
    static boolean[] visited;
    static final String impossible = "use the stairs";
    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("src/main/java/baekjoon/silver/_5014/input"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        F = Integer.parseInt(st.nextToken());
        S = Integer.parseInt(st.nextToken());
        G = Integer.parseInt(st.nextToken());
        U = Integer.parseInt(st.nextToken());
        D = Integer.parseInt(st.nextToken());
        visited = new boolean[F+1];

        bfs();
    }

    static void bfs() {
        Queue<Floor> queue = new LinkedList<>();
        queue.add(new Floor(S, 0));
        visited[S] = true;

        while(!queue.isEmpty()) {
            Floor cur = queue.poll();
            if(cur.floor == G) {
                System.out.println(cur.depth);
                return;
            }

            int moveUp = cur.floor+U;
            int moveDown = cur.floor-D;
            if(moveUp <= F) {
                if(!visited[moveUp]) {
                    visited[moveUp] = true;
                    queue.add(new Floor(moveUp, cur.depth+1));
                }
            }

            if(moveDown >= 1) {
                if(!visited[moveDown]) {
                    visited[moveDown] = true;
                    queue.add(new Floor(moveDown, cur.depth+1));
                }
            }
        }
        System.out.println(impossible);
    }

    static class Floor {
        int floor;
        int depth;

        public Floor(int floor, int depth) {
            this.floor = floor;
            this.depth = depth;
        }
    }
}
```

- 해당 문제에서 visited 배열이 사용가능 한지가 햇갈렸었음
  - 엘레베이터의 위치가 +,- 가 되는 상황인데 어느 층에 도달한 시점이 가장 빠른지점 인지를 확신할 수 있는가?
    - 어떤 층(X)에 BFS를 통해 처음으로 도달했다면, 그 경로는 반드시 시작점(S)에서 X층까지 가는 최단 경로 중 하나이다. 만약 더 짧은 경로가 있었다면, BFS의 특성상 그 경로를 통해 더 일찍 X층에 도착했을 것이기 때문이다.
- Floor 클래스는 1차원 배열을 써서 현재 층을 저장하는 방식으로 변경할 수 있다(boolean[] visited, int[] curDepth 사용)
  - 메모리 효율성은 조금 높아지지만, 코드가 직관적이지 않아서 해당 스타일이 더 좋을거 같아서 객체지향적으로 사용