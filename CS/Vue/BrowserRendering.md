# Browser Rendering

- 크게본다면 화면 -> 출력까지의 파이프라인 흐름으로 설명 가능하다

## 일반적인 렌더링 흐름

1. HTML 파싱 & DOM 생성

   - 브라우저가 HTML 문서를 읽으면서 Tokenization
   - HTML 태그 -> DOM 노드로 변환
   - 최종적으로 DOM Tree를 생성
   - \<script> 태그를 만나게 된다면 sync blocking으로 js를 읽는 것이 우선된다

2. CSS 파싱 & CSSOM 생성

   - \<style>, \<link>에 연결된 CSS를 읽어서 CSSOM(CSS Object Model) Tree를 생성
   - CSSOM은 선택자 우선순위 계산, 상속 규칙 적용 등 최종 스타일 계산을 위한 데이터 구조

3. Render Tree 생성

   - DOM + CSSOM 결합으로 Render Tree 생성
   - Render Tree에는 화면에 표시되는 요소만 포함됨
     - ex) display:none의 경우는 DOM에는 있지만 Render Tree에는 없음

4. Layout

   - Render Tree의 각 노드의 위치와 크기 계산
   - CPU 연산량이 크고, 요소 변경 시 다시 실행

5. Paint

   - Layout에서 계산된 정보 기반으로 픽셀 단위로 색칠
   - 배경색, 텍스트, 그림자, 이미지 등 시각 정보가 결정됨

6. Compositing

   - 화면을 여러 레이어로 나누어 GPU가 합성
   - 최종적으로 화면에 출력

### Recap

- DOM 변경 시: 스타일 재계산 → Layout → Paint → Composite 중 일부나 전부가 다시 실행됨
- CSS만 변경 시: Paint부터 실행되는 경우도 있지만, width 변경처럼 레이아웃이 변하면 Layout도 다시 함

## Vue를 사용하는 경우의 렌더링

- Vue를 사용하면 첫 렌더링 시에만 실제 DOM을 만든다
  - 이후부터는 JS의 Virutal DOM을 변경 → Diff 계산 → 실제 DOM 최소 변경 방식으로 동작한다
    - Vue는 매번 Virtual DOM을 새로 만들어 diff를 계산한다
- HTML 파싱 중 \<script> 태그 발견시 sync blocking된다
  - 해당 태그에서 JS를 다운로드 → 파싱 → 컴파일 → 실행이 진행된다
  - Vue는 defer 옵션을 사용해서 HTML 파싱이 끝난 뒤 js가 실행되고, 해당 시점에 Vue가 초기화된다
