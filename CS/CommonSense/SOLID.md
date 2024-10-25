# SOLID 

> SOLID 원칙은 객체 지향 프로그래밍에서 코드의 유지보수성과 확장성을 높이기 위해 지켜야 할 다섯 가지 기본 원칙을 나타낸다.

## 1. SRP(Single Responsibility) - 단일 책임 원칙
 클래스는 단 한 개의 책임을 가져야 한다. 클래스를 변경하는 이유는 단 한개여야 한다. 이를 지키지 않으면, 한 책임의 변경에 의해 다른 책임과 관련된 코드에 영향이 갈 수 있다.

#### 예시(JS)

```javascript
// SRP를 위반한 클래스
class User {
    constructor(name) {
        this.name = name;
    }

    saveToDatabase() {
        // 데이터베이스에 사용자 정보 저장
    }

    sendEmail() {
        // 사용자에게 이메일 전송
    }
}

// SRP를 지킨 클래스
class User {
    constructor(name) {
        this.name = name;
    }
}

class UserRepository {
    save(user) {
        // 데이터베이스에 사용자 정보 저장
    }
}

class EmailService {
    sendEmail(user) {
        // 사용자에게 이메일 전송
    }
}
```
위 예시에서 첫 번째 User 클래스는 두 가지 책임(데이터베이스 저장 및 이메일 전송)을 가지고 있다. 두 번째 예시는 각 책임을 별도의 클래스로 나누어 SRP를 준수한다.

## 2. OCP(Open-Closed) - 개방-폐쇄 원칙
확장에는 열려 있어야 하고, 변경에는 닫혀 있어야 한다. 기능을 변경하거나 확장할 수 있으면서, 그 기능을 사용하는 코드는 수정하지 않는다. 이를 지키지 않으면, instanceof와 같은 연산자를 사용하거나 다운 캐스팅이 일어난다.

#### 예시(JAVA)

```java

// 도형의 기본 인터페이스
interface Shape {
    double area(); // 면적을 계산하는 메서드
}

// Circle 클래스
class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius; // 원의 면적 계산
    }
}

// Rectangle 클래스
class Rectangle implements Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height; // 직사각형의 면적 계산
    }
}

// 면적 계산기 클래스
class AreaCalculator {
    public double totalArea(Shape[] shapes) {
        double total = 0;
        for (Shape shape : shapes) {
            total += shape.area(); // 각 도형의 면적을 합산
        }
        return total;
    }
}

// 클라이언트 코드
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[] {
            new Circle(5),          // 반지름이 5인 원
            new Rectangle(4, 6)     // 너비가 4, 높이가 6인 직사각형
        };

        AreaCalculator areaCalculator = new AreaCalculator();
        double totalArea = areaCalculator.totalArea(shapes);
        System.out.println("Total Area: " + totalArea);

        // 새로운 도형인 Square를 추가하려면 기존 코드를 수정하지 않고 새로운 클래스를 만들면 됨
    }
}

// 새로운 도형 클래스
class Square implements Shape {
    private double side;

    public Square(double side) {
        this.side = side;
    }

    @Override
    public double area() {
        return side * side; // 정사각형의 면적 계산
    }
}

```

- Shape 인터페이스: 모든 도형이 공통으로 가져야 할 area() 메서드를 정의한 인터페이스이다. Circle 및 Rectangle 클래스: Shape 인터페이스를 구현하여 각각의 도형에 대한 면적 계산을 수행한다.

- AreaCalculator 클래스: 여러 도형의 배열을 받아 총 면적을 계산하는 클래스이다. 이 클래스는 특정 도형에 의존하지 않고 Shape 인터페이스에만 의존하여, 어떤 도형이 추가되더라도 기존 코드를 수정할 필요가 없다.

- 확장성: 새로운 도형(예: Square)을 추가하려면, Shape 인터페이스를 구현하는 새로운 클래스를 추가하는 것만으로 기능이 확장된다. 기존의 AreaCalculator는 변경할 필요가 없다.

## 3. LSP(Liskov Substitution) - 리스코프 치환 원칙
상위 타입의 객체를 하위 타입의 객체로 치환해도, 상위 타입을 사용하는 프로그램은 정상적으로 동작해야 한다. 상속 관계가 아닌 클래스들을 상속 관계로 설정하면, 이 원칙이 위배된다.

즉, 상속 관계가 올바르지 않다면 발생하는 문제이다.


#### 위반 예시(JS)
```javascript
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    setWidth(width) {
        this.width = width;
        this.height = width;  // 높이도 함께 변경
    }
    setHeight(height) {
        this.height = height;
        this.width = height;  // 너비도 함께 변경
    }
}

// 사용 예시
const rect = new Rectangle(2, 3);
rect.setWidth(5);
console.log(rect.getArea()); // 15

const square = new Square(2, 2);
square.setWidth(5);
console.log(square.getArea()); // 25가 되어야 하지만, 리스코프 원칙 위배로 비정상적 작동
```

#### 올바른 예시(JS)

```javascript
class Shape {
    getArea() {}
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }
    getArea() {
        return this.side * this.side;
    }
}

// 사용 예시
const shapes = [new Rectangle(2, 3), new Square(4)];
shapes.forEach(shape => console.log(shape.getArea())); // 6, 16

```

## 4. ISP(Interface Segregation) - 인터페이스 분리 원칙

 인터페이스는 그 인터페이스를 사용하는 클라이언트를 기준으로 분리해야 한다. 각 클라이언트가 필요로 하는 인터페이스들을 분리함으로써, 각 클라이언트가 사용하지 않는 인터페이스에 변경이 발생하더라도 영향을 받지 않도록 만들어야 한다.

 즉, 일관성이 필요하다. 같은 종류가 아니라면 무조건 인터페이스는 분리하여야 한다.

```java

// 불필요한 메서드를 포함하는 인터페이스
interface Animal {
    void eat();
    void fly();
}

// Animal 인터페이스를 구현하는 Bird 클래스
class Bird implements Animal {
    public void eat() {
        System.out.println("Bird is eating.");
    }

    public void fly() {
        System.out.println("Bird is flying.");
    }
}

// Animal 인터페이스를 구현하는 Fish 클래스
class Fish implements Animal {
    public void eat() {
        System.out.println("Fish is eating.");
    }

    public void fly() {
        throw new UnsupportedOperationException("Fish can't fly.");
    }
}

// ISP 원칙에 맞춰 인터페이스 분리
interface Eater {
    void eat();
}

interface Flyer {
    void fly();
}

class Seagull implements Eater, Flyer {
    public void eat() {
        System.out.println("Seagull is eating.");
    }

    public void fly() {
        System.out.println("Seagull is flying.");
    }
}

class Salmon implements Eater {
    public void eat() {
        System.out.println("Salmon is eating.");
    }
}

```


## 5. DI(Dependency Inversion) - 의존 역전 원칙 

고수준 모듈은 저수준 모듈의 구현에 의존해서는 안된다. 저수준 모듈이 고수준 모듈에서 정의한 추상 타입에 의존해야 한다. 즉, 저수준 모듈이 변경돼도 고수준 모듈은 변경할 필요가 없는 것이다. 이는 코드의 유연성을 높이는데 도움을 준다.

#### 예시(JAVA)

```java

// 고수준 모듈
class NotificationService {
    private MessageSender messageSender;

    public NotificationService(MessageSender messageSender) {
        this.messageSender = messageSender;
    }

    public void sendNotification(String message) {
        messageSender.send(message);
    }
}

// 저수준 모듈 인터페이스
interface MessageSender {
    void send(String message);
}

// 저수준 모듈 구현체 1
class EmailSender implements MessageSender {
    public void send(String message) {
        System.out.println("Sending email: " + message);
    }
}

// 저수준 모듈 구현체 2
class SmsSender implements MessageSender {
    public void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

// 클라이언트 코드
public class Main {
    public static void main(String[] args) {
        MessageSender emailSender = new EmailSender();
        NotificationService notificationService = new NotificationService(emailSender);
        notificationService.sendNotification("Hello via Email!");

        MessageSender smsSender = new SmsSender();
        notificationService = new NotificationService(smsSender);
        notificationService.sendNotification("Hello via SMS!");
    }
}

```


- NotificationService는 MessageSender 인터페이스에 의존하고, 그 구현체는 주입받는다. 이를 통해 NotificationService는 특정한 저수준 모듈에 의존하지 않고, 필요에 따라 다른 MessageSender를 사용할 수 있는 유연성을 가진다.

> NotificationService는 메시지를 보내는 역할을 한다. 이 서비스는 메시지를 전송하는 방법에 대해서는 구체적으로 알 필요가 없다. MessageSender는 메시지를 보내는 다양한 방법을 정의하는 인터페이스이다. 
 <br>의존성 주입 :  NotificationService는 MessageSender 인터페이스에 의존한다. 즉, NotificationService는 특정한 메시지 전송 방법을 고정하지 않고, MessageSender의 구현체를 외부에서 주입받아 사용한다. 이렇게 하면 나중에 다른 방식의 메시지 전송 기능(예: 파일 첨부)이 필요할 때, NotificationService의 코드를 수정하지 않고 MessageSender를 수정하면 된다.(예 : sendFile() 메소드 추가)