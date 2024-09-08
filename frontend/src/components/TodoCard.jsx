import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { TfiCheckBox } from "react-icons/tfi";



const TodoCard = ({ data }) => {
  const [todos, setTodos] = useState(data?.todo || []);
  const [isEditable, setIsEditable] = useState(null);
  const [editValue, setEditValue] = useState(null);

  const handleKeyPress = (event, index)=>{
    if(event.key === 'Enter')
    saveTask(index)
  }


useEffect(() => {
    // console.log(data);
    setTodos(data?.todo || []);
  }, [data]);

  const handleComplete = (index)=>{
    fetch(`http://localhost:3005/todo/iscompleted?userId=${data.userId}&index=${index}`, {
      method: "GET"
    })
    .then((res) => res.json())
    .then((res) =>{
      // console.log(res.)
      if(res.success){
        console.log("Task completed ", data.status)
      }
      else{
        throw new Error('Failed to complete task');
      }
    })
    .catch((error) => console.log("error in handle complete ",error))
  }

  const handleEdit = (index) =>{
    setIsEditable(index);
    setEditValue(todos[index]);
  }

  const saveTask = (index)=>{
    if(editValue === null || editValue.trim() === ""){
      alert("Please enter task");
      return;
    }

    fetch(`http://localhost:3005/todo/edit?userId=${data.userId}&index=${index}&newTask=${editValue}`, {
      method: "GET"
    })
    .then((res) => res.json())
    .then((res) =>{
      if(res.success){
        const updatedTodos = [...todos];
        updatedTodos[index] = editValue;
        setTodos(updatedTodos);
        setIsEditable(null);
        console.log("Task update successfully ", updatedTodos)
      }
      else{
        throw new Error('Failed to update task');
      }
    })
    .catch((error) => (console.log("error in saveTask ", error)))
  }

  const handleDelete = (index) => {
    console.log(data.userId, " -> ", index);
    fetch(`http://localhost:3005/todo/delete?userId=${data.userId}&index=${index}`, {
      method: "DELETE"
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      console.log(res.success);
      if (res.success) {
        // If the response is OK, update the local state
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos); // Update state to reflect changes
        console.log("Task deleted successfully:", updatedTodos);
      } else {
        throw new Error('Failed to delete task');
      }
    })
    .catch((error) => console.log("Error in deleting:", error));
  }

  return (
    !data || Object.keys(data).length === 0 || !todos
      ? <div className='text-3xl ml-40 mt-32 text-green-500'>Add Task</div>
      : <div className='ml-5'>
          {todos.map((item, index) => (
            <div 
              className='flex justify-around border border-black m-5 rounded-xl'
              key={index}>
                
                <input 
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(event => handleKeyPress(event, index))}
                className={`px-3 py-2 text-[20px] bg-transparent border ${(isEditable !== index)? 'border-none':'bg-slate-400'} rounded-xl`}
                disabled={isEditable !== index}
                value={(isEditable === index)? editValue : todos[index]} />
                
                <div className='flex justify-between items-center gap-5 ml-[-50px]'>
                  {
                    (data.status[index] === 0)?
                    <MdCheckBoxOutlineBlank 
                    onClick={() => handleComplete(index)}
                    className='text-[30px] cursor-pointer '
                    />
                    :
                    <TfiCheckBox 
                    onClick={() => handleComplete(index)}
                    className='text-[30px] cursor-pointer '
                    />
                  }
                  {
                    (isEditable !== index) ?
                    <MdEditSquare 
                    onClick={(e) => handleEdit(index)}
                    className='text-[30px] text-green-400 cursor-pointer' />
                    :
                    <SiTicktick 
                    onClick={(e) => saveTask(index)}
                    className='text-[30px] text-green-400 cursor-pointer' />
                  }

                  <MdDeleteForever 
                    onClick={() => handleDelete(index)}
                    className='text-[30px] text-red-400 cursor-pointer' />
                </div>
            </div>
          ))}
        </div>
  );
}

export default TodoCard;
