package com.note.test.JavaMethod.String;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

class StringMethodTest {

    private static String str = "test1";
    private static String strTest = "strstr";
    private static String whiteStr = "   tes   t 1      ";
    StringMethod obj1 = new StringMethod();

    @Test
    void testUseToString(){
        System.out.println("toString() : "+obj1.useToString(str));
    }

    @Test
    void testUseGetBytes(){
        // 해당 방식으로 출력하면 바이트 배열의 참조값 위치가 나온다
         System.out.println("getBytes() : "+obj1.useGetBytes(str));
        // 해결 방법
        System.out.println("getBytes() : " + Arrays.toString(obj1.useGetBytes(str)));
    }

    @Test
    void testUseRepeat3(){
        System.out.println("repaet() : " + obj1.useRepeat3(str));
    }

    @Test
    void testUseStrip(){
        // 공백을 제거한다 - java11에 추가된 기능으로 trim()과 다르게 \u0200 뿐 아니라 다양한 종류의 공백들을 제거한다
        System.out.println("strip() : " + obj1.useStrip(whiteStr));
    }

    @Test
    void testUseCodePointAt2(){
        // 인덱스의 문자를 ascii 숫자로 반환
        System.out.println("useCodePointAt() : " + obj1.useCodePointAt2(str));
    }
    
    // ---------------- 더 햇갈리기만 할 것 같아서 직접 사용으로 변경
    
    @Test
    void testUseConcat(){
        // str끼리 연결시킨 값을 반환한다.
        System.out.println(str.concat(strTest));
    }

    @Test
    void testUse(){

    }

}