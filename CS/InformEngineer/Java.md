# Java 

## 출력 예상

### 2025 실기

```java
public class Main {
 
  public static void main(String[] args) {
 
    int a=5,b=0;
 
    try{
      System.out.print(a/b);
    }catch(ArithmeticException e){
      System.out.print("출력1");
    }catch(ArrayIndexOutOfBoundsException e) {
      System.out.print("출력2");
    }catch(NumberFormatException e) {
      System.out.print("출력3");
    }catch(Exception e){
      System.out.print("출력4");
    }finally{
      System.out.print("출력5");
    }
  }
}
```

<details>
  <summary>정답</summary>
  출력1출력5<br>
  구체적인 Exception으로 처리되며, 에러가 바깥으로 전파되지 않아서 finally도 실행된다
</details>
<br>


```java
public class Main {
    public static void main(String[] args) {
        new Child();
        System.out.println(Parent.total);
    }
}
 
class Parent {
    static int total = 0;
    int v = 1;
 
    public Parent() {
        total += (++v);
        show();    
    }
 
    public void show() {
        total += total;
    }
}
 
 
class Child extends Parent {
    int v = 10;
 
    public Child() {
        v += 2;
        total += v++;
        show();
    }
 
    @Override
    public void show() {
        total += total * 2;
    }
}
```

<details>
  <summary>정답</summary>
자식의 생성자를 호출하면, super()가 없더라도 부모의 생성자 로직이 호출된다
Parent()에서 total = 2, 이후 show()호출(자식) 으로 인해 total = 6, v = 2
이후 Child()호출된다
v = 12, total = 18, show()실행, total = 18 + 36 = 54
</details>
<br>

```java
public class Main {
 
    public static void main(String[] args) {
        int[] data = {3, 5, 8, 12, 17};
        System.out.println(func(data, 0, data.length - 1));
    }
 
    static int func(int[] a, int st, int end) {
        if (st >= end) return 0;
        int mid = (st + end) / 2;
        return a[mid] + Math.max(func(a, st, mid), func(a, mid + 1, end));
    } 
 
}
```

<details>
  <summary>정답</summary>
  recursive
  return 8 + Math.max(func(0, 0, 2), func(0, 3, 4))
                             8              12
  answer: 20
</details>
<br>

```java
public class Main {
  public static void main(String[] args) {
    System.out.println(calc("5"));
  }
 
  static int calc(int value) {
    if (value <= 1) return value;
    return calc(value - 1) + calc(value - 2);
  }
 
  static int calc(String str) {
    int value = Integer.valueOf(str);
    if (value <= 1) return value;
    return calc(value - 1) + calc(value - 3);
  }
}
```
<details>
  <summary>정답</summary>
  recursive
  answer: 4
</details>
<br>


### 2024-3-11
```java
public class Main{
  public static void main(String[] args){
    Base a =  new Derivate();
    Derivate b = new Derivate();
    
    System.out.print(a.getX() + a.x + b.getX() + b.x);
  }
}
 
 
class Base{
  int x = 3;
 
  int getX(){
     return x * 2; 
  }
}
 
class Derivate extends Base{
  int x = 7;
  
  int getX(){
     return x * 3;
  }
}
```
<details>
  <summary>정답</summary>
메서드 오버라이딩:	Derivate에서 getX()를 재정의했으며, 실제 객체 타입 기준으로 호출됨 (동적 바인딩)<br>
멤버 변수 숨김 (Variable Hiding): Derivate가 Base의 x를 같은 이름으로 가림(hide) 참조 변수 타입 기준으로 어떤 x가 보이는지가 결정됨<br>
정적 바인딩 vs 동적 바인딩: 변수는 컴파일 시점의 타입 기준, 메서드는 실행 시점의 객체 기준으로 결정됨<br>
업캐스팅: Base a = new Derivate();는 업캐스팅의 예 — 메서드는 오버라이딩에 따라 동작하지만, 변수는 Base 기준 사용<br>
이 예시는 이미 컴파일타임에 Base의 타입과 Derivate의 타입이 결정되어 필드값이 결정됬다
</details>
<br>

### 2024-3-19

> 이 코드 직접 쳐보고 좀 더 알아보기

```java
class Main {
 
  public static class Collection<T>{
    T value;
 
    public Collection(T t){
        value = t;
    }
 
    public void print(){
       new Printer().print(value);
    }
 
   class Printer{
      void print(Integer a){
        System.out.print("A" + a);
      }
      void print(Object a){
        System.out.print("B" + a);
      } 
      void print(Number a){
        System.out.print("C" + a);
      }
   }
 }
 
  public static void main(String[] args) {
      new Collection<>(0).print();
  }
  
}
```
<details>
  <summary>정답</summary>
  B0
</details>
<br>