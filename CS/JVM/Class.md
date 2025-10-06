# Class의 종류

## 1. static 중첩 클래스 (Static Nested Class)

```java
package mynote.staticNestedClass;

public class Outer {
    private int outerData = 5;
    private static int dataStatic = 10;

    int getInnerData() {
        Inner inner = new Inner();
        return inner.getInnerData();
    }

    int getInnerStaticData() {
        return Inner.inDataStatic;
    }

    int getOuterData() {
        return this.outerData;
    }

    // static으로 떠있기에 외부 this참조가 없다
    static class Inner {
        private int innerData = 50;
        private static int inDataStatic = 100;

        int getInnerData() {
            return innerData;
        }

        int getOuterDataStatic() {
            return Outer.dataStatic;
        }

        // OuterData는 불가능하다
//        int getOuterData() {
//            return Outer.outerData;
//        }
    }

    public static void main(String[] args) {
        Outer outer = new Outer();
        System.out.println(outer.getInnerData());
        Outer.Inner outerInner = new Outer.Inner();
        System.out.println(outerInner.getOuterDataStatic());
        // 일반적인 static 필드와 다르게 this를 사용할 수 있다
        System.out.println(outerInner.getInnerData());
        System.out.println(outer.getInnerStaticData());
    }
}
```

- 외부 클래스의 인스턴스와 독립적
- 외부 클래스의 static 멤버에는 접근 가능, 인스턴스 멤버에는 접근 불가
- 사실상 “외부 클래스 안에 두지만, 독립적인 클래스처럼 쓰고 싶은 경우” 사용
- 주로 외부 클래스와 논리적으로 강한 연관은 있지만, 인스턴스 상태와는 무관할 때 사용
  - 예: Outer.Validator, Outer.Builder 같은 유틸/헬퍼 성격

## 2. 내부 클래스 (Inner Class, Non-static Nested Class)

```java
package mynote.innerClass;

// Outer class
public class UserData {

    private String name;
    private Address info;

    UserData(String name, String addr, String phone){
        this.name = name;
        this.info = new Address(addr, phone);
        System.out.println("UserData()");
    }

    public Address getInfo(){
        return info;
    }

    class Address {
        private String addr;
        private String phone;

        Address(String addr, String phone) {
            this.addr = addr;
            this.phone = phone;
            System.out.println("Address()");
        }

        public String getUserData() {
            return UserData.this.name + ", " + this.addr + ", " + this.phone;
        }
    }

    public static void main(String[] args) {
        UserData userData = new UserData("name", "addr", "phone");
        System.out.println(userData.getInfo().getUserData());

        UserData.Address addr = userData.new Address("addr2", "phone2");
        System.out.println(addr.getUserData());
    }
}
```

- 외부 클래스 인스턴스에 종속
- 자동으로 외부 클래스 인스턴스 참조(Outer.this)를 가진다
  - 이 참조때문에 GC가 Outer클래스의 메모리를 회수 못할수 있으니 주의해서 사용해야 한다
- 외부 클래스의 모든 멤버(심지어 private)에도 접근 가능
- 주로 외부 클래스의 인스턴스와 밀접한 데이터를 함께 관리하거나, 외부 객체 맥락(Context, 필드를 말한다)이 필요한 경우 사용
  - 예: User 안의 Address, GUI 이벤트 핸들러


## 3. 지역 클래스 (Local Class)

```java
package mynote.localClass;

public class Local {
    static void testFunc(Object obj) {
        System.out.println(obj.toString());
    }

    public static void main(String[] args) {
        int data = 10;
        data = 3;

        class Temp {
            public void doing() {
                
                // 해당 방식은 불가능하다
//                data = data + 3;
                // data 의 값이 변하는 경우도 불가능하다
                // data 값의 변경이 없는 상태라면 JVM이 final로 최적화 시키기 때문에 문제 없이 가능하다
//                int result = data + 1;
            }
        }

        System.out.println(data);
        int local = 20;
        // Local 클래스에 속한 중첩 클래스 처럼 작동한다
        class LocalClass {
            int localData;
            LocalClass() {
                localData = 10;
            }
            void printData() {
                System.out.println(this.localData);
                System.out.println(local);
            }
        }
        LocalClass localClass = new LocalClass();
        // mynote.localClass.Local$1LocalClass@58644d46
        testFunc(localClass);
        // 현재는 큰 문제가 없다..
        // 하지만 스택프레임이 제거된 뒤 다시 접근해야 하면 어떻게 할 것인가?
        // JVM은 heap에 저장할때 익명 클래스로 만든뒤 필요한 지역 정보를 복사해 알아서 추가시킨다
        localClass.printData();
    }
}
```

- 위와 같은 코드에서 Temp가 지역 클래스이다
- 코드가 진행되면 Stack Frame이 회수되는데, 지역 클래스 외부 필드인 data를 Heap에 올라간 Temp가 어떻게 사용할 수 있는가?
  - JVM은 지역 클래스를 사용할 때 Stack frame에 올리지 않고, Heap에 지역 클래스가 필요한 정보의 복제본을 지역 클래스 에 저장하여 익명 클래스를 만들어 Heap에 올리는 방식으로 극복한다
  - 그렇기에, 외부의 값은 변하지 않는 final 혹은 effectively final이여야 한다