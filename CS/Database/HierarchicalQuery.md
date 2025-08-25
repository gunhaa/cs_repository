# 계층형 쿼리

- 트리구조를 표현하기 위한 쿼리
  - 계층형 쿼리는 회사 조직도, 상품 카테고리, 게시판의 답변 글처럼 부모-자식 관계가 꼬리를 물고 이어지는 데이터를 조회하기 위한 특별한 SQL이다
  - 일반적으로 자기참조 관계를 가진 하나의 테이블로 표현된다

## 예시

```sql
SELECT
    LEVEL, -- 계층의 깊이 (사장=1, 부장=2...) / 1부터 시작한다
    emp_name AS employee_tree,
    emp_id,
    manager_id
FROM
    employees
START WITH
    manager_id IS NULL -- 시작점: 상사가 없는 김사장에서 시작
CONNECT BY
    -- PRIOR는 "다음 노드" 라고 해석하면 된다
    PRIOR emp_id = manager_id; -- PRIOR 하위(자식) = 상위(부모)/ 순방향(Top-Down 전개)
    PRIOR manager_id = emp_id; -- PRIOR 상위(부모) = 하위(자식)/ 역방향(Bottom-Up 전개)
```