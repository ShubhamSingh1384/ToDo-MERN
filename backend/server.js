const express = require('express');
const mongoose = require('mongoose');
const userTodo = require('./model/Task.Model')
const cors = require('cors')

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/ToDoApp')
.then(() =>{
    console.log("connected to database")
})
.catch((error) =>{
    console.log("failed to connected ", error)
})

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    userTodo.find({})
    .then((todos) => {
        // console.log("todo ka id ", todos);
        res.json(todos);
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});


app.get('/todo/edit', (req, res) =>{
    const {userId , index} = req.query;
    console.log(userId, index);

    userTodo.findOne({userId})
    .then((todo) => {
        console.log(todo)
        // todo.todo[index] = 
        return todo.save()
    })
    .catch((error) => console.log("error in edit ", error));

})


app.delete('/todo/delete', (req, res)=>{
    const { userId , index } = req.query;
    console.log(userId , " => ", index);


    userTodo.findOne({userId})
    .then((todo) => {
        // console.log(todo);
        // console.log(todo._id);
        // console.log(todo.todo);
        todo.todo.splice(index,1);
        res.status(200).send({ message: 'Task deleted successfully' , success: true});

        return todo.save();
    })
    .catch((error) =>{
        console.log(error);
        res.status(500).send({ message: 'Failed to delete task' , success: false})
    })

})


app.listen(3005, () => {
    console.log("Server is running on port 3005");
});