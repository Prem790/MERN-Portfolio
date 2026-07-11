import { message } from 'antd';
import axios, { API_URL } from '../../api';
import React from 'react'
import { HideLoading, ShowLoading } from '../../redux/rootSlice';
import { useDispatch } from 'react-redux';

function Login() {

    const [user , setUser] = React.useState({
        username:"",
        password:"",

    });

    const dispatch=useDispatch();

    const login = async ()=>{
        try {
            dispatch(ShowLoading());
            const response=await axios.post(`${API_URL}/admin-login`, user);
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                // Store only the signed JWT and send it on every future request
                localStorage.setItem("token", response.data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                window.location.href="/admin";
            } else{
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(
                error?.response?.data?.message || error.message || "Login failed"
            );
        }
    }

  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
        <div className='w-96 flex gap-5 p-5 shadow border-gray-500 flex-col bg-white'>
            <h1 className='text-2xl'>Prem - Admin Login</h1>
            <hr/>
            <input type='text'
            value={user.username}
            onChange={(e)=> setUser({...user,username:e.target.value})} 
                placeholder='Username'
            />
            <input type='password'
            value={user.password}
            onChange={(e)=> setUser({...user,password:e.target.value})} 
                placeholder='Password'
            />
            <button className='bg-primary text-white p-2' onClick={login}>Login</button>
        </div>
    </div>
  )
}

export default Login
