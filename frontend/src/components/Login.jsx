import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider'

const Login = () => {
    const [authUser, setAuthUser] = useAuth();
    const [islogin , setIslogin] = useState(false);
    const [formData , setFormData] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        // console.log(formData.email, formData.password)
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3005/todo/login", formData);
            console.log(response.status);
            if(response.status == 200){
                toast.success(`${response.data.name} you have successfully logedIn`);
                console.log(response.data.message);
                localStorage.setItem('email', formData.email);
                setAuthUser(formData.email);
                // setIslogin(true);
                navigate('/todo/todolist');
                
            }
            else{
                toast.error("incorrect email or password",error)
                console.log("incorrect email or password");
            }
        } catch (error) {

            toast.error("error in login")
            console.log("error in login : " ,error);
        }

    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        onChange={handleChange}
                        value={formData.email}
                        type="text"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        onChange={handleChange}
                        value={formData.password}
                        type="password"
                        id="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                    Log In
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account? 
                <Link
                to="/todo/signup"
                className="text-indigo-600 hover:text-indigo-800 ml-1"
                >Signup</Link>
            </p>
        </div>
    </div>
  )
}

export default Login
