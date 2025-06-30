# Java 

## 출력 예상

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
  출력1<br>
  출력5<br>
  구체적인 Exception으로 처리되며, 에러가 바깥으로 전파되지 않아서 finally도 실행된다
</details>
<br>