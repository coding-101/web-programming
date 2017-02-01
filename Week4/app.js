var express = require('express'); // NPM Express 패키지를 로드합니다.
// Express는 HTTP 요청을 받아 응답해주는 HTTP 서버를 쉽게 생성해주는 Framework 입니다.

var bodyParser = require('body-parser'); // POST 요청을 처리하기 위한 패키지입니다.
// body-parser를 이용하여 POST /create 요청을 처리할 때, req.body 를 이용할 수 있습니다.

var app = express(); // Express (Web) App을 생성합니다.
// 웹 앱은 웹 서버를 포함하는 개념입니다.
// 단순한 응답 서버를 생성하는 것이 아니랃 다양한 기능을 제공한다는 의미입니다.


app.use(bodyParser.urlencoded({ extended: false })); // req.body에 배열, 객체가 들어올 대, extended 옵션을 true로 지정합니다.
// 이번 예제에서는 간단한 문자열만 body로 들어올 것이기에, false로 지정합니다.

// app.set('속성', '값')을 통해 app 셋팅을 설정할 수 있습니다.
app.set('views', './views'); // 'views' 속성의 값을 './views'로 설정합니다.
// 'views' 속성은 HTML 랜더링에 관련된 폴더를 지칭하겠다는 의미입니다.
// './views'는 view 파일이 있는 디렉토리를 의미합니다..

app.set('view engine', 'ejs');  // 'view engine' 속성의 값을 'ejs'로 설정합니다.
// view engine은 './view' 디렉토리에 있는 파일들을 'ejs'라는 템플릿 엔진을 이용하여 처리하겠다는 것을 의미합니다.
// ejs를 view engine으로 사용하기 위하여 npm을 이용하여 설치해야 합니다.

// 앞으로 POST / GET 요청을 처리할 때 사용할 데이터입니다.
// GET을 이용하여 contents 의 내용얼 보여주거나
// POST를 이용하여 contents 에 내용을 추가합니다.
var contents = [
  {
    title:'Main',
    description: 'First time programming'
  }
];

// app.get(URL, callback)을 통해 해당 URL로 들어오는 GET 요청을 callback을 이용하여 응답할 수 잇습니다.

// '/' 는 URL이 'http://localhost:3000/'인 HTTP 요청을 처리할 것을 의미합니다.
app.get('/', function(req, res){
  var id = 0;

  // 앞에 셋팅한 'views' 설정 값인 './views' 폴더에 있는 index.ejs 파일을 이용하여 HTML을 렌더링 합니다.
  // render()의 첫 번째 인자로, './views' 디렉토리에 있는 'index.ejs' 를 사용할 것을 명시합니다.
  // render()의 두 번째 인자로, EJS 템플릿 내부에서 사용할 변수를 전달합니다.
  res.render('index', {
    id: id, // id를 0으로 지정하였기에, 가장 먼저 들어 있던 {title:'Main', description: 'First time programming'} 를 보여줍니다.
    contents: contents,
  });
});


// '/create' 로 들어온 GET 요청을 처리합니다.
// 해당 URL에 대응되는 HTML페이지는 새로운 content를 생성할 수 있는 페이지입니다.
// 따라서 이에 해당하는 './views/create.ejs' 를 불러옵니다.
app.get('/create', function(req, res){
    res.render('create', {contents:contents});
});

// '/create'로 들어온 POST 요청을 처리합니다.
// '/create' 페이지에서 제출 버튼을 누르면, POST 요청을 보냅니다.
// 'create.ejs'에서 [name='title'] 인 input 요소의 값이 req.body.title로 들어오게 됩니다.
// 마찬가지로 [name='description'] 인 textarea 요소의 값이 req.body.description 들어오게 됩니다.
app.post('/create', function(req, res){
  var title = req.body.title;
  var description = req.body.description;

  var content = {
    title: title,
    description: description
  }
  contents.push(content) // contents 전역 변수에 새로운 content를 추가합니다.

  var id = contents.length - 1
  res.redirect('/' + id); // /:id 페이지로 리다이렉트 합니다.
  // POST 요청에 대한 응답이 '/id' 페이지로 리다이렉트 한다는 것입니다.
});


// '/' 요청과 유사합니다. id 값을 0이 아니라, 실제 파라미터에서 가져옵니다.
app.get('/:id', function(req, res){
  var id = req.params.id;
  res.render('index', {
    id: id,
    contents: contents,
  });
});

// 서버가 3000번 포트를 통해 HTTP요청을 받아들입니다.
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
