import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
const About =() =>{


  let navigate = useNavigate();
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

      if(!res.status ==200)
      {
          const error = new Error(res.error);
          throw error;
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
      <td>Larry</td>
    </tr>
    <tr>
      <th scope="col">AGE:</th>
      <td>40</td>
    </tr>
    <tr>
      <th scope="col">Phone Number:</th>
      <td>98XXXXXXX12</td>
    </tr>
    {/* <tr>
      <th scope="row">3</th>
    </tr> */}
  </tbody>
  </div>

</table>
</form>

    </div> 
    <div align="center">
    <button  type="button" class="btn btn-primary">Edit Profile</button>
    </div>
    </>
  )
}

export default About