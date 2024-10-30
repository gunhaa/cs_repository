# 빌더 패턴 (Builder Pattern)

> 빌더 패턴은 복잡한 객체의 생성 과정을 단순화하고, 객체를 단계적으로 생성할 수 있도록 하는 디자인 패턴이다. 이 패턴은 객체를 구성하는 여러 매개변수를 하나씩 설정할 수 있도록 하여, 다양한 조합의 객체를 쉽게 만들 수 있게 해준다.

## 사용하는 이유

- 복잡한 객체의 생성 단순화: 객체 생성에 필요한 많은 매개변수가 있을 때, 각 매개변수를 설정하는 메서드를 통해 단계적으로 객체를 구성할 수 있다.

- 불변 객체 생성: 빌더 패턴을 사용하면, 생성된 객체를 불변으로 만들 수 있다. 이는 안전성을 높인다.

- 가독성 향상: 여러 매개변수를 한 번에 설정하는 것이 아니라, 메서드를 체이닝하여 읽기 쉽게 작성할 수 있다.

- 생성자 오버로딩 방지: 다양한 매개변수를 가진 생성자를 여러 개 정의할 필요 없이, 빌더를 사용하여 유연하게 객체를 생성할 수 있다.

- 조합 가능성: 다양한 조합으로 객체를 생성할 수 있어, 유연성과 재사용성이 증가한다.

## 사용 예시
> java
```java

public class Car {
    private String make;
    private String model;
    private int year;

    // Private constructor
    private Car(CarBuilder builder) {
        this.make = builder.make;
        this.model = builder.model;
        this.year = builder.year;
    }

    @Override
    public String toString() {
        return "Car [make=" + make + ", model=" + model + ", year=" + year + "]";
    }

    // Builder Class
    public static class CarBuilder {
        private String make;
        private String model;
        private int year;

        public CarBuilder setMake(String make) {
            this.make = make;
            return this;
        }

        public CarBuilder setModel(String model) {
            this.model = model;
            return this;
        }

        public CarBuilder setYear(int year) {
            this.year = year;
            return this;
        }

        public Car build() {
            return new Car(this);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car.CarBuilder()
                .setMake("Toyota")
                .setModel("Corolla")
                .setYear(2021)
                .build();

        System.out.println(car);
    }
}

```

> javascript
```javascript

// Product Class
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    toString() {
        return `Car [make=${this.make}, model=${this.model}, year=${this.year}]`;
    }
}

// Builder Class
class CarBuilder {
    constructor() {
        this.make = "";
        this.model = "";
        this.year = 0;
    }

    setMake(make) {
        this.make = make;
        return this;
    }

    setModel(model) {
        this.model = model;
        return this;
    }

    setYear(year) {
        this.year = year;
        return this;
    }

    build() {
        return new Car(this.make, this.model, this.year);
    }
}

const car = new CarBuilder()
    .setMake("Honda")
    .setModel("Civic")
    .setYear(2022)
    .build();

console.log(car.toString());

```