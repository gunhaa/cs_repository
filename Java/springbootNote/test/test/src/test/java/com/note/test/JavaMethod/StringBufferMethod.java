package com.note.test.JavaMethod;

import org.junit.jupiter.api.Test;

public class StringBufferMethod {

    StringBuffer buffer = new StringBuffer();

    /*
        StringBuilder 와 StringBuiffer는 같은 인터페이스를 공유한다. 두 클래스 모두 Appendable, CharSequence 인터페이스를 구현하며,
        문자열을 다루는 방법에서는 동일한 메서드들을 제공한다. 하지만 **주요 차이점은 동기화(synchronization)**에 있다.
     */

    @Test
    void test1(){

        // buffer에는 synchronized 블록이 있어서 thread-safe하다.
//        buffer.append("Hello World");
        System.out.println();
        Thread thread1 = new Thread(()->{

            for(int i=0; i<10000; i++){
                buffer.append(1);
//                System.out.println("buffer = " + buffer);
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
                buffer.append(2);
//                System.out.println("buffer = " + buffer);
            }

        });

        thread1.start();
        thread2.start();

        try {
            thread1.join(); // thread1이 끝날 때까지 기다린다.
            thread2.join(); // thread2가 끝날 때까지 기다린다.
            System.out.println(buffer.length());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
}
