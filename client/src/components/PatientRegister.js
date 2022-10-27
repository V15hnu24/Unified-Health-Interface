import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


const PatientRegister =() =>{
    let navigate =useNavigate();
    const[user,setUser ] = useState({                          // Do this same in Patient Register
        name:"", email:"", mobile:"",country:"", gender:"",state:"",city:"",dob:"",pincode:"", password:"",cpassword:"",
    });
    let name,value;
    const handleInputs =(e)=>{
        console.log(e);
        name = e.target.name;
        value =e.target.value;

        setUser({...user,[name]:value})
    }

    const PostData =async(e)=>{
        e.preventDefault();
        const{name,email,mobile,country,gender,state,city,dob,pincode,password,cpassword} =user;
        if(password!=cpassword)
        {
            window.alert("Password are not Matching.");
        }
        console.log("Hello")
        const res =await fetch('/register', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
            name,email,mobile,country,gender,state,city,dob,pincode,password,cpassword
         })
        });
       
       const data = await res.json();
       if(res.status==422 || !data)
       {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
       }
       else{
        window.alert("Registartion Successful");
        console.log("Successful Registration");
       // alert("Hello");
        navigate("/PatientIntermediateLogin");
        }
       
    }
    function foo() {
        alert("Submit button clicked!");
        return true;
     }
//   return(
//     <>
//     <section className="signup">
//                     <h1 align="center">Register <span className="justfordemo"> Patient</span> Details</h1>
//                     <h2 className="form-title" align="center">Sign up</h2>
//                     <form method="POST">
//                         <div className="form-group" align="center">
//                             <input type ="text" name="name" id="name" autoComplete="off"
//                             value={user.name}
//                             onChange={handleInputs}
//                             placeholder="Your Name"
//                             />
//                             <br/><br/>
//                             <input type ="text"  name="email" id="email" autoComplete="off"
//                                value={user.email}
//                                onChange={handleInputs}
//                              placeholder="Your Email" required="true"
//                             />
//                             <br/><br/>
//                             <input type ="text"   name="mobile" id="mobile" autoComplete="off"
//                                value={user.mobile}
//                                onChange={handleInputs}
//                              placeholder="Your Phone Number" 
//                             />
//                             <br/><br/>
//                             <input type ="text"  name="country" id="country" autoComplete="off"
//                                value={user.country}
//                                onChange={handleInputs}
//                              placeholder="Your Country" 
//                             />
//                             <br></br>
//                             <br></br>
//                             <input type ="text" name="gender" id="gender" autoComplete="off"
//                             //  placeholder="Your Gender" required="true"
//                             value={user.gender}
//                              onChange={handleInputs}
//                              placeholder="Your Gender" 
//                             />
//                             <br/><br/>
//                             <input type ="text"  name="state" id="state" autoComplete="off"
//                                value={user.state}
//                                onChange={handleInputs}
//                              placeholder="Your state" 
//                             />
//                             <br/><br/>
//                             <input type ="text"  name="city" id="city" autoComplete="off"
//                                value={user.city}
//                                onChange={handleInputs}
//                              placeholder="Your City" 
//                             />
//                             <br></br>
//                             <br></br>
//                             <input type ="text" name="dob" id="dob" autoComplete="off"
//                             //  placeholder="Your DOB" required="true"
//                              value={user.dob}
//                              onChange={handleInputs}
//                              placeholder="Your DOB" 
//                             />
//                             <br/><br/>
//                             <input type ="Number" name="pincode" id="pincode" autoComplete="off"
//                             //  placeholder="Your Pincode" required="true"
//                              value={user.pincode}
//                              onChange={handleInputs}
//                              placeholder="Your Pincode" 
//                             />
//                             <br/><br/>
//                             <input type ="password" name="password" id="password" autoComplete="off"
//                                value={user.password}
//                                onChange={handleInputs}
//                              placeholder="Your password" 
//                             />
//                             <br/><br/>
//                             <input type ="password"  name="cpassword" id="cpassword" autoComplete="off"
//                                value={user.cpassword}
//                                onChange={handleInputs}
//                              placeholder="Confirm Your password" 
                             
//                             />
//                         </div>
//                         <br/><br/>
//                         <div  align="center">
//                             <input type="submit" name="signup" id="signup"
//                              value="register" onClick={PostData} 
//                             />
//                             <br/><br/>
//                             <a className="nav-link" href="/login"><strong>I am already registered</strong></a>
//                         </div>
//                     </form>
//     </section>
//     </>
//   )
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

                    </Form>
                </div>
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg" type="submit" name="signup" id="signup"
                             value="register" onClick={PostData}>
                        Register
                    </Button>
                </div>
                <div style={{'textAlign':'center', 'paddingTop':20}}>
                    <a href="/PatientLogin">Already have an account? Click here to login!</a>
                </div>

            </Col>
            <Col></Col>
            </Row>
        </Container>
        
    )
}

export default PatientRegister

