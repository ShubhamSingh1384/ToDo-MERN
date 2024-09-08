const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    userId : "String",
    todo:[],
    status:[],
})

const userTodo = mongoose.model('userTodos', TodoSchema)

module.exports = userTodo;