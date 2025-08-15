# Proxy

## Proxy 개념

- `Proxy` 객체는 다른 객체의 기본 동작(속성 접근, 값 변경, 함수 호출 등)을 가로채서 재정의할 수 있게 해주는 ES6 기능이다.
- Vue 3는 반응형(Reactive) 시스템을 만들기 위해 Proxy를 핵심적으로 사용한다.

### Proxy의 get과 set

- `Proxy`의 `get`과 `set`은 객체 속성을 읽을 때(get), 쓸 때(set) 동작을 가로채는 트랩(Trap) 메서드다  
  이 메서드를 이용하면 속성 접근/변경 시 원하는 로직을 추가할 수 있다

#### get

```javascript
const user = { name: "Alice" };

const proxy = new Proxy(user, {
  // target: 원본,  prop: 읽으려는 속성
  get(target, prop) {
    console.log(`GET ${prop}`);
    return target[prop] ?? "(값 없음)";
  },
});

console.log(proxy.name); // GET name -> 'Alice'
console.log(proxy.age); // GET age -> '(값 없음)'
```

#### set

```javascript
const user = {};

const proxy = new Proxy(user, {
  // target: 원본, prop: 변경하려는 속성, value: 새 값
  set(target, prop, value) {
    console.log(`SET ${prop} = ${value}`);
    target[prop] = value;
    return true;
  },
});

proxy.age = 25; // SET age = 25
console.log(user.age); // 25
```

## Vue3의 반응형 구현 원리

### Vue component 에서 proxy 활용 방법

- Vue의 reactive 자체가 Proxy 기반이므로, Proxy로 한 번 더 감싸서 로깅, 유효성 검사 등을 추가할 수 있다

```html
<script setup>
  import { reactive } from "vue";

  const state = reactive({ count: 0 });

  // Proxy 덮어쓰기 (Vue reactive 객체를 감싸서 디버깅 추가)
  const debugState = new Proxy(state, {
    set(target, prop, value) {
      console.log(`[DEBUG] ${prop} 변경: ${target[prop]} -> ${value}`);
      target[prop] = value;
      return true;
    },
  });

  function increment() {
    debugState.count++;
  }
</script>

<template>
  <div>
    <p>{{ state.count }}</p>
    <button @click="increment">+</button>
  </div>
</template>
```

#### Vue reactive 구현

```javascript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      // 값 읽을 때 의존성 추적
      console.log(`GET: ${String(prop)}`);
      return target[prop];
    },
    set(target, prop, value) {
      // 값 변경 시 화면 갱신 트리거
      console.log(`SET: ${String(prop)} = ${value}`);
      target[prop] = value;
      return true;
    }
  });
}

const state = reactive({ count: 0 });

state.count;     // GET: count
state.count = 1; // SET: count = 1
```

