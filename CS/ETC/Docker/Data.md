# Docker data

1. 어플리케이션(이미지)
    - readonly, 실행중인 어플리케이션의 코드는 바뀔 수 없다
2. Temporary App data
    - 임시 저장 파일로, 읽거나 쓸 수 있다
    - log file 등이 포함된다
3. Permanent App data
    - 파일에 저장하거나, 데이터 베이스에 저장해 컨테이너가 멈추거나 재시작 되어도 잃어버리지 않아야 하는 정보이다.
    - User accounts 등이 포함된다.


## temporary app data

- 컨테이너 내부에 특수 파일 시스템이 존재(격리된 파일 시스템)하고, 잠겨서 접근 할 수 없다.
- 호스트 폴더나 호스트 머신, 컨테이너에 대한 연결이 사라진다.
