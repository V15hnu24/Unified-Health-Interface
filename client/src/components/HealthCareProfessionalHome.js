import React, { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import jwt_decode from "jwt-decode";
const HealthCareProfessionalHome=() =>{

    const {state,dispatch} = useContext(userContext);
    const [show,setShow]  =useState(false);
    let navigate = useNavigate();
    const[userData, setUserData] = useState([]);

    const userHomePage = async (req,res)=>{
  
      const id = window.localStorage.getItem('id');
      var fetch_url = "/professional/" + id
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
            // console.log("Here")
            setUserData( {...userData, name: data.t.name});
            setShow(true);
            dispatch({type:"USER", payload:true});
          })
        } else if (res.status === 404) {
          console.log("Can't fetch")
        } 
        else {
          const error = new Error(res.error);
          throw error;
        }

      })

    }
      
      // navigate("/Editdetails");
      const PrescribeDocuments=()=>{
        //try and fetch patient  Appointment records.
        navigate("/HealthCareProfessionalPrescribeDocuments");
      }
    
    useEffect(()=>{
      // userHomePage();
    },[]);  
  return(
    <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Welcome to MedChain Dr, {userData.name}!</h1>
            <div>
              <Card bg="dark" key="dark" text="white" style={{ width: "100%" }} className="mb-2">
              <Card.Body style={{"paddingTop":40, "paddingBottom":40, "paddingLeft":100}}>
                <Card.Title>What would you like to do?</Card.Title>
                <Card.Text>
                  <ButtonGroup size="lg" className="mb-2" vertical style={{paddingTop:20}}>
                      <Button variant="light" onClick={PrescribeDocuments}>Prescribe Documents to Patients</Button>
                      {/* <Button variant="light" onClick={SearchHealthCareProfessional}>Search HealthCare Professionals</Button>
                      <Button variant="light" onClick={PatientUploadDocuments}>Upload Patient Documents</Button>
                      <Button variant="light" onClick={PatientSendDocuments}>Send Patient Documents</Button> */}
                  </ButtonGroup>
                </Card.Text>
              </Card.Body>
              </Card>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
  )
}

export default HealthCareProfessionalHome