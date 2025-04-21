# Floating Point (부동 소수점)

> 컴퓨터가 소수점을 나타나기 위한 표현 방식이다.

> 소수점이 고정되어 있지 않은 소수 표현 방식으로 필요에 따라 소수점의 위치가 이동할 수 있고 유동적이라는 의미에서 부동 소수점(floating point)이라고 불린다.

> 10진수 소수를 2진수(컴퓨터에 저장되는 형태)로 표현할때 10진수 소수와 2진수 소수의 표현이 딱 맞아 떨어지지 않을 수 있어 문제가 생긴다.

- 부동소수점 구현 예제

> https://github.com/gunhaa/cpu_emulator/blob/main/examples/floating_point.rs

```rust
fn main() {

    // 부동소수점(Floating-point)은 소수점의 위치가 고정되지 않고, 숫자와 소수점 사이의 거리가 동적으로 변하는 방식으로 표현되는 실수의 표기법이다.
    // 컴퓨터에서 실수를 표현할 때 IEEE 754 표준을 기반으로 부동소수점 형식이 사용된다.
    // 지수에 의해 숫자의 크기가 조절되고, 가수에 의해 정확한 값을 나타낸다
    // 지수/가수의 비트를 조절해서 정확도를 조절할 수 있기에 소수점 사이의 거리가 동적으로 변할 수 있다는 것이다.

    let a: f32 = 42.42;
    let franken_type: u32 = unsafe {
        // 주어진 비트에 영향을 주지 않고 (f32 u32) 변환한다
        std::mem::transmute(a)
    };

    // 십진 정수로 표현
    println!("{}", franken_type);

    // 32자리 비트로 표현
    println!("{:032b}", franken_type);

    let b: f32 = unsafe {
        // 주어진 비트에 영향을 주지 않고 (f32 u32) 변환한다
        std::mem::transmute(franken_type)
    };

    println!("{}" , b);
    assert_eq!(a,b);

    // 부동 소수점은 1비트의 부호비트, 8비트의 지수부, 23비트의 가수부로 이루어져 있다
    // 01000010001010011010111000010100(42.42 f32의 비트 표현)
    // S(ign)= 0, M(antissa)= 0.01010011010111000010100, E(xponent)= 10000100(132)
    // (-1)^S × (1 + M) × 2^(E - 127)
    // (+1) × (1.01010011010111000010100)₂ × 2^5
    // 1.325625 × 2^5 = 1.325625 × 32 ≈ 42.42
    // bias는 127이며, 음수의 지수를 표현하기 위해 해당 값이 존재한다


    let n: f32 = 42.42;
    let n_bits: u32 = n.to_bits();
    // 부호 비트
    let sign_bit = n_bits >> 31;
    println!("sign_bit : {:032b}", sign_bit);
    // sign_bit : 00000000000000000000000000000000

    let exponent_ = n_bits >> 23;

    // 연산 대상 타입(u32, i32 등)으로 변환됨
    // 0으로 채워지는 zero-extension 발생
    let exponent_ = exponent_ & 0xff;

    // bias 제거, 제거 후에는 sign존재
    let exponent_ = (exponent_ as i32) - 127;

    println!("exponent : {:032b}", exponent_);

    let mut mantissa: f32 = 1.0;

    for i in 0..23 {
        let mask = 1 << i;
        let one_at_bit_i = n_bits & mask;
        if one_at_bit_i != 0 {
            let i_ = i as f32;
            let weight = 2_f32.powf(i_ - 23.0);
            mantissa += weight;
        }
    }
    println!("mantissa = {:.6}", mantissa); 

}
```

## 해결 방법

> 부동소수점 오차 문제는 근본적으로 완벽히 해결하기 어렵다.

- 정수 변환: 0.1 대신 100을 10으로 나누는 방식으로 소수를 정수로 변환해 계산한다.
- 반올림: 결과값을 특정 자리까지 반올림하여 표시한다.
- 고정소수점 라이브러리 사용: BigDecimal, decimal.js와 같은 라이브러리를 사용해 정밀한 연산을 수행한다.

결론적으로, 부동소수점은 제한된 비트 내에서 실수를 근사치로 저장하는 방식이며, 컴퓨터의 메모리 제한 때문에 발생하는 불가피한 오차다.

## 고정 소수점

- 고정소수점은 소수점 위치를 고정하여 일정한 소수점 이하 자릿수를 유지함으로써 부동소수점의 오차를 줄이는 방식이다.

### 예시 코드
> https://github.com/gunhaa/cpu_emulator/blob/main/examples/fixed_point.rs

- Q7 (또는 Q7.0) 형식은 8비트 signed 정수(int8)를 사용하여 소수를 표현하는 고정소수점 형식
- 임베디드 시스템, DSP(디지털 신호 처리), 마이크로컨트롤러 등에서 부동소수점 대신 효율적으로 수를 표현할 때 사용
- 사용하는 이유: 연산이 가볍고 빠르다, 메모리 절약

```rust
fn main(){

    // 고정 소수점은
    // 실수를 정수로 저장하기 위해 일정한 비율(스케일링)을 곱해서 정수로 만든 다음,
    // 나중에 다시 원래 소수로 복원할 수 있게 소수점의 위치를 약속해두는 표현 방식

    // Q7의 경우
    // 소수점이 7비트 뒤에 있다고 약속한 방식
    // 실수 x를 x * 128 해서 정수(i8)에 저장
    // 나중에 정수 / 128로 원래 실수 복원

    // 즉, i8: 부호 있는 8비트 정수 → 표현 가능한 값은 -128 ~ 127
    // 최솟값: -128 / 128 = -1.0
    // 최댓값:  127 / 128 ≈ 0.9921875
    // 즉, 총 표현 가능한 값 = 256개


    // f64 → Q7 변환
    let a = 0.5_f64;
    let q = Q7::from(a);
    println!("Q7 representation of {} is {:?}", a, q);

    // Q7 → f64 변환
    let b = f64::from(q);
    println!("Converted back to f64: {}", b);

    // f32 → Q7 변환
    let a_f32 = -0.25_f32;
    let q_f32 = Q7::from(a_f32);
    println!("Q7 representation of {} is {:?}", a_f32, q_f32);

    // Q7 → f32 변환
    let b_f32 = f32::from(q_f32);
    println!("Converted back to f32: {}", b_f32);

    // 최대/최소값 테스트
    let max_q = Q7::from(1.5);
    let min_q = Q7::from(-2.0); 
    println!("Clamped max Q7: {:?}", max_q);
    println!("Clamped min Q7: {:?}", min_q);
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Q7(i8);

impl From<f64> for Q7 {
    fn from (n:f64) -> Self {
        // assert!(n>=-1.0);
        // assert!(n <=1.0);
        if n >= 1.0 {
            Q7(127)
        } else if n <= -1.0 {
            Q7(-128)
        } else {
            Q7((n*128.0) as i8)
        }
    }
}

impl From<Q7> for f64 {
    fn from(n: Q7) -> f64 {
        (n.0 as f64) * 2f64.powf(-7.0)
    }
}

impl From<f32> for Q7 {
    fn from(n: f32) -> Self {
        Q7::from(n as f64)
    }
}

impl From<Q7> for f32 {
    fn from(n: Q7) -> f32 {
        f64::from(n) as f32
    }
}
```