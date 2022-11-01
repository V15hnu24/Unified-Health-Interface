import React, { useEffect,useState ,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
const Logout =() =>{
  //promises
 
  const {state,dispatch} = useContext(userContext);
  const navigate =useNavigate();
  useEffect(()=>{
    fetch('/auth/logout',{
        method :"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
    }).then((res)=>{
        window.localStorage.clear();
        dispatch({type:"USER", payload:false});
        navigate('/login',{replace:true});
        if(res.status!=200)
        {
            const error =new Error(res.error);
            throw error;
        }
    }).catch((err)=>{
            console.log(err);
    })
  })
  return(
    <>
        <h1>Logout</h1>
    </>

)
}

export default Logout