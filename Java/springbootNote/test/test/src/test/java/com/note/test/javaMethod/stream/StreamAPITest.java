package com.note.test.javaMethod.stream;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

public class StreamAPITest {


    // Stream API 는 JAVA8에 등장하였다
    // 함수형 프로그래밍 언어 처럼 스트림 API는 람다 표현식을 이용해 각 연산은 람다 표현식을 인자로 받아 처리할 수 있다.
    // 이를 이용해 반복문을 파이프라인으로 바꿀 수 있게 되어서 직관적으로 배열을 다룰 수 있게 되었다.

    @Test
    void test1(){

        List<String> list = Arrays.asList("Java", "Stream", "API");
        list.stream().forEach(System.out::println);
        /*
        ::은 메서드 참조(method reference)이며, 자바 8에서 도입된 기능이다.
        람다 표현식을 간결하고 명확하게 작성할 수 있게 해주는 문법이다.

        - System.out은 PrintStream 객체다.
        - println은 PrintStream 클래스에 정의된 메서드다.
        - 따라서 System.out::println은 System.out 객체의 println 메서드를 참조하는 코드다.
        */
        list.stream().forEach(x -> System.out.println(x));

    }

    @Test
    void test2(){

        List<String> list = Arrays.asList("Java", "Stream", "API", "Jest");

        list.stream()
                .filter(s -> s.startsWith("J"))
                .forEach(System.out::println);

        list.stream()
                .filter(s -> s.startsWith("S"))
                .forEach(item -> System.out.println(item));

    }

    @Test
    void test3(){
        List<String> list = Arrays.asList("Java", "Stream" , "API" , "Jest");

        list.stream()
                .map(s -> s.toLowerCase())
                .forEach(System.out::println);
    }

    @Test
    void test4(){
        List<String> list = Arrays.asList("Java", "Stream" , "API" , "Jest");

        Stream<String> stream = list.stream();

        System.out.println("stream = " + stream);

        // .stream을 통해 stream 구현체가 어떻게 만들어지는지 확인해 볼 수 있다. (Collection 인터페이스, default 메소드 사용)
        // + default 메서드는 자바 8에서 도입된 기능으로, 인터페이스에 실제 구현된 메서드를 제공할 수 있게 해준다.
        // 전통적으로 인터페이스는 추상 메서드만 포함할 수 있었지만, default 메서드를 사용하면 구현체가 없이 인터페이스에 기본 동작을 정의할 수 있다.
        Stream stream1 = list.stream();
    }

}
