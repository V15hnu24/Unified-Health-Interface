import React from 'react'
import{Route,Routes} from "react-router-dom";
import Home from './components/Home'
import Navbar from "./components/Navbar"
import Contact from "./components/Contact"
import About from "./components/About"
import Signup from "./components/Signup"
import Login from "./components/Login"
import PatientLogin from "./components/PatientLogin"
import PatientRegister from "./components/PatientRegister"
import ErrorPage from "./components/Errorpage"
const App =() =>{
  return(
    <>
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
     <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/contact" element={ <Contact/> } />
        <Route path="/login" element={<Login/>} />
        <Route path= "/registration" element={<Signup/>} />
        <Route path= "/patientLogin" element={<PatientLogin/>} />
        <Route path= "/patientRegister" element={<PatientRegister/>} />
      </Routes>
      {/* <Route>
        <ErrorPage/>
      </Route> */}

  
    </>
  )
}

export default App