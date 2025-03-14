
# ARG(ARGuments)

- `docker build` 진행시 --build-arg 를 통해 넣을 수 있다.
- CMD, 어플리케이션 코드로 접근이 불가능하다

# Env(Environment)

- `docker run` 를 통해 환경변수를 런타임에 넣을 수 있다.
- Dockerfile에 넣을 수 있다.
- 어플리케이션 코드로 접근이 가능하다.
- `docker run -d -p 3000:8000 --rm --env PORT=8000 --name feedback-app -v feedback:/app/feedback feedback-node:volumes`
    - 컨테이너 실행시 옵션을 이미지 빌드시 넣었던 ENV값을 덮어 쓸 수 있다`
```Dockerfile
# 환경 변수 설정 
# ENV 변수명 값
ENV PORT 80

# EXPOSE 80
# 환경 변수를 알림 $
EXPOSE $PORT
```

- .env 파일을 통해 환경변수를 넣고 싶다면 다음과 같은 옵션을 추가하면 된다
    - `# --env-file ./.env`

---

> 두 가지 모두 하드 코딩을 막기 위한 방법이다.