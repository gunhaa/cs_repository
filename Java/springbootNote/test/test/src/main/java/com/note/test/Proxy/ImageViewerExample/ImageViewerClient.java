package com.note.test.Proxy.ImageViewerExample;

public class ImageViewerClient {

    public static void main(String[] args) {

/*        HighResolutionImage img1 = new HighResolutionImage("/images/img1");
        HighResolutionImage img2 = new HighResolutionImage("/images/img2");
        HighResolutionImage img3 = new HighResolutionImage("/images/img3");

        img2.showImage();*/

        IImage img1 = new ImageProxy("images/img1");
        IImage img2 = new ImageProxy("images/img2");
        IImage img3 = new ImageProxy("images/img3");

        img2.showImage();

    }

}
