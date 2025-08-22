# SQL 윈도우 함수 (Window Functions)

### 1. 목적

윈도우 함수는 행과 행 간의 관계를 쉽게 정의하기 위해 만들어진 함수다. `GROUP BY`처럼 결과를 한 줄로 집계하는 것이 아니라, 각 행은 그대로 유지하면서 그 행에 대한 계산 값(순위, 합계, 평균 등)을 새로운 열에 추가할 때 사용한다. 데이터 분석, 순위 계산, 누적 합계 등 복잡한 분석 쿼리를 간결하게 작성할 수 있게 한다.

#### Group by vs Window Function

- GROUP BY는 전체를 요약해서 하나의 행으로 줄이는 집계
- 윈도우 함수는 각 행마다 지정한 범위(윈도우)에 대한 집계 결과를 붙여주는 방식
- 즉, 윈도우 함수는 "집계하면서도 원래 데이터를 유지하고 싶을 때" 쓰는 거고, 컬럼 하나(혹은 범위 하나)에 대해서만 집계 값을 보고 싶을 때 유용하다고 보면 된다.

### 2. 기본 문법 및 주요 용어

윈도우 함수는 `OVER` 키워드와 함께 사용되며, `OVER` 절 안에는 3가지 주요 구문이 있다.

| 용어 | 설명 |
| :--- | :--- |
| `FUNCTION()` | 사용할 윈도우 함수 (예: `RANK()`, `SUM()`) |
| `OVER()` | 윈도우 함수임을 명시하는 키워드 |
| `PARTITION BY` | (선택) 창(Window)을 분할할 기준이 되는 열을 지정한다. `GROUP BY`와 유사하게 동작한다. |
| `ORDER BY` | (선택) 파티션 내에서 어떤 순서로 함수를 적용할지 정렬 기준을 지정한다. |
| `ROWS` 또는 `RANGE` | (선택) 파티션 내에서 함수를 적용할 범위를 더욱 세부적으로 지정한다. (예: 현재 행 기준 앞뒤 N개 행) |

기본 사용법:
```sql
함수명() OVER (
    [PARTITION BY 분할할_열]
    [ORDER BY 정렬할_열]
    [ROWS BETWEEN 시작점 AND 끝점]
)
```

### 3. 함수 종류 및 예제

#### 가. 순위 함수 (Ranking Functions)

| 함수명 | 설명 및 사용법 | 예제 (employees 테이블: name, department, salary) |
| :--- | :--- | :--- |
| `RANK()` | 순위를 매긴다. 동일한 값에는 같은 순위를 부여하고, 다음 순위는 건너뛴다. (예: 1, 2, 2, 4) | `SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS salary_rank FROM employees;` |
| `DENSE_RANK()` | 순위를 매긴다. 동일한 값에는 같은 순위를 부여하고, 다음 순위를 건너뛰지 않는다. (예: 1, 2, 2, 3) | `SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_dense_rank FROM employees;` |
| `ROW_NUMBER()` | 파티션 내에서 고유한 순번을 부여한다. 동일한 값이라도 다른 순번을 가진다. (예: 1, 2, 3, 4) | `SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num FROM employees;` |
| `NTILE(n)` | 파티션 내의 데이터를 지정된 `n`개의 그룹으로 나누고 그룹 번호를 부여한다. | `SELECT name, salary, NTILE(4) OVER (ORDER BY salary DESC) AS salary_quartile FROM employees;` |

#### 나. 집계 함수 (Aggregate Functions)

| 함수명 | 설명 및 사용법 | 예제 (employees 테이블: name, department, salary) |
| :--- | :--- | :--- |
| `SUM()` | 파티션별 합계를 계산한다. `ORDER BY`를 함께 쓰면 누적 합계를 계산한다. | `SELECT name, department, salary, SUM(salary) OVER (PARTITION BY department) AS dept_total_salary FROM employees;` |
| `AVG()` | 파티션별 평균을 계산한다. | `SELECT name, department, salary, AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary FROM employees;` |
| `COUNT()` | 파티션별 개수를 계산한다. | `SELECT name, department, COUNT(*) OVER (PARTITION BY department) AS dept_employee_count FROM employees;` |
| `MAX()` / `MIN()` | 파티션별 최댓값/최솟값을 계산한다. | `SELECT name, salary, MAX(salary) OVER () AS highest_salary FROM employees;` |

- 집계함수는 기본적으로 null값을 계산하지 않는다
  - 하지만 count(*)의 경우만 null 값을 전부 계산하니 사용할때 주의해야 한다

#### 다. 행 순서 함수 (Row Ordering Functions)

| 함수명 | 설명 및 사용법 | 예제 (employees 테이블: name, department, salary) |
| :--- | :--- | :--- |
| `LAG(col, n, default)` | 파티션 내에서 현재 행보다 `n`번째 앞에 있는 행의 `col` 값을 가져온다. (기본 `n=1`) | `SELECT name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS previous_salary FROM employees;` |
| `LEAD(col, n, default)` | 파티션 내에서 현재 행보다 `n`번째 뒤에 있는 행의 `col` 값을 가져온다. (기본 `n=1`) | `SELECT name, salary, LEAD(salary, 1, 0) OVER (ORDER BY salary) AS next_salary FROM employees;` |
| `FIRST_VALUE(col)` | 파티션 내에서 정렬 순서상 가장 첫 번째 행의 `col` 값을 가져온다. | `SELECT name, department, salary, FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS top_earner_in_dept FROM employees;` |
| `LAST_VALUE(col)` | 파티션 내에서 정렬 순서상 가장 마지막 행의 `col` 값을 가져온다. (범위 지정 필요) | `SELECT name, department, salary, LAST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_earner_in_dept FROM employees;` |
