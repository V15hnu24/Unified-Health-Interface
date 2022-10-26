import React, { createContext, useReducer } from 'react'
import{Route,Routes} from "react-router-dom";
import PatientHome from './components/PatientHome'
import Navbar from "./components/Navbar"
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
import MainHomePage from "./components/MainHomePage"
import Logout from "./components/Logout"
import { initialState, reducer } from "../src/reducer/UseReducer" 
import 'bootstrap/dist/css/bootstrap.css'
import "./HomePage.css"
import ErrorPage from "./components/Errorpage"


// Context API
export const userContext = createContext();

const Routing =() =>{
  return(
        <Routes>
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
        <Route path= "/logout" element ={<Logout/>}/>  
      </Routes>
  )
}
const App =() =>{

  const [state,dispatch] = useReducer(reducer, initialState);
  return(
    <>
    <userContext.Provider value ={{state, dispatch}}>
    <Navbar/>
    {/* <MainHomePage/> */}
    {/* <Routes>
     <Route path="/" element={<Home/>} />
    </Routes> 

    <Routes>
    <Route path="/about" element={<About/>} />
    </Routes>

    <Routes>
    <Route path="/contact" element={<Contact/>} />
    </Routes>

    <Routes>
    <Route path="/login" element={<Login/>} />
    </Routes>

    <Routes>
    <Route path= "/signup" element={<Signup/>} />
    </Routes> */}
     {/* <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/contact" element={ <Contact/> } />
        <Route path="/login" element={<Login/>} />
        <Route path= "/registration" element={<Signup/>} />
        <Route path= "/patientLogin" element={<PatientLogin/>} />
        <Route path= "/patientRegister" element={<PatientRegister/>} />
        <Route path= "/Editdetails" element={<Editdetails/>} />
        <Route path= "/logout" element ={<Logout/>}/>  
      </Routes> */}
      <Routing/>
      </userContext.Provider>
      {/* <Route>
        <ErrorPage/>
      </Route> */}

  
    </>
  )
}

export default App