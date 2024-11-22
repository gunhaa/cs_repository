package com.note.test.javaMethod.static1;

import org.junit.jupiter.api.Test;

public class StaticTest {

    // static테스트용 예제

    @Test
    void test1(){
        Data1 data1 = new Data1("data1");
        System.out.println("data1.count = " + data1.count);

        StaticTest.Data1 data2 = new Data1("data2");
        System.out.println("data2.count = " + data2.count);
    }


    private static class Data1 {

        // 해당 클래스의 목적은 객체가 생성될 때마다 count가 그에 맞춰 증가하는 것이다
        // 하지만 목적한대로 작동하지 않는다.. 왜 그럴까?
        public String name;
        // 인스턴스 변수
        public int count;

        // 클래스변수, 정적변수, static 변수라고 불린다.
        // public static int count;

        // static이 붙은 변수는 heap영역이아닌 메서드 영역에서 관리된다.
        // 메소드 영역에 있는건, 공용으로 쓸 수 있다는 뜻이다.
        // static 변수는 자바 프로그램을 시작 할 때 딱 한개가 만들어진다.

        public Data1(String name){
            this.name = name;
            //Data1 생략가능
            //Data1.count++;
            count++;
        }

    }

}
