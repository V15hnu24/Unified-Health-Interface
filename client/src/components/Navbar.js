// import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './PatientLogin';
import './PatientRegister';
import {NavLink} from "react-router-dom";
import React,{useContext} from 'react'
import {userContext} from "../App";
const Navbar =() =>{

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
        <a className="nav-link" href="/MainHomePage">Home<span className="sr-only"></span></a>
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
          <a className="dropdown-item" href="#">Hospital Professionals</a>
        </div>
      </li>
        </>
      )
    }
  }
  
  return(
    <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" >Patient Data Management System</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto">

      <RenderMenu/>
      {/* <li className="nav-item active">
        <a className="nav-link" href="/">Home<span className="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/about">About</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/contact">Contact</a>
      </li>*/}
      {/* <li className="nav-item">
        <a className="nav-link" href="/login">Login</a>
      </li> 
      <li className="nav-item">
        <a className="nav-link" href="/registration">Registration</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Registration
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/PatientRegister">Patients Register</a>
          <a className="dropdown-item" href="#">Organization Register</a> */}
          {/* <div className="dropdown-divider"></div> */}
          {/* <a className="dropdown-item" href="#">Hospital Professionals Register</a>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Users(Login)
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/PatientLogin">Patients Login</a>
          <a className="dropdown-item" href="#">Organization Login</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Hospital Professionals</a>
        </div>
      </li> */}
      {/* <li className="nav-item">
        <a className="nav-link" href="/logout">Logout</a>
      </li> */}
      {/* <li className="nav-item">
        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li> */}
    </ul>
    {/* <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
  </div>
</nav>
    </>
  )
}

export default Navbar