import React, { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import { userContext } from "../App";

const PatientSearchOrganizations =() =>{

  const {state,dispatch} = useContext(userContext);
  let navigate = useNavigate();
  const[userData, setUserData] = useState({name:"", email:"",phone:"",pincode:"",work:""});
  const callAboutPage = async (req,res)=>{

    console.log("Hello");
    try{
      const res = await fetch('/getdataOrganization',{
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data  =await res.json();
      console.log(data);
    //   setUserData(data);
    setUserData({...userData, name: data.name, email:data.email, phone:data.phone, pincode:data.pincode, work:data.work});
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
//   const Edit2= async(e)=>{
 
//     e.preventDefault();
//     const {name, email, phone ,gender, dob, pincode, work} = userData;
//     console.log(name);
//     console.log(email);
//     const res = await fetch('/Editdetails',{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body:JSON.stringify({
//         name, email, phone ,gender, dob, pincode, work
//       })
//     });
//     console.log("Hello");
//     const data = await res.json();
//     console.log(data);
//     if(!data)
//     {
//         console.log("not Updated");
//         alert("Details Not Updated");
//     }
//     else{
//       alert("Details Updated");
//       setUserData({... userData, name:"",});
//       navigate("/about");
//     }
    
//     // navigate("/Editdetails");
  
//   }
  useEffect(()=>{
    callAboutPage();
  },[]);

  const handleInputs =(e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setUserData({... userData,[name]:value});
  }
  
  const handleInputs2 = async(e) =>{
    const name = e.target.name;
    const value = e.target.value;
  }

  // navigate =useNavigate();
  

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
      <input type="submit"  value="Edit Name" 
    />
     
      <input type="text" id="name"
       name ="name"
       value ={userData.name}
      onChange={handleInputs}>
      </input>
    </tr>
    <tr>
      <th scope="col">Email ID::</th>
      <td>{userData.email}</td>
      <input type="submit"  value="Edit Email" 
    />
      <input type="text" id="name"
      name="email"
      onChange={handleInputs}>

      </input>
    </tr>
    <tr>
      <th scope="col">Phone Number:</th>
      <td>{userData.phone}</td>
      <input type="submit"  value="Edit Phone Number" 
    />
      <input type="text"
      name ="phone"
      onChange={handleInputs}>
      </input>
    </tr>
    <tr>
      <th scope="col">Pincode:</th>
      <td>{userData.pincode}</td>
      <input type="submit"  value="Edit Pincode" 
    />
      <input type="text"
      name ="pincode"
      onChange={handleInputs}>
      </input>
    </tr>
    <tr>
      <th scope="col">Profession:</th>
      <td>{userData.work}</td>
      <input type="submit"  value="Edit Profession" 
    />
      <input type="text"
      name ="work"
      onChange={handleInputs}>
      </input>
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
  {/* <div align="center">
  <input type="submit"  value="Edit Details" onClick={Edit2} />
  </div> */} 



<br/><br/>
</>

)
}

export default PatientSearchOrganizations