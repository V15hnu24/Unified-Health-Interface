import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import { userContext } from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import bcrypt from 'bcryptjs';
import Collapse from 'react-bootstrap/Collapse';

const PatientLogin =() =>{

    const {state,dispatch} = useContext(userContext);
    let navigate =useNavigate();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [verified, setVerified] = useState(false)
    const [otp, setOtp] = useState('')
    // const loginUser = func();
    const loginUser =async (e) =>{
        e.preventDefault();

        const res =await fetch('/auth/patient_login', 
        {
            method:"POST",
            headers:{
            "Content-Type" : "application/json"
            },
            body:JSON.stringify({
            email,password
            })
        });


        // console.log(res.body);
        const data = await res.json();
        // console.log(data);

        window.localStorage.setItem('id',data._id); 
        // console.log(data._id);
        
        if(res.status===200){
            sendOtp()
            // dispatch({type:"USER", payload:true});
            // window.alert("Login Sucessful");
            // navigate("/PatientHome");
        }
        else{
            window.alert(res.message + " ");
            // console.log(res);
        }
    }


    const sendOtp =async (e) =>{
        
        fetch('/auth/send_otp', 
        {
            method:"POST",
            headers:{
            "Content-Type" : "application/json"
            },
            body:JSON.stringify({
            email
            })
        });

        setVerified(true)
    }

    const verifyAndLogin = async(e) => {
        
        const res = await fetch('/auth/verify_otp', {
            method:"POST",
            headers:{
            "Content-Type" : "application/json"
            },
            body:JSON.stringify({
            email,otp
            })
        });

        const data = await res.json();

        if (data.message === "OTP verified") {
            dispatch({type:"USER", payload:true});
            window.alert("Login Sucessful");
            navigate("/PatientHome");
            
        } else {
            window.alert(data.message);
        }
    }

    
    return (
        <Container>
            <Row>
            <Col></Col>
            <Col xs={4}>
                <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':50}}>Patient Login</h1>
                <div style={{'paddingTop':20}}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required={true} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type ="password" name="password" id="name" autoComplete="off" value ={password} onChange ={(e)=> setPassword(e.target.value)} placeholder="Password" required={true} />
                        </Form.Group>
                    </Form>
                </div>
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg" type="submit" name="signin" id="signin" className="form-submit" value="Login" onClick={loginUser}>
                        Login
                    </Button>
                </div>
                <div style={{'textAlign':'center', 'paddingTop':20}}>
                    <a href="/PatientRegister">Don't have an account? Click here to sign up!</a>
                </div>

                <Collapse in={verified}>
                    <div style={{'paddingTop':20}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label><strong>Enter OTP sent at your registered email</strong></Form.Label>
                                <Form.Control type="number" placeholder="Enter OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} required={true} />
                            </Form.Group>
                        </Form>
                        <div className="d-grid gap-2">
                            <Button variant="dark" size="lg" type="submit" name="verifyOtp" className="form-submit" value="verifyOtp" onClick={verifyAndLogin}>
                                Verify and Login
                            </Button>
                        </div>
                    </div>
                </Collapse>
                
            </Col>
            <Col></Col>
            </Row>
        </Container>
        
    )
}

export default PatientLogin