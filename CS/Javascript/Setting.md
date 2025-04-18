# Typescirpt, Node.js , Express 기본 세팅

1. Node.js 최신 버전 설치, 공식홈페이지 이용이 가장 빠름
2. `npm install -g npm@latest` 최신버전 npm 설치
  <br> `npm -v` / `node -v` 로 설치 확인
3. npm init -y
4. npm install express
5. `npm i -D typescript @types/express @types/node`
  <br>   typescript와 typescript 정의 파일을 설치

6. `npx tsc --init`
  <br> tsconfig.json 파일을 생성

7. index.ts 파일 생성

```javascript
import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
```

8. nodemon, concurrently 설치
  <br>`npm install -D concurrently nodemon`

```shell
// package.json 파일의 scripts에 다음 내용 추가
{
  "scripts": {
    "build": "npx tsc",
    "start": "node index.js",
    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q index.js\""
  }
}
```

9. typescript를 javascript로 컴파일
  <br>`npm run build`

10. index.js 파일을 실행하고 싶다면 다음의 명령어를 터미널에 입력
  <br>`npm run start`

11. 동시에 수행
  <br>`npm run dev`

12. dotenv 의존성 추가
  <br>`npm install dotenv`

13. Jest 추가
  <br>`npm install --save-dev jest @types/jest ts-jest`
  <br>`npm install --save-dev ts-node`

14. jest.config.ts추가
```javascript
// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
};

export default config;
```

15. package.json 스크립트 추가
```shell
"scripts": {
  "test": "jest"
}
```

16. redis 설치
  <br>`npm install --save-dev @types/redis`