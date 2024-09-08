import React from 'react';
import { Link } from 'react-router-dom';
import todoImg from '../../public/todoImg.jpg'

const Home = () => {
  return (
    <div className='bg-gray-700 h-[100vh] flex items-center justify-center'>
      <div className='fixed top-10 left-0 right-0 mx-10 bg-white grid grid-cols-2 gap-10 shadow-lg rounded-lg p-10'>
        <span
        className='font-bold text-[40px]'
        >WelCome To <span className='text-pink-600'>ToDo</span> !</span>
        <div className='flex flex-col justify-center items-center'>
          <div className='space-y-4'>
            <Link
              to="/todo/login"
              className='px-6 py-3 mx-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
            >
              Login
            </Link>
            <Link
              to="/todo/signup"
              className='px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'
            >
              Signup
            </Link>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <img
            src={todoImg}
            alt="Placeholder"
            className='w-3/4 h-[80vh] rounded-md shadow-md'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
