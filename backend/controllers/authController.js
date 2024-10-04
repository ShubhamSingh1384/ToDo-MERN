const  userModel =  require("../model/User.Model");
const userTodo  = require("../model/Task.Model");

 const login = (req, res) => {
  // console.log("loggin called")
  const { email, password } = req.body;
  // console.log(email);
  // console.log("password : ", password)

  userModel
    .findOne({ email })
    .then((data) => {
      // console.log(data.userName);
      if (data != null && data.password == password) {
        res.cookie("user", data);
        res
          .status(200)
          .send({
            message: "User successfully LogedIn",
            success: true,
            name: data.userName,
          });
      } else if (data != null && data.password != password) {
        res
          .status(400)
          .send({ message: "incorrect credential", success: false });
      }
      else{
        res.status(404).send({message: "user not found", success: false})
      }
      
    })
    .catch((error) =>
      res.status(500).send({ message: "error in login", error })
    );
};

 const signup = (req, res) => {
    // console.log("signUp called");
    const { userName, password, email } = req.body;
  //   console.log(req.body);
    // console.log(userName, password, email);
  
    if (!userName || !password || !email) {
      return res.status(400).send({ message: "Please fill all details" });
    }
    userModel
      .findOne({ email })
      .then((data) => {
        if (data === null) {
          // console.log(data);
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

          // try {
          //   newUser.save()
          //   .then((res) => console.log("user add "))
          //   .catch((er) => console.log("error in sighfjidfkj")) 
          //   newTodo.save()
          //   .then((res) => console.log("todo add "))
          //   .catch((er) => console.log("error in new todo problem")) 

          // } catch (error) {
          //   console.log(error);
          // }

        } else {
          res.status(400).send({ message: "user already exist" });
        }
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send({ message: "error in signUp ", error })
      }
      );
  };


module.exports = {login , signup}