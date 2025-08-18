# Computed

- Computed 함수는 Observer(Publisher, Subscribe) 패턴을 활용해 데이터를 캐싱하고, 계산한다
  - Vue에서는 data, props에 있는 모든 반응형 데이터가 발행자가 된다
  - 발행자에게 변화가 생기면 모든 구독자에게 알린다
    - Component가 렌더링될때 computed를 마주친다면 값을 계산한다
      - 이 순간, Vue의 반응성 시스템이 이 접근을 감지하고 기록된다
      - computed 속성 중 특정 변수에 의존성을 가지는 것을 기록해둔다
      - 변수의 값이 바뀌게 된다면 Vue의 반응성 시스템이 감지한 후, 그 변수에 대한 구독자 명단을 확인한다
      - 구독자에게 옛날 것(dirty)라고 알린다
      - 구독자는 캐시 값이 유효하지 않다는 것을 알지만 바로 재계산하지는 않는다(Lazy Loading)
      - Computed 속성은 값을 리턴해야하며, 이 처리 방식은 동기식 처리만 지원한다
        - 긴 시간을 요구하는 비동기 처리가 필요하다면 watch 속성을 사용해야한다

## 왜 computed와 다르게 watch는 비동기 요청이 가능할까?

> https://github.dev/vuejs/core/blob/main/packages/reactivity/src/computed.ts

```javascript
// Vue에서 watch가 비동기적으로 사용할 수 있는 로직, watch()의 실제 구현체
if (
    // ... 조건 생략 ...
) {
    // 콜백을 실행하기 전에 이전 정리 함수를 실행.
    if (cleanup) {
      cleanup() // 이 부분
    }
    const currentWatcher = activeWatcher
    activeWatcher = effect
    try {
      const args = [
        newValue,
        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
        boundCleanup, // onCleanup 함수를 콜백에 전달
      ]
      oldValue = newValue
      // 콜백 함수 실행
      call
        ? call(cb!, WatchErrorCodes.WATCH_CALLBACK, args)
        : cb!(...args)
    } finally {
      activeWatcher = currentWatcher
    }
}
```

```javascript
        // ...vue template
        이름 :
        <input
            type="text"
            v-model.trim="name"
            placeholder="영문 두 글자 이상을 입력하세요"
        />

        // ...vue script logic
          fetchContacts: _.debounce(function () {
            this.isLoading = true;
            axios
              .get(`${BASE_URL}/contacts_long/search/${this.name}`)
              .then((res) => {
                this.isLoading = false;
                this.contacts = res.data;
              });
            console.log("this.name: " + this.name);
          }, 300),
        },

        watch: {
          nameVer1(cur) {
            if (cur.length >= 2) {
              this.fetchContacts();
            } else {
              this.contacts = [];
            }
          },
        },
```

- 이 코드가 입력할 때 마다 API요청이 새로 보내지지 않는 이유는 lodash의 `_.debounce` 때문이다
  - `debounce` 대기 후 API 요청을 날리는 것으로 막는 함수다 
- Vue에서 watch() 함수의 이전 요청을 제거하기위해서는 내부 구현 onCleanup()에 필요한 콜백을 넘겨야 한다
  - watch() 함수는 UI적 안정성을 주기위해, 완료되지 않은 콜백의 정리 기능이 값을 계산하는 Computed와 다르게 구현되어있다
```javascript
          nameVer2(cur, old, onCleanup) {
            // 1. onCleanup 인자 추가
            if (cur.length < 2) {
              this.contacts = [];
              return; // 더 이상 진행하지 않음
            }

            // 2. 요청 취소를 위한 AbortController 생성
            const controller = new AbortController();

            // 3. name이 변경되어 watch가 다시 실행되면, 이전 요청을 취소하도록 등록
            onCleanup(() => {
              console.log("이전 요청을 취소합니다.");
              controller.abort();
            });

            this.isLoading = true;
            axios
              .get(`${BASE_URL}/contacts_long/search/${cur}`, {
                // 4. 생성한 controller의 signal을 요청에 전달
                signal: controller.signal,
              })
              .then((res) => {
                this.contacts = res.data;
              })
              .catch((err) => {
                if (axios.isCancel(err)) {
                  console.log("요청이 정상적으로 취소되었습니다.");
                } else {
                  // 다른 에러 처리
                  console.error(err);
                }
              })
              .finally(() => {
                this.isLoading = false;
              });
          },
        },
```