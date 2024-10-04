const express = require('express');
const { deleteTodo, addTodo, editTodo, iscompleted, getTodo } = require('../controllers/todoController');

const route = express.Router();

route.get('/', getTodo)
route.delete('/todo/delete', deleteTodo);
route.get('/todo/add', addTodo);
route.get('/todo/edit', editTodo)
route.get('/todo/iscompleted', iscompleted)


module.exports = route