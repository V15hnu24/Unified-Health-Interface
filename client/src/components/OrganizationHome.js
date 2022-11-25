import React, { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
const OrganizationHome =() =>{

    const {state,dispatch} = useContext(userContext);
    const [show,setShow]  =useState(false);
    let navigate = useNavigate();
    const[userData, setUserData] = useState('');
    const userHomePage = async (req,res)=>{
      
      const id = window.localStorage.getItem('id');
      var fetch_url = "/organisation/" + id

      fetch(fetch_url, {
        method: "GET",
        headers:{
          // Accept:"application/json",
          "Content-Type":"application/json"
        },
      })
      .then(res => {

        if (res.status === 200) {
          res.json()
          .then( (data) => {
            console.log("Here")
            setUserData( {...userData, name: data.t.name});
            setShow(true);
            dispatch({type:"USER", payload:true});
          })
        } else if (res.status === 404) {
          console.log("Can't fetch")
        } 
        else {
          const error = new Error(res.error);
          throw error;
        }

      })

    }
  
      //   setUserData(data);
      
      // navigate("/Editdetails");
    
    useEffect(()=>{
      userHomePage();
    },[]);  
  return(
    <div>
      <div className="home-div">
    {/* <p className="pt-5">Welcome</p> */}
    <h1 align="center">Welcome to<span> Organization</span>  HealthCare System</h1>
    <h2 align="center">Welcome {userData.name}</h2>
    <h7 align="center">{show  ? 'Welcome you are logged in' : 'Mern'}</h7>
    </div>
    </div>
  )
}

export default OrganizationHome