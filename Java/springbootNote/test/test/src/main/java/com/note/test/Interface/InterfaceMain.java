package com.note.test.Interface;

public class InterfaceMain {

    public static void main(String[] args) {

        InterfaceTestImpl interfaceTest1 = new InterfaceTestImpl();
        interfaceTest1.myMethod();

        InterfaceTest interfaceTest2 = new InterfaceTestImpl();
        interfaceTest2.myMethod();

//        인터페이스는 인스턴스화 할 수 없다
//        InterfaceTest interfaceTest3 = new InterfaceTest();

        InterfaceTest interfaceTest3 = new InterfaceTest() {
            @Override
            public void myMethod() {
                System.out.println("즉석 구현 인터페이스");
            }
        };

        interfaceTest3.myMethod();

    }

}
