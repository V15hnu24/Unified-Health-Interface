import React, { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import { userContext } from "../App";

const AdminHomePage =() =>{

  const {state,dispatch} = useContext(userContext);
  let navigate = useNavigate();
  const[userData, setUserData] = useState([]);
  const[searchApiData, setSearchApiData] = useState([]);
  const[filterVal,setFilterVal] =useState('');
  const callAboutPage = async (req,res)=>{

    console.log("Hello");
    // try{
    //   const res = await fetch('/',{
    //     method: "GET",
    //     headers:{
    //       Accept:"application/json",
    //       "Content-Type":"application/json"
    //     },
    //     credentials:"include"
    //   });

    //   const data  =await res.json();
    //   // console.log(data);
    // setUserData(data);
    // setSearchApiData(data);
    // console.log(data.name);
    // for(let i = 0; i < data.length; i++) {
    //   let obj = data[i];
     
    //   console.log(obj.phone);
    //  }
    //   if(!res.status ==200)
    //   {
    //       const error = new Error(res.error);
    //       throw error;
    //   }
    //   else{
    //     dispatch({type:"USER", payload:true});
    //   }
    // }catch(err)
    // {
    //     console.log(err);
    //     navigate('/login');
    // }
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
    <h1>Hello Aditya Peer from Admin.js</h1>
    <br/>

{/* <div align="center">
    <input type="text"  onChange={handleFilter}value={filterVal}  placeholder="Search Hospitals"/>
  </div> */}
  <div className='App'>
<table class="table">
  <br></br>
<div align="center">
  <h2>Admin</h2>
  
    <th>Blocked</th>
    <th>Pending</th>
    <th>Approved</th>
    <th>Rejected</th>
    {
      userData.map(item =>{
        return(
          <tr>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.pincode}</td>
          </tr>
        )
      })
      
    }
  </div>

</table>
</div>
<br/><br/>
</div> 



<br/><br/>
</>

)
}

export default AdminHomePage