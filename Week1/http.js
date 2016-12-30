// 앞으로 만들 서버는 http://localhost:1337 이라는 URL을 통해 브라우저에서 요청을 보낼 수 있습니다.
// http:// 는 http 프로토콜을 통해 보내는 요청이라는 의미입니다. http 프로토로을 처리하기 위해서 node 내장 모듈인 http 모듈을 사용할 것입니다.
// localhost 는 서버가 실행되는 컴퓨터의 IP를 가리킵니다.
// 1337은 서버가 Bind하고있는 포트를 가리킵니다. HTTP의 표준 포트는 80번 이지만 그 이외의 포트 또한 사용할 수 있습니다.

// http 모듈을 불러옵니다. 
// 해당 모듈은 node에 기본적으로 포합되어있기 때문에, require() 함수를 통해 불러올 수 있습니다.
// http 모듈로 HTTP 요청을 받아 HTTP 응답을 돌려주는 HTTP 서버를 생성할 수 있습니다.
const http = require('http');

// 외부로 노출시킬 포트입니다.
// server.listen()에서 포트를 지정할 수 있습니다.
const port = 1337;

// HTTP 서버를 생성합니다. 
// 인자로 콜백 함수를 지정합니다. 콜백 함수는 HTTP요청이 들어올 때 마다 실행되는 함수입니다.
// 해당 콜백 함수가 하는 역할은 
//  - HTTP 응답을 되돌려줍니다. 다음과 같은 특징을 HTTP 헤더, 바디에 포함합니다.
//      HTTP 상태 코드 200: OK. HTTP요청이 문제없이 수행되었음을 의미합니다. 상태 코드에대한 자세한 설명은 다음을 참조하세요. https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
//      HTTP 해더: 'Content-Type: text/plain'
//      HTML: 'Hello World'. 브라우저에서 Hello World라는 텍스트를 볼 수 잇습니다.
const server = http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

// 앞에 생성한 HTTP 서버를 1337번 포트를 통해 외부로 노출시킵니다.
// HTTP 서버를 1337포트에 Bind 시킨다고 표현하며, 한 포트당 하나의 프로세스가 Bind될 수 있습니다.
// 서버가 Bind한 포트를 통해 여러 클라이언트가 HTTP 요청을 보낼 수 있습니다.
// 클라이언트가 요청을 보내는 것은 웹 브라우저에서 담당합니다.
server.listen(port, function(){
  console.log(`Server running at http://localhost:${port}/`);
});

