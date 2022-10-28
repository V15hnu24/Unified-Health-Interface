import React from 'react'
import { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";

const PatientHome =() =>{

    const {state,dispatch} = useContext(userContext);
    const [show,setShow]  =useState(false);
    let navigate = useNavigate();
    const[userData, setUserData] = useState('');
    const userHomePage = async (req,res)=>{
  
      console.log("Hello");
      try{
        const res = await fetch('/getdata',{
          method: "GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
        });
  
        const data  =await res.json();
        console.log(data);
      //   setUserData(data);
      // setUserName(data.name);
      setUserData({...userData, name: data.name, email:data.email, phone:data.phone, gender:data.gender, dob:data.dob, pincode:data.pincode, work:data.work});
      setShow(true);
        if(res.status ==200)
        {
          dispatch({type:"USER", payload:true});
        }
        else{
          const error = new Error(res.error);
          throw error;
        }
      }catch(err)
      {
          console.log("Errorrrr");
          navigate('/PatientLogin');
      }
    }
    
      navigate =useNavigate();
      const SearchData =()=>{
    
        navigate("/PatientSearchOrganizations");
      
      }

    
    useEffect(()=>{
      userHomePage();
      //  SearchData();
    },[]);  

  return(
    <div>
      <div className="home-div">
    {/* <p className="pt-5">Welcome</p> */}
    <h1 align="center">Welcome to<span> Patient</span>  HealthCare System</h1>
    <h2 align="center">Welcome {userData.name}</h2>
    <br></br>
    
    <form  align="center"action="Search Health Organizations">
      <div>
        {/* <input type="text" placeholder="Search Health Organizations"/> */}
        <div align="center">
       <input type="submit"  value="Search Organizations" onClick={SearchData} />
        </div>
        {/* <div className="list"> */}
          {/* {userData.map((user)=>{
              <li className='listItem'>Apollo</li>
          })} */}
        {/* </div> */}
      </div>
    </form>

    <h7 align="center">{show  ? 'Welcome you are logged in' : 'Mern'}</h7>
    </div>
    </div>
  )
}

export default PatientHome