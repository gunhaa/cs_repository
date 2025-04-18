# Node.js redis 인터페이스 사용방법
## Redis 클라이언트 생성
```javascript
import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379',
});

redisClient.connect().then(() => {
    console.log('Redis connected');
  }).catch((err) => {
    console.error('Error while connecting to Redis:', err);
  });

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

export default redisClient;
```
- node.js 모듈은 시작될때 모두 캐시되어 싱글톤을 유지한다, 즉 하나의 클라이언트를 가지고 모든 요청이 사용해야해서 await이 반드시 들어가야 한다
- redis는 싱글스레드라서 데이터의 일관성을 위해 redis 인터페이스에서는 await이 권장된다

### nodejs redis 인터페이스 관련 메소드

1. **String 관련 명령어**

- `set(key, value)`
- `get(key)`
- `incr(key)`
- `decr(key)`
- `setex(key, seconds, value)`
- `append(key, value)`


2. **Hash 관련 명령어**

- `hset(key, field, value)`
- `hget(key, field)`
- `hmget(key, field1, field2)`
- `hgetall(key)`
- `hdel(key, field)`
- `hexists(key, field)`

3. **Set 관련 명령어**

- `sadd(key, member)`
- `srem(key, member)`
- `smembers(key)`
- `sismember(key, member)`
- `scard(key)`

4. **List 관련 명령어**

- `lpush(key, value)`
- `rpush(key, value)`
- `lpop(key)`
- `rpop(key)`
- `lrange(key, start, stop)`
- `llen(key)`

5. **기타 명령어**

- `del(key)`
- `exists(key)`
- `expire(key, seconds)`
- `ttl(key)`
- `keys(pattern)`
