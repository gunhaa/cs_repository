# GraphQL

## GraphQL이란 무엇인가?

- 하나의 엔드 포인트에서 정보를 요청/응답을 받을 수 있다

### GraphQL 예제

- 팀 정보 받아오기
```shell
query {
  teams {
    id
    manager
    office
    extension_number
    mascot
    cleaning_duty
    project
  }
}
```

- 팀의 필요한 정보만 받아오기
```shell
query {
  teams {
    manager
    office
  }
}
```
```shell
query {
  team(id: 1) {
    manager
    office
  }
}
```
- 팀 정보와 해당 팀 멤버들의 정보들 받아오기
```shell
query {
  team(id: 1) {
    manager
    office
    members {
      first_name
      last_name
    }
  }
}
```
- 팀 목록과 역할 목록 받아오기
```shell
query {
  teams {
    manager
    office
    mascot
  }
  roles {
    id
    requirement
  }
}
```
- 새 팀 추가
```shell
mutation {
  postTeam (input: {
    manager: "John Smith"
    office: "104B"
    extension_number: "#9982"
    mascot: "Dragon"
    cleaning_duty: "Monday"
    project: "Lordaeron"
  }) {
    manager
    office
    extension_number
    mascot
    cleaning_duty
    project
  }
}
```
- 특정 번호의 팀 정보 수정
```shell
mutation {
  editTeam(id: 2, input: {
    manager: "Maruchi Han"
    office: "105A"
    extension_number: "2315"
    mascot: "Direwolf"
    cleaning_duty: "Wednesday"
    project: "Haemosu"
  }) {
    id,
    manager,
    office,
    extension_number,
    mascot,
    cleaning_duty,
    project
  }
}
```
- 특정 번호의 팀 삭제
```shell
mutation {
  deleteTeam(id: 3) {
    id,
    manager,
    office,
    extension_number,
    mascot,
    cleaning_duty,
    project
  }
}
```


### GraphQL을 제공하기 위한 서버측 코드

- typeDefs의 타입을 정의해서 Apollo Server를 생성한다
  - GraphQL 스키마를 정의하는 부분
  - `gql` 을 사용하여 쿼리와 타입 구조를 문자열 형태로 작성
  - 예: Query, Mutation, Type 등
- Apollo Server의 생성을 위해 gql로 작성한 타입들의 행동을 해결할 resolvers의 행동도 정의해서 넣어야 제대로 서버가 만들어진다
  - 위에서 정의한 스키마의 필드들이 실제로 어떤 동작을 할지 구현
  - GraphQL 서버는 클라이언트 요청을 받을 때 이 함수들을 실행해서 데이터를 반환함
- ApolloServer({ typeDefs, resolvers })
  - 이 두 요소를 넣어 서버를 생성
  - 둘 중 하나라도 없으면 요청을 처리할 수 없음 → 필수 구성 요소
- 즉,
```javascript
const server = new ApolloServer({
  typeDefs,   // 스키마 구조 정의
  resolvers   // 각 필드의 동작 정의
});
```
- 예제
```javascript
const database = require('./database')
const { ApolloServer, gql } = require('apollo-server')
const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }

  type Mutation {
    deleteEquipment(id: String): Equipment
    insertEquipment(
    id: String
    used_by: String
    count: Int
    new_or_used: String
    ): Equipment
    editEquipment(
        id: String,
        used_by: String,
        count: Int,
        new_or_used: String
    ): Equipment
  }

  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type Supply {
    id: String
    team: Int
  }
`
const resolvers = {
  Query: {
    teams: () => database.teams.map(team => {
        team.supplies = database.supplies.filter(supply => supply.team === team.id)
        return team
    }),
    team: (parent, args, context, info) => database.teams.find(team => {
        return team.id === args.id
    }),
    equipments: () => database.equipments,
    supplies: () => database.supplies,
  },
  Mutation: {
    deleteEquipment: (parent, args, context, info) => {
        const deleted = database.equipments
            .filter((equipment) => {
                return equipment.id === args.id
            })[0]
        database.equipments = database.equipments
            .filter((equipment) => {
                return equipment.id !== args.id
            })
        return deleted
    }, 
    insertEquipment: (parent, args, context, info) => {
        database.equipments.push(args)
        return args
    },
    editEquipment: (parent, args, context, info) => {
        return database.equipments.filter((equipment) => {
            return equipment.id === args.id
        }).map((equipment) => {
            Object.assign(equipment, args)
            return equipment
        })[0]
    },
}
}
const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})
```