package com.note.test.JavaMethod;

import java.nio.charset.StandardCharsets;

public class StringMethod {

    // Java의 String은 불변하다
    // StringBuilder는 빠르고, 비동기적이라서 멀티쓰레드 환경에서 사용 불가능/가변
    // StringBuffer는 느리고, 동기적이라서 멀티쓰레드 환경에서 안전/ 가변
    
    
    public String useToString(String str){
        return str.toString();
    }

    public byte[] useGetBytes(String str){
        return str.getBytes(StandardCharsets.UTF_8);
    }

    public String useRepeat3(String str){
        return str.repeat(3);
    }

    public String useStrip(String str){
        return str.strip();
    }

    public int useCodePointAt2(String str){
        return str.codePointAt(2);
    }


}
