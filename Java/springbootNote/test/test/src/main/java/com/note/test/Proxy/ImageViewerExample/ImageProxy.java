package com.note.test.Proxy.ImageViewerExample;

public class ImageProxy implements IImage{

    private String path;

    public ImageProxy(String path){
        this.path = path;
    }


    // 동적 바인딩 이용
    //동적 바인딩은 프로그램 실행 시점(Run-time)에 메소드 호출이 실제 구현된 객체의 메소드로 연결되는 것을 말한다.
    //자바에서는 다형성을 지원하기 위해 동적 바인딩을 기본적으로 사용한다.
    //메소드를 호출할 때, 레퍼런스 타입이 아닌 실제 객체의 타입에 따라 호출할 메소드가 결정된다.

    @Override
    public void showImage() {
        IImage proxyImage = new HighResolutionImage(path);
        proxyImage.showImage();
    }
}
