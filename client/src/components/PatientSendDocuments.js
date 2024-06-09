import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import { userContext } from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const PatientSendDocuments =() =>{

    const {state,dispatch} = useContext(userContext);
    let navigate =useNavigate();
    const [email1, setEmail1] =useState('');
    const [email2, setEmail2] =useState('');
    const docs = [{"id" : "92salfjla1","descrption": "Document1","url":"drive link" },{"id" : "92salfjla1214","descrption": "Document2","url":"drive link 2" }]
    const sendDocsArray = new Set()

    const showPatientDocuments = async(e) => {

        const id = window.localStorage.getItem('id');
        var fetch_url = "/patient/patient_documents/" + id
        // console.log(fetch_url)

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
                // console.log(data)
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

    // useEffect(()=>{
    //     showPatientDocuments();
    //   },[]);  

        const handleChange = (e) => {
            let isChecked = e.target.checked;
            
            if (isChecked) {
                sendDocsArray.add(e.target.value)
                // console.log(sendDocsArray)
            } else {
                sendDocsArray.delete(e.target.value)
                // console.log(sendDocsArray)
            }

        }

        return (

            <Container>
                <Row>
                <Col></Col>
                <Col xs={4}>
                    <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':50}}>Send Documents</h1>
                        {
                            docs.map(item => {
                                return(
                                    <InputGroup className="mb-3">
                                        <InputGroup.Checkbox value={item.id} onChange={handleChange} />
                                        <Form.Control placeholder={item.descrption} disabled/>
                                    </InputGroup>
                                )
                            })
                        }
                    <Form>
                        <Form.Group>
                            <Form.Label>Send to Respective Organisation</Form.Label>
                            <Form.Select aria-label="Default select example">
                                    <option value="organisation">Organisation</option>
                                    <option value="pharmacy">Pharmacy</option>
                                    <option value="insurance">Insurance Firm</option>
                                    <option value="doctor">Doctor</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                    </Form>
                    <div className="d-grid gap-2">
                        <Button variant="dark" size="lg" type="submit" name="signin" id="signin" className="form-submit" value="Login">
                            Send Documents
                        </Button>
                    </div>
                </Col>
                <Col></Col>
                </Row>
            </Container>
            
        )
}

export default PatientSendDocuments