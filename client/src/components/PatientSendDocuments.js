import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import { userContext } from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const PatientSendDocuments =() =>{

    const {state,dispatch} = useContext(userContext);
    let navigate =useNavigate();
    const [email1, setEmail1] =useState('');
    const [email2, setEmail2] =useState('');

    const showPatientDocuments = async(e) => {

        const id = window.localStorage.getItem('id');
        var fetch_url = "/patient/patient_docuemts" + id
        console.log(fetch_url)

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
                console.log(data)
              })
            } else {
              const error = new Error(res.error);
              throw error;
            }
    
        })
    }

    const DocumentSendDoctor =async (e) =>{
        e.preventDefault();

        const res =await fetch('/DocumentSendDoctor', 
        {
            method:"POST",
            headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
           email1,
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
    const DocumentSendOrganization =async (e) =>{
        e.preventDefault();

        const res =await fetch('/DocumentSendOrganization', 
        {
            method:"POST",
            headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
           email2
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

    useEffect(()=>{
        showPatientDocuments();
      },[]);  

        return (

            <Container>
                <Row>
                <Col></Col>
                <Col xs={4}>
                    <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':50}}>Send Documents</h1>
                    <div style={{'paddingTop':20}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Send Documents to Email address of Doctor</Form.Label>
                                <Form.Control type="email" placeholder="Enter email of Doctor" value={email1} onChange={(e)=>setEmail1(e.target.value)} required={true} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="d-grid gap-2">
                        <Button variant="dark" size="lg" type="submit" name="signin" id="signin" className="form-submit" value="Login" onClick={DocumentSendDoctor}>
                            Send Documents to Doctor
                        </Button>
                    </div>
                    <br></br><br></br>
                    <div style={{'paddingTop':20}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Send Documents to Email address of Organization</Form.Label>
                                <Form.Control type="email" placeholder="Enter email of Organization" value={email2} onChange={(e)=>setEmail2(e.target.value)} required={true} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="d-grid gap-2">
                        <Button variant="dark" size="lg" type="submit" name="signin" id="signin" className="form-submit" value="Login" onClick={DocumentSendOrganization}>
                            Send Documents to Organization
                        </Button>
                    </div>

                </Col>
                <Col></Col>
                </Row>
            </Container>
            
        )
}

export default PatientSendDocuments