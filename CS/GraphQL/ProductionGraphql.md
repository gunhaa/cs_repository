# GraphQL 잘 쓰고 계신가요? (Production-ready GraphQL)

> https://www.youtube.com/watch?v=9G2vT4C4sAY

## Grpahql?

- API레이어에서 데이터를 주고 받는데 사용하는 Query Language
    1. 필요한 것만 요청해서 데이터를 받아올 수 있다(Over fetching 방지)
    2. 여러개의 데이터소스를 한번의 요청으로 처리할 수 있다
    3. 타입으로 데이터를 표현할 수 있다

## Schema?

- 데이터의 모양
- Database Schema
    - 데이터를 R/W하는데 최적화 관계와 참조로 중복 해소(정규화)
- Graphql Schema
    - Client는 데이터가 어디서 오는지 알 필요가없다(Backend가 여러 API에 의존해도 Client는 몰라도 됨)
    - Client중심의 Schema Layer라고 볼 수 있다
    - ex) front에서 이미지를 요청하는 경우의 type

        ```graphql
        type User {
            name: String
            image(width:ImageWidth): String
        }

        enum ImageWidth {
            W_42
            W_60
            W_100
        }
        ```

        - 프론트 입장에서 type만 제대로 정의 되었다면 쉽게 표현이 가능하고, 추가적인 API 설계가 필요하지 않다
        - 또한 어떤 width를 지원하는지 enum클래스를 통해 알려줄 수 있다
        - backend측도 enum을 이용하는게 더 명확하게 상태를 front에 알릴 수 있다

- error 관리
  - Graphql는 모든 요청이 200으로 와서 에러를 알기 힘들다
  - Error조차 Type으로 만들어서 반환하는게 더 좋을 수 있다(Naver 플레이스에서 사용)
  - 유니언 타입으로 사용
    - 확장에 닫혀있다
  ```graphql
  type DuplicatedNicknameError {
    message: String!
  }

  type PwordError {
    words: [String!]!
    message: String!
  }

  union CheckNicknameOutput =
      NicknameSucced
    | DuplicatedNicknameError
    | PwordError
  ```
  - 이 경우 interface를 활용하면 좋음
  ```graphql
  interface BaseError {
    message: String!
  }

  type DuplicatedNickname implements BaseError {
    message: String!
  }

  type PwordError implements BaseError {
    words: [String!]!
    message: String!
  }

  type CountOverError implements BaseError {
    count: Int!
    message: String!
  }
  ```
## Scalar
  - Graphql-scalar 라이브러리를 이용하면 편함
