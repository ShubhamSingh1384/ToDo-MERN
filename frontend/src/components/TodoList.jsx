import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { MdAddTask } from "react-icons/md";
import { RiAddLargeFill } from "react-icons/ri";
import TodoCard from "./TodoCard";

const TodoList = () => {
  const [data, setData] = useState("");
  const [newTask, setNewTask] = useState(null);
//   console.log(data);

  const handleKeyPress = (event) =>{
    if(event.key === 'Enter')
    addTask();
  }

  const addTask = () =>{
    if(newTask === null || newTask.trim() === '')
    return;

    fetch(`http://localhost:3005/todo/add?userId=${data.userId}&task=${newTask}`,{
        method:'GET'
    })
    .then((res) => res.json())
    .then((res) => {
        // console.log(res)
        if(res.success){
            const updatedTodo = [newTask, ...data.todo]
            data.todo = updatedTodo;
            console.log("task added successfully ", updatedTodo);
            setNewTask('');
        }
        else{
            throw new Error("Failed to add new Task")
        }
    })
    .catch((error) => console.log("error in addTask ", error))
  }

  useEffect(() => {
    const fetchData = () => {
      fetch("http://127.0.0.1:3005/")
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          var email = localStorage.getItem('email');
          // console.log(email);
          res.forEach(user => {
            // console.log(user);
            if(user.userId == email){
              // console.log("user is : " , user);
              setData(user);
              // console.log("data",data);
            }
          });
        })
        .catch((error) => console.log("error in fetching ", error));
    };

    fetchData();
  }, [data]);
  return (
    <>
      <Navbar />
      <div>
        <div className="flex justify-center">
          <div className="bg-blue-500 px-[91px] py-2 relative">
            <input
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(event) => handleKeyPress(event)}
              value={newTask}
              className="px-8 py-3 rounded-xl border border-red-800"
              type="text"
              placeholder="Add Task..."
            />
            <MdAddTask 
            onClick={() => addTask(newTask)}
            className="text-[33px] absolute mt-[-37px] ml-[270px] text-black-500 cursor-pointer bg-white rounded-xl" />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-blue-500 w-[calc(75vh-10px)] py-2 h-[64vh] overflow-hidden overflow-y-scroll">
            {data != undefined && data != null && <TodoCard data={data} setData={setData} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
