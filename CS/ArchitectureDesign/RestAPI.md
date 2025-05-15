# REST API

- Representation State Transfer로써, 웹 API를 위한 아키텍처 제약 사항과 모범 사례의 모음집이다.
- standard나 protocol이 아닌, 아키텍쳐 스타일에 불과하다는 것을 명심해야 한다
- REST 아키텍쳐의 제약사항을 따르는 API를 Restful API라고 부른다
- resources - oriented 규칙이다

## RESTFUL API서버의 특징

### Stateless

- RESTFUL 서버는 stateless해야 한다
- 클라이언트에 대한 세션 정보를 보관하면 안된다
  - 서버가 세션이 없어야 서버 그룹으로 가동하는 것이 쉬워진다
  - 이 특징으로 여러 서버로 분산해도 클라이언트는 전혀 알 수 없다
- 이 특징으로 인해 고확장성과 고가용성을 가지게 된다

### Cacheability

- 서버는 명시적이든 암시적이든 각응답의 캐시 속성을

### Resources best practice

- 명사로만 이름 짓기
- collection resources와 simple(단일) resources 분리
  - 컬렉션은 복수형으로, 단일 리소스는 단수형으로
- 명확하고 의미있는 이름 짓기
  - 리소스의 이름에 의미를 부여하면 사용자는 API를 쉽게 사용할 수 있다

### Use Http Method

- get simple, collection : GET
- create resource : POST
- update resource : put
- delete resource : delete

### Http method를 이용한 gurantees

1. GET method는 안전하다
   - 리소스에 적용해도 상태가 변하지 않는다
2. GET PUT DELETE는 멱등하다
   - 여러번 호출해도 반환값이 변하지 않는다
3. GET 요청은 디폴트로 캐싱이 가능하다
4. POST 요청은 캐시 가능하게 만들 수 있다.
   - 표준상 가능하지만, 조심스럽게 설계해야한다

### REST API Definition 예시

1. 개체를 구분한다
   - ex) 영화 스트리밍 서비스
   - users, movies, reviews, actors가 존재
2. 각 개체를 URI에 매핑한다
   - /users, /users/{user-id}
   - /movies, /movies/{movie-id}
   - /actors, /actors/{actor-id}
   - /movies/{movie-id}/reviews, /movies/{movie-id}/reviews/{review-id}
3. resurces 의 표현
   - json 사용

```json
GET /movies

"movies": [
    {
        "name": "titanic",
        "id": "movie-123"
    },
    {
        "name": "lords of the rings",
        "id": "movie-456"
    }
    .......
]

```

4. HTTP 메소드에 리소스를 수행할 행위를 지정한다

- 서버내에서 uri의 엔드포인트에서 실행될 로직을 개발하는 것을 의미한다
- POST /users : 유저 생성
- GET /users/{user-id} : 유저 정보 획득
- PUT /users/{user-id} : 유저 정보 업데이트
- DELETE /users/{user-id} : 유저 삭제