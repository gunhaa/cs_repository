# Typescript compiler

## watch 모드

- `tsc app.ts --watch`
- 변경 내용 자동 컴파일
- 두개 이상은 불가능하다

## tsc 프로젝트 초기화

- `tsc --init`
  - 폴더에 tsc 명령을 실행시키도록 설정한다
  - tsc로 설정된 폴더의 모든 ts파일을 컴파일 할 수 있다
- `tsc --watch`
  - 설정 폴더 ts 파일을 감시할수있다, 변경 사항이 있을 시 재컴파일 됨

## tsconfig.json

- typescript compiler의 컴파일러 설정 파일이다
- `"exclude": ["basics" , "node_modules"]` 로 컴파일 제외 폴더 설정이 가능하다, node_modules는 자동으로 제외된다
- `"include": ["/src"]` 로 컴파일 할 폴더 설정이 가능하다
- `fliles: []` 로 컴파일할 개별 파일 설정이 가능하다

### compilerOptions

- `target`
  - 컴파일 결과로 받고싶은 자바스크립트 버전 선택
  - 이를 이용해 구형 브라우저와 호환되는 js코드로 만들어 낼 수 있다
- `module`
  - 모듈 연결 방법을 선택한다
- `lib`
  - lib은 TypeScript가 컴파일 시 어떤 환경에서 동작할지를 결정하는 전역 타입 정의들을 포함시킬지를 설정한다
  - 기본적으로 target에 따라 자동 지정되지만, 직접 설정할 수도 있다
  - `"lib": ["ES2015", "DOM", "DOM.Iterable"]` 같은 옵션을 사용해 DOM 관련 메서드를 사용 가능하도록 설정할 수 있다
- `allowJs`
  - js여도 컴파일한다
- `checkJs`
  - .js파일의 에러를 검사한다
- `sourceMap`
  - 브라우저 개발자 도구에서 ts파일을 확인 할 수 있도록 map파일을 추가로 컴파일 한다(디버깅용)
- `outDir`
  - 출력 폴더를 정한다(관습적으로 ./dist)
- `rootDir`
  - 컴파일시 폴더를 설정한다
- `removeComments`
  - 주석의 컴파일여부 결정
- `noEmit`
  - js파일을 생성하지 않는다(파일을 검사하고 오류만 출력)
- `downLevelIteration`
  - 이전 버전 js loop 컴파일 안되는 경우, 해당 옵션으로 해결(최적화 되지 않으므로 off 해야하는 옵션)
- `noEmitOnError`
  - 기본 값은 거짓, 오류 발생 시 파일을 생성하지 않는다(타입 스크립트는 오류가 생기더라도 기본적으로 js파일을 만든다/ 추천옵션)
- `strict`
  - TypeScript의 모든 엄격한 검사(strict checks)를 한 번에 켜주는 옵션
- `sticNullchecks`
  - 잠재적 null값을 확인한다
- `strictBindCallapply`
  - bind apply call메서드의 타당성을 컴파일러가 검증한다
- `noImplicitThis`
  - 자명하지 않은 곳에 this를 사용하면 경고를 표시한다
- `noImplicitReturns`
  - 리턴을 하거나 안하는 함수의 경우 경고한다
- `noUnusedLocals`
  - 사용안하는 변수가 있다면 에러를 발생시킨다
- `noUnusedParameters`
  - 사용 안하는 파라미터가 있다면 경고를 발생시킨다
- 다양한 기능이 계속 추가되어 꾸준히 문서를 확인해야 한다
