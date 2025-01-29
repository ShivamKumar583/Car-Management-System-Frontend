import React, { useState } from 'react'
import { FaRegEye , FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Login } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const UserLoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const disptach = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        try{
            e.preventDefault();
            console.log("Form submitted: ", formData);

            const response = disptach(Login(formData));
            navigate('/')
        }
        catch(err){
            console.log(err);
        }
        
        
      };

  return (
    <div className="flex bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 text-sm font-mono items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-8 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl text-blue-600 font-bold text-center mb-4">Login</h1>
        <p className="w-[100px] h-2 -mt-2 mx-auto rounded-full bg-gradient-to-r from-gray-100 to-blue-600"></p>


        <div className="mb-4">
          <label className="block text-blue-800 font-medium mb-1">Email<sup className=' text-red-600'>*</sup></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 text-black border-slate-500 rounded-lg p-2"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-blue-800 font-medium mb-1">Password<sup className=' text-red-600'>*</sup></label>
          <div className=' relative'>
          <input
            type={showPassword ? 'text' : 'password' }
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-2 text-black border-slate-500 rounded-lg p-2"
            placeholder="Enter your password"
            required
          />
          <div className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>{
            showPassword ? <FaRegEyeSlash /> : <FaRegEye/>
          }
          </div>
          </div>

        </div>

        <p className=' w-full text-blue-600'>New User? <a href='/register' className=' hover:underline hover:cursor-pointer'>Signup here</a></p>
        <button
          type="submit" className=' bg-blue-500 w-fit p-2 rounded-md mx-auto flex hover:bg-blue-800 mt-5'
        >
            Login
        </button>

      </form>

    </div>
  )
}

export default UserLoginPage