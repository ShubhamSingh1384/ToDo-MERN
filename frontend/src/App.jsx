import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import TodoList from './components/TodoList'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthProvider'

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  console.log("authUser :", authUser);
  return (
    <>
      {/* Toaster for global toast messages */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* <Route path={["/", "/todo"]} element={<Home />} /> */}
        <Route path="/" element={<Home/>} />
        <Route path="/todo" element={<Home/>} />
        <Route path="/todo/login" element={<Login/>} />
        <Route path="/todo/signup" element={<Signup/>} />
        <Route path="/todo/todolist" element={authUser?<TodoList/>: <Navigate to="/todo"/>} />
        
 
      </Routes>
    </>
  )
}

export default App