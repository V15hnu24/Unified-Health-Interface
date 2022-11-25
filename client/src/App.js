import React, { createContext, useReducer } from 'react'
import{Route,Routes} from "react-router-dom";
import PatientHome from './components/PatientHome'
import CreateNavbar from "./components/CustomNavbar"
import Contact from "./components/Contact"
import PatientAbout from "./components/PatientAbout"
import PatientEditdetails from "./components/PatientEditdetails"
import PatientLogin from "./components/PatientLogin"
import PatientIntermediateLogin from "./components/PatientIntermediateLogin"
import PatientSearchOrganizations from "./components/PatientSearchOrganizations"
import PatientSearchHealthCareProfessionals from "./components/PatientSearchHealthCareProfessionals"
import PatientRegister from "./components/PatientRegister"
import PatientUploadDocuments from "./components/PatientUploadDocuments"
import OrganizationRegister from "./components/OrganizationRegister"
import OrganizationLogin from "./components/OrganizationLogin"
import OrganizationHome from "./components/OrganizationHome"
import HealthCareProfessionalHome from './components/HealthCareProfessionalHome';
import HealthCareProfessionalRegister from './components/HealthCareProfessionalRegister';
import HealthCareProfessionalLogin from './components/HealthCareProfessionalLogin';
import MainHomePage from "./components/MainHomePage"
import AdminHomePage from './components/AdminHomePage';
import PatientSendDocuments from './components/PatientSendDocuments';
import Logout from "./components/Logout"
import CartNavbar from './components/CartNavbar';
import Amazon from './components/amazon';
import CartRoute from './components/CartRoute';
import RazorPay from './components/RazorPay';
import PaymentSuccess from './components/PaymentSucess';
import { initialState, reducer } from "../src/reducer/UseReducer" 
import AdminLogin from './components/AdminLoginPage';
import 'bootstrap/dist/css/bootstrap.css'
import "./HomePage.css"
import ErrorPage from "./components/Errorpage"
import { useState, useEffect } from "react";
import AdminHandlePatient from './components/AdminHandlePatient'

// Context API
export const userContext = createContext();

const Routing =() =>{
  return(
        <Routes>
        <Route path="/" element={ <MainHomePage/> } />
        <Route path="/MainHomePage" element={ <MainHomePage/> } />
        <Route path="/PatientHome" element={ <PatientHome/> } />
        <Route path="/Patientabout" element={ <PatientAbout/> } />
        <Route path="/contact" element={ <Contact/> } />
        <Route path= "/PatientLogin" element={<PatientLogin/>} />
        <Route path= "/PatientRegister" element={<PatientRegister/>} />
        <Route path= "/OrganizationRegister" element={<OrganizationRegister/>} />
        <Route path= "/OrganizationLogin" element={<OrganizationLogin/>} />
        <Route path= "/OrganizationHome" element={<OrganizationHome/>} />
        <Route path= "/PatientEditdetails" element={<PatientEditdetails/>} />
        <Route path= "/PatientIntermediateLogin" element={<PatientIntermediateLogin/>} />
        <Route path= "/PatientSearchOrganizations" element={<PatientSearchOrganizations/>} />
        <Route path= "/PatientSearchHealthCareProfessionals" element={<PatientSearchHealthCareProfessionals/>} />
        <Route path= "/PatientUploadDocuments" element={<PatientUploadDocuments/>} />
        <Route path= "/HealthCareProfessionalHome" element={<HealthCareProfessionalHome/>} />
        <Route path= "/AdminHomePage" element={<AdminHomePage/>} />
        <Route path= "/HealthCareProfessionalRegister" element={<HealthCareProfessionalRegister/>} />
        <Route path= "/HealthCareProfessionalLogin" element={<HealthCareProfessionalLogin/>} />
        {/* <Route path="/CartNavbar" element={<CartNavbar/>}/> */}
        {/* <Route path= "/Amazon" element={<Amazon/>} /> */}
        <Route path= "/CartRoute" element={<CartRoute/>} />
        <Route path= "/RazorPay" element={<RazorPay/>} />
        <Route path= "/PaymentSuccess" element={<PaymentSuccess/>} />
        <Route path= "/logout" element ={<Logout/>}/>  
        <Route path= "/AdminLogin" element ={<AdminLogin/>}/> 
        <Route path= "/PatientSendDocuments" element={<PatientSendDocuments/>}/>
        <Route path= "/AdminHandlePatient" element={<AdminHandlePatient/>}/>
        
      </Routes>
  )
}
const App =() =>{

  const [state,dispatch] = useReducer(reducer, initialState);
  

  return(
    <>
    <userContext.Provider value ={{state, dispatch}}>
    <CreateNavbar />
      <Routing/>
      </userContext.Provider>
    </>
  )
}

export default App