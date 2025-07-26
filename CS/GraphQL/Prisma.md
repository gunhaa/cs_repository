# Prisma

## Prisma 설정 방법

```shell
# 실행 시 사용될 Prisma Client
# prisima/client는 실제 쿼리를 날려서 데이터를 가져오는 구현체
npm install @prisma/client

# 개발 시 사용할 Prisma CLI 도구
# 개발 및 마이그레이션 작업을 지원하는 커맨드라인 도구. 주로 데이터베이스 스키마를 관리하고 Prisma Client를 생성하는 데 사용
npm install -D prisma
```

### prisma cli

- npx prisma init
  - Prisma 프로젝트를 초기화하고 prisma/schema.prisma 파일 및 .env 파일을 생성한다
  - 명령어 실행 후, Prisma에서 사용할 데이터베이스 연결 문자열 등을 설정할 수 있는 .env 파일도 생성된다
- npx prisma migrate
  - 데이터베이스 마이그레이션을 관리하는 명령어. 스키마 파일을 변경하고 이를 실제 데이터베이스에 반영할 수 있다
  - 예시: npx prisma migrate dev는 개발 환경에서 데이터베이스 마이그레이션을 적용하고 Prisma Client를 재생성한다
  - --name 옵션으로 이름을 정할 수 있다
- npx prisma migrate reset
  - 개발 중에 스키마를 완전히 새로 갈아엎고 싶을 때 사용한다. 데이터베이스를 초기화하고 모든 마이그레이션을 처음부터 다시 적용한다.
- npx prisma generate
  - schema.prisma 파일을 기반으로 Prisma Client를 생성한다. 실제 쿼리를 작성하고 실행할 때 필요한 코드가 자동으로 생성된다
- npx prisma studio
  - Prisma Studio는 브라우저 기반 GUI로, 데이터베이스 데이터를 시각적으로 관리할 수 있다.
- npx prisma db push
  - 마이그레이션 히스토리 파일(prisma/migrations)을 만들지 않고, 현재 schema.prisma의 상태를 데이터베이스에 강제로 동기화한다. 프로토타이핑 단계에서 빠르게 스키마를 테스트할 때 유용하다.

## GraphQL 설정 방법

- npm install apollo-server graphql
  - apollo-server: Apollo Server는 GraphQL 서버를 쉽게 구축할 수 있게 도와주는 라이브러리
  - graphql: GraphQL 스키마를 정의하고, 쿼리와 리졸버를 처리하는 데 필요한 라이브러리
- npm install --save-dev @types/graphql
  - TypeScript와 함께 사용할 때 타입 지원을 받을 수 있다
