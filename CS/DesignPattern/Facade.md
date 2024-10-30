# 퍼사드 패턴(Facade Pattern)

> 퍼사드 패턴(Facade Pattern)은 구조 패턴(Structural Pattern)의 한 종류로써, 복잡한 서브 클래스들의 공통적인 기능을 정의하는 상위 수준의 인터페이스를 제공하는 패턴이다.

> 서브시스템을 더 쉽게 사용할 수 있도록 단순한 인터페이스를 제공하는 패턴이다. 복잡한 시스템을 간단하게 사용할 수 있도록 도와준다.

![facade](images/facade1.png)

## 사용하는 이유

> 퍼사드 객체(Facade Object)는 서브 클래스의 코드에 의존하는 일을 감소시켜 주고, 복잡한 소프트웨어를 간단히 사용 할 수 있게 간단한 인터페이스를 제공해준다.

> 퍼사드 패턴을 통해 서브 시스템(SubSystem)들 간의 종속성을 줄여줄 수 있으며, 퍼사드 객체를 사용하는 곳(Client)에서는 여러 서브 클래스들을 호출할 필요 없이 편리하게 사용할 수 있다.

- 낮은 결합도 : client가 subsystem의 코드를 몰라도 된다.
- 서브 클래스 직접 접근 가능 : 필요에 따라 서브 클래스를 직접 사용할 수 있다.

## 사용 예시

> 복잡한 라이브러리나 시스템을 사용하는 경우, 이를 간단한 메서드로 감싸서 사용자가 쉽게 접근할 수 있도록 한다. 다양한 기능(예: 오디오, 비디오, 자막 등)을 가진 미디어 플레이어를 만들 때, 퍼사드를 사용하여 복잡한 내부 기능을 단순한 인터페이스로 제공할 수 있다.

> java

```java

// Subsystem classes
class AudioPlayer {
    public void playAudio(String fileName) {
        System.out.println("Playing audio: " + fileName);
    }
}

class VideoPlayer {
    public void playVideo(String fileName) {
        System.out.println("Playing video: " + fileName);
    }
}

class SubtitleHandler {
    public void displaySubtitle(String subtitle) {
        System.out.println("Displaying subtitle: " + subtitle);
    }
}

// Facade class
class MediaFacade {
    private AudioPlayer audioPlayer;
    private VideoPlayer videoPlayer;
    private SubtitleHandler subtitleHandler;

    public MediaFacade() {
        audioPlayer = new AudioPlayer();
        videoPlayer = new VideoPlayer();
        subtitleHandler = new SubtitleHandler();
    }

    public void playMedia(String mediaType, String fileName, String subtitle) {
        if (mediaType.equalsIgnoreCase("audio")) {
            audioPlayer.playAudio(fileName);
        } else if (mediaType.equalsIgnoreCase("video")) {
            videoPlayer.playVideo(fileName);
            subtitleHandler.displaySubtitle(subtitle);
        }
    }
}

// Client code
public class Main {
    public static void main(String[] args) {
        MediaFacade mediaFacade = new MediaFacade();
        
        mediaFacade.playMedia("audio", "song.mp3", "");
        mediaFacade.playMedia("video", "movie.mp4", "This is a subtitle.");
    }
}

```


> javascript

```javascript

// Subsystem classes
class AudioPlayer {
    playAudio(fileName) {
        console.log(`Playing audio: ${fileName}`);
    }
}

class VideoPlayer {
    playVideo(fileName) {
        console.log(`Playing video: ${fileName}`);
    }
}

class SubtitleHandler {
    displaySubtitle(subtitle) {
        console.log(`Displaying subtitle: ${subtitle}`);
    }
}

// Facade class
class MediaFacade {
    constructor() {
        this.audioPlayer = new AudioPlayer();
        this.videoPlayer = new VideoPlayer();
        this.subtitleHandler = new SubtitleHandler();
    }

    playMedia(mediaType, fileName, subtitle) {
        if (mediaType.toLowerCase() === "audio") {
            this.audioPlayer.playAudio(fileName);
        } else if (mediaType.toLowerCase() === "video") {
            this.videoPlayer.playVideo(fileName);
            this.subtitleHandler.displaySubtitle(subtitle);
        }
    }
}

// Client code
const mediaFacade = new MediaFacade();

mediaFacade.playMedia("audio", "song.mp3", "");
mediaFacade.playMedia("video", "movie.mp4", "This is a subtitle.");

```