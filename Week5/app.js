var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose'); // mongodb 와 통신할 수 있는 패키지를 로드합니다.
// mongoose.connect() 를 이용하여,
mongoose.connect('mongodb://kim:kim@ds052819.mlab.com:52819/kim');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;

app.set('views', './views');
app.set('view engine', 'ejs');

// Content 모델을 불러옵니다.
// 1. Content.find(query, callback) : 조건 query에 해당하는 contents를 찾은 다음 callback을 실행합니다.
//  - callback은 function (err, contents) 를 인자로 받습니다.
//  - 두 번째 인자 contents는 조건을 만족한 검색 결과인 배열입니다.
var Content = require('./models/content');

// 서버가 실행되었을 때, Content가 비어잇을 경우, 새로운 Content를 생성합니다.
// 그렇지 않은 경우, 가장 첫 번째 content의 _id를 가져옵니다.
var mainid = 0; // 제일 먼저 보여줄 Contet의 _id를 저장할 변수입니다.
Content.find({}, function(err, contents) { // 우선 mongodb에 Content가 있는지 확인합니다.
  // contents의 길이를 통해서 Content가 비어있는지 아닌지 알 수 있습니다.

  var title = 'Main';
  var description = 'First time programming';
  if (contents.length === 0) { // Content가 비어있을 경우이빈다.
    // Content 모델을 이용하여 새로운 Content를 생성합니다.
    // save()를 호출하기 전 까지, mongodb에 저장되지 않습니다.
    var newContent = Content({
      title: title,
      description: description
    });

    // 생성한 Content를 저장합니다.
    // save()의 인자로 저장이 성공 / 실패하였을 경우 실행할 콜백 함수를 전달합니다.
    newContent.save(function(err, result) {
      if (err) throw err;
      mainid = result._id; // '/content' 에서 보여줄 Content의 id입니다. 이를 서버에서 변수로 저장합니다.
    });
  } else{ // 기존에 생성된 Content가 존재하는 경우입니다.
    mainid = contents[0]._id
  }
});

app.get('/create', function(req, res){
  // create_m.ejs에 전달할 contents 변수에 저장할 값을 mongodb에서 가져옵니다.

  Content.find({}, function(err, results){
    if(err){ // 에러가 발생할 경우 HTTP Status code 500과 함꼐, 에러 메시지를 전송합니다.
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('create_m', { contents: results }); // mongodb에서 가져온 결과를 contents변수에 저장합니다.
  });
});

// POST '/create' 요청을 처리합니다.
// 이전에 전역 변수 contents에 저장했던 것과 달리, 이번에는 mongodb에 저장합니다.
app.post('/create', function(req, res){
  var title = req.body.title;
  var description = req.body.description;

  // Content Model을 이용하여 새로운 Content를 만듭니다.
  var newContent = Content({
    title: title,
    description: description
  });

  newContent.save(function(err, result) {
    if (err) throw err;
    res.redirect('/content/' + result._id);
  });
});

// Content 리스트를 보여줍니다.
// 임의로 Content를 선택하여 보여줍니다. 이는 이전에 읽어온 mainid를 이용합니다.
app.get('/content', function(req, res){
  var id = mainid;
  Content.find({}, function(err, results){ // results는 모든 Content가 담긴 배열입니다.
    if (err) throw err;
    Content.findById(id, function(err, result) { // Content Model의 _id와 정확히 일치하는 content를 찾습니다.
      // findById()의 콜백 인자 result는 배열이 아니라 하나의

      if (err) throw err;
      res.render('index_m', {result:result, contents:results});
    });
  });
});

// 파라미터로 id를 가져오는 것을 제외하고 위 코드와 동일합니다.
app.get('/content/:id', function(req, res){
  var id = req.params.id; // url의 파라미터에서 값을 가져옵니다.
  Content.find({}, function(err, results){
    if (err) throw err;
    Content.findById(id, function(err, result) {
      if (err) throw err;
      res.render('index_m', {result:result, contents:results});
    });
  });
});

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
