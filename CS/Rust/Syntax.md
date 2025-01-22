```shell

# 프로젝트 생성
cargo new rust_feature

# 프로젝트 빌드(바이너리 실행파일 출력)
cargo build

# cargo-expand 설치
cargo install cargo-expand

# 컴파일러 내부에서 어떻게 동작하는지 확인
cargo expand

# 참고 : https://rinthel.github.io/rust-lang-book-ko/foreword.html

# Cargo.toml

# 의존 라이브러리를 명시할 수 있다
    # 메타데이터, 컴파일러 셋팅 등
# Rust에서는 패키지를 크레이트라고 부른다
    # crates.io 에서 확인 할 수 있다
    # vscode의 경우 crates extension을 통해 보조받을 수 있음
```

---

```Rust

// 모듈 가져오기
// https://doc.rust-lang.org/stable/std/
// 표준 라이브러리 사이트에서 모듈이 무엇이 있는지 볼 수 있다.
use std::io;

// main 함수는 rust에서 특별한 함수이다.
// 러스트 파일이 실행될 때 제일 먼저 실행된다.
// 함수와 변수명에 스네이크 케이스(소문자, 띄어쓰기 대신 _ 사용)를 사용한다.

fn main() {
    // println! 는 함수가 아닌 매크로다.
    // 느낌표가 있다면 매크로
    // 매크로는 메타 프로그래밍의 줄임말이다.
    // 더 많은 코드를 작성하는 코드 작성 방법 중 하나
    // println이 매크로인 이유는 다수의 인수를 받을 수 있기 때문이다.
    // println은 중괄호를 만날때마다 제공하는 값으로 대체 된다.
    // cargo expand를 통해 확인할 수 있으며,
    // cargo expand는 매크로 확장을 확인할 수 있는 도구로, Rust 코드에서 매크로가 실제로 어떻게 확장되는지 확인할 때 유용하다.
    // 이는 매크로가 실제로 컴파일되기 전에 어떻게 처리되는지, 즉 매크로 내부에서 어떻게 코드가 변환되는지를 보여준다.
    println!("Number : {}, String : {}" , 100 , "String");

    // 러스트의 변수는 let 변수명으로 선언할 수 있다.
    // 변수의 타입을 명시할 필요가 없다, 컴파일러가 유형을 알아서 추론한다.
    // 선언된 변수는 불변 변수이다. 값을 할당하면 절대 변경할 수 없다
    // 가변 변수로 만들려면 명시적으로 선언해야한다 
    // let mars_weight = calculate_weight_on_mars(100.0);

    // 새로 생성된 String은 변수 input이 소유한다.
    // 이곳의 input은 String의 소유자이다.
    // 컴파일 시점에 문자열의 크기를 알지 못하기때문에 힙에 저장된다. 스택에는 힙을 가리키는 포인터를 저장하고, 
    // 문자열의 크기같은 메타 데이터를 추가로 저장한다.
    // 문자열은 스마트포인터의 한 유형이다.
    let mut input = String::new();


    let s1 = &input;
    let s2 = &input;
//    let s2 = &mut input;
  
    println!("s1 : {}, s2: {}", s1, s2);
    // 해당 코드는 잘 실행되지만,
    // s2가 가변이 될 경우, 혹은 모두 가변이 될 경우 컴파일 타임에 에러가 발생한다.
    // 레이스 컨디션이 발생할 수 있는 경우를 러스트는 원천 차단해서, 컴파일이 되기만 하면 레이스 컨디션이 절대로 발생하지 않는다.
    // 이는 러스트의 큰 장점이다.


    // 해당 함수로 input을 넘기면 이후에는 input 변수를 사용하지 못한다.
    // input변수의 소유권은 some_fn으로 넘어간 이후 해당 스코프에서 소멸해서 더 이상 사용 불가능하게 된다.
    // 이를 해결하기위해선 소유권을 넘기는 방식 대신 참조를 사용하면 된다.
    // 소유권 넘기기
    // some_fn(input);

    // 참조 넘기기(불변)
    // some_fn1(&input);

    // 참조 넘기기(변경 가능)
    some_fn2(&mut input);

    // 소유권 3번 규칙에 대하여
    // 해당 방식처럼 값의 소유자가 2개가 된다면, 메모리를 해제할때 이중해제가 일어나며 이는 메모리 손상을 일으킬 수 있다.
    // C에서는 흔한 버그이고, 아주 심각한 보안 취약점이 될 수 있다.
    // 그래서 Rust에서는 하나의 소유자를 보장해서 오류의 가능성을 제거한다
    // let mut s = input;

    // 다음과 같은 방식은 복사가 가능하다.
    // 컴파일 단계에서 크기를 알 수 있는 스택에 저장되기 때문에
    // 하지만 heap에 저장된 경우는 다르다.
    // let a= 5;
    // let b =a;


    // 소유권 : Rust에서 가장 중요한 개념이다
    // 언어 디자인에 큰 영향을 미치고, 다른 대부분의 언어에는 없는 개념이다.
    // 소유권의 3가지 규칙
    // 1. Rust에서 각각의 값은 변수가 소유한다.
    // 2. 소유자가 범위를 벗어나면, 그 값은 해제된다.
    // 3. 특정 시점의 값의 소유자는 단 하나뿐이다.
    // unwrap 메소드를 사용하면 오류가 있을때 프로그램을 종료 시킬 수 있다
    // Result는 rust의 핵심이다.

    println!("Enter your weight (kg) : ");
    io::stdin().read_line(&mut input).unwrap();

    // 공백 제거
    // 부동소수점으로 변경
    // parse 함수는 Result를 반환한다
    // parse 함수를 사용했을때 중간에 숫자가아닌 문자가 있으면 오류가 발생해서, 종료시켜야 하기 때문이다.
    // 오류의 위험이 있는것은 Result로 반환시킨다.
    let weight : f32 = input.trim().parse().unwrap();
    // println!("weight : {} ", weight);
    // println!("input : {}", input);



    let mut mars_weight = calculate_weight_on_mars(weight);
    // mars_weight = mars_weight * 1000.0;

    println!("Weight on Mars : {}kg", mars_weight);

    // calculate_weight_on_mars();
}

                        // 러스트의 매개변수는 어떤 데이터 유형인지 정확하게 명시해야한다.
                        // 컴파일러는 컴파일 단계에서
                        // 각 함수에 대해 스택 프레임의 크기를 알고 이 스택프레임이 들어갈
                        // 모든 변수의 크기를 알아야 하기 떄문이다.
                        // Java와 같은 GC가 있는 언어들은 기본적으로 **런타임**에 메모리를 관리한다.

                        // 정밀도를 갖는 몸무게 수치를 위해 부동소수점으로 타입을 명시한다.
                                            // 반환형을 명시한다.
fn calculate_weight_on_mars(weight : f32) -> f32{
    
    //return 50.0;
    // rust에서는 ;와 return을 생략 할 수 있다.
    // 50.0

    (weight / 9.81) * 3.711
}

// 소유권을 취하기
// fn some_fn(s: String){}

// 참조하기
// fn some_fn1(s: &String){
//     // 해당 코드는 에러를 일으킨다. 참조한 것은 불변이기 떄문

//     // 파라미터에 &mut 을 이용하면 참조한 것을 변경할 수 있다
//     s.push_str("a");
// }

fn some_fn2(s: &mut String){
    // s.push_str("a");
}
```