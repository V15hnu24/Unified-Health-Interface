import React from 'react'
import { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const PharmacyVerification =() =>{

    const {state,dispatch} = useContext(userContext);
    const [show,setShow]  =useState(false);
    let navigate = useNavigate();
    const [buttonState, setButton] = useState(false);
    const [open, setOpen] = useState(false);
    const[userData, setUserData] = useState([]);
    const[searchApiData, setSearchApiData] = useState([]);
    const[filterVal,setFilterVal] =useState('');

    const id = window.localStorage.getItem("id");
  const SendPaymentRequest =async(req,res)=>{

    try{
        const res = await fetch('/organisation/payment_request/' + id,{
          method: "GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
        });
  
      const data  =await res.json();
      console.log(data);
      setUserData(data.verified);

  
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
    return (

      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Verified Successfully Approved </h1>
            <h3 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Sell Medicines </h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Amount Payable :</Form.Label>
                    <p>abc</p>
                    </Form.Group>
            </Form>
            <Button onClick={SendPaymentRequest}>Send Payment Request to Patient</Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>

    )

}

export default PharmacyVerification