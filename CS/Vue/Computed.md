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

## Computed와 watch의 차이

- Computed: 값을 '요청'할 때 즉시 계산 (Pull-based)
  - computed의 목적은 새로운 값을 계산해서 반환하는 것이다
  - 템플릿({{ myComputed }})이나 다른 코드에서 myComputed의 값을 요청(access)하는 순간, Vue는 의존하는 데이터가 변경되었는지 확인한다
  - 만약 변경되었다면, 그 자리에서 즉시(synchronously) 계산 함수를 실행하여 새로운 값을 만들어내고 반환한다

- Watch: 데이터 변경 후 '예약된' 시점에 실행 (Push-based)
  - watch의 목적은 데이터 변경에 반응하여 어떤 동작(Side Effect)을 수행하는 것이다
  - 감시하던 데이터가 변경되면, watch는 콜백 함수를 즉시 실행하지 않는다
  - 대신, "이따가 이 함수를 실행해 줘"라고 스케줄러(Scheduler)에 작업을 등록한다
  - Vue는 현재 진행 중인 모든 데이터 변경 작업이 끝난 후, 다음 화면을 그리기 직전에 예약된 작업들을 모아서 한 번에 처리한다

### '지연'이 필요한 이유

- 효율성과 일관성 때문
- 만약 하나의 함수 안에서 name, age, address를 순서대로 변경했다고 가정한다면, watch가 즉시 실행된다면 콜백이 3번 호출된다
  - 하지만 스케줄러를 사용하면, 모든 변경이 끝난 최종 상태를 가지고 콜백을 단 한 번만 실행할 수 있어 훨씬 효율적이고 예측 가능하다
- compute는 값을 즉시 계산하는 용도, watch는 job을 batch 처리하는 지연 작업 용이다
  - 데이터가 변경되는 시점과 watch 콜백이 실행되는 시점 사이에 약간의 틈(tick)을 두어, 여러 변경을 한 번에 효율적으로 처리하고 일관성을 유지하는 것이 목적이다