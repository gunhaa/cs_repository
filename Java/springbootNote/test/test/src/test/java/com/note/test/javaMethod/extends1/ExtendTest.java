package com.note.test.javaMethod.extends1;

import org.junit.jupiter.api.Test;

public class ExtendTest {

    @Test
    void test1(){

        Animal animal = new Animal();

        System.out.println("animal.walking() = " + animal.walking());

        Human human = new Human();

        System.out.println("human.think() = " + human.think());
        System.out.println("human.walking() = " + human.walking());

        Student student = new Student();

        System.out.println("student.goSchool() = " + student.goSchool());
        System.out.println("student.think() = " + student.think());
        System.out.println("student.walking() = " + student.walking());
        System.out.println("----------------------------------------polytest");
        Animal animal1 = new Student();
        /*

        animal.walking()에서 오버라이딩된 메소드가 호출되는 이유는, 자바의 다형성(polymorphism) 개념에 기반한 동적 메소드 바인딩(dynamic method binding) 때문입니다.

        코드를 보면 animal 변수는 Animal 타입으로 선언되었지만, 그 후에 new Student()로 Student 객체를 생성하여 animal에 할당하고 있습니다.
        자바에서는 메소드 호출이 런타임 시점에 결정되기 때문에, 변수의 타입이 아니라 실제 객체의 타입에 맞는 메소드가 호출됩니다.

        Animal 클래스의 walking() 메소드가 정의되어 있고,
        Human 클래스에서 walking() 메소드를 오버라이딩하며,
        Student 클래스는 Human을 상속받아 walking() 메소드를 상속받습니다.

        하지만, 코드에서 Animal animal1 = new Student();로 선언된 animal1 객체는 **실제 타입이 Student**입니다.
         animal1의 타입은 Animal로 선언되어 있지만, 실제 객체는 Student이므로 Student 클래스에서 오버라이딩된 walking() 메소드가 호출됩니다.

        이게 자바에서 다형성이 작동하는 방식으로, 부모 타입의 참조 변수로 자식 객체를 참조할 때, 메소드 호출은 실제 객체 타입에 맞춰서 결정됩니다.
         따라서 animal1.walking() 호출 시, Student 클래스의 walking() 메소드가 실행되는 것입니다.
        */
        System.out.println("animal1.walking() = " + animal1.walking());
                                                       // 다운 캐스팅을 사용해 메소드를 사용할 수 있다.
        System.out.println("animal1.goSchool() = " + ((Student)animal1).goSchool());
    }

    private static class Animal {

        public String walking(){
            return "Animal can walking";
        }

    }

    private static class Human extends Animal {

        @Override
        public String walking(){
            return "Human waling use 2 legs";
        }

        public String think(){
            return "Human can thinking";
        }

    }

    private static class Student extends Human {

        public String goSchool(){
            return "Student go to school";
        }

    }
}
