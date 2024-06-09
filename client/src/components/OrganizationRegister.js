import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const OrganizationRegister =() =>{
    let navigate =useNavigate();
    const[user,setUser ] = useState({                          // Do this same in Patient Register
        name:"", email:"", phone:"",type:"",description:"",location:"", password:"", cpassword: "",doc1:"",doc2:"",
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
        const{name,email,phone,type,description,location,password,cpassword,doc1,doc2} =user;
        const documents =[doc1,doc2];
        // console.log("Hello")
        const res =await fetch('/auth/organisation_register', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
            name,email,phone,type,description,location,password,cpassword,documents,
         })
        });
       
       const data = await res.json();
       if(res.status==422 || !data)
       {
            window.alert("Invalid Registration");
            // console.log("Invalid Registration");
       }
       else{
        window.alert("Registartion Successful");
        // console.log("Successful Registration");
       // alert("Hello");
        navigate("/OrganizationLogin");
        }
       
    }
    // function foo() {
    //     alert("Submit button clicked!");
    //     return true;
    //  }
//   return(
//     <>
//     <section className="signup">
//         <div align="center"></div><div align="center">
//                     <h2 className="form-title" align="center">Organization Registeration Portal</h2>
//                     <form method="POST">
//                         <div className="form-group" align="center">
//                             <input type ="text" name="name" id="name" autoComplete="off"
//                             value={user.name}
//                             onChange={handleInputs}
//                             placeholder="Hospital Name"
//                             />
//                             <br/><br/>
//                             <input type ="text"  name="email" id="email" autoComplete="off"
//                                value={user.email}
//                                onChange={handleInputs}
//                              placeholder="Hospital's Email" required="true"
//                             />
//                             <br/><br/>
//                             <input type ="text"   name="phone" id="phone" autoComplete="off"
//                                value={user.phone}
//                                onChange={handleInputs}
//                              placeholder="Phone Number" 
//                             />
//                             <br/><br/>
//                             <input type ="text"  name="work" id="work" autoComplete="off"
//                                value={user.work}
//                                onChange={handleInputs}
//                              placeholder="Your Profession" 
//                             />
//                             <br></br>
//                              <input type ="text"  name="location" id="work" autoComplete="off"
//                                value={user.location}
//                                onChange={handleInputs}
//                              placeholder="Your Location" 
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
//                     </div>
//     </section>
//     </>
//   )

return (

    <Container>
        <Row>
        <Col></Col>
        <Col xs={8}>
            <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Organization Registration</h1>
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
                            placeholder="Hospital Name" />
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
                             placeholder="Hospital's Email" required="true" />
                        </Col>
                    </Form.Group>
                
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Phone
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text"   name="phone" id="phone" autoComplete="off"
                               value={user.phone}
                               onChange={handleInputs}
                                placeholder="Phone Number"  />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Organization Working type (Pharmacy,Insurance Firm,Hospital Name)
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text"  name="type" id="type" autoComplete="off"
                               value={user.type}
                               onChange={handleInputs}
                             placeholder="Your Working Type.."  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Description
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text"  name="description" id="description" autoComplete="off"
                               value={user.description}
                               onChange={handleInputs}
                             placeholder="Your Description"  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Location
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="text"  name="location" id="work" autoComplete="off"
                               value={user.location}
                               onChange={handleInputs}
                             placeholder="Your Location" />
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
                             placeholder="Your password"  />
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
                             placeholder="Confirm Your password"  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                        Enter Image 1
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="doc1"  name="doc1" id="doc1" autoComplete="off"
                               value={user.doc1}
                               onChange={handleInputs}
                             placeholder="Enter  1st Image Drive Link..."  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column lg={2}>
                       Enter Image 2
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type ="doc1"  name="doc2" id="doc2" autoComplete="off"
                               value={user.doc2}
                               onChange={handleInputs}
                             placeholder="Enter  2nd Image Drive Link..."  />
                        </Col>
                    </Form.Group>

                </Form>
            </div>
            <div className="d-grid gap-2">
                <Button variant="dark" size="lg" type="submit" name="signup" id="signup"
                             value="register" onClick={PostData} >
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

export default OrganizationRegister