
## SWAP

> A , B의 위치 바꾸기

1. 배열로 하기
```java
Integer[] arr = {1,2,3,4,5};

swap(arr, 0, 4);

private static <T> void swap(T[] a, int f, int r) {
	T temp;
    temp = a[f];
    a[f] = a[r];
    a[r] = temp;
}
```
2. 객체 이용

3. 간편하게

```java
private static int swap3(int localA, int localB) {
	return localA;
		
}

int a = 10, b = 20;

b = swap3(a, a = b);

System.out.println(a + " " + b);
```