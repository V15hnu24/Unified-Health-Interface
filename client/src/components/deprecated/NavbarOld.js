// import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './PatientLogin';
import './PatientRegister';
import {NavLink} from "react-router-dom";
import React,{useContext} from 'react'
import {userContext} from "../App";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const createNavbar =() =>{

  const {state,dispatch} = useContext(userContext);

  const RenderMenu = () =>{
    if(state)
    {
       return(
        <>
        <li className="nav-item active">
        <a className="nav-link" href="/PatientHome">Home<span className="sr-only"></span></a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="/Patientabout">About</a>
        </li>
        {/* <li className="nav-item">
        <a className="nav-link" href="/contact">Contact</a>
        </li> */}
        <li className="nav-item">
        <a className="nav-link" href="/logout">Logout</a>
        </li>
        </>
       )
    }else{
      return(
        <>
         <li className="nav-item active">
        <a className="nav-link" href="/PatientHome">Home<span className="sr-only"></span></a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="/Patientabout">About</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="/contact">Contact</a>
        </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Registration
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/PatientRegister">Patients Register</a>
          <a className="dropdown-item" href="/OrganizationRegister">Organization Register</a>
          {/* <div className="dropdown-divider"></div> */}
          <a className="dropdown-item" href="#">Hospital Professionals Register</a>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Users(Login)
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/PatientLogin">Patients Login</a>
          <a className="dropdown-item" href="/OrganizationLogin">Organization Login</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Hospital Professionals</a>
        </div>
      </li>
        <li className="nav-item">
        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
        </>
      )
    }
  }
  
  return(
//     <>
//   <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <a className="navbar-brand" >Patient Data Management System</a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>

//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav ms-auto">

//       <RenderMenu/>
//     </ul>
//   </div>
// </nav>
//     </>
    <>
      <Navbar bg="dark" variant="dark">

        <Container>
        <Navbar.Brand href="#home">Patient Data Management System</Navbar.Brand>

        </Container>

      </Navbar>
    </>

  )
}

export default Navbar