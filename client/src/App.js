import React, { createContext, useReducer } from 'react'
import{Route,Routes} from "react-router-dom";
import PatientHome from './components/PatientHome'
// import Navbar from "./components/Navbar"
import Contact from "./components/Contact"
import PatientAbout from "./components/PatientAbout"
import PatientEditdetails from "./components/PatientEditdetails"
import PatientLogin from "./components/PatientLogin"
import PatientIntermediateLogin from "./components/PatientIntermediateLogin"
import PatientSearchOrganizations from "./components/PatientSearchOrganizations"
import PatientRegister from "./components/PatientRegister"
import OrganizationRegister from "./components/OrganizationRegister"
import OrganizationLogin from "./components/OrganizationLogin"
import OrganizationHome from "./components/OrganizationHome"
import Logout from "./components/Logout"
import { initialState, reducer } from "../src/reducer/UseReducer" 
import 'bootstrap/dist/css/bootstrap.css'
import ErrorPage from "./components/Errorpage"
import CreateNavbar from "./components/CustomNavbar"


// Context API
export const userContext = createContext();

const Routing =() =>{
  return(
        <Routes>
        <Route path="/PatientHome" element={ <PatientHome/> } />
        <Route path="/Patientabout" element={ <PatientAbout/> } />
        <Route path="/contact" element={ <Contact/> } />
        <Route path= "/patientLogin" element={<PatientLogin/>} />
        <Route path= "/patientRegister" element={<PatientRegister/>} />
        <Route path= "/OrganizationRegister" element={<OrganizationRegister/>} />
        <Route path= "/OrganizationLogin" element={<OrganizationLogin/>} />
        <Route path= "/OrganizationHome" element={<OrganizationHome/>} />
        <Route path= "/PatientEditdetails" element={<PatientEditdetails/>} />
        <Route path= "/PatientIntermediateLogin" element={<PatientIntermediateLogin/>} />
        <Route path= "/PatientSearchOrganizations" element={<PatientSearchOrganizations/>} />
        <Route path= "/logout" element ={<Logout/>}/>  
      </Routes>
  )
}
const App =() =>{

  const [state,dispatch] = useReducer(reducer, initialState);
  return(
    <>

      <userContext.Provider value ={{state, dispatch}}>
      <CreateNavbar />
      <Routing />
      </userContext.Provider>
    </>
  )
}

export default App