import React, { useState } from "react";
import axios from "axios"; // Import Axios

const Signup = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  // Function to update form data state when user types
  const handleChange = (e) => {
    // console.log(formData);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend using Axios
      console.log(formData);
      const response = await axios.post("http://localhost:3005/todo/signup", formData);

      // Handle success
      if (response.status === 200) {
        console.log("Signup successful:", response.data);
        // Optionally, redirect the user or show success message
      }
    } catch (error) {
      // Handle error
      console.error("Signup failed:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}  // Add onSubmit handler
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userName"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userName"
              type="text"
              placeholder="Full Name"
              value={formData.userName}  // Bind value to state
              onChange={handleChange}  // Call handleChange on input
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}  // Bind value to state
              onChange={handleChange}  // Call handleChange on input
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={formData.password}  // Bind value to state
              onChange={handleChange}  // Call handleChange on input
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"  // Change button type to submit
            >
              Sign Up
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/todo/login"
            >
              Already have an account? Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
