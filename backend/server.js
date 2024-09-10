const express = require("express");
const mongoose = require("mongoose");
const userTodo = require("./model/Task.Model");
const userModel = require("./model/User.Model");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/ToDoApp")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("failed to connected ", error);
  });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  userTodo
    .find({})
    .then((todos) => {
      // console.log("todo ka id ", todos);
      res.json(todos);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/todo/add", (req, res) => {
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
});

app.get("/todo/iscompleted", (req, res) => {
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
});

app.get("/todo/edit", (req, res) => {
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
});

app.delete("/todo/delete", (req, res) => {
  const { userId, index } = req.query;
  // console.log(userId , " => ", index);

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
});

app.post("/todo/signup", (req, res) => {
  const { userName, password, email } = req.body;
//   console.log(req.body);
//   console.log(userName, password, email);

  if (!userName || !password || !email) {
    return res.status(400).send({ message: "Please fill all details" });
  }
  userModel
    .findOne({ email })
    .then((data) => {
      // console.log(data);
      if (data === null) {
        const newUser = new userModel({
          userName,
          password,
          email,
        });

        const newTodo = new userTodo({
          userId: email,
          todo: [],
          status: [],
        });

        Promise.all([newTodo.save(), newUser.save()])
          .then(() => {
            // Both operations were successful
            res.status(200).send({
              message: "User and Todo registered successfully",
              success: true,
            });
          })
          .catch((error) => {
            // If either of the saves fails
            res.status(400).send({
              message: "Failed to register user or todo",
              success: false,
              error: error.message, // Optional: include error details for debugging
            });
          });
      } else {
        res.status(400).send({ message: "user already exist" });
      }
    })
    .catch((error) =>
      res.status(500).send({ message: "error in signUp ", error })
    );
});

app.post("/todo/login", (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  // console.log("password : ", password)

  userModel
    .findOne({ email })
    .then((data) => {
        // console.log(data.userName);
      if (data != null && data.password == password) {
        res
          .status(200)
          .send({ message: "User successfully LogedIn", success: true, name:data.userName });
      } else if(data != null && data.password != password) {
        res
          .status(400)
          .send({ message: "incorrect credential", success: false });
      }
    })
    .catch((error) =>
      res.status(500).send({ message: "error in login", error })
    );
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
