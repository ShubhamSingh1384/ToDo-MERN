const userTodo = require("../model/Task.Model");

const getTodo = (req, res) => {
  userTodo
    .find({})
    .then((todos) => {
      // console.log("todo ka id ", todos);
      res.json(todos);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const deleteTodo = (req, res) => {

  const { userId, index } = req.query;
  console.log(userId , " => ", index);

  userTodo
    .findOne({ userId })
    .then((todo) => {
      // console.log(todo);
      // console.log(todo._id);
      // console.log(todo.todo);
      todo.todo.splice(index, 1);
      todo.status.splice(index, 1);
      res
        .status(200)
        .send({ message: "Task deleted successfully", success: true });

      return todo.save();
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ message: "Failed to delete task", success: false });
    });
};

const addTodo = (req, res) => {
    const { userId, task } = req.query;
    // console.log(userId, task);
  
    userTodo
      .findOne({ userId })
      .then((todo) => {
        todo.todo.unshift(task);
        todo.status.unshift(0);
        // console.log(todo.todo);
        res
          .status(200)
          .send({ message: "New Task added successfully", success: true });
        return todo.save();
      })
      .catch((error) => res.status(400).send("error in add Task ", error));
  };

const editTodo =  (req, res) => {
  const { userId, index, newTask } = req.query;
  // console.log(userId, index, newTask);

  userTodo
    .findOne({ userId })
    .then((todo) => {
      // console.log(todo.todo[index])
      todo.todo[index] = newTask;
      todo.status[index] = 0;
      res
        .status(200)
        .send({ message: "Task updated successfully", success: true });
      return todo.save();
    })
    .catch((error) => res.status(400).send(("error in edit ", error)));
};

const iscompleted =  (req, res) => {
  const { userId, index } = req.query;

  userTodo
    .findOne({ userId })
    .then((todo) => {
      if (todo.status[index] === 0) todo.status[index] = 1;
      else todo.status[index] = 0;
      res.status(200).send({ message: "task completed", success: true });
      return todo.save();
    })
    .catch((error) => {
      res.status(400).send("error in complete taks ", error);
    });
};


module.exports = {deleteTodo , addTodo, editTodo, iscompleted, getTodo}