import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { MdAddTask } from "react-icons/md";
import { RiAddLargeFill } from "react-icons/ri";
import TodoCard from './TodoCard';


const TodoList = () => {
    const [data , setData] = useState();

    useEffect(() => {
        const fetchData = () =>{
            fetch('http://127.0.0.1:3005/')
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((error) => console.log("error in fetching " , error))
        }

        fetchData();
    }, [])
  return (
    <>
        <Navbar/>
        <div>
            <div className='flex justify-center'>
                <div className='bg-blue-500 px-[91px] py-2 relative'>
                    {/* <MdAddTask className='text-[30px] absolute mt-3'/> */}
                    <input
                    className='px-8 py-3 rounded-xl border border-red-800'
                    type="text" placeholder='Add Task...'/>
                    <MdAddTask 
                    className='text-[33px] absolute mt-[-37px] ml-[270px] text-black-500 cursor-pointer bg-white rounded-xl' />
                </div>
            </div>

            <div className='flex justify-center'>
                <div className='bg-blue-500 w-[calc(75vh-10px)] py-2 h-[64vh] overflow-hidden overflow-y-scroll'>
                    {
                        (data != undefined) && 
                        <TodoCard data={data[0]} setData={setData}/>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default TodoList