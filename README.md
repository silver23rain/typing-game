# 타자 게임

주어진 단어가 표시되면 input에 단어를 정해진 시간 내에 입력하여 점수를 획득하는 어플리케이션

## 설치

> npm이 설치되어 있다는 가정 하에 진행합니다.

```
npm install --global webpack
npm install --global webpack-dev-server
npm install --global http-server
```

## 실행 방법

### `npm run dev`

개발 모드에서 앱을 실행합니다.
http://localhost:3000 을 열어 브라우저에서 확인할 수 있습니다.
수정하면 페이지가 다시 로드됩니다.

### `npm run build`

배포용 파일을 public 폴더에 빌드합니다.

### `npm run test`

단위 테스트를 실행합니다.

### `npm run serve`

테스트 & 빌드 동작 및 배포된 파일을
http://localhost:8080 을 통해 브라우저에서 확인할 수 있습니다.

---

<br/>

## 문제 해결 전략

1. webpack 환경 구성

    - 목적에 따라 webpack.dev.js / webpack.prod.js 분리
    - hot reload 적용
    - `npm run build` 스크립트 사용시 public 폴더에 js, css 파일 export
    - `http-server` 라이브러리를 사용한 빌드가 정상적으로 됐는지 브라우저를 통해 확인 가능

2. 라우팅(router.js)

    - 초기 Hash를 사용해 구현
        - 완료 화면으로 상태 넘기기에 대한 고민 -> `localStorage` or `url query`
        - url query로 처리할 경우 hashChange 이벤트 발생 시 쿼리를 파싱해야하는 번거로움
    - History API로 라우팅 방식 변경
        - history 객체로 상태 관리
        - html 렌더 이후 route속성을 가진 a태그 이벤트 리스너로 라우팅 동작 추가

3. 테스트

    - 테스팅 라이브러리로 jest를 사용
    - 테스트를 위한 객체 import 하기 위해 `babel-jest` 적용

4. 게임 화면

    - 시작 버튼 클릭 시 fetch API를 사용한 비동기 호출(Promise, async, await)
        - GET `https://my-json-server.typicode.com/kakaopay-fe/resources/words`
        - 게임 화면 표시 (리우팅)
    - 초기화 버튼 클릭 시 초기 화면을 표시한다 (라우팅)
    - 단어 / 남은 시간 / 점수 표시

        - 데이터를 받아오면 [`nextQuestion`]('https://github.com/silver23rain/typing-game/blob/057b1ec072148baac385484306ccefe814faace5/src/pages/StartGamePage.js#L50') 메서드를 통해 단어 / 남은시간 / 점수를 표시
        - 문제 배열에서 shift를 통해 앞에서 부터 차례대로 표시
        - 호출 스케줄링 (setInterval, setTimeout)을 사용
            - 시간이 만료 되면 해당 호출 스케줄링을 clear하고 재귀 호출
            - 만료 돼서 문제를 넘기는 경우 해결 시간에 소요된 시간을 포함시키지 않음
        - 문제 배열의 길이가 0이 되면
            - history에 상태(`{score, avgSec}`)를 push
            - popstate이벤트를 강제로 발생시켜 리다이렉트 함

    - 입력
        - input box를 통해 입력을 받음
        - input에 keyup 이벤트를 등록
        - 입력된 key가 enter일 떄
            - 현재 입력된 value와 제시된 단어를 비교
            - input box clear
            - 맞을 경우 인자로 받은 다음 문제로 넘어가는 메서드 호출

5. 완료화면
    - history객체의 state로 상태를 받아 화면에 출력
    - 상태가 undefined 라면 0을 기본 값으로 한다.
