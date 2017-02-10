// Express 모듈을 로드합니다.
// Node 의 기본 모듈에 포함되어있지 않기 때문에
// NPM을 통해서 설치해야 합니다.
// 터미널에서 npm install --save express 를 입력하여 설치하세요.
const express = require('express');

// Express를 통해 서버를 만듭니다.
// app(Application)이라고 변수 이름을 설정한 것은
// 웹 서버는 웹 어플리캐이션이라고도 불리기 때문입니다.
const app = express();

// app.get 을 통해 HTTP 요청의 라우팅을 다룰 수 있습니다.
// '/'로 들어오는 HTTP 요청을 처리합니다.
// 웹 브라우저에 '/'를 입력하면 'Hello World'가 보여질 것입니다.
app.get('/', function(req, res){
    res.send("Hello World!");
});

// 3000번 포트를 통해 HTTP 요청을 받아들입니다.
app.listen(3000, function(){
    console.log('Connected 3000 port!!!');
});
