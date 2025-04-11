# Rust의 Race Condtion 제어

> Rust는 동시성 오류(특히 Race Condition)를 컴파일 타임에 방지하는 언어 설계를 갖고 있다. <br>
반면 Java는 런타임에서만 오류가 발생할 수 있고, 컴파일 타임에는 위험을 감지하지 못한다.

- java의 경우, 위험한 코드여도 컴파일러가 위험을 판단하지 않는다.
- 개발자 주도 (synchronized 등) 로 해결해야 한다

```java
class Wrapper {
    public int value;

    public Wrapper(int value) {
        this.value = value;
    }
}

void mutate(Wrapper w) {
    w.value += 1;
}
```

- rust의 경우 위험한 코드는 컴파일 단계에서 막는다
- 가장 위험한 가변참조(&)의 경우 한개만 허가함으로써 컴파일 단계에서 위험을 아예 봉쇄한다
- 이로 인해 동일한 데이터에 대한 중복 접근을 원천적으로 차단한다.

```rust
fn mutate(x: &mut i32) {
    *x += 1;
}

fn main() {
    let mut a = 10;

    let r1 = &mut a;
    let r2 = &mut a; // ❌ 컴파일 에러: r1이 아직 사용 중

    mutate(r1);
    mutate(r2);
}
```
