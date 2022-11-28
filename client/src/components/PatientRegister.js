import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import bcrypt from 'bcryptjs';
import Collapse from 'react-bootstrap/Collapse';

const PatientRegister =() =>{
    let navigate =useNavigate();
    const[user,setUser ] = useState({                          // Do this same in Patient Register
        name:"", email:"", mobile:"",country:"", gender:"",state:"",city:"",dob:"",pincode:"", password:"",cpassword:"",doc1:"", doc2:""
    });
    let name,value;

    const [verified, setVerified] = useState(false)
    const [otp, setOtp] = useState('')

    const handleInputs =(e)=>{
        name = e.target.name;
        value =e.target.value;

        setUser({...user,[name]:value})
    }

    const registerPatient = async(e) => {
        e.preventDefault()
        
        const{name,email,mobile,country,gender,state,city,dob,pincode,password,cpassword,doc1, doc2} = user;
        const documents = [doc1, doc2];

        if(password!==cpassword)
        {
            window.alert("Password are not Matching.");
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        // console.log(user)


        const res = await fetch('/auth/patient_register', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
            name,email,mobile,country,gender,state,city,dob,pincode,hash,documents
         })
        });
       
    //const data = await res.json();
       if(res.status===200)
       {
            sendOtp()
            // window.alert("Registartion Successful");
            // console.log("Successful Registration");
            // navigate("/PatientLogin");
       }
       else{
        window.alert(res.status + " " + res.message);
        // console.log("Invalid Registration");
        }

    }

    const sendOtp =async (e) =>{

        // console.log("Sending OTP")
        const email = user.email

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
        
        const email = user.email
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
            window.alert("Registartion Successful");
            // console.log("Successful Registration");
            navigate("/PatientLogin");
        } else {
            window.alert(data.message);
        }
    }


  return (

    <Container>
        <Row>
        <Col></Col>
        <Col xs={8}>
            <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Patient Registration</h1>
            <div style={{'paddingTop':20}}>
                <Form method='POST'>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Name
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text" name="name" id="name" autoComplete="off"
                            value={user.name}
                            onChange={handleInputs}
                            placeholder="Your Name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Email
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text"  name="email" id="email" autoComplete="off"
                           value={user.email}
                           onChange={handleInputs}
                         placeholder="Your Email" required="true" />
                        </Col>
                    </Form.Group>
                
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Mobile
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text"   name="mobile" id="mobile" autoComplete="off"
                           value={user.mobile}
                           onChange={handleInputs}
                         placeholder="Your Phone Number" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Gender
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text" name="gender" id="gender" autoComplete="off"
                            value={user.gender}
                             onChange={handleInputs}
                             placeholder="Your Gender" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Date of Birth
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="date" name="dob" id="dob" autoComplete="off"
                        //  placeholder="Your DOB" required="true"
                         value={user.dob}
                         onChange={handleInputs}
                         placeholder="Your DOB"  />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        City
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text"  name="city" id="city" autoComplete="off"
                           value={user.city}
                           onChange={handleInputs}
                         placeholder="Your City" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        State
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text"  name="state" id="state" autoComplete="off"
                            value={user.state}
                            onChange={handleInputs}
                            placeholder="Your state" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Country
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text"  name="country" id="country" autoComplete="off"
                           value={user.country}
                           onChange={handleInputs}
                           placeholder="Your Country" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Pincode
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type ="Number" name="pincode" id="pincode" autoComplete="off"
                            //  placeholder="Your Pincode" required="true"
                            value={user.pincode}
                            onChange={handleInputs}
                            placeholder="Your Pincode" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Document 1:
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="doc1"  name="doc1" id="doc1" autoComplete="off"
                           value={user.doc11}
                           onChange={handleInputs}
                         placeholder="Document 1" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Document 2:
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="doc2"  name="doc2" id="doc2" autoComplete="off"
                           value={user.doc2}
                           onChange={handleInputs}
                         placeholder="Document 2" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Password
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="password" name="password" id="password" autoComplete="off"
                           value={user.password}
                           onChange={handleInputs}
                         placeholder="Your password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Confirm Password
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="password"  name="cpassword" id="cpassword" autoComplete="off"
                           value={user.cpassword}
                           onChange={handleInputs}
                         placeholder="Confirm Your password" />
                        </Col>
                    </Form.Group>
                    {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Confirm Password
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="password"  name="cpassword" id="cpassword" autoComplete="off"
                           value={user.cpassword}
                           onChange={handleInputs}
                         placeholder="Confirm Your password" />
                        </Col>
                    </Form.Group> */}

                </Form>
            </div>
            <div className="d-grid gap-2">
                <Button variant="dark" size="lg" type="submit" name="signup" id="signup"
                         value="register" onClick={registerPatient}>
                    Register
                </Button>
            </div>
            <div style={{'textAlign':'center', 'paddingTop':20}}>
                <a href="/PatientLogin">Already have an account? Click here to login!</a>
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
                                Verify and Register
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

export default PatientRegister
