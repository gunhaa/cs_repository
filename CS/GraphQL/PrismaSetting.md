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
    - 예시: prisma migrate dev는 개발 환경에서 데이터베이스 마이그레이션을 적용하고 Prisma Client를 재생성한다
- npx prisma generate
    - schema.prisma 파일을 기반으로 Prisma Client를 생성한다. 실제 쿼리를 작성하고 실행할 때 필요한 코드가 자동으로 생성된다
- npx prisma studio
    - Prisma Studio는 브라우저 기반 GUI로, 데이터베이스 데이터를 시각적으로 관리할 수 있다.

## GraphQL 설정 방법

- npm install apollo-server graphql
    - apollo-server: Apollo Server는 GraphQL 서버를 쉽게 구축할 수 있게 도와주는 라이브러리
    - graphql: GraphQL 스키마를 정의하고, 쿼리와 리졸버를 처리하는 데 필요한 라이브러리
- npm install --save-dev @types/graphql
    - TypeScript와 함께 사용할 때 타입 지원을 받을 수 있다

## 주요 툴

- Prisma Client : Auto-generated and type-safe query builder for Node.js & TypeScript.
    - Node.js 및 TypeScript를 위한 자동 생성 및 유형 안전 쿼리 빌더
- Prisma Migrate : Declarative data modeling & migration system
    - 선언적 데이터 모델링 및 마이그레이션 시스템
    - schema.prisma 파일을 진리(source of truth)로 삼고 적은 모델 정의를 기준으로 DB와 코드(client)를 동기화하는 시스템
- Prisma Studio : GUI to view and edit data in your database
    - 데이터베이스의 데이터를 보고 편집할 수 있는 GUI