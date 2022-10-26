import React, { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
const HealthCareProfessionalHome=() =>{

    const {state,dispatch} = useContext(userContext);
    const [show,setShow]  =useState(false);
    let navigate = useNavigate();
    const[userData, setUserData] = useState([]);
    const userHomePage = async (req,res)=>{
  
      console.log("Hello");
      try{
        const res = await fetch('/getHealthCareProfessional',{
          method: "GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
        });
  
        const data  =await res.json();
        console.log(data);
      //   setUserData(data);
      setUserData({...userData, name: data.name, email:data.email, phone:data.phone, gender:data.gender, dob:data.dob, pincode:data.pincode,location:data.location, work:data.work});
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
    <h1 align="center">Welcome to<span> Health Care</span> Professional Page</h1>
    <h2 align="center">Welcome Dr. {userData.name}</h2>
    <h7 align="center">{show  ? 'Welcome you are logged in' : 'Mern'}</h7>
    </div>
    </div>
  )
}

export default HealthCareProfessionalHome