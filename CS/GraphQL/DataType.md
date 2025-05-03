# GraphQL의 자료형

## Graph 내장 자료형

### 스칼라 타입
- ID : 기본적으로는 String 이나, 고유 식별자 역할임을 나타낸다
- String : UTF-8 문자열
- Int : 부호가 있는 32비트 정수
- Float : 부호가 있는 부동 소수점 값
- Boolean : 참/거짓
- ! : Not null을 뜻한다(널값이 들어가면 GraphQL에서 오류 발생)

### 열거형
- 일치하지 않는 String이 반환되면 GraphQL은 에러를 낸다
```javascript
const { gql } = require('apollo-server')
const typeDefs = gql`
    enum Role {
        developer
        designer
        planner
    }
    enum NewOrUsed {
        new
        used
    }
`
module.exports = typeDefs
```

### 리스트
```javascript
// ...
        users: [String!]
// ...
```
- 해당 방식으로 사용된다
- ! NN으로 사용시 빈 배열은 허용되지만, 배열안에 null값은 허용되지 않는다

| 선언부         | `users: null` | `users: []` | `users: [..., null]` |
|----------------|---------------|-------------|------------------------|
| `[String]`     | ✔             | ✔           | ✔                      |
| `[String!]`    | ✔             | ✔           | ❌                     |
| `[String]!`    | ❌            | ✔           | ✔                      |
| `[String!]!`   | ❌            | ✔           | ❌                     |


### 객체 타입

- 사용자가 정의 한 타입

```javascript
const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Equipment {
        id: String
        used_by: Role!
        count: Int
        new_or_used: NewOrUsed!
    }
    type EquipmentAdv {
        id: ID!
        used_by: Role!
        count: Int!
        use_rate: Float
        is_new: Boolean!
        users: [String!]
    }
`
```