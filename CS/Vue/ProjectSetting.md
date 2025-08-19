# Vue, SpringBoot 프로젝트 세팅

- 방법이 두가지 있다
  1. SpringBoot 프로젝트 내에 Vue 프로젝트를 생성하는 방법
  - 하나의 프로젝트로 관리할 수 있음(작업은 분리 가능)
  2. Vue 프로젝트의 빌드 결과를 SpringBoot 프로젝트의 특정 위치에 위치시켜두는 방법
  - fe, be 프로젝트를 분리해서 관리할 수 있음

## 프로젝트를 분리하고 싶기에, 2번 방법을 사용해서 세팅하는 방법

1. fe/be 폴더를 분리한다
2. be폴더에 springboot을 세팅한다
3. fe폴더에 vue를 세팅한다

- vite.config.js 파일 수정

```javascript
// vite.config.js
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  root: "./", // 현재 폴더를 루트로
  build: {
    // springboot static폴더 위치
    outDir: "../be/src/main/resources/static",
    emptyOutDir: true, // 기존 파일 제거
  },
});
```

- npm run build(vite build)를 사용해 빌드 결과물을 springboot로 내보낸다
