import React from 'react'
// import "../App.css"
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



//      }
    
    useEffect(()=>{
      userHomePage();
      //  SearchData();
    },[]);  
   // const {query} = useGlobalContext();

  return(
    <div>
      <div className="home-div">
    {/* <p className="pt-5">Welcome</p> */}
    <h1 align="center">Welcome to<span> Patient</span>  HealthCare System</h1>
    <h2 align="center">Welcome {userData.name}</h2>
    <br></br>
    
    <form  align="center"action="Search Health Organizations">
      <div>
        <input type="text" placeholder="Search Health Organizations"/>
        {/* <div align="center">
       <input type="submit"  value="Search Organizations" onClick={SearchData} />
        </div> */}
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