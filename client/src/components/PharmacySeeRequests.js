import React from 'react'
import { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import jwt_decode from "jwt-decode";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import { Linking, StyleSheet, Text, View } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import bcrypt from 'bcryptjs';

const PharmacySeeRequests =() =>{

    const {state,dispatch} = useContext(userContext);
    const [show,setShow]  =useState(false);
    let navigate = useNavigate();
    const [buttonState, setButton] = useState(false);;
    const [open, setOpen] = useState(false);
    const[userData, setUserData] = useState([]);
    const[searchApiData, setSearchApiData] = useState([]);
    const[filterVal,setFilterVal] =useState('');

    const docs = [{"id" : "92salfjla1","description": "Document1","url":"drive link" },{"id" : "92salfjla1214","descrption": "Document2","url":"drive link 2" },{"id" : "12la1214","descrption": "Document3","url":"drive link 3" }]

    const id = window.localStorage.getItem("id")

    const ShowRequests = async(req,res)=>{
        
    
    try{
      const res = await fetch('/organisation/getBuyRequests/' + id,{
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            organisation_id:  id,
            status: "pending",
        }),
        credentials:"include"
      });

    const data  =await res.json();

    console.log(data);
    setUserData(data.buyRequests);
    setSearchApiData(data.buyRequests);
    // console.log(data.allP[0].name);

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

  const getBuyRequest =()=>{

    navigate("./PharmacyEachRequest");

  }
  useEffect(()=>{
    // ShowRequests();
  },[]);

       


    return (
<>         
<Table striped bordered hover variant="dark">
  <br></br>
<div align="center">
  <h2>Orgnaization Details</h2>
    <thead>
      <div>
    <th>Prescription Ids Requests from Patients
    </th>
  </div>
    {/* <th>Description</th> */}
    </thead>
    {
      docs.map(item =>{
        return(
          <tr>
            <Button onClick={getBuyRequest}>{item.id}</Button>
            {/* <td>{item.description}</td> */}
          </tr>
        )
      })
      
    }
  </div>
  </Table> 
</>

    )

}

export default PharmacySeeRequests