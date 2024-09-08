import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {
    const [formData , setFormData] = useState({
        userName:"",
        password:""
    })
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("https://localhost:3005/todo/login", formData);
            if(response.status === 200){
                console.log("User Successfully LoggedIn");
            }
        } catch (error) {
            console.log("error : " ,error);
        }

    }

  return (
    <div>
        <div>
            <form>
                <label htmlFor="userName">UserName</label>
                <input
                onChange={handleChange}
                value={formData.userName}
                 type="text" id="userName"/>
                <label
                onChange={handleChange}
                value={formData.password}
                 htmlFor="password">Password</label>
                <input type="text" id="password"/>
                <button
                >LogIn</button>
            </form>
        </div>
    </div>
  )
}

export default Login