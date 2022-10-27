import React,{useState} from 'react'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { userContext } from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const OrganizationLogin =() =>{

    const {state,dispatch} = useContext(userContext);
    console.log(state);

    let navigate =useNavigate();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');

    const loginUser =async (e) =>{
        e.preventDefault();

        const res =await fetch('/signinOrganization', 
        {
            method:"POST",
            headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
           email,password
         })
       
        });

        const data =res.json();

        if(res.status==400 || !data){
            window.alert("Invalid Credentials");
        }
        else{
            dispatch({type:"USER", payload:true});
            window.alert("Login Sucessful");
            navigate("/OrganizationHome");
        }
    }

//   return(   
//     <>
//        <section className='="signup'>
//                     <h2 className="form-title" align="center">Organization Login Portal</h2>
//                     <form method="POST">
//                         <div className="form-group" align="center">
                        
//                             <input type ="text" name="email" id="name" autoComplete="off"
//                             value ={email}
//                             onChange ={(e)=> setEmail(e.target.value)}
//                             placeholder="Your Email" required="true"
//                             />
//                             <br/><br/>
//                             <input type ="password" name="password" id="name" autoComplete="off"
//                              value ={password}
//                              onChange ={(e)=> setPassword(e.target.value)}
//                              placeholder="Your password" required="true"
//                             />
//                         </div>
//                         <br/><br/>
//                         <div className="form-group form-button" align="center">
//                             <input type="submit" name="signin" id="signin" className="form-submit"
//                              value="Login"
//                              onClick={loginUser}
//                             />
//                             <br/><br/>
//                             <a className="nav-link" href="/registration"><strong>Create an Account</strong></a>
//                         </div>
//                     </form>
//     </section>
//     </>
//   )

    return (

        <Container>
            <Row>
            <Col></Col>
            <Col xs={4}>
                <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':45}}>Organization Login</h1>
                <div style={{'paddingTop':20}}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required="true" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type ="password" name="password" id="name" autoComplete="off" value ={password} onChange ={(e)=> setPassword(e.target.value)} placeholder="Password" required="true" />
                        </Form.Group>
                    </Form>
                </div>
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg" type="submit" name="signin" id="signin" className="form-submit" value="Login" onClick={loginUser}>
                        Submit
                    </Button>
                </div>
                <div style={{'textAlign':'center', 'paddingTop':20}}>
                    <a href="/registration">Don't have an account? Click here to sign up!</a>
                </div>

            </Col>
            <Col></Col>
            </Row>
        </Container>
        
    )


}

export default OrganizationLogin

