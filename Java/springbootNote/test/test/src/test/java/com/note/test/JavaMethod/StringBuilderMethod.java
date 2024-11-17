package com.note.test.JavaMethod;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

public class StringBuilderMethod {

    // 같이 테스트X AOP 필요X
    // StringBuilder의 메서드들은 일반적으로 원본 객체를 수정하며, 자신의 참조를 반환한다.
    StringBuilder builder = new StringBuilder();
    // 2가지 생성자로 사용가능
    //StringBuilder builder = new StringBuilder("Hello World");
    //StringBuilder builder = new StringBuilder(11);

    @Test
    void test1(){
        builder.append("Hello");
        System.out.println(builder);
        builder.append(" World");
        System.out.println(builder);
    }

    @Test
    void test2(){
        builder.append("Hello World");
        builder.insert(1, 1234567);
        System.out.println(builder);
    }

    @Test
    void test3(){
        builder.append("Hello World");
        builder.delete(0,4);
        System.out.println("builder = " + builder);
    }

    @Test
    void test4(){
        builder.append("Hello Wolrld");
        builder.deleteCharAt(1);
        System.out.println("builder = " + builder);
    }
    
    @Test
    void test5(){
        builder.append("Hello World");
        System.out.println(builder.capacity());
        // StringBuilder 객체의 용량을 추적한다. 만약 parameter보다 낮은 capacity를 가지고 있다면 capacity를 두배 늘리고, +2 시킨다.
        builder.ensureCapacity(20);
        System.out.println(builder.capacity());
    }

    @Test
    void test6(){
        builder.append("Hello World");
        // 길이를 제한한다. capacity는 변하지 않는다.

        System.out.println(builder.capacity());
        builder.setLength(2);
        System.out.println(builder.capacity());
        System.out.println("builder = " + builder);
        builder.append("Hello World");
        System.out.println("builder = " + builder);
    }

    @Test
    void test7(){
        builder.append("Hello World");
        builder.replace(0, 4, "HELLO");
        System.out.println("builder = " + builder);
    }

    @Test
    void test8(){
        builder.append("Hello World");
        // 원본 builder도 바뀌고, 반환형도 있다.
        StringBuilder str = builder.reverse();
        System.out.println("builder = " + builder);
        Assertions.assertThat(builder).isSameAs(str);
    }

    @Test
    void test9(){
        builder.append("Hello world");
        // 찾아지자마자 바로 반환한다.
        System.out.println(builder.indexOf("o"));
        System.out.println(builder.lastIndexOf("o"));

        System.out.println(builder.indexOf("w"));
        System.out.println(builder.lastIndexOf("w"));
    }

    @Test
    void test10(){
        builder.insert(0,"Hello world");
        System.out.println("builder = " + builder);
    }

    @Test
    void test11(){
        
        // builder에는 synchronized 블록이 없다
//        builder.append("Hello World");

        Thread thread1 = new Thread(()->{

            for(int i=0; i<10000; i++){
                builder.append(1);
//                System.out.println("builder = " + builder);
            }

        });

        Thread thread2 = new Thread(()->{

/*            try {
                Thread.sleep(0);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
*/
            for(int i=0; i<10000; i++){
                builder.append(2);
//                System.out.println("builder = " + builder);
            }

        });

        thread1.start();
        thread2.start();

        try {
            thread1.join(); // thread1이 끝날 때까지 기다린다.
            thread2.join(); // thread2가 끝날 때까지 기다린다.
            System.out.println(builder.length());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
}
