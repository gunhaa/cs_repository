package com.note.test.JavaMethod.Collection;

import org.junit.jupiter.api.Test;

import java.util.*;

public class ListTest {


    @Test
    void test1(){

//        Collection collection = new Collection();
        // 불가능하다. why? Collection은 인터페이스 추상 메소드밖에 없기 때문에 있어서 직접 인스턴스를 만들 수 없다.
        // Collection의 구현체는 List, set이 있고 해당 구현체들을 테스트해본다

        // Collection의 구현체가 리스트아님? 왜 안됨?
        // -> List도 인터페이스라 불가능하다
//        Collection collection = new List();

        /* 동작 방식
        인터페이스 Collection에서 List,set의 공통 메소드를 추상메소드를 작성하고
        하위 인터페이스 List set에서 그 특지을 가진 메소드를 추상메소드로 작성하고,
        실제 구현체가 될 LinkedList 등에서 Collection List의 모든 추상메소드를 구현하는 방식
        */

        /*
        해당 방식의 구현을 하면 현재 객체가 접근 가능한 메소드
        Collection collection = new LinkedList();
        LinkedList는 여러 인터페이스를 구현하고 있으므로, 메모리에는 다음과 같은 메서드들이 모두 구현되어 있다
        Collection 메서드: add, remove, size, isEmpty, ...
        List 메서드: get, set, add(int, E), ...
        Deque 메서드: addFirst, addLast, removeFirst, ...
        Queue 메서드: offer, poll, peek, ...
        하지만 참조 변수의 타입이 Collection으로 선언되어 있기 때문에, Collection에서 정의된 메서드만 사용할 수 있다.
        List 인터페이스의 메서드를 사용하려면 캐스팅하거나 참조 변수 타입을 List로 변경해야 한다.
        */

//        Collection collection = new LinkedList();
        List collection = new LinkedList();

        collection.add(1);
        collection.add(2);

        System.out.println(collection.size());
        // 불가능
//        System.out.println(collection.get());

        System.out.println(collection.get(0));
    }

    @Test
    void test2(){
        // 해당 코드는 컴파일 오류를 발생시키지 않는다.. 대체 왜?
        // -> JAVA의 제네릭은 컴파일 타임에 검사가 이루어지기 때문이다.
        // 객체를 만들때 타입이 없어서 해당 코드는 로 타입으로 인식된다.
        // 그래서 int값이 그냥 들어가버린다..
        // 타입 안정성이 깨지게 되므로 이런식의 코드는 지양하자
        List arrayList = new ArrayList<String>();
        arrayList.add(1);
        arrayList.add(true);
        arrayList.add("imString");
        System.out.println(arrayList);
    }

    @Test
    void listTest3(){
        //List<String> arrayList = new ArrayList<String>();
        List<String> arrayList = new ArrayList<>();
        // 위 코드와 아래코드는 같다. 다이아몬드 연산자로써, JAVA7 부터 등장한 기능이다.
        
        // 타입검사를 통한 컴파일에러
        //arrayList.add(1);

        arrayList.add("String0");
        arrayList.add("String1");
        arrayList.add("String2");
        arrayList.add("String0");

        System.out.println(arrayList.contains("string1")); // false
        System.out.println(arrayList.contains("String1")); // true
        System.out.println(arrayList.get(2)); // String2
        System.out.println(arrayList.size()); //4
        System.out.println(arrayList.toString()); // [String0, String1, String2, String0]
        System.out.println(arrayList.hashCode());
        // 해시코드는 객체를 분류하는 코드라기보다는 객체를 식별하거나 해싱 알고리즘에서 사용하기 위한 정수 값
        // 다른 객체이지만 같은 해시코드가 될 수 있다
        // 객체의 메모리주소를 기반으로 해시코드를 생성한다.
        System.out.println("------------------------------------");
        // 리스트 카피 방법
        List<String> copyList = new ArrayList<>();
        copyList.addAll(arrayList);
        System.out.println(arrayList.containsAll(copyList)); // true

        copyList.add("String2");
        // arrayList가 coplyList의 부분집합이기 때문에 true가 출력된다
        System.out.println(arrayList.containsAll(copyList)); // true
        // 역은 성립되지 않기 때문에 false가 출력될 것 같지만 아니다.
        System.out.println(copyList.containsAll(arrayList)); // true
        /*
          containsAll()은 주어진 리스트의 모든 요소가 현재 리스트에 존재하는지 확인하는 메서드이다.
          이 메서드는 부분집합 관계를 검사하지만, 순서와 중복 여부는 고려하지 않는다.
         */
        copyList.add("String3");
        // 다른 것이 추가되기 때문에 false가 된다
        System.out.println(arrayList.containsAll(copyList)); // false
        System.out.println(copyList.containsAll(arrayList)); // true

        // 아니 그럼 String끼리의 판별은 equals로만되고 메모리에는 각자 다르게 할당되는 객체일텐데 어떻게 판별함?
        // List의 제네릭이 String일땐 equals, 혹은 비교하는 특별한 방법이 있음?
        /*
        String 비교는 equals() 메서드로 값을 비교하며, 자바에서 문자열의 값이 동일한지 여부를 판단한다.
        **List<String>에서의 요소 비교는 equals() 메서드를 이용하여 각 String 객체의 내용을 비교한다.
        String은 불변 객체로, 메모리 주소가 다를지라도 값이 같으면 동일하게 취급된다.
        == 연산자는 참조 비교를 하고, equals() 메서드는 내용 비교를 한다.
        */
        System.out.println("---------------------------------------");
        System.out.println(arrayList.indexOf("String0"));// 0 첫 인덱스를 반환하고 중지한다.
        System.out.println(arrayList.lastIndexOf("String0")); // 마지막 인덱스부터 검색하고 중지한다.
        System.out.println(arrayList);
        arrayList.sort(Comparator.naturalOrder()); // 반환형이 없고 배열에 직접 손댐
        System.out.println(arrayList);//오름차순 정렬
        arrayList.sort(Comparator.reverseOrder());// 내림차순 정렬
        System.out.println(arrayList);
    }

}
