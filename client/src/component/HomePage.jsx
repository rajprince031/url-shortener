
import '../style/homeStyle.css';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
const HomePage=()=>{
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const navigate = useNavigate();
    const [isLogin, updateIsLogin] = useState(null)
    useEffect(()=>{
        fetch(`${LOCALHOST_API}/auth/user`,{
            method:"GET",
            headers : {
                authorization : localStorage.getItem('authToken')
            }
        }).then(res=>{
            const {status} = res;
            if(status==200){
               return updateIsLogin(true)
            }
            return updateIsLogin(false)

        }).catch(err =>{
            return updateIsLogin(false) 
        })

    },[])
    const action = ()=>{
        if(isLogin) navigate('./dashboard');
        else navigate('./login');
    }
    
    return(
        <div className="main_home_container">
            <h1>Welcome to URL - Shortener</h1>
            <h3 onClick={action} className='click_to_jump'>{ isLogin ? ('jump to the Dashboard Page') : ('jump to Login Page')}</h3>
        </div>
    )
}

export default HomePage;