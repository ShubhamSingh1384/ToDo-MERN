import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

const TodoCard = ({ data }) => {
  const [todos, setTodos] = useState(data?.todo || []);
  const [isDisable, setIsDisable] = useState();
  

  useEffect(() => {
    setTodos(data?.todo || []);
  }, [data]);

  const handleEdit = (index, newTask) =>{
    fetch(`http://localhost:3005/todo/edit?userId=${data.userId}&index=${index}`, {
      method: "GET"
    })
    // .then((res) => res.json())
    .then((res) =>{
      console.log(res);
    })
    .catch((error) => console.log("error in handle edit" , error))
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
                className='px-3 py-2 text-[20px] bg-transparent border border-none'
                disabled={isDisable}
                value={item} />
                <div className='flex justify-between items-center gap-5'>
                  <MdEditSquare 
                  onClick={(e) => handleEdit(index)}
                  className='text-[30px] text-green-400 cursor-pointer' />

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
