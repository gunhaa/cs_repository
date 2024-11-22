package com.note.test.javaMethod.array;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArrayTest {


    @Test
    void ArrayTest1(){
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");
        // List를 배열로 변환
        String[] array = list.toArray(new String[0]); // 크기를 지정
        for (String element : array) {
            System.out.println(element);
        }
    }

    @Test
    void ArrayTest2(){

        // 기본 배열 선언

        // 기본적으로 , 0 , null등 기본값으로 초기화된다.
        // JAVA에서 선언된 배열은 늘리거나 줄일 수 없다!! 길이 고정

        int[] intArr0;
        /*
        이 상태는 intArr0라는 배열 참조 변수를 선언한 것이다.
        하지만 이 시점에서 intArr0는 아직 배열을 참조하지 않으며 메모리 상에 배열이 할당되지 않았다.
        이 변수는 null 상태로, 배열을 참조하고 있지 않다.
        */

        int[] intArr1 = new int[5];
        int[] intArr2 = new int[]{1,2,3};
        int[] intArr3 = {1,2,3};
        String[] strArr1 = new String[5];
        System.out.println(Arrays.toString(intArr1));
        System.out.println(Arrays.toString(intArr2));
        System.out.println(Arrays.toString(intArr3));
        System.out.println(Arrays.toString(strArr1));

    }

}
