import 'bootstrap/dist/css/bootstrap.css';
import './PatientLogin';
import './PatientRegister';
import React,{useContext} from 'react'
import {userContext} from "../App";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'

const CreateNavbar = () => {

    const {state, dispatch} = useContext(userContext);

    const RenderMenu = () => {

        if (state) {

            return (
                <div className='d-flex'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/PatientHome">Home</Nav.Link>
                    <Nav.Link href="/Patientabout">About</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
                </div>
            )

        } else {

          return (
            <div className='d-flex'>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/MainHomePage">Home</Nav.Link>
                <NavDropdown title="Registration" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/PatientRegister">Patients Register</NavDropdown.Item>
                  <NavDropdown.Item href="/OrganizationRegister">Organization Register</NavDropdown.Item>
                  <NavDropdown.Item href="/HealthCareProfessionalRegister">HealthCareProfessional Register</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Login" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/PatientLogin">Patients Login</NavDropdown.Item>
                  <NavDropdown.Item href="/OrganizationLogin">Organization Login</NavDropdown.Item>
                  <NavDropdown.Item href="/HealthCareProfessionalLogin">HealthCareProfessional Login</NavDropdown.Item>
                  <NavDropdown.Item href="/PharmacyLogin">Pharmacy Login</NavDropdown.Item>
                  <NavDropdown.Item href="/InsuranceLogin">Insurance Login</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/Patientabout">About</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            </div>
          )

        }

    }

    return (
        <>
        <Navbar bg="dark" variant="dark">
  
          <Container>
          <Navbar.Brand href="#home">MedChain</Navbar.Brand>

            <RenderMenu />

          </Container>
  
        </Navbar>
      </>
    )
}

export default CreateNavbar
