package com.note.test.inheritance;


import org.junit.jupiter.api.Test;

public class ClazzTest {


    @Test
    public void test1(){

        Item item = new Album("이름", "3000" , "gd");

        System.out.println("item.toString() = " + item.toString());

    }

}
