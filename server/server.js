var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// using body parser as middleware
app.use(bodyParser.json());

// post method to write a todo note
app.post('/todos', (req, res) => {
    var todo = new Todo({ 
        text: req.body.text 
    });

    todo.save().then((doc)=>{
      res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

// get method to list all the todo notes
app.get('/todos',(req,res)=>{
    Todo.find({}).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})

module.exports={app};