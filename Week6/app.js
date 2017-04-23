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

// 첫 페이지
// Todo list 가 있을 때, 첫번째 todo list를 보여준다.
// Todo list 가 없을 때, default_todo_lists를 보여준다.
app.get('/todo', function (req, res) {
  TodoList.find({}, function (err, todo_lists) {
    if (err) {
      console.error(err);
      throw err;
    }

    if (todo_lists.length === 0) {
      todo_lists = default_todo_lists;
    }

    var current_todo_list = todo_lists[0];

    res.render('index', {
      todo_lists: todo_lists,
      current_todo_list: current_todo_list
    });
  })
})

// 특정 id를 가지는 Todo list 조회
app.get('/todo/:_id', function (req, res) {
  var _id = req.params._id


  TodoList.findById(_id, function (err, current_todo_list) { // 변수 todo의 _id는 req.params.id 와 동일!
    if (err || !current_todo_list) {
      return res.redirect('/todo')
    }

    TodoList.find({}, function (err, todo_lists) {
      if (err) {
        console.error(err);
        throw err;
      }

      res.render('index', {
        todo_lists: todo_lists,
        current_todo_list: current_todo_list
      })
    })

  })
})

// 새로운 Todo-list 생성
app.post('/todo', function (req, res) {
  var title = req.body.title;
  var new_todo_list = new TodoList({
    title: title,
    current_todos: [],
    completed_todos: []
  });

  new_todo_list.save(function (err, todo_list) {
    if (err) {
      console.error(err);
      return res.send(err.message)
    }

    res.json({ todo_list: todo_list })
  })
})


// Todo list에 새로운 Todo 추가
app.post('/todo/:_id', function (req, res) {
  var _id = req.params._id;
  var title = req.body.title;
  var description = req.body.description;
  var new_todo = {
    title: title,
    description: description
  }

  TodoList.findById(_id, function (err, todo_list) {
    if (err || !todo_list) {
      console.error(err);
      return res.status(500).send(`No such todo list`)
    }

    todo_list.current_todos.push(new_todo);
    todo_list.save(function (err, todo_list) {
      if (err) {
        console.error(err);
        return res.send(err.message)
      }

      res.json({ todo_list: todo_list })
    })
  })
})

// Todo 완료시키기
app.post('/todo/:_id/complete_todo', function (req, res) {
  var _id = req.params._id;
  var current_todo_index = req.body.current_todo_index;

  TodoList.findById(_id, function (err, todo_list) {
    if (err || !todo_list) {
      console.error(err);
      return res.status(500).send(`No such todo list`)
    }

    var todo = todo_list.current_todos[current_todo_index]
    todo_list.current_todos.splice(current_todo_index, 1)
    todo_list.completed_todos.push(todo)

    todo_list.save(function (err, todo_list) {
      if (err) {
        console.error(err);
        return res.send(err.message)
      }

      res.json({ todo_list: todo_list })
    })
  })
})

// Todo 삭제하기
app.post('/todo/:_id/delete_todo', function (req, res) {
  var _id = req.params._id;
  var current_todo_index = req.body.current_todo_index;

  TodoList.findById(_id, function (err, todo_list) {
    if (err || !todo_list) {
      console.error(err);
      return res.status(500).send(`No such todo list`)
    }

    todo_list.current_todos.splice(current_todo_index, 1)

    todo_list.save(function (err, todo_list) {
      if (err) {
        console.error(err);
        return res.send(err.message)
      }

      res.json({ todo_list: todo_list })
    })
  })
})


////

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
