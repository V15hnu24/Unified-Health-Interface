import React, { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import { userContext } from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AdminNavbar from './AdminNavbar';

const AdminHomePage =() =>{

  const {state,dispatch} = useContext(userContext);
  let navigate = useNavigate();
  const[userData, setUserData] = useState([]);
  const[searchApiData, setSearchApiData] = useState([]);
  const[filterVal,setFilterVal] =useState('');
  const callAboutPage = async (req,res)=>{

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
  return (
    <Container>
        <Row>
            <Col></Col>
            <Col xs={8}>
                <AdminNavbar />
            </Col>
            <Col></Col>
        </Row>
    </Container>
  )
}

export default AdminHomePage