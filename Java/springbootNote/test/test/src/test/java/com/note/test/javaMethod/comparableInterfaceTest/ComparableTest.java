package com.note.test.javaMethod.comparableInterfaceTest;

import org.junit.jupiter.api.Test;

import java.util.Objects;

public class ComparableTest {


    @Test
    void test1(){

        Monkey monkey1 = new Monkey(1, "monkey1");
        Monkey monkey2 = new Monkey(2, "monkey2");
        Monkey monkey3 = new Monkey(1,"monkey1");

        System.out.println(monkey1.compareTo(monkey2));
        System.out.println(monkey1.compareTo(monkey3));
    }

    private static class Monkey implements Comparable<Monkey> {

        private int age;
        private String name;

        public Monkey(int age, String name) {
            this.age = age;
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        @Override
        public boolean equals(Object o) {
            System.out.println("해당 클래스의 equals가 사용됬음");
            return true;
        }

        @Override
        public int hashCode() {
            return Objects.hash(age, name);
        }

        @Override
        public int compareTo(Monkey o) {
            // 해당 코드는 String의 equals를 호출한다
//            if(this.name.equals(o.name)){
//                return 0;
//            }
            if(this.equals(o)) return 0;

            return 1;
        }
    }
}
