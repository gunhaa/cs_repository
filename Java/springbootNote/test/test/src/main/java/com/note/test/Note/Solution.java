package com.note.test.Note;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {

    public static String[] solution(String my_str, int n) {

        List<String> list = new ArrayList<String>();

        StringBuilder sb = new StringBuilder(my_str);

        while(sb.length()!=0){
            String temp;
            if(n >= sb.length()){
                temp = sb.substring(0,sb.length());
                sb.delete(0, sb.length());
            } else {
                temp = sb.substring(0, n);
                sb.delete(0,n);
            }
            list.add(temp);
        }

        return list.stream().toArray(String[]::new);
    }

    public static void main(String[] args) {

        String my_str = "abc1Addfggg4556b";
        int n = 6;
        System.out.println(Arrays.toString(solution(my_str, n)));

    }

}
