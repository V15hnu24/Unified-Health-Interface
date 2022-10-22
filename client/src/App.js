import React, { createContext, useReducer } from 'react'
import{Route,Routes} from "react-router-dom";
import Home from './components/Home'
import Navbar from "./components/Navbar"
import Contact from "./components/Contact"
import About from "./components/About"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Editdetails from "./components/Editdetails"
import PatientLogin from "./components/PatientLogin"
import PatientRegister from "./components/PatientRegister"
import Logout from "./components/Logout"
import { initialState, reducer } from "../src/reducer/UseReducer" 
import ErrorPage from "./components/Errorpage"


// Context API
export const userContext = createContext();

const Routing =() =>{
  return(
        <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/contact" element={ <Contact/> } />
        <Route path="/login" element={<Login/>} />
        <Route path= "/registration" element={<Signup/>} />
        <Route path= "/patientLogin" element={<PatientLogin/>} />
        <Route path= "/patientRegister" element={<PatientRegister/>} />
        <Route path= "/Editdetails" element={<Editdetails/>} />
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