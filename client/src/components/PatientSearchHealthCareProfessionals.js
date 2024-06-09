import React, { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import { userContext } from "../App";
import Table from 'react-bootstrap/Table';
const PatientSearchHealthCareProfessionals =() =>{

  const {state,dispatch} = useContext(userContext);
  let navigate = useNavigate();
  const[userData, setUserData] = useState([]);
  const[searchApiData, setSearchApiData] = useState([]);
  const[filterVal,setFilterVal] =useState('');
  const[filterVal2,setFilterVal2] =useState('');
  const[filterVal3,setFilterVal3] =useState('');


  const callAboutPage = async (req,res)=>{

    // console.log("Hello");
    const id = window.localStorage.getItem("id")
    


    try{
      const res = await fetch('/professional/verified_professionals/' + id,{
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

    const data  =await res.json();
    // console.log(data);
    setUserData(data.allP);
    setSearchApiData(data.allP);
    // console.log(data.allP[0].name);
    for(let i = 0; i < data.length; i++) {
      let obj = data[i];
     
      // console.log(obj.phone);
     }
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
        // console.log(err);
        navigate('/login');
    }
  }
  useEffect(()=>{
    callAboutPage();
  },[]);
  const handleFilter=(e)=>{
      if(e.target.value==''){
        setUserData(searchApiData);
      }else{
       const filterResult = searchApiData.filter(userData=> userData.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setUserData(filterResult);
      }
      setFilterVal(e.target.value);
  }
  const handleFilter2=(e)=>{
    if(e.target.value==''){
      setUserData(searchApiData);
    }else{
     const filterResult = searchApiData.filter(userData=> userData.email.toLowerCase().includes(e.target.value.toLowerCase()));
      setUserData(filterResult);
    }
    setFilterVal2(e.target.value);
}
const handleFilter3=(e)=>{
  if(e.target.value==''){
    setUserData(searchApiData);
  }else{
   const filterResult = searchApiData.filter(userData=> userData.location.toLowerCase().includes(e.target.value.toLowerCase()));
    setUserData(filterResult);
  }
  setFilterVal3(e.target.value);
}
  // const handleInputs =(e) =>{
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setUserData({... userData,[name]:value});
  // }
  
  // const handleInputs2 = async(e) =>{
  //   const name = e.target.name;
  //   const value = e.target.value;
  // }

  // navigate =useNavigate();
  

  return(
    <>
    <div>
    <br/>

{/* <div align="center">
    <input type="text"  onChange={handleFilter}value={filterVal}  placeholder="Search Hospitals"/>
  </div> */}
  <div align="center">
  <h1>Search Hopitals</h1>
  </div>
  <Table striped bordered hover variant="dark">
  <br></br>
<div align="center">
  <h2>Orgnaization Details</h2>
    <thead>
      <div>
    <th>HOSPITAL NAME 

    <input type="text"  onChange={handleFilter}value={filterVal}  placeholder="Search Names"/>
    </th>
  </div>
  
    <th>Email
    <input type="text"  onChange={handleFilter2}value={filterVal2}  placeholder="Search Email ID"/>
    </th>
    
    <th>Phone
    </th>
    <th>Location
    <input type="text"  onChange={handleFilter3}value={filterVal3}  placeholder="Search through location"/>
    </th>
    <th>Qualification</th>
    </thead>
    {
      userData.map(item =>{
        return(
          <tr>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.location}</td>
            <td>{item.qualification}</td>
          </tr>
        )
      })
      
    }
  </div>
  </Table> 
<br/><br/>
</div> 



<br/><br/>
</>

)
}

export default PatientSearchHealthCareProfessionals
