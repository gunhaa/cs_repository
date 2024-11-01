

# String

## 특징
- 불변(Immutable): 한 번 생성된 문자열은 변경할 수 없다. 문자열을 변경하려면 새로운 문자열 객체를  생성한다.
- 스레드 안전: 여러 스레드에서 안전하게 사용할 수 있다.
성능: 문자열을 자주 변경할 경우 성능이 떨어질 수 있다.

```java
public class StringExample {
    public static void main(String[] args) {
        String str = "Hello";
        str += " World"; // 새로운 문자열 객체가 생성됨
        System.out.println(str); // 출력: Hello World
    }
}
```
# StringBuffer
- 가변(Mutable): 문자열을 변경할 수 있다. 같은 객체를 사용하여 문자열을 수정할 수 있다.
스레드 안전: 내부적으로 동기화되어 있어 멀티스레드 환경에서도 안전하게 사용 가능하다.
- 성능: String보다 성능이 뛰어나지만, StringBuilder에 비해서는 느릴 수 있다.
예시 코드
```java
public class StringBufferExample {
    public static void main(String[] args) {
        StringBuffer buffer = new StringBuffer("Hello");
        buffer.append(" World"); // 같은 객체에서 수정
        System.out.println(buffer.toString()); // 출력: Hello World
    }
}
```
# StringBuilder
- 가변(Mutable): 문자열을 변경할 수 있다. 같은 객체를 사용하여 문자열을 수정할 수 있다.
- 비스레드 안전: 동기화되지 않아 멀티스레드 환경에서는 안전하지 않다. 그러나 단일 스레드에서 사용할 때는 더 빠른 성능을 제공한다.
- 성능: StringBuffer보다 성능이 좋다.
```java
public class StringBuilderExample {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder("Hello");
        builder.append(" World"); // 같은 객체에서 수정
        System.out.println(builder.toString()); // 출력: Hello World
    }
}
```


## Recap
- String: 불변, 스레드 안전(기본적으로 불변), 문자열 변경 시 성능 저하.
- StringBuffer: 가변, 스레드 안전(동기화synchronized), 성능이 String보다 나음.
- StringBuilder: 가변, 비스레드 안전(비동기화Asynchronized), 단일 스레드에서 가장 빠른 성능.

## 왜 StringBuffer는 스레드 안전하고, Builder는 비스레드 안전이 된걸까?

### StringBuffer
> Buffer라는 용어는 일반적으로 데이터를 임시로 저장하는 공간을 의미한다. StringBuffer는 여러 스레드가 동시에 접근할 수 있도록 설계되었고, 데이터를 안전하게 처리하기 위해 내부적으로 동기화된 메서드를 사용한다.

> 스레드 안전성: 동기화된 메서드를 통해 여러 스레드가 동시에 StringBuffer 객체에 접근할 때 발생할 수 있는 문제를 방지한다. 따라서 멀티스레드 환경에서 안전하게 사용할 수 있다. 예를 들어, 여러 스레드가 동시에 문자열을 추가할 때 데이터가 손상되지 않는다.

### StringBuilder

> Builder라는 용어는 객체를 생성하거나 구성하는 과정에 중점을 두고 있다. StringBuilder는 성능을 중시하여 설계되었으며, 단일 스레드 환경에서 문자열을 효율적으로 조작할 수 있도록 최적화되어 있다.

> StringBuilder는 동기화를 사용하지 않기 때문에, 여러 스레드가 동시에 접근하면 데이터 경쟁 조건이 발생할 수 있다. 즉, 한 스레드가 문자열을 수정하는 동안 다른 스레드가 같은 객체를 수정하면 데이터가 손상될 수 있다. 이를 고려하여 StringBuilder는 주로 단일 스레드 환경에서 사용할 것을 권장한다.


## String 객체는 불변 객체인데 왜 str+= "11" 이런게 되는거임?

> String의 내용을 변경하는 메서드(예: concat(), substring(), replace(), toUpperCase())를 호출하면, 기존의 String 객체는 그대로 유지되고, 변경된 내용을 가진 새로운 String 객체가 생성된다. 예를 들어, str += " World"와 같은 표현은 새로운 String 객체를 생성하고, str 변수는 이 새로운 객체를 가리키게 된다.

> 원래의 String 객체는 메모리에 남아 있고, 새로운 객체가 생성되므로, 기존의 String 객체는 여전히 유효하다. 하지만 str 변수가 이제 새로운 객체를 가리키고 있는 것이다.

```java

public class StringExample {
    public static void main(String[] args) {
        String str = "Hello";  // str이 "Hello"를 참조
        str += " World";       // 새로운 "Hello World" 문자열이 생성되고 str이 이를 참조
        System.out.println(str); // 출력: Hello World

        // 원래의 "Hello" 문자열은 여전히 존재함
        String original = "Hello"; 
        System.out.println(original); // 출력: Hello
    }


```