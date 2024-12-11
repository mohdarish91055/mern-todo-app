import React from 'react'
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
   
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await api.post('/auth/login',{email,password});
            const {user} = response.data;
            localStorage.setItem('user',JSON.stringify(user));

            toast.success(response.data.message,{
              position: "top-center",
              autoClose: 1000,
            });
            navigate('/');
        }catch(err){
            console.log(err)
            if (err.response.status === 404 || err.response.status === 401) {
              toast.error('Invalid Email or Password',{
              position: "top-center",
              autoClose: 1000,
            });
          }
          else {
            toast.error(err.response.message,{
              position: "top-center",
              autoClose: 1000,
            });
          }
        }
    }

    //handleSignUp
    const handleSignUp = ()=>{
      navigate('/register');
    }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignUp}>Sign Up</button>
      <br/>
      <br/>
      <form onSubmit={handleSubmit}>
      <input 
            type='text'
            placeholder='Enter your email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
      />
    <br/>
    <br/>
      <input 
            type='text'
            placeholder='Enter your password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
      />
      <br/>
      <br/>
      <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
