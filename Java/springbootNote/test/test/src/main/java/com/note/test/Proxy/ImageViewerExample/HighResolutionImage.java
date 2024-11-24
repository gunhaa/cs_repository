package com.note.test.Proxy.ImageViewerExample;

public class HighResolutionImage implements IImage {

    private String img;

    public HighResolutionImage(String path) {
        loadImage(path);
    }

    private void loadImage(String path) {
        try{
            Thread.sleep(1000);
            img = path;
        }catch(InterruptedException e){
            e.printStackTrace();
        }

        System.out.println(path + "에 있는 이미지 로딩 완료");
    }

    @Override
    public void showImage(){
        System.out.println("이미지 출력 : "+ img);
    }

}
