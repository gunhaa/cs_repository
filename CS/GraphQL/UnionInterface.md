# Union

- 여러 데이터 타입을 반환하는 데이터 타입

```javascript
const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks.js')
// 2가지 타입 중 한개가 들어 올 수 있다
const typeDefs = gql`
    union Given = Equipment | Supply
`
const resolvers = {
    Query: {
        givens: (parent, args) => {
            return [
                ...dbWorks.getEquipments(args),
                ...dbWorks.getSupplies(args)
            ]
        }
    },
    Given: {
        __resolveType(given, context, info) {
            if (given.used_by) {
                return 'Equipment'
            }
            if (given.team) {
                return 'Supply'
            }
            return null
        }
    }
}
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}
```
- 사용법
    - 질의 측에서는 __typename을 이용해 타입을 사용한다
    - __typename은 __resolverType함수를 사용해 객체를 판정한다

```javascript
const resolvers = {
    Query: {
        givens: (parent, args) => {
            return [
                ...dbWorks.getEquipments(args),
                ...dbWorks.getSupplies(args)
            ]
        }
    },
    Given: {
        __resolveType(given, context, info) {
            if (given.used_by) {
                return 'Equipment'
            }
            if (given.team) {
                return 'Supply'
            }
            return null
        }
    }
}
```

```shell
query {
  givens {
    __typename
    ... on Equipment {
      id
      used_by
      count
      new_or_used
    }
    ... on Supply {
      id
      team
    }
  }
}
```

# Interface

```javascript
const { gql } = require('apollo-server')
const typeDefs = gql`
    interface Tool {
        id: ID!
        used_by: Role!
    }
`
const resolvers = {
    Tool: {
        __resolveType(tool, context, info) {
            if (tool.developed_by) {
                return 'Software'
            }
            if (tool.new_or_used) {
                return 'Equipment'
            }
            return null
        }
    }
}
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}
```