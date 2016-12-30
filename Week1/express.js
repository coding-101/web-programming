// Express 모듈을 로드합니다.
// Node 의 기본 모듈에 포함되어있지 않기 때문에
// NPM을 통해서 설치해야 합니다.
// 터미널에서 npm install --save express 를 입력하여 설치하세요.
const express = require('express');

// Express를 통해 서버를 만듭니다.
// app(Application)이라고 변수 이름을 설정한 것은
// Express Framework 를 통해 만든 Express App 라는 의미입니다.
// Express 는 단순한 Library가 아니라 Framework로 분류됩니다. 두 용어의 차이는 http://stackoverflow.com/questions/148747/what-is-the-difference-between-a-framework-and-a-library 를 참조하세요.
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

