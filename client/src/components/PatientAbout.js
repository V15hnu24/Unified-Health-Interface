import React, { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";

const PatientAbout =() =>{

  const {state,dispatch} = useContext(userContext);
  let navigate = useNavigate();
  const[userData, setUserData] = useState({});
  const callAboutPage = async (req,res)=>{

    console.log("Hello");
    try{
      const res = await fetch('/about',{
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data  =await res.json();
      console.log(data);
      setUserData(data);
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
  useEffect(()=>{
    callAboutPage();
  },[]);
  navigate =useNavigate();
  const Edit=()=>{

    navigate("/PatientEditdetails");
  
  }
  
  return(
    <>
    <div>
    <h1>Hello Aditya Peer from About.js</h1>
    <br/>
    {/* <div class="container">
      <h2>Patient Details</h2>
  <div class="row">
    <div class="col">
      Name
    </div>
    <div class="col">
      2 of 3
    </div>
    <div class="col">
      3 of 3
    </div>
  </div>
</div>8/*/}
<form method="GET">
<table class="table">
<div align="center">
  <h2>Patient Details</h2>
  <tbody>
    <tr>
      <th scope="col">ID:</th>
      <td>1</td>
    </tr>  
    <tr>
      <th scope="col">NAME:</th>
      <td>{userData.name}</td>
    </tr>
    <tr>
      <th scope="col">Email ID::</th>
      <td>{userData.email}</td>
    </tr>
    <tr>
      <th scope="col">Gender:</th>
      <td>{userData.gender}</td>
    </tr>
    <tr>
      <th scope="col">Phone Number:</th>
      <td>{userData.mobile}</td>
    </tr>
    <tr>
      <th scope="col">DOB:</th>
      <td>{userData.dob}</td>
    </tr>
    <tr>
      <th scope="col">Pincode:</th>
      <td>{userData.pincode}</td>
    </tr>
    <tr>
      <th scope="col">Profession:</th>
      <td>{userData.work}</td>
    </tr>
    {/* <tr>
      <th scope="row">3</th>
    </tr> */}
  </tbody>
  </div>

</table>
<br/><br/>

</form>

    </div> 
    <div align="center">
    <input type="submit"  value="Edit Details" onClick={Edit} 
    />
    </div>


<br/><br/>
</>

)
}

export default PatientAbout