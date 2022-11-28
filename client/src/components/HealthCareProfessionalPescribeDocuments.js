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
import HealthCareProfessionalHome from './HealthCareProfessionalHome';


const HealthCareProfessionalPrescribeDocuments =() =>{
    let navigate =useNavigate();
    const[user,setUser ] = useState({                          // Do this same in Patient Register
        link:"", email:"",
    });
    let name,value;
    const handleInputs =(e)=>{
        // console.log(e);
        name = e.target.name;
        value =e.target.value;

        setUser({...user,[name]:value})
    }
    const PostData =async(e)=>{
        e.preventDefault();
        const{link,email} =user;
        const res =await fetch('/auth/', {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
             },
            body:JSON.stringify({
               link,email
             })
            });
            if(res.status==200)
            {
                 window.alert("Successfully Sent Documentrs to patient id");
                //  console.log("Successful documents sent.");
             // alert("Hello");
                 navigate("/PatientLogin");
            }
            else{
             window.alert(res.status + " " + res.message);
             console.log("Invalid");
             }
    }



        return (

            <Container>
                <Row>
                <Col></Col>
                <Col xs={4}>
                    <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':50}}>Prescribe Documents to Patients</h1>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email id of Patient" 
                             value={user.email}
                             onChange={handleInputs}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="link" placeholder="Enter Drive Link of your Patient Prescription" 
                            value={user.link}
                             onChange={handleInputs}
                             />
                        </Form.Group>
                    </Form>
                    <br></br>
                    <div className="d-grid gap-2">
                        <Button variant="dark" size="lg" type="submit" name="signin" id="signin" className="form-submit" value="Login" onClick={PostData}>
                            Send Documents
                        </Button>
                    </div>
                </Col>
                <Col></Col>
                </Row>
            </Container>
            
        )
}

export default HealthCareProfessionalPrescribeDocuments