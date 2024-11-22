package com.note.test.javaMethod.string;

import org.junit.jupiter.api.Test;

public class StringTest {

    @Test
    void StringTest1(){

        String one = "hello world";

        String two = "hello world";

        if(one.equals(two)){
            System.out.println("same");
        }

    }

}
