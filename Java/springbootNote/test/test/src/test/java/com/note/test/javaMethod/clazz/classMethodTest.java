package com.note.test.javaMethod.clazz;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class classMethodTest {

    @Test
    void test1() throws ClassNotFoundException {

        // Class 조회
        Class<String> clazz1 = String.class;
//        Class clazz2 = new String().getClass();
//        Class clazz3 = Class.forName("java.lang.String");

        // 모든 필드 출력
        Field[] fields = clazz1.getDeclaredFields();
        for (Field field : fields) {
            System.out.println("field = " + field.getType() + " " + field.getName());
        }

        // 모든 메서드 출력
        Method[] methods = clazz1.getDeclaredMethods();
        for (Method method : methods) {
            System.out.println("method = " + method);
        }

        // 상위 클래스 출력
        System.out.println("SuperClass = " + clazz1.getSuperclass().getName() );

        // 인터페이스 정보 출력
        Class<?>[] interfaces = clazz1.getInterfaces();
        for (Class<?> i : interfaces) {
            System.out.println("interface = " + i.getName());
        }

    }

}
