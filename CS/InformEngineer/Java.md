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