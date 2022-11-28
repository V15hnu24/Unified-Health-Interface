import React, { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import { userContext } from "../App";
import AdminNavbar from './AdminNavbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


const AdminHandleProfessionals = () => {

    const {state,dispatch} = useContext(userContext);
    let navigate = useNavigate();
    const [active, setActive] = useState("pending")
    const [verifiedPatients, setVerifiedPatients] = useState('')
    const [pendingPatients, setPendingPatients] = useState('')
    const [rejectedPatients, setRejectedPatients] = useState('')
    const updateStatus = []

    
    const getPendingPatients = async(e) => {
        fetch("/professional/getAllPendingforApproval_Professionals", {
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
              setPendingPatients(data)
            })
          } else {
            const error = new Error(res.error);
            throw error;
          }

        })      

    }

      const getAllVerifiedPatients = async(e) => {
        fetch("/professional/getAllVerifiedProfessionals", {
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
              setVerifiedPatients(data)
            })
          } else {
            const error = new Error(res.error);
            throw error;
          }

        })      

    }

    const getAllRejectedPatients = async(e) => {
      fetch("/professional/getAllRejectedProfessionals", {
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
            setRejectedPatients(data)
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
          updateStatus.add(e.target.value)
      } else {
        updateStatus.delete(e.target.value)

      }

   }

    useEffect(()=>{

      getPendingPatients();
      getAllRejectedPatients();
      getAllVerifiedPatients();
    
    },[]);  

    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <AdminNavbar />
            <h1 style={{'paddingTop':20, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Patient Status</h1>
            <Card>
              <Card.Header>
                <Nav fill variant='tabs' defaultActiveKey="#first">
                  <Nav.Item>
                    <Nav.Link href="#pending" onClick={() => setActive("pending")}>Pending</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#approved" onClick={() => setActive("approved")}>Approved</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#rejected" onClick={() => setActive("rejected")}>Rejected</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                {active === "pending" && (
                  <>
                    <Card.Title>Pending Professionals</Card.Title>
                    {
                      pendingPatients.map(item => {
                        return (
                          <InputGroup className="mb-3">
                              <InputGroup.Checkbox value={item.id} onChange={handleChange} />
                              <Form.Control placeholder={item.name} disabled/>
                          </InputGroup>
                        )
                      })
                    }
                  </>
                )}

                {active === "approved" && (
                  <>
                  <Card.Title>Verified Professionals</Card.Title>
                  {
                      verifiedPatients.map(item => {
                        return (
                          <InputGroup className="mb-3">
                              <InputGroup.Checkbox value={item.id} onChange={handleChange} />
                              <Form.Control placeholder={item.name} disabled/>
                          </InputGroup>
                        )
                      })
                    }
                 </>
                )}

                {active === "rejected" && (
                  <>
                  <Card.Title>Rejected Professionals</Card.Title>
                  {
                      rejectedPatients.map(item => {
                        return (
                          <InputGroup className="mb-3">
                              <InputGroup.Checkbox value={item.id} onChange={handleChange} />
                              <Form.Control placeholder={item.name} disabled/>
                          </InputGroup>
                        )
                      })
                    }
                  </>
                )}

              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
}

export default AdminHandleProfessionals