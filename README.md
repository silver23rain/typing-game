# 타자 게임

주어진 단어가 표시되면 input에 단어를 정해진 시간 내에 입력하여 점수를 획득하는 어플리케이션 개발

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

수정하면 페이지가 다시로드됩니다.

### `npm run build`

배포용 파일을 public 폴더에 빌드합니다.

### `npm run test`

단위 테스트를 실행합니다.

### `npm run serve`

테스트 & 빌드 동작 및 배포된 파일을
http://localhost:8080 을 통해 확인할 수 있습니다.

## 문제 해결 전략

1. webpack 구성

    - 목적에 따라 webpack.dev.js / webpack.prod.js 분리
    - hot reload 적용

2. 라우팅

    - 초기에 hash를 사용해 구현
        - 완료 화면으로 상태 넘기기에 대한 고민 -> localStorage or url query
        - url query로 처리할 경우 hashChange 이벤트 발생 및 파싱의 번거로움
    - History API로 라우팅 방식 변경
        - history 객체로 상태 관리
        - html 렌더 이후 route속성을 가진 a태그 이벤트 리스너로 라우팅 동작 추가

3. 남은 시간 및 점수 표시

    - 호출 스케줄링 (setInterval, setTimeout)을 사용
    - 시간이 만료 되면 해당 호출 스케줄링을 clear하고 재귀 호출

4. 완료화면
    - 남은 문제가 없으면 popstate이벤트를 강제로 발생시켜 리다이렉트 함
        - pushState로 상태 전달
