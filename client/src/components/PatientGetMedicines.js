import React, { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const PatientGetMedicines =() =>{

  const {state,dispatch} = useContext(userContext);
  let navigate = useNavigate();
  const[userData, setUserData] = useState({});
  const[email, setEmail] = useState('')
  const[allPrescriptions, setAllPrescriptions] = useState('')
  const[toVerifyPrescription, setToVerifyPrescription] = useState('')
  const[pharmacyEmail, setPharmacyEmail] = useState('')

  const id = window.localStorage.getItem('id')

  const getPatientEmail = async(e) => {
    
    var fetch_url = "/patient/" + id
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
          setAllPrescriptions(data)
        })
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })

    setEmail(userData.email)
  }

  const getAllPatientPrescriptions = async(e) => {
    
    var fetch_url = "/patient/get_prescriptions/" + id
    fetch(fetch_url, {
      method: "GET",
      headers:{
        // Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email
     })
    })
    .then(res => {

      if (res.status === 200) {
        res.json()
        .then( (data) => {
            setAllPrescriptions(data)
        })
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
  }

  const sendPurchaseRequest = async(e) => {

        var fetch_url = "/patient/send_buy_request/" + id
        fetch(fetch_url, {
        method: "POST",
        headers:{
            // Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            prescription_id: toVerifyPrescription, 
            pharmacy_email: pharmacyEmail
        })
        })
        .then(res => {

        if (res.status === 200) {
            res.json()
            .then( (data) => {
                console.log(data.message)
            })
        } else {
            const error = new Error(res.error);
            throw error;
        }
        })
  }

    const handleChange = (e) => {
        let isChecked = e.target.checked;
        
        if (isChecked) {
            setToVerifyPrescription(e.target.value)
        } 
    }
  
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
        <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Buy Medicines</h1>
        <h1 style={{'paddingTop':0, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':20}}>(Choose only one)</h1>
            {
                allPrescriptions.map(item => {
                    return(
                        <InputGroup className="mb-3">
                            <InputGroup.Checkbox value={item.prescription_id} onChange={handleChange} />
                            <Form.Control placeholder={item.name} disabled/>
                        </InputGroup>
                    )
                })
            }

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter pharmacy email you want to purchase from: </Form.Label>
                    <Form.Control type="email" placeholder="Enter pharmacy email" onChange={(e) => setPharmacyEmail(e.target.value)}/>
                </Form.Group>
            </Form>

        <div className="d-grid gap-2">
            <Button variant="dark" size="lg" type="submit" name="signin" id="signin" className="form-submit" value="Login" onClick={sendPurchaseRequest}>
                Send Purchase Request
            </Button>
        </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )

}

export default PatientGetMedicines