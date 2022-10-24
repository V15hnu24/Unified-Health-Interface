// import React from 'react'
// import "../App.css"
import React, { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
const Home =() =>{

    const {state,dispatch} = useContext(userContext);
    const [show,setShow]  =useState(false);
    let navigate = useNavigate();
    const[userName, setUserName] = useState('');
    const userHomePage = async (req,res)=>{
  
      console.log("Hello");
      try{
        const res = await fetch('/patient_home',{
          method: "GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
        });
  
        const data  =await res.json();
        console.log(data);
      //   setUserData(data);
      setUserName(data.name);
      setShow(true);
        if(!res.status ==200)
        {
            const error = new Error(res.error);
            throw error;
        }
        else{
          dispatch({type:"USER", payload:true});
        }
      }catch(err)
      {
          console.log(err);
          navigate('/login');
      }
    }
      
      // navigate("/Editdetails");
    
    useEffect(()=>{
      userHomePage();
    },[]);  
  return(
    <div>
      <div className="home-div">
    {/* <p className="pt-5">Welcome</p> */}
    <h1 align="center">Welcome to<span> Patient</span>  HealthCare System</h1>
    <h2 align="center">Welcome {userName}</h2>
    <h7 align="center">{show  ? 'Welcome you are logged in' : 'Mern'}</h7>
    </div>
    </div>
  )
}

export default Home