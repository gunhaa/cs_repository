# Vue 상태관리

- pinia(최신), vuex(2버전, 구)
- eventbus(mitt사용)
  - 사용자가 저장을 눌렀을때
  - 백그라운드 프로그램에서 알람이 필요할 때
  - Component 종료 전 Event off 해줘야함
  - toast ui(md 용)
  - vuetify(vue2, vue3가 다름)
  - elementUI
    - element+ (Vue3)
  - tailwindcss
  - Indexed DB 사용

## Option 방식을 이용한 상태관리 방법

### Pinia를 이용한 상태관리

- defineStore를 정의하여 Store를 만들 수 있다

```javascript
export const useCounterStore = defineStore("counter", {
  // state 는 data의 역할을
  state: () => ({ count: 0, name: "Eduardo" }),
  // getters 는 computed의 역할을
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  // actions 는 methods 의 역할을 한다
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

- computed, methods 등을 사용하는 경우, mapState() 헬퍼를 사용하여 상태 속성을 읽기 전용 계산 속성으로 매핑이 가능하다

```javascript
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 컴포넌트 내부에서 this.count로 접근할 수 있습니다
    // store.count를 읽는 것과 동일합니다
    ...mapState(useCounterStore, ['count'])
    // 위와 같지만 this.myOwnName으로 등록됩니다
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      // 스토어에 접근할 수 있는 함수를 작성할 수도 있습니다
      double: store => store.count * 2,
      // `this`에 접근할 수 있지만 타입이 올바르게 지정되지는 않습니다...
      magicValue(store) {
        return store.someGetter + this.count + this.double
      },
    }),
  },
}
```

- patch API를 통해 상태 변경 가능

```javascript
store.$patch({
  count: store.count + 1,
  age: 120,
  name: "DIO",
});

// 컬렉션 iteration은 고비용이 발생할 수 있음
// 여러 상태 변경을 하나의 그룹으로 묶기위해 사용함
store.$patch((state) => {
  state.items.push({ name: "shoes", quantity: 1 });
  state.name = "loopy";
});
```

#### Computed

- Vue에서 Computed를 사용해 계산이 필요한 속성을 Template에 넣을 수 있다

```javascript
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - 고급 가이드',
          'Vue 3 - 기본 가이드',
          'Vue 4 - 미스터리'
        ]
      }
    }
  },
  computed: {
    // 계산된 getter
    publishedBooksMessage() {
      // `this`는 컴포넌트 인스턴스를 가리킵니다
      return this.author.books.length > 0 ? '예' : '아니오'
    }
  }
}

// ...
<p>출판한 책이 있습니까?</p>
<span>{{ author.books.length > 0 ? '예' : '아니오' }}</span>

// computed를 이용해 개선 가능
<p>출판한 책이 있습니까?</p>
<span>{{ publishedBooksMessage }}</span>
```
