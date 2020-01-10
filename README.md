# waveform-dashboard
## 구성
 * [Architecture](http://i.imgur.com/VeOjYxx.png)
 * Batch: Python
 * Server: Node.js
 * Web: HTML + D3.js + Bootstrap


## 설치 및 구동
 - viewer처럼 nodejs 6.9.2 버전을 사용해야 합니다.
 - 프로젝트 루트 폴더에서 터미널을 열고 `npm install` 실행
 - 개발시에는 `node www` 운영 시에는 `forever start www` 혹은 `pm2 start www`를 하시면 됩니다.

## ICU가 늘어나거나 줄어들 경우
- 먼저 `public/index.html`에서 `<div class="clearfix"></div><div class="delimiter"></div><div class="row row-section row_3icub">...</div>` 같은 코드 부분을 복사한 후 붙여넣거나 지웁니다.
- `public/js` 에 `config.js` 와 `navControler.js` 두 파일이 존재합니다. 각 파일을 편집하셔서 새로운 ICU 설정을 추가하시면 됩니다.

## AWS에 배포하기 
- 코드를 수정하고 GitHub에 push 합니다.
- 52.78.14.28 에 ssh로 접속하고 `~/dev/waveform-dashboard` 디렉토리로 이동합니다.
- `git pull origin master` 실행합니다.
- `forever restart www` 실행합니다.