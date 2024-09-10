import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



const Navbar = () => {
  const navigate = useNavigate();
  // const [isLogedin , setIsLogedin] = useState(null);
  const handleClick = () => {
    // let user = localStorage.getItem('email');
    toast.success("Logout successfull")
    localStorage.removeItem('email');
    navigate('/')
  }
  return (
    <>
        <div className='flex w-[100%] justify-center pt-10'>
          <div className='text-[54px] bg-blue-400 font-bold px-[90px]  tracking-wide text-white'>
              ToDo List
          </div>
          <button
          onClick={handleClick}
          className='absolute mt-[30px] ml-[350px] bg-red-400 rounded-lg p-2'
          >Logout</button>
        
        </div>
    </>
  )
}

export default Navbar