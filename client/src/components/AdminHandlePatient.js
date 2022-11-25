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

const AdminHandlePatient = () => {

    const {state,dispatch} = useContext(userContext);
    let navigate = useNavigate();
    const [active, setActive] = useState("pending")
    
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
                  <Nav.Item>
                    <Nav.Link href="#blocked" onClick={() => setActive("blocked")}>Blocked</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                {active === "pending" && (
                  <>
                    <Card.Title>Pending Patients</Card.Title>
                    <p1>Pending</p1>
                  </>
                )}

                {active === "approved" && (
                  <>
                  <Card.Title>Approved Patients</Card.Title>
                  <p1>Approved</p1>
                 </>
                )}

                {active === "rejected" && (
                  <>
                  <Card.Title>Rejected Patients</Card.Title>
                  <p1>Rejected</p1>
                  </>
                )}

                {active === "blocked" && (
                  <>
                  <Card.Title>Blocked Patients</Card.Title>
                  <p1>Blocked</p1>
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

export default AdminHandlePatient