# 인자

```javascript
const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        people: [People]
        peopleFiltered(
            team: Int, 
            sex: Sex, 
            blood_type: BloodType, 
            from: String
        ): [People]
    }
`

module.exports = typeDefs

// ...

const resolvers = {
    Query: {
        people: (parent, args) => dbWorks.getPeople(args),
        peopleFiltered: (parent, args) => dbWorks.getPeople(args),
        person: (parent, args) => dbWorks.getPeople(args)[0]
    }
}

```
- 요청 쿼리
    - resolvers에서 args로 이용해서 로직을 실행 시킬 수 있다
```shell
query {
  peopleFiltered (
    team: 1
    blood_type: B
    from: "Texas"
  ) {
    id
    first_name
    last_name
    sex
    blood_type
    serve_years
    role
    team
    from
  }
}
```

## 페이지 처리

```javascript
    type Query {
        ...
        peoplePaginated(
            page: Int!,
            per_page: Int!
        ): [People]
        ...
    }
```
- 요청 쿼리
    - 페이지당 7개, 1페이지
    - 필드를 추가해 필터링도 가능함
    - 페이징 쿼리는 리졸버에서 인자로 받아서 개발자가 직접 만들어야함
```shell
query {
	peoplePaginated(page: 1, per_page: 7) {
    id
    first_name
    last_name
    sex
    blood_type
    serve_years
    role
    team
    from
  }
}
```

## 인풋 타입

```javascript
const typeDefs = gql`
    ....
    input PostPersonInput {
        first_name: String!
        last_name: String!
        sex: Sex!
        blood_type: BloodType!
        serve_years: Int!
        role: Role!
        team: ID!
        from: String!
    }
`
const resolvers = {
    // ...
    Mutation: {
        postPerson: (parent, args) => dbWorks.postPerson(args),
    }
}
type Mutation {
    postPerson(input: PostPersonInput): People!
    ...
}
```