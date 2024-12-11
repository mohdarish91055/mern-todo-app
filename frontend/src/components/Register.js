import React from 'react'
import { useState } from 'react'
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async(e)=>{
        e.preventDefault();
        try{
        const response = await api.post('/auth/register',{name,email,password});

        toast.success(response.data.message,{
          position: "top-center",
          autoClose: 1000,
        });
        navigate('/login');
        }
        catch(error){
            toast.error(error.response.message,{
              position: "top-center",
              autoClose: 1000,
            });
        }

    }

    const backLogin = ()=>{
      navigate('/login');
    }

  return (
    <div>
      <h1>Register</h1>
      <button onClick={backLogin}>back</button>
      <br/>
      <br/>
      <form onSubmit={handleRegister}>
        <input 
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
        />
        <br/>
        <br/>
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
        <button type='submit'>Register</button>

      </form>
    </div>
  )
}

export default Login
