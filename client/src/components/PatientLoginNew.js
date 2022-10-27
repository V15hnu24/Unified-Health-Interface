import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import { userContext } from "../App";


const PatientLogin =() =>{

    const {state,dispatch} = useContext(userContext);
    let navigate =useNavigate();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');

    const loginUser =async (e) =>{
        e.preventDefault();

        const res =await fetch('/signin', 
        {
            method:"POST",
            headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
           email,password
         })
       
        });

        const data =res.json();

        if(res.status==400 || !data){
            window.alert("Invalid Credentials");
        }
        else{
            dispatch({type:"USER", payload:true});
            window.alert("Login Sucessful");
            navigate("/PatientHome");
        }
    }



  )
}

export default PatientLogin
