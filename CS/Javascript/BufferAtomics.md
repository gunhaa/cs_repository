# SharedArrayBuffer & Atomics

## SharedArrayBuffer

> Node.js의 worker_threads 모듈은 각 워커가 독립된 V8 컨텍스트에서 실행되며, 힙 메모리를 공유하지 않는다. <br>
따라서 워커 간 데이터 공유를 공유 가능한 메모리 구조(SharedArrayBuffer) 를 사용해야 한다

- 여러 Worker Thread 간에 메모리를 공유할 수 있는 JavaScript 객체
- 복사 없이 공유됨
- 단독으로는 사용할 수 없으며, 반드시 TypedArray (Int32Array, Uint32Array 등)와 함께 사용해 읽기/쓰기를 수행해야 함
  - SharedArrayBuffer는 메모리 영역만을 나타내는 객체이며, R/W 인터페이스는 TypedArray(view) 가 담당한다

```javascript
const buffer = new SharedArrayBuffer(4); // 4바이트 = Uint32Array 1칸
const view = new Uint32Array(buffer);
view[0] = 100;
```

## TypedArray View

- SharedArrayBuffer의 데이터를 해석하고 접근하는 인터페이스
  - 예: Uint32Array, Int32Array, Float64Array 등
- 각 타입에 따라 1요소당 메모리 크기가 다름
- length와 buffer를 인자로 삼아 만들 수 있다
  - length로 사용한다면 타입을 원소로 가진 배열을 만들고, buffer로 만들게 된다면 buffer만큼의 용량이 0번 인덱스에 존재하게 된다

## Atomics API 개요

- Atomics 객체는 여러 스레드 간의 동기화된 메모리 접근을 위해 사용됨

## 예시

```javascript
export default class SharedBankV2 {
  private balanceView: Uint32Array;

  constructor(buffer: SharedArrayBuffer);
  constructor(buffer: SharedArrayBuffer, initBalance: number);

  constructor(buffer: SharedArrayBuffer, initBalance?: number) {
    const view = new Uint32Array(buffer);
    if (initBalance !== undefined) {
      view[0] = initBalance;
    }
    this.balanceView = view;
  }

  public withdraw(value: number): number {
    let oldValue: number;
    let newValue: number;
    do {
      oldValue = Atomics.load(this.balanceView, 0);
      if (oldValue < value) {
        throw new Error("잔고보다 많은 출금 요청 발생");
      }
      newValue = oldValue - value;
    } while (
      Atomics.compareExchange(this.balanceView, 0, oldValue, newValue) === newValue
    );
    return newValue;
  }

  public deposit(value: number): number {
    this.balanceView[0] = this.balanceView[0] + value;
    return this.balanceView[0];
  }

  public getBalance(): number {
    return this.balanceView[0];
  }
}
```