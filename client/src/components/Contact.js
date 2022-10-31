import React,{useContext} from 'react'
import {userContext} from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Contact =() =>{

  const {state,dispatch} = useContext(userContext);
  // dispatch({type:"USER", payload:true});
  // return(
  //   <>
    
  //   <div className="contact_info">
  //     <div className="container-fluid">
  //       <div className="col-lg-10 offset-">
  //         <br/><br/>
  //       <h1 align="center">Contact Us </h1>
  //       <form className="register-form" id="register-form">
  //             <div className="form-group" align="center">
  //             <input type ="text" name="Name" id="name" autoComplete="off"
  //                     placeholder="Your Name" 
  //                     /> 
  //                     <br/><br/>
  //                   <input type ="text" name="email" id="name" autoComplete="off"
  //                     placeholder="Your Email" 
  //                     /> 
  //                     <br/><br/>
  //                   <input type ="Number" name="Phone Number" id="name" autoComplete="off"
  //                   placeholder="Your Phone Number" 
  //                   />
  //                   </div>
  //                   <br/><br/>
  //                   <div className="form-group form-button" align="center">
  //                   <input type="submit" name="signin" id="signin" className="form-submit"
  //                   value="Send"
  //                   />
  //                   </div>
  //                   </form> 
  //                   <br/><br/><br/>  
  //                   <div align="center" > 
  //                   <h4>Contact Details</h4>
  //                   <h5>Email: www.xyz@gmail.com</h5>
  //                   <h5>Phone Number: 98xxxxxx12</h5>
  //                   <h5>Address:Delhi,India</h5>
  //                   </div>     
  //       </div>

  //     </div>
  //   </div>
  //   </>
  // )
  return (

    <Container>
        <Row>
        <Col>
            <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':50}}>Contact Us</h1>
            <div style={{'paddingTop':20}}>
                <Form method="POST" className="register-form" id="register-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type ="text" name="Name" id="name" autoComplete="off"
                      placeholder="Your Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type ="text" name="email" id="name" autoComplete="off"
                      placeholder="Your Email" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type ="Number" name="Phone Number" id="name" autoComplete="off"
                    placeholder="Your Phone Number" />
                    </Form.Group>
                </Form>
            </div>
            <div className="d-grid gap-2">
                <Button variant="dark" size="lg" type="submit" name="signin" id="signin" className="form-submit"
                    value="Send">
                    Send
                </Button>
            </div>



        </Col>
        <Col>
          <div style={{paddingTop:200, paddingLeft: 150}}>
            <Card bg="dark" key="dark" text="white" className="mb-2" style={{ width: '75%',}}>
                <Card.Header>Contact Details</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Email</strong>: xyz@gmail.com</ListGroup.Item>
                  <ListGroup.Item><strong>Phone Number</strong>: 98xxxxxx12</ListGroup.Item>
                  <ListGroup.Item><strong>Address</strong>: Delhi,India</ListGroup.Item>
                </ListGroup>
              </Card>
          </div>

        </Col>
        </Row>
    </Container>
    
)

}

export default Contact