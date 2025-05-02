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