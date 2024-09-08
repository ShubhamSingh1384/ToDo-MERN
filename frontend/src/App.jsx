import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TodoList from './components/TodoList'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/todo/login" element={<Login/>} />
        <Route path="/todo/signup" element={<Signup/>} />
        
      </Routes>
    </>
  )
}

export default App