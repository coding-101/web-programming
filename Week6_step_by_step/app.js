var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://pjh:pjh@ds137110.mlab.com:37110/coding101');

var app = express();

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine', 'ejs');

var TodoList = require('./models/todolist');

var default_todo_lists = [
  {
    title: 'Hello Todo List!',
    current_todos: [
      {
        title: '새로운 Todo List 생성하기',
        description: '오른쪽 하단의 버튼 위에 마우스를 올려 빨간색 작은 아이콘을 클릭하여 새로운 Todo List를 생성 해보세요!'
      }
    ],
    completed_todos: []
  }
]

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
