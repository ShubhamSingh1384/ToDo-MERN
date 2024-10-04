const express = require("express");
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser')
const cors = require("cors");
const authRoute = require('./routes/authRoute');
const todoRoute = require('./routes/todoRoute')


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/ToDoApp")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("failed to connected ", error);
  });



app.use('/', authRoute);
app.use('/', todoRoute);




app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
