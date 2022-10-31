import React from 'react'
// import "../App.css"
import { useEffect,useState,useContext } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {userContext} from "../App";
import '../HomePage.css'
import styled from 'styled-components'


const MainHomePage =() =>{

    // const {state,dispatch} = useContext(userContext);
    // const [show,setShow]  =useState(false);
    // const[userData, setUserData] = useState('');
    // const userHomePage = async (req,res)=>{
  
    //   console.log("Hello");
    //   try{
    //     const res = await fetch('/getdata',{
    //       method: "GET",
    //       headers:{
    //         Accept:"application/json",
    //         "Content-Type":"application/json"
    //       },
    //     });
  
    //     const data  =await res.json();
    //     console.log(data);
    //   //   setUserData(data);
    //   // setUserName(data.name);
    //   setUserData({...userData, name: data.name, email:data.email, phone:data.phone, gender:data.gender, dob:data.dob, pincode:data.pincode, work:data.work});
    //   setShow(true);
    //     if(!res.status ==200)
    //     {
    //         const error = new Error(res.error);
    //         throw error;
    //     }
    //     else{
    //       dispatch({type:"USER", payload:true});
    //     }
    //   }catch(err)
    //   {
    //       console.log(err);
    //       navigate('/login');
    //   }
    // }
      
      // navigate("/Editdetails");
      // const SearchData =async(req,res)=>{
      //   console.log("Hello Bro");
      //   const [searchInput, setSearchInput] = useState([]);
      //   const res2 = await fetch('/getdataOrganization',{
      //     method: "GET",
      //     headers:{
      //       Accept:"application/json",
      //       "Content-Type":"application/json"
      //     },
      //     credentials:"include"
      //   })
      //   const data = await res2.json();
      //   console.log(data);
      //   setSearchInput(data);
      //   console.log(searchInput.name);
      //   if(!data)
      //   {
      //     const error = new Error(res.error);
      //     throw error;
      //   }
      //   else{
      //      alert("Details Shown");
      //     // setUserData({... userData, name:"",});
      //     // navigate("/about");
      //   }
    //   navigate =useNavigate();
    //   const SearchData =()=>{
    
    //     navigate("/PatientSearchOrganizations");
      
    //   }
const Button = styled.button`
  background-color: black;
  color: white;

  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
    let navigate = useNavigate();
    const AdminLogin= ()=>{
        navigate("/AdminLogin");
    }
    const PatientLogin= ()=>{
        navigate("/PatientLogin");
    }
    const PatientRegister =()=>{
            navigate("/PatientRegister");
    }
    const OrganizationLogin =()=>{
        navigate("/OrganizationLogin");
    }
    const OrganizationRegister =()=>{
        navigate("/OrganizationRegister");
}

    const HealthProfessionalLogin= ()=>{
            navigate("/HealthCareProfessionalLogin");
    }
    const HealthProfessionalRegister= ()=>{
        navigate("/HealthCareProfessionalRegister");
}


//      }
    
    // useEffect(()=>{
    //   userHomePage();
    //   //  SearchData();
    // },[]);  
   // const {query} = useGlobalContext();
  return(
    <div>
      <div className="home-div">
    {/* <p className="pt-5">Welcome</p> */}
    <h1 align="center">Welcome to<span> Patient</span>  HealthCare System</h1>
    <br></br>
    <br></br>
    {/* <button class="button2">Organizations</button> */}
    </div> 
    <div align="center">
    <br></br>
    <Button onClick={AdminLogin}>
    Admin Login
    </Button>
    <br></br>
    <br></br>
    <br></br>
    <Button onClick={PatientRegister}>
    Patient Registration
    </Button>
    &nbsp;&nbsp;&nbsp;
    <Button onClick={PatientLogin}>
    Login Patient
    </Button>
    <br></br>
    <br></br>
    <br></br>
    <Button onClick={OrganizationRegister}>
    Organization Registration
    </Button>
    &nbsp;&nbsp;&nbsp;
    <Button onClick={OrganizationLogin}>
    Organization Login
    </Button>
    <br></br>
    <br></br>
    <br></br>
    <Button onClick={HealthProfessionalRegister}>
    HealthProfessional Registration
    </Button>
    &nbsp;&nbsp;&nbsp;
    <Button onClick={HealthProfessionalLogin}>
    HealthProfessionalLogin
    </Button>
    <br></br>
    <br></br>
    <br></br>
    </div>
    </div>
  )
}

export default MainHomePage