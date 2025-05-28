# DataLoader

> https://github.com/graphql/dataloader

## 원리

- Apollo Server에서는 중첩된 필드를 리졸빙할 때, 같은 타입의 리졸버가 반복 호출되며 N+1 문제가 발생할 수 있다. 이 문제를 해결하기 위해 DataLoader를 사용하면 요청된 키들을 모아 한 번의 SQL IN 절로 조회할 수 있다. include를 사용한 과도한 오버페칭 대신, DataLoader 기반의 Lazy Loading으로 필요한 시점에 필요한 데이터만 조회하는 방식이 성능상 유리하다

- Apollo Server의 인터페이스는 하위 필드 조회시 각 객체를 조회(N+1)도 가능하지만, DataLoader를 이용해 N+1을 방지하는 경우도 고려해 요청 순서대로 [순서, 요청에 알맞은 결과] 를 배열로 반환하면 이를 응답 양식에 맞춰 클라이언트에 반환해준다

```typescript
const dataLoader = () => {
  const tempbBatching: number[] = [];

  console.log("start tick...");

  tempbBatching.push(1);
  tempbBatching.push(2);
  Promise.resolve().then(() => {
    console.log("next tick start...");
    console.log(tempbBatching);
  });
  tempbBatching.push(8);
  console.log("end tick...");
};

export default dataLoader;
```

## prisma를 이용한 loader 예시

```typescript
import { Comment, PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const commentsLoader = (prisma: PrismaClient) =>
  new DataLoader<number, Comment[]>(
    async (postIds: readonly number[]): Promise<Comment[][]> => {
      const comments = await prisma.comment.findMany({
        where: { postId: { in: [...postIds] } },
      });

      return postIds.map((postId) =>
        comments.filter((comment) => comment.postId === postId)
      );
    }
  );
```

- input

```javascript
const postIds = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const comments = [
  { id: 1, postId: 20, text: 'A' },
  { id: 2, postId: 40, text: 'B' },
  { id: 3, postId: 30, text: 'C' },
  { id: 4, postId: 30, text: 'D' },
  { id: 5, postId: 90, text: 'E' },
  { id: 6, postId: 10, text: 'F' },
  { id: 7, postId: 70, text: 'G' },
  { id: 8, postId: 70, text: 'H' },
  { id: 9, postId: 70, text: 'I' },
  { id: 10, postId: 100, text: 'J' },
];

```

- output

```javascript
[
  [ { id: 6, postId: 10, text: 'F' } ],         // postId = 10
  [ { id: 1, postId: 20, text: 'A' } ],         // postId = 20
  [ { id: 3, postId: 30, text: 'C' }, { id: 4, postId: 30, text: 'D' } ], // postId = 30
  [ { id: 2, postId: 40, text: 'B' } ],         // postId = 40
  [],                                           // postId = 50 (댓글 없음)
  [],                                           // postId = 60 (댓글 없음)
  [ { id: 7, postId: 70, text: 'G' }, { id: 8, postId: 70, text: 'H' }, { id: 9, postId: 70, text: 'I' } ], // postId = 70
  [],                                           // postId = 80
  [ { id: 5, postId: 90, text: 'E' } ],         // postId = 90
  [ { id: 10, postId: 100, text: 'J' } ],       // postId = 100
];

```
