import React from 'react';
import { useState } from "react"
import './Login.css';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../auth/Autentication';

function Login(){
    const [username , setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const { login } = useAuth();


    async function onSubmitForm(e){
        e.preventDefault();

        try {
            const response = await axios.post('https://dummyjson.com/user/login', { username, password });
            toast.success('Login Successfully', { position : 'top-center'
            })
            console.log(response.data);
            login(response.data)
            navigate('/products')
          } catch (error) {
              toast.error('Login Failed',{ position : 'top-center'})
            console.error('Login failed:', error.response.data.msg);
          }
       
    }

    function onUsernameChange(e){
        setUsername(e.target.value)
        console.log(username);
    }

    function onPasswordChange(e){
        setPassword(e.target.value);
        console.log(password)
    }

    return (
        <>
         <ToastContainer/>
         <div className="login-container">
          <h2>Login</h2>
        <form className="login-form" onSubmit={onSubmitForm}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onUsernameChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
        <button type="submit">Login</button>
      </form>
       <h6>Please use below details for login</h6>
       <p>username : sophiab</p>
       <p>password : sophiabpass</p>
    </div>
        </>
        
    )
}

export default Login