# Cron

- 특정 시간에 command를 실행하도록 예약하는 것
- linux에선 각 사용자마다 자신의 cron을 관리할 수 있는 crontable이 있다.
- `crontab -e` 로 열 수 있다.(현재 사용자의 crontab 파일 열기)

## Cron syntax

![Cron1](images/Cron1.png)

> https://crontab.guru/ 에서 대화형으로 만들어 볼 수 있다.

- 특수 구문 사용법
    - * Any Value
    - 5,6 List of Values(5 and 6)
    - 1-4 Range of Values(1 to 4)
    - */5 Step values(every 5)
### 사용 예제
- `30 * * * * command` 
    - 30분마다 실행한다.
- `0 0 * * * command`
    - 매일 자정에 실행한다.
- `30 6 * * * command`
    - AM 6시 30분마다 실행한다.
- `30 6 * * 1 command`
    - 월요일 AM6:30 마다 실행된다.
- `30 6 * 4 1 command`
    - 4월 월요일 AM6:30 마다 실행된다.
- `0 0 1 * * command`
    - 매월 1일 AM0:0마다 실행된다.
- `  * *  *   *   *    echo "Another Minute! Date is: $(date)" >> ~/time.log` 
    - 매 분마다 echo 실행, log는 time.log로 보낸다.
- 각 사이의 간격은 하나 이상이라면 중요하지 않다.

## Cron을 이용한 backup 예제

```bash
gunha@oracle:~/BackupSample$ mkdir TarMe
gunha@oracle:~/BackupSample$ touch TarMe/File{1..500}.txt
gunha@oracle:~/BackupSample$ tar -cvzf backup.tar.gz TarMe/

## 복구방법
gunha@oracle:~/BackupSample$ tar -xvzf backup.tar.gz

## 요일 표시 방법
gunha@oracle:~/BackupSample$ date +%m-%d-%Y
01-02-2025
```

- `tar` 명령어는 파일 및 디렉터리를 하나의 아카이브 파일로 묶는 데 사용되며, 압축 및 압축 해제 작업에 자주 사용된다.
    - c: 아카이브 파일 생성 (create)
    - v: 진행 상태를 자세히 출력 (verbose)
    - z: gzip으로 압축 (gz 파일 생성)
    - f: 아카이브 파일 이름을 지정 (filename)
- gz는 관례적으로 압축 방식을 나타내기 위해 사용하는 확장자일 뿐, 실제 파일을 묶고 압축하는 데 필수는 아니다. 파일 이름에 .gz를 포함하지 않아도 파일 자체는 정상적으로 동작한다.


```bash
gunha@oracle:~/bin$ cat my-backup
#!/bin/bash
DATE=$(date +%m-%d-%Y-%M)
BACKUP_DIR="/home/gunha/BackupSample"

tar -cvzf $BACKUP_DIR/backup-$DATE.tar.gz /home/gunha/BackupSample/springboot

# 해당 파일을 추가후, source .profile을 통해 bin을 업데이트한다.
```
설정
```bash
#.profile 파일에서 cronjob을 추가한다.
* * * * * /home/gunha/bin/my-backup
```